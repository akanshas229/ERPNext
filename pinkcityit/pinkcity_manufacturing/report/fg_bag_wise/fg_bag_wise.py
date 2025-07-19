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
		{"fieldname":"trans_no", "fieldtype":"Data", "label":"Transaction No.", "width":140},
		{"fieldname":"trans_date", "fieldtype":"Date", "label":"Transaction Date", "width":140},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No",  "width":140},
		{"fieldname":"order_date", "fieldtype":"Date", "label":"Order Date", "width":120},
		{"fieldname":"purchase_order_no", "fieldtype":"Data", "label":"Purchase Order No", "width":160},
		{"fieldname":"customer", "fieldtype":"Data", "label":"Customer",  "width":160},
		{"fieldname":"customer_code", "fieldtype":"Data", "label":"Customer Code", "width":140},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":120},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":120},
		{"fieldname":"design_category", "fieldtype":"Data", "label":"Design Category", "width":140},
		{"fieldname":"size", "fieldtype":"Data", "label":"Size", "width":120},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat", "width":100},
		{"fieldname":"color", "fieldtype":"Data", "label":"Color", "width":100},
		{"fieldname":"quantity", "fieldtype":"Float", "label":"Bag Quantity", "width":120},
		{"fieldname":"gross_wt", "fieldtype":"Float", "label":"Gross Wt", "width":100},
		{"fieldname":"order_design_sr_no", "fieldtype":"Data", "label":"Order Design Sr. No", "width":160},
		{"fieldname":"trans_sr_no", "fieldtype":"Data", "label":"Transaction Sr. No", "width":160},
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
		conditions += f" AND Fg.FgCoCd =  '{company_code}'"
	
	if filters.get("order_date_from"):
		conditions += " AND OrdMst.OmDt >=  '" +filters.get("order_date_from")+ "'"

	if filters.get("order_date_to"):
		conditions += " AND OrdMst.OmDt <=  '" +filters.get("order_date_to")+ "'"

	if filters.get("bag_no"):
		conditions += " AND CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo) LIKE '%" +filters.get("bag_no")+ "%'"

	if filters.get("design_code"):
		conditions += " AND Fgd.FdDmCd LIKE '%"+filters.get("design_code")+"%' " 

	if filters.get("order_no"):
		conditions += " AND CONCAT(OrdMst.OmTc, '/', OrdMst.OmYy, '/', OrdMst.OmChr, '/', OrdMst.OmNo) LIKE '%"+filters.get("order_no")+"%' " 

	if filters.get("date_from"):
		conditions += " AND Fg.FgDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND Fg.FgDt <=  '" +filters.get("date_to")+ "'"



	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)


	query = f"""SELECT    
	            	CONCAT(Fg.FgTc, '/', Fg.FgYy, '/', Fg.FgChr, '/', Fg.FgNo) trans_no,
	            	Fg.FgDt trans_date,
					CONCAT(OrdMst.OmTc, '/', OrdMst.OmYy, '/', OrdMst.OmChr, '/', OrdMst.OmNo) order_no,
	            	OrdMst.OmDt order_date,
	            	OrdMst.OmPoNo purchase_order_no,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
					OrdMst.OmCmCd customer_code,
					CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo) bag_no,
					Fgd.FdDmCd design_code,
					DsgMst.DmCtg design_category,
					Fgd.FdDmSz size,
					OrdDsg.OdKt karat,
					OrdDsg.OdDmCol color,
					Fgd.FdQty quantity,
					Fgd.FdGrWt gross_wt,
					Fgd.FdGrWt gross_wt,
					CONCAT(Fgd.FdPrdOdTc, '/', Fgd.FdPrdOdYy, '/', Fgd.FdPrdOdChr, '/', Fgd.FdPrdOdNo, '/', Fgd.FdPrdOdSr) order_design_sr_no,
					CONCAT(Fgd.FdTc, '/', Fgd.FdYy, '/', Fgd.FdChr, '/', Fgd.FdNo, '/', Fgd.FdSr) trans_sr_no,
	            	Fgd.ModUsr mod_user,
	            	Fgd.ModDt mod_date,
	            	Fgd.ModTime mod_time
				FROM Fgd
				JOIN Fg On Fg.FgIdNo = Fgd.FdFgIdNo 
				JOIN Bag On Bag.BIdNo = Fgd.FdBIdNo 
				JOIN OrdDsg On OrdDsg.OdIdNo = Bag.BOdIdNo
				JOIN DsgMst On DsgMst.DmIdNo = OrdDsg.OdDmIdNo
				JOIN OrdMst On OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				WHERE  	Bag.BCls = 'N' AND Bag.BQty > 0
						{conditions}
				ORDER BY OdIdNo DESC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


