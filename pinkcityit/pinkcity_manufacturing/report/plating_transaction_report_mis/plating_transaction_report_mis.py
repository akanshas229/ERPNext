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
		row.plating_price = round(float(float(row.get('plating_price', 0) or 0)))
		row.gpc_wt = float(float(row.get('design_metal_out_weight', 0) or 0) -  float(row.get('design_metal_in_weight', 0) or 0 ))
		row.gpc_purchase = round(float(float(row.get('gpc_purchase', 0) or 0)))
		row.gpc_cost = round(float(float(row.get('gpc_wt', 0) or 0) *  float(row.get('gpc_purchase', 0) or 0) ))
		if row.get('plating_uom', 'Per Gram') == 'Per Gram' :
			row.plating_income_usd = float(float(row.get('plating_price', 0) or 0) * float(row.get('design_metal_out_weight', 0) or 0 ))
		else :
			row.plating_income_usd = float(float(row.get('plating_price', 0) or 0) * float(row.get('bag_quantity_platings', 0)or 0 ))
		row.plating_income_inr = float(float(row.get('plating_income_usd', 0) or  0) *  84 )
		row.pnl = float(float(row.get('plating_income_inr', 0) or 0) - float(row.get('gpc_cost', 0)or 0 ))

	return columns, data


def get_columns():
	return [
		{"fieldname":"id_no", "fieldtype":"Link", "label":"ID No", "options":"Plating Transaction", "width":120},
		{"fieldname":"transaction_date", "fieldtype":"Date", "label":"Transaction Date", "width":120},
		{"fieldname":"customer_name", "fieldtype":"Data", "label":"Customer Name", "width":120},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":150},
		{"fieldname":"bag_quantity_platings", "fieldtype":"Data", "label":"Bag Qty (Plating)", "width":150},
		{"fieldname":"plating_code", "fieldtype":"Data", "label":"Micron Plating", "width":120},
		{"fieldname":"design_metal_in_weight", "fieldtype":"Float", "label":"Metal In Weight", "width":140},
		{"fieldname":"design_metal_out_weight", "fieldtype":"Float", "label":"Metal Out Weight", "width":140},
		{"fieldname":"gpc_wt", "fieldtype":"Float", "label":"GPC Consumption Weight", "width":200},
		{"fieldname":"gpc_purchase", "fieldtype":"Int", "label":"GPC Purchase Rate (Per Gram)", "width":220},
		{"fieldname":"gpc_cost", "fieldtype":"Int", "label":"GPC Consumption Cost", "width":180},
		{"fieldname":"plating_price", "fieldtype":"Int", "label":"Plating Price($)", "width":140},
		{"fieldname":"plating_uom", "fieldtype":"Data", "label":"Price UOM", "width":140},
		{"fieldname":"plating_income_usd", "fieldtype":"Float", "label":"Total Plating Income ($)", "width":180},
		{"fieldname":"plating_income_inr", "fieldtype":"Float", "label":"Total Plating Income (₹)", "width":180},
		{"fieldname":"pnl", "fieldtype":"Float", "label":"P & L", "width":140},
	]


def get_data(filters):
	conditions = get_conditions(filters)
	query = f"""SELECT 
				tpt.name id_no, 
				DATE(tpt.`date`) transaction_date, 
				tpmbd.customer_name,
				tpmbd.design_code, 
				SUM(tpmbd.bag_quantity) bag_quantity_platings,
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
				SUM(tpmbd.design_metal_in_weight) design_metal_in_weight,
				SUM(tpmbd.design_metal_out_weight) design_metal_out_weight, 
				(SELECT tgc.price FROM `tabGPC Consumption Rate` tgc 
					WHERE tgc.company = tpt.company AND tpt.`date` BETWEEN  tgc.date_from AND tgc.date_to 
					ORDER BY tgc.modified DESC LIMIT 1  ) gpc_purchase,
				( SELECT tc.amount_in_dollar_in_plating FROM tabCosting tc 
					WHERE tc.main_design_code = tpmbd.design_code ORDER BY tc.modified DESC LIMIT 1 ) plating_price,
				( SELECT tc.uom_in_plating FROM tabCosting tc 
					WHERE tc.main_design_code = tpmbd.design_code ORDER BY tc.modified DESC LIMIT 1 ) plating_uom
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
