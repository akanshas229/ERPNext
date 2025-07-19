# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt


import frappe
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	for row in data : 
		row.gpc = float(row.get('design_metal_out_weight', 0) -  row.get('design_metal_in_weight', 0))

	return columns, data


def get_columns():
	return [
		{"fieldname":"id_no", "fieldtype":"Link", "label":"ID No", "options":"Plating Transaction", "width":120},
		{"fieldname":"transaction_date", "fieldtype":"Date", "label":"Transaction Date", "width":120},
		{"fieldname":"customer_name", "fieldtype":"Data", "label":"Customer Name", "width":120},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":200},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":200},
		{"fieldname":"plating_code", "fieldtype":"Data", "label":"Micron Plating", "width":120},
		{"fieldname":"tank_no", "fieldtype":"Data", "label":"Bath No", "width":250},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":150},
		{"fieldname":"metal_weight_per_pc", "fieldtype":"Data", "label":"Metal Weight Per PC", "width":150},
		{"fieldname":"bag_quantity_platings", "fieldtype":"Float", "label":"Bag Qty (Plating)", "width":150},
		{"fieldname":"design_metal_in_weight", "fieldtype":"Float", "label":"Metal In Weight", "width":140},
		{"fieldname":"design_metal_out_weight", "fieldtype":"Float", "label":"Metal Out Weight", "width":140},
		{"fieldname":"gpc", "fieldtype":"Float", "label":"GPC Consumption", "width":140},
	]
	# return [
	# 	_("ID No") + ":Link/Plating Transaction:120",
	# 	_("Transaction Date") + ":Date:200",
	# 	_("Customer Name") + ":Data:100",
	# 	_("Bag No") + ":Data:120",
	# 	_("Plating Code") + ":Data:120",
	# 	_("Tank No") + ":Data:120",
	# 	_("Design Code") + ":Data:60",
	# 	_("Bag Quantity Plating") + "/bag_quantity_platings:Float:120:",
	# 	_("Design Metal In Weight") + ":Float:120",
	# 	_("Design Metal Out Weight") + ":Float:120",
	# 	_("GPS Consumption") + ":Float:120",
	# ]


def get_data(filters):
	conditions = get_conditions(filters)
	query = f"""SELECT 
				tpt.name id_no, 
				DATE(tpt.`date`) transaction_date, 
				tpmbd.customer_name,
				GROUP_CONCAT(tpmbd.bag_no) bag_no, 
				GROUP_CONCAT(tpmbd.order_no) order_no, 
				(
					CASE 
						WHEN tpmbd.plating_code LIKE '%0.5%' THEN '0.5'
						WHEN tpmbd.plating_code LIKE '%1.0%' THEN '1.0'
						WHEN tpmbd.plating_code LIKE '%1.5%' THEN '1.5'
						WHEN tpmbd.plating_code LIKE '%2.0%' THEN '2.0'
						WHEN tpmbd.plating_code LIKE '%2.5%' THEN '2.5'
						WHEN tpmbd.plating_code LIKE '%3.0%' THEN '3.0'
						WHEN tpmbd.plating_code LIKE '%3.5%' THEN '3.5'
						ELSE tpmbd.plating_code
					END
				) plating_code, 
				GROUP_CONCAT(tpmbd.plating_bath) tank_no, 
				tpmbd.design_code, 
				MAX(ROUND(tpmbd.design_bom_weight, 2)) metal_weight_per_pc, 
				SUM(tpmbd.bag_quantity) bag_quantity_platings,
				SUM(tpmbd.design_metal_in_weight) design_metal_in_weight,
				SUM(tpmbd.design_metal_out_weight) design_metal_out_weight
			FROM `tabPlating Matler Bag Detail` tpmbd  
			LEFT JOIN `tabPlating Transaction` tpt   ON tpt.name = tpmbd.parent 
			WHERE {conditions}
			GROUP BY tpt.`date` , tpmbd.design_code
		"""
	return frappe.db.sql(query, as_dict=1,)


def get_conditions(filters):
	conditions = ""

	if filters.get("company"):
		conditions += " company = '%s'" % filters["company"].replace("'", "\\'")

	if filters.get("date_from"):
		conditions += f" AND tpt.`date` >= '"+filters.get("date_from")+"'"
	
	if filters.get("date_to"):
		conditions += f" AND tpt.`date` <= '"+filters.get("date_to")+"'"

	return conditions
