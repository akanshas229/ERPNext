# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt


import frappe, pymssql
from frappe import _


def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data



def get_columns():
	return [
		{"fieldname":"company_code", "fieldtype":"Data", "label":"Company Code",  "width":130},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":150},
		{"fieldname":"customer_code", "fieldtype":"Data", "label":"Customer Code.", "width":140},
		{"fieldname":"customer_name", "fieldtype":"Data", "label":"Customer Name", "width":200},
		{"fieldname":"order_date", "fieldtype":"Date", "label":"Order Date",  "width":100},
		{"fieldname":"export_date", "fieldtype":"Date", "label":"Export Date",  "width":100},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":150},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat",  "width":100},
		{"fieldname":"inst", "fieldtype":"Data", "label":"Instruction",  "width":100},
		{"fieldname":"order_quantity", "fieldtype":"Data", "label":"Order Quantity", "width":140},
		{"fieldname":"customer_instruction", "fieldtype":"Data", "label":"Customer Instruction", "width":250},
		{"fieldname":"production_instruction", "fieldtype":"Data", "label":"Production Instruction", "width":250},

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
		conditions += " AND CONCAT(OrdMst.OmTc, '/', OrdMst.OmYy, '/', OrdMst.OmChr, '/', OrdMst.OmNo) LIKE '%"+filters.get("order_no")+"%' " 

	

	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	                # SUM(TreeDet.TrdBagPcs) total_bag_pc,
	                # SUM(TreeDet.TrdDcWt) totol_dia_stone_wt,

	query = f"""SELECT 
					CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) order_no,
					OmCmCd customer_code,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer_name,
					CONVERT(DATE, OmDt) as order_date,
					CONVERT(DATE, OmExpDelDt) as export_date,
					OrdDsg.OdDmCd design_code,
					OrdDsg.OdKt karat,
					OdCmStmpInst inst,
					OrdMst.OmCoCd company_code,
					OdOrdQty order_quantity,
					OdCmPrdInst customer_instruction,
					OdDmPrdInst production_instruction
				FROM OrdDsg
				JOIN OrdMst ON  OrdDsg.OdOmIdNo =  OrdMst.OmIdNo
				WHERE  {conditions}
				ORDER BY OmDt ASC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	