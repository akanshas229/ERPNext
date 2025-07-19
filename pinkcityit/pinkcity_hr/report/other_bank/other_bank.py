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
		{"fieldname":"customer_ref_no", "fieldtype":"Data", "label":"Customer Reference No", "width":160},
		{"fieldname":"employee_name", "fieldtype":"Data", "label":"Beneficiary Name", "width":200},
		{"fieldname":"bank_account_no", "fieldtype":"Int", "label":"Beneficiary Account No", "width":200},
		{"fieldname":"ifsc_code", "fieldtype":"Data", "label":"IFSC Code", "width":120},
		{"fieldname":"account_type", "fieldtype":"Data", "label":"Account Type", "width":80},
		{"fieldname":"net_pay", "fieldtype":"Currency", "label":"Amount", "width":120},
		{"fieldname":"value_date", "fieldtype":"Data", "label":"Value Date", "width":120}
	]

def get_data(filters):
	conditions = get_conditions(filters)

	query = f"""SELECT
					tss.attendance_device_id,
					CONCAT('Salary ', DATE_FORMAT(start_date,"%M-%y")) as customer_ref_no,
					tss.employee_name,
					tss.bank_account_no,
					tss.ifsc_code,
					'02' account_type,
					tss.net_pay,
					DATE_FORMAT(CURRENT_DATE(), "%Y%m%d") as value_date
				FROM `tabSalary Slip` tss
				WHERE bank_name_new != 'HDFC Bank'
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
