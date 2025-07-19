# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt
import frappe

def execute(filters=None):
    if not filters:
        filters = {}
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {"label": "Employee", "fieldname": "employee", "fieldtype": "Data", "width": 100},
        {"label": "Department", "fieldname": "department", "fieldtype": "Data", "width": 150},
        {"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 120},
        {"label": "Attendance Device Id", "fieldname": "attendance_device_id", "fieldtype": "Data", "width": 100},
        {"label": "Payment Days", "fieldname": "payment_days", "fieldtype": "Data", "width": 120},
        {"label": "Start Date", "fieldname": "start_date", "fieldtype": "Date", "width": 120},
        {"label": "OT Hour", "fieldname": "ot_hour", "fieldtype": "Data", "width": 120}
    ]

def get_data(filters):
    conditions = get_conditions(filters)
    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""

    query = f"""
        SELECT 
            ta.employee, 
            ta.department,
            ta.employee_name,
            tss.attendance_device_id,
            tec.shift_start,
            tec.shift_end,
            tss.payment_days,
            tss.start_date,
            tei.ot_hour 
        FROM `tabAttendance` ta 
        LEFT JOIN `tabEmployee Checkin` tec ON tec.employee = ta.employee
        LEFT JOIN `tabSalary Slip` tss ON tss.employee = ta.employee
        LEFT JOIN `tabEmployee Incentive` tei ON tei.employee = ta.employee
        {where_clause}
    """
    return frappe.db.sql(query, as_dict=1)

def get_conditions(filters):
    conditions = []

    if filters.get("company"):
        conditions.append(f"tss.company = '{filters.get('company')}'")
    

    return conditions

# import frappe


# def execute(filters=None):
# 	columns = get_columns(filters)
# 	data = get_data(filters)
# 	return columns, data

# def get_columns(filters):
# 	return [
# 		{"label": "Employee", "fieldname": "employee", "fieldtype": "Data", "width": 100},
#         {"label": "Department", "fieldname": "department", "fieldtype": "Data", "width": 150},
#         {"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 120},
#         {"label": "Attendance Device Id", "fieldname": "attendance_device_id", "fieldtype": "Data", "width": 100},
#         {"label": "payment Days", "fieldname": "payment_days", "fieldtype": "Data", "width": 120},
#         {"label": "start Date", "fieldname": "start_date", "fieldtype": "Date", "width": 120},
#         {"label": "ot Hour", "fieldname": "ot_hour", "fieldtype": "Data", "width": 120}
# 	]

#         # {"label": "Shift Start", "fieldname": "shift_start", "fieldtype": "Date", "width": 100},

# def get_data(filters):
#     conditions = get_conditions(filters)
#     where_clause = f"WHERE {conditions}" if conditions else ""

#     query = f"""
#         SELECT 
#             ta.employee, 
#             ta.department,
#             ta.employee_name,
#             tss.attendance_device_id,
#             tec.shift_start,
#             tec.shift_end,
#             tss.payment_days,
#             tss.start_date,
#             tei.ot_hour 
#         FROM `tabAttendance` ta 
#         LEFT JOIN `tabEmployee Checkin` tec ON tec.employee = ta.employee
#         LEFT JOIN `tabSalary Slip` tss ON tss.employee = ta.employee
#         LEFT JOIN `tabEmployee Incentive` tei ON tei.employee = ta.employee  
#         {where_clause}
#     """
#     return frappe.db.sql(query, as_dict=1)


# def get_conditions(filters):
#     conditions = ""
    
#     if filters.get("company"):
#         conditions += "tss.company = '{}'".format(filters.get("company"))

   
    
#     return conditions
				# (tss.gross_pay - tss.net_pay) AS total_deduction,
				# (earned_gross - late_hours_deduction ) AS total_net_gross
				# (basic + city_compensatory_allowance + washing_allowance + house_rent_allowance + overtime + arrear + incentive_pay + leave_encashment + travelling_allowance + abry_scheme ) AS earned_gross

