# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	return columns, data
def get_columns():
	return [
		{"fieldname":"attendance_device_id", "fieldtype":"Data", "label":"Employee ID", "width":130},
		{"fieldname":"bank_account_no", "fieldtype":"Int", "label":"Account", "width":150},
		{"fieldname":"credit", "fieldtype":"Data", "label":"Credit", "width":80},
		{"fieldname":"net_pay", "fieldtype":"Currency", "label":"Amount", "width":120},
		{"fieldname":"employee_name", "fieldtype":"Data", "label":"Narration", "width":200},
		{"fieldname":"acan", "fieldtype":"Data", "label":"Account,Credit,Amount,Narration", "width":350}
	]

def get_data(filters):
	conditions = get_conditions(filters)

	query = f"""SELECT
						tss.attendance_device_id, 
						tss.bank_account_no,
						'C' credit,
						tss.net_pay,
						tss.employee_name,
						CONCAT(tss.bank_account_no, ",C," ,round(tss.net_pay), "," ,tss.employee_name) AS acan
					FROM `tabSalary Slip` tss
					WHERE tss.bank_name_new  = 'HDFC Bank'
						AND tss.docstatus <= 1
							{conditions} 
				"""
	
	return frappe.db.sql(query, as_dict=1,)

def get_conditions(filters):
	conditions = ""

	if filters.get("company"):
		conditions += " AND tss.company = '" + filters.get("company") +"' " 

	if filters.get("month"):
		month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		].index(filters["month"]) + 1
		conditions += f" AND MONTH(tss.start_date) = {month} "
	
	if filters.get("year"):
		conditions += f" AND YEAR(tss.start_date) =  " + filters.get("year") +" " 
	
	if filters.get("employee"):
		conditions += f" AND tss.employee =  '" + filters.get("employee") +"' "

	return conditions
