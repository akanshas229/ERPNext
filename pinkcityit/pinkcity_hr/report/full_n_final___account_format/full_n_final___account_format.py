# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe


import frappe
from frappe import _

# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_employees(filters)

	return columns, data


def get_columns():
	return [
		_("Employee") + ":Data:120",
		_("Bank Code") + ":Data:100",
		_("S.No.") + ":Data:80",
		_("Account No.") + ":Data:150",
		_("Net Pay") + ":Currency:120",
		_("Employee Name") + ":Data:200",
		_("Company Code") + ":Data:120",
		_("Employee Name") + ":Data:200",
		_("Report Date") + ":Date:120",
		_("IFSC Code") + ":Data:120",
		_("Bank Name") + ":Data:120",
		_("Email") + ":Data:200",
	]


def get_employees(filters):
	conditions = get_conditions(filters)
	return frappe.db.sql(
		"""SELECT
					fnf.employee_id,
					IF(fnf.bank_name_new = 'HDFC Bank', 'I', 'N') bank_code,
					@a:=@a+1 s_no,
					fnf.account_number,
					fnf.net_pay,
					fnf.employee_name,
					tabCompany.abbr,
					fnf.employee_name,
					CURDATE() current_details,
					fnf.ifsc_code,
					fnf.bank_name_new,
					'accounts@pinkcityindia.com' email
	 		From `tabFull N Final Settlement` AS fnf
			JOIN (SELECT @a := 0 ) s_no_table
			LEFT JOIN tabCompany ON tabCompany.company_name = fnf.company
			WHERE fnf.docstatus < 2  %s """
		% conditions,
		as_list=1,
	)


def get_conditions(filters):
	conditions = ""
	if filters.get("full_and_final_process_date_from"):
		conditions += " and DATE(full_and_final_process_date) >= '%s'" % filters["full_and_final_process_date_from"]

	if filters.get("full_and_final_process_date_to"):
		conditions += " and DATE(full_and_final_process_date) <= '%s'" % filters["full_and_final_process_date_to"]

	if filters.get("date_of_resignation_from"):
		conditions += " and DATE(date_of_resignation) >= '%s'" % filters["date_of_resignation_from"]

	if filters.get("date_of_resignation_to"):
		conditions += " and DATE(date_of_resignation) <= '%s'" % filters["date_of_resignation_to"]

	if filters.get("company"):
		conditions += " and fnf.company = '%s'" % filters["company"].replace("'", "\\'")

	if filters.get("department"):
		conditions += " and fnf.department = '%s'" % filters["department"].replace("'", "\\'")

	return conditions
