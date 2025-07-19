# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt


import frappe
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns(filters)
	data = get_data(filters)

	for row in data : 
		row.daily_earning_with_per = float(float(row.get('daily_earning', 0) or 0) +  (float(row.get('daily_earning', 0) or 0) * 0.15) )
		row.total_stone_qty = 0
		row.total_design_wt = 0
		row.price_per_gram = 0
		row.price_per_cts = 0
		if row.get('designation', '') == "Setter" :
			if row.get('out_quantity_s', ''):
				out_quantity_s_array = row.get('out_quantity_s', '').split(',')
				hand_set_quantity_s_array = row.get('hand_set_quantity_s', '').split(',')
				stone_quantity_s_array = row.get('stone_quantity_s', '').split(',')
				i = 0

					# frappe.msgprint(row_data + "hi " + hand_set_quantity_s_array[i])
				# row.total_stone_qty += float(float(row_data or 0) *  float(hand_set_quantity_s_array[i] or 0)  )

				for row_data in out_quantity_s_array:
					# row.total_stone_qty += float(float(row_data or 0) *  float(hand_set_quantity_s_array[i] or 0)  )

					if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" :
						row.total_stone_qty += float(float(row_data or 0) *  float(stone_quantity_s_array[i] or 0)  )
					else :
						row.total_stone_qty += float(float(row_data or 0) *  float(hand_set_quantity_s_array[i] or 0)  )
					# frappe.msgprint(str(row.total_stone_qty) + "df")
					i += 1
			row.price_per_cts =  float(float(row.get('daily_earning_with_per', 0) or 0) /  float(row.get('total_stone_qty', 0) or 1)  )
		if row.get('out_quantity_s', ''):
				out_quantity_s = row.get('out_quantity_s', '')
				design_per_pc_wt = row.get('design_per_pc_wt', '')
				out_quantity_s_array = out_quantity_s.split(',')
				# frappe.msgprint(out_quantity_s_array)
				design_per_pc_wt_array = design_per_pc_wt.split(',')
				i = 0
				for row_data in out_quantity_s_array:
					# frappe.msgprint(row_data + "hi " + design_per_pc_wt_array[i])
					row.total_design_wt += float(float(row_data or 0) *  float(design_per_pc_wt_array[i] or 0)  )
					# frappe.msgprint(str(row.total_design_wt) + "df")
					i = i + 1
		
		if row.get('designation', '') != "Setter" :
			row.price_per_gram =  float(float(row.get('daily_earning_with_per', 0) or 0) /  float(row.get('total_design_wt', 0) or 1)  )

	return columns, data


def get_columns(filters):
	return [
		{"fieldname":"company", "fieldtype":"Link", "label":"Company", "options":"Company", "width":120},
		{"fieldname":"create_date", "fieldtype":"Date", "label":"Tr.Date", "width":120},
		{"fieldname":"parent", "fieldtype":"Link", "label":"DT ID", "options":"Daily Transaction", "width":120},
		{"fieldname":"employee_code", "fieldtype":"Link", "label":"Employee Code", "options":"Employee", "width":200},
		{"fieldname":"employee_name", "fieldtype":"Data", "label":"Employee Name", "width":120},
		{"fieldname":"designation", "fieldtype":"Link", "label":"Designation", "options":"Designation", "width":250},
		{"fieldname":"sub_department", "fieldtype":"Data", "label":"Cell No", "width":150},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":150},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design No", "width":200},
		{"fieldname":"tran_type", "fieldtype":"Data", "label":"Transaction Type", "width":150},
		{"fieldname":"work_type", "fieldtype":"Data", "label":"Work Type", "width":250},
		{"fieldname":"design_per_pc_wt", "fieldtype":"Data", "label":"Design Metal Weight (Per Piece)", "width":240},
		{"fieldname":"stone_quantity_s", "fieldtype":"Data", "label":"Stone Qty (Per Piece)", "width":200} if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" else {"fieldname":"hand_set_quantity_s", "fieldtype":"Data", "label":"Hand Set Qty (Per Piece)", "width":200},
		{"fieldname":"out_quantity_s", "fieldtype":"Data", "label":"Bag Out Qty", "width":140},
		# {"fieldname":"bag_qty", "fieldtype":"Data", "label":"Bag Quantity - Bag Wise", "width":140},
		# {"fieldname":"daily_in_qty", "fieldtype":"Data", "label":"Total In Qty - Bag Wise", "width":140},
		# {"fieldname":"daily_out_qty", "fieldtype":"Data", "label":"Total Out Qty - Bag Wise", "width":140},
		# {"fieldname":"design_diff_qty", "fieldtype":"Data", "label":"Difference (Quantity) - Bag Wise", "width":140},
		# {"fieldname":"stone_qty_bags", "fieldtype":"Data", "label":"Stone Quantity Bag Wise", "width":140},
		{"fieldname":"total_bag_qty", "fieldtype":"Int", "label":"Total Bag Quantity", "width":140},
		{"fieldname":"total_daily_in_qty", "fieldtype":"Int", "label":"Total In Qty", "width":140},
		{"fieldname":"total_daily_out_qty", "fieldtype":"Int", "label":"Total Out Qty", "width":140},
		{"fieldname":"total_design_diff_qty", "fieldtype":"Int", "label":"Total Difference (Quantity) ", "width":200},
		{"fieldname":"total_stone_qty", "fieldtype":"Float", "label":"Total Stone Qty ", "width":200} if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" else {"fieldname":"total_stone_qty", "fieldtype":"Float", "label":"Total Stone Qty (Hand Set) ", "width":200},
		{"fieldname":"total_design_wt", "fieldtype":"Float", "label":"Total Out Metal Weight", "width":200},
		# {"fieldname":"daily_diff_minute", "fieldtype":"Float", "label":"Total Working Time", "width":140},
		{"fieldname":"gross_monthly_salary", "fieldtype":"Currency", "label":"Gross Salary", "width":140},
		{"fieldname":"daily_earning_with_per", "fieldtype":"Currency", "label":"Daily Salary", "width":140},
		{"fieldname":"price_per_gram", "fieldtype":"Currency", "label":"Labour Cost Per gram", "width":200},
		{"fieldname":"price_per_cts", "fieldtype":"Currency", "label":"Setting Cost (Per pcs)", "width":200}
	]

def get_data(filters):
	conditions = get_conditions(filters)

	query = f"""SELECT
					Case
						When tdt.company = 'Pinkcity Jewelhouse Private Ltd-Mahapura' THEN 'Mahapura'
						When tdt.company = 'Pinkcity Jewelhouse Private Limited- Unit 1' THEN 'Unit-1'
						When tdt.company = 'Pinkcity Jewelhouse Private Limited-Unit 2' THEN 'Unit-2'
						ELSE ''
					END AS company,
					DATE(tdt.`date`) AS create_date,
					tdbt.parent,
					tdbt.employee_code,
					tdbt.employee_name,
					tdbt.designation,
					tdbt.sub_department,
					GROUP_CONCAT(tdbt.bag_no) AS bag_no,
					GROUP_CONCAT(tdbt.design_code) AS design_code,
					GROUP_CONCAT(round(tdbt.hand_set_quantity, 1)) AS hand_set_quantity_s,
					GROUP_CONCAT(round(tdbt.stone_quantity, 1)) AS stone_quantity_s,
					GROUP_CONCAT(round(tdbt.out_quantity, 1)) AS out_quantity_s,
				    Case
				     	When tdbt.parentfield = 're_work_daily' THEN 'Re Work'
				     	When tdbt.parentfield = 'mix_work_daily' THEN 'Mix Work'
				     	ELSE 'Regular'
				    END AS tran_type,
					GROUP_CONCAT(tdbt.work_type) AS work_type,
					GROUP_CONCAT(round(tdbt.design_bom_weight, 4)) AS design_per_pc_wt,
					SUM(round(tdbt.bag_quantity,1)) AS total_bag_qty,
					SUM(round(tdbt.in_quantity,1)) AS total_daily_in_qty,
					SUM(round(tdbt.out_quantity,1)) AS total_daily_out_qty,
					SUM(round(tdbt.diff_qty,1)) AS total_design_diff_qty,
					te.gross_monthly_salary,
					( te.gross_monthly_salary / DAYOFMONTH(LAST_DAY(tdbt.creation) -
							(SELECT COUNT(th.name) FROM tabHoliday th
									WHERE MONTH(th.holiday_date) = MONTH(tdbt.creation) AND  YEAR(th.holiday_date) = YEAR(tdbt.creation)  )
					) ) AS daily_earning
				FROM `tabDT Bag Transaction` tdbt
				JOIN `tabDaily Transaction` tdt on tdt.name = tdbt.parent
				LEFT JOIN tabEmployee te ON te.employee = tdbt.employee_code
				WHERE {conditions}
				GROUP BY tdbt.employee_code, DATE(tdt.`date`)
				ORDER BY DATE(tdt.`date`) DESC
				"""
	
					# Case
					# 	When tdbt.designation = 'Setter' THEN SUM(tdbt.stone_quantity * tdbt.out_quantity)
					# 	ELSE 0
					# END AS total_stone_qty,
					# SUM(tdbt.design_bom_weight * tdbt.out_quantity) AS total_design_wt,
	


	return frappe.db.sql(query, as_dict=1,)

def get_conditions(filters):
	conditions = ""

	if filters.get("company"):
		conditions += " tdt.company = '%s'" % filters["company"].replace("'", "\\'")

	if filters.get("date_from"):
		conditions += f" AND tdt.`date` >= '"+filters.get("date_from")+"'"
	
	if filters.get("date_to"):
		conditions += f" AND tdt.`date` <= '"+filters.get("date_to")+"'"

	if filters.get("cell_no"):
		conditions += f" AND tdbt.sub_department = '"+filters.get("cell_no")+"'"

	if filters.get("employee"):
		conditions += f" AND tdbt.employee_code = '"+filters.get("employee")+"'"

	if filters.get("designation"):
		conditions += f" AND tdbt.designation = '"+filters.get("designation")+"'"

	return conditions
