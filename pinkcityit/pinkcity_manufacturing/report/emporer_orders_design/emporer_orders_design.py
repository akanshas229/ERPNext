# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt


import frappe, pymssql
from frappe import _



def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	return columns, data


def get_columns():
	return [
		{"fieldname":"name", "fieldtype":"Int", "label":"Order Design ID",  "width":140},
		{"fieldname":"order_design_sr_no", "fieldtype":"Int", "label":"Order Design Sr. No.", "width":170},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":120},
		{"fieldname":"batch_no", "fieldtype":"Data", "label":"Batch No. / Suffix",  "width":150},
		{"fieldname":"size", "fieldtype":"Data", "label":"Size", "width":80},
		{"fieldname":"ord_qty", "fieldtype":"Float", "label":"Order Qunatity",  "width":150},
		{"fieldname":"prd_qty", "fieldtype":"Float", "label":"Product Qunatity", "width":150},
		{"fieldname":"bal_qty", "fieldtype":"Float", "label":"Balance Qunatity", "width":150},
		{"fieldname":"exp_qty", "fieldtype":"Data", "label":"Export Qunatity", "width":140},
		{"fieldname":"fg_qty", "fieldtype":"Data", "label":"FG Qunatity", "width":150},
		{"fieldname":"calculated_price", "fieldtype":"Float", "label":"Calculated Price", "width":140},
		{"fieldname":"sale_price", "fieldtype":"Float", "label":"Sale Price", "width":140},
		{"fieldname":"customer_price", "fieldtype":"Float", "label":"Customer Price", "width":140},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat", "width":100},
		{"fieldname":"prod_sequ", "fieldtype":"Data", "label":"Production Sequence", "width":140},
		{"fieldname":"color", "fieldtype":"Data", "label":"Color", "width":100},
		{"fieldname":"prod_inst", "fieldtype":"Data", "label":"Production Instruction", "width":220},
		{"fieldname":"cust_inst", "fieldtype":"Data", "label":"Customer Instruction", "width":220},
		{"fieldname":"stamp_inst", "fieldtype":"Data", "label":"Stamp Instruction", "width":220},
		{"fieldname":"size_inst", "fieldtype":"Data", "label":"Size Instruction", "width":220},
		{"fieldname":"customer_code", "fieldtype":"Data", "label":"Customer Code", "width":140},
		{"fieldname":"customer", "fieldtype":"Data", "label":"Customer", "width":180},
		{"fieldname":"company_code", "fieldtype":"Data", "label":"Company", "width":140},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":140},
		{"fieldname":"order_po_no", "fieldtype":"Data", "label":"Order PO No", "width":140},
		{"fieldname":"order_date", "fieldtype":"Date", "label":"Order Date", "width":140},
		{"fieldname":"order_export_date", "fieldtype":"Date", "label":"Order Export Date", "width":140},
		{"fieldname":"delivary_date", "fieldtype":"Date", "label":"Delivery Date", "width":140},
		{"fieldname":"mod_user", "fieldtype":"Data", "label":"User (Modified)", "width":140},
		{"fieldname":"mod_date", "fieldtype":"Date", "label":"Date (Modified)", "width":140},
		{"fieldname":"mod_time", "fieldtype":"Time", "label":"Time (Modified)", "width":140},
	]


def get_data(filters):
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	company_code = "PC"

	conditions = ""

	if filters.get("company"):
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" :
			server = '192.168.5.88'
			company_code = "PJ"
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2" :
			server = '192.168.5.88'
			company_code = "PJ2"
		conditions += f" OrdMst.OmCoCd =  '{company_code}'"

	if filters.get("date_from"):
		conditions += " AND OrdMst.OmDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND OrdMst.OmDt <=  '" +filters.get("date_to")+ "'"

	if filters.get("design_code"):
		conditions += " AND OrdDsg.OdDmCd LIKE '%"+filters.get("design_code")+"%' " 

	if filters.get("order_no"):
		conditions += " AND CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) LIKE '%"+filters.get("order_no")+"%' " 

	if filters.get("customer_code"):
		conditions += " AND OrdMst.OmCmCd '" +filters.get("customer_code")+ "'"


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	query = f"""SELECT    
	            	OrdDsg.OdIdNo name,
	            	OrdDsg.OdSr order_design_sr_no,
	            	OrdDsg.OdDmCd design_code,
	            	OrdDsg.OdSfx batch_no,
	            	OrdDsg.OdDmSz size,
	            	OrdDsg.OdOrdQty ord_qty,
	            	OrdDsg.OdPrdQty prd_qty,
	                (OrdDsg.OdPrdQty - OrdDsg.OdExpQty) bal_qty,
	            	OrdDsg.OdExpQty exp_qty,
	            	OrdDsg.OdFgQty fg_qty,
	            	OrdDsg.OdCalcPrc calculated_price,
	            	OrdDsg.OdSalPrc sale_price,
	            	OrdDsg.OdCstPrc customer_price,
	            	OrdDsg.OdKt karat,
	            	OrdDsg.OdPrdSeq prod_sequ,
	            	OrdDsg.OdDmCol color,
	            	OrdDsg.OdDmPrdInst prod_inst,
	            	OrdDsg.OdCmPrdInst cust_inst,
	            	OrdDsg.OdCmStmpInst stamp_inst,
	            	OrdDsg.OdSzInst size_inst,
	            	OrdDsg.OdOmCmCd customer_code,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
	            	OrdMst.OmCoCd company_code,
	            	CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) order_no,
	            	OrdMst.OmPoNo order_po_no,
	            	OrdMst.OmDt order_date,
	            	OrdMst.OmExpDelDt order_export_date,
	            	OrdDsg.OdDelDt delivary_date,
	            	OrdDsg.ModUsr mod_user,
	            	OrdDsg.ModDt mod_date,
	            	OrdDsg.ModTime mod_time
				FROM OrdDsg 
				JOIN OrdMst ON OrdMst.OmIdNo = OrdDsg.OdOmIdNo 
				WHERE  {conditions}
				ORDER BY name DESC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


