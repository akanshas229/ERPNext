# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

# new imports
import datetime
import math
import frappe
from frappe import _, msgprint
from frappe.utils import (
    add_days,
    cint,
    cstr,
    date_diff,
    flt,
    formatdate,
    get_first_day,
    getdate,
    money_in_words,
    rounded,
)




class AppointmentLetterPinkcity(Document):
	pass



# New class and methods
@frappe.whitelist()
def get_salary_detail(employee_docname, salary_structure_assignment_docname=None):
    final_data = {"earnings": [], "deductions": []}
    
    # basic --- salary component ----
    salary_component_abbr = {}
    salary_component_abbr['B'] = 0

    
    if not salary_structure_assignment_docname:
        return final_data
    try:
        # employee is name of doctype
        employee = frappe.get_doc("Employee", employee_docname).as_dict()

        salary_structure_assignment = frappe.get_doc(
            "Salary Structure Assignment", salary_structure_assignment_docname
        ).as_dict()

        # salary_structure = frappe.get_doc("Salary Structure", salary_structure_assignment.salary_structure).as_dict()

        # d = Salary Detail Doctype

        helper = Helper(employee, salary_structure_assignment)
        salary_structure_raw = helper.get_salary_structure()

        salary_structure_assignment = frappe.get_value(
            "Salary Structure Assignment",
            {
                "employee": employee.name,
                "salary_structure": salary_structure_raw,
                "docstatus": 1,
            },
            "*",
            order_by="from_date desc",
            as_dict=True,
        )
        if not salary_structure_assignment:
            frappe.throw(
                _(
                    "Please assign a Salary Structure for Employee {0} "
                    "applicable from or before {1} first"
                ).format(frappe.bold(employee.employee_name))
            )
        salary_structure = frappe.get_doc("Salary Structure", salary_structure_raw)
        # frappe.throw(_("salary_structure : {0}").format(salary_structure))

        data = frappe._dict()
        gross_pay = 0
        data.update(employee)
        data.update(salary_structure_assignment)
        data.update({"gross_pay": gross_pay})

        salary_components = frappe.get_all(
            "Salary Component", fields=["salary_component_abbr"]
        )
        for sc in salary_components:
            data.setdefault(sc.salary_component_abbr, 0)

        for key in ("earnings", "deductions"):
            for d in salary_structure.get(key):
                data[d.abbr] = d.amount

        # frappe.throw(_("data : {0}").format(data))
        # data.update(salary_structure)

        earnings = salary_structure.get("earnings", [])
        deductions = salary_structure.get("deductions", [])

        # frappe.throw(_("earnings : {0}").format(earnings))

        for d in earnings:
            if d.abbr == 'EPF' or d.abbr == 'EESIC':
                continue
            amount = helper.eval_condition_and_formula(d, data, salary_component_abbr)
            
            # if d.abbr == "B" :
                # salary_component_abbr['B'] = amount
            # frappe.msgprint(formula)
            if amount is not None:
                if int(amount or 0) > 0:
                    final_data["earnings"].append(
                        {"name": d.salary_component, "value": amount, "abbr": d.abbr}
                    )
                    salary_component_abbr[d.abbr] = amount
                # final_data["earnings"].update({d.abbr:amount})

            try:
                gross_pay += float(amount)
                data.update({"gross_pay": gross_pay})
            except Exception:
                pass

        for d in deductions:
            amount = helper.eval_condition_and_formula(d, data, salary_component_abbr)
            if amount is not None:
                if int(amount or 0) > 0:
                    final_data["deductions"].append(
                        {"name": d.salary_component, "value": amount, "abbr": d.abbr}
                    )
                    salary_component_abbr[d.abbr] = amount
                # final_data["deductions"].update({d.abbr:amount})

        return final_data
    except Exception as e:
        # frappe.throw(_("Error in get_salary_detail : {0}").format(e))
        pass


class Helper:
    def __init__(self, employee, salary_structure_assignment, *args, **kwargs):
        self.whitelisted_globals = {
            "int": int,
            "float": float,
            "long": int,
            "round": round,
            "date": datetime.date,
            "getdate": getdate,
        }
        self.employee = employee
        self.salary_structure_assignment = salary_structure_assignment
        self._salary_structure_doc = None

    def get_salary_structure(self):
        cond = """and sa.employee=%(employee)s"""

        st_name = frappe.db.sql(
            """
			select sa.salary_structure
			from `tabSalary Structure Assignment` sa join `tabSalary Structure` ss
			where sa.salary_structure=ss.name
				and sa.docstatus = 1 and ss.docstatus = 1 and ss.is_active ='Yes' %s
			order by sa.from_date desc
			limit 1
		"""
            % cond,
            {
                "employee": self.employee.name,
            },
        )

        if st_name:
            self.salary_structure = st_name[0][0]
            return self.salary_structure

        else:
            self.salary_structure = None
            frappe.msgprint(
                _(
                    "No active or default Salary Structure found for employee {0} for the given dates"
                ).format(self.employee),
                title=_("Salary Structure Missing"),
            )

    def eval_condition_and_formula(self, d, data, salary_component_abbr = []):
        try:
            condition = d.condition.strip().replace("\n", " ") if d.condition else None
            if condition:
                if not frappe.safe_eval(
                    condition,
                    self.whitelisted_globals,
                    data,
                ):
                    return None
            amount = d.amount
            if d.amount_based_on_formula:
                formula = d.formula.strip().replace("\n", " ") if d.formula else None

                if salary_component_abbr :
                    if salary_component_abbr['B'] :
                        if d.abbr == "PF" or d.abbr == "EPF" :
                            if salary_component_abbr['B'] >= 15000 :
                                formula = formula.replace("B ", f"15000")
                            else :
                                formula = formula.replace("B ", f"{salary_component_abbr['B']}")
                        else :
                            formula = formula.replace("B ", f"{salary_component_abbr['B']}")

                if data.wa == 0 :
                    formula = formula.replace("WA", "0")

                if formula :
                    formula = formula.replace("total_working_days", "1")
                    formula = formula.replace("payment_days", "1")

                    # frappe.msgprint(formula)
                
                # frappe.msgprint(formula)
                # if d.abbr == "ESIC" and d.parentfield == "deductions" :
                    
                    
                if formula:
                    try:
                        amount = flt(
                            frappe.safe_eval(formula, self.whitelisted_globals, data),
                            d.precision("amount"),
                        )
                        # frappe.msgprint(  str(salary_component_abbr or 'hi22')   )
                        # frappe.msgprint(d.abbr + " " + str(amount or 'hi22')   )
                        # frappe.msgprint( str(frappe.safe_eval(formula, self.whitelisted_globals, data) or "hi55") )
                    except Exception:
                        amount = 0
                if amount:
                    data[d.abbr] = amount

            # frappe.msgprint(d.abbr + " " +  str(amount or 'hi33'))
            # salary_component_abbr[d.abbr] = amount

            return amount
        except NameError as err:
            # frappe.msgprint(str(d))
            frappe.throw(
                _("{0} <br> This error can be due to missing or deleted field.").format(
                    err
                ),
                title=_("Name error"),
            )

        except SyntaxError as err:
            frappe.throw(_("Syntax error in formula or condition: {0}").format(err))
        except Exception as e:
            frappe.throw(_("Error in formula or condition: {0}").format(e))
            raise
