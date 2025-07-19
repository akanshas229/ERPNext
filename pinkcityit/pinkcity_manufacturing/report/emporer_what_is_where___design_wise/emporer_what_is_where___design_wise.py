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
		{"fieldname":"order_po_no", "fieldtype":"Data", "label":"Order PO No.", "width":140},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":140},
		{"fieldname":"company_code", "fieldtype":"Data", "label":"Company Code",  "width":140},
		{"fieldname":"customer_code", "fieldtype":"Data", "label":"Customer Code",  "width":150},
		{"fieldname":"customer", "fieldtype":"Data", "label":"Customer", "width":180},
		{"fieldname":"order_date", "fieldtype":"Date", "label":"Order Date", "width":120},
		{"fieldname":"export_date", "fieldtype":"Date", "label":"Export Date", "width":120},
		{"fieldname":"order_design_id", "fieldtype":"Data", "label":"Order Design ID", "width":120},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":140},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat", "width":120},
		{"fieldname":"size", "fieldtype":"Data", "label":"Size", "width":120},
		{"fieldname":"prod_seq", "fieldtype":"Data", "label":"Production Sequnence", "width":170},
		{"fieldname":"order_design_qty", "fieldtype":"Data", "label":"Order Design Qty", "width":150},
		{"fieldname":"ppln", "fieldtype":"Data", "label":"PPLN", "width":100},
		{"fieldname":"inv", "fieldtype":"Data", "label":"Inventory", "width":120},
		{"fieldname":"pwax", "fieldtype":"Data", "label":"PWAX", "width":100},
		{"fieldname":"pwxt", "fieldtype":"Data", "label":"PWXT", "width":100},
		{"fieldname":"pbom", "fieldtype":"Data", "label":"PBOM", "width":100},
		{"fieldname":"pmod", "fieldtype":"Data", "label":"PMOD", "width":100},
		{"fieldname":"pmst", "fieldtype":"Data", "label":"PMST", "width":100},
		{"fieldname":"pefom", "fieldtype":"Data", "label":"PEFOM", "width":100},
		{"fieldname":"pset", "fieldtype":"Data", "label":"PSET", "width":100},
		{"fieldname":"dy", "fieldtype":"Data", "label":"DY", "width":100},
		{"fieldname":"pfqc", "fieldtype":"Data", "label":"PFQC", "width":100},
		{"fieldname":"pfg", "fieldtype":"Data", "label":"PFG", "width":100},
		{"fieldname":"other", "fieldtype":"Data", "label":"Prod WIP", "width":100},
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
		conditions += f" AND OrdMst.OmCoCd =  '{company_code}'"

	if filters.get("date_from"):
		conditions += " AND OrdMst.OmDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND OrdMst.OmDt <=  '" +filters.get("date_to")+ "'"

	if filters.get("design_code"):
		conditions += " AND OrdDsg.OdDmCd LIKE '%"+filters.get("design_code")+"%' " 

	if filters.get("order_no"):
		conditions += " AND CONCAT(OrdMst.OmTc, '/', OrdMst.OmYy, '/', OrdMst.OmChr, '/', OrdMst.OmNo) LIKE '%"+filters.get("order_no")+"%' " 

	if filters.get("customer_code"):
		conditions += " AND OrdMst.OmCmCd LIKE '%" +filters.get("customer_code")+ "%'"


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	query = f"""SELECT 
					OmPoNo order_po_no,
					CONCAT(OrdMst.OmTc, '/', OrdMst.OmYy, '/', OrdMst.OmChr, '/', OrdMst.OmNo) order_no,
					OmCoCd company_code,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
					OmCmCd customer_code,
					OmDt order_date,
					OmExpDelDt export_date,
					OdIdNo order_design_id,
					OdDmCd design_code,
					OdKt karat,
					OdDmSz size,
					OdPrdSeq prod_seq,
					OdOrdQty order_design_qty,
					(OdPrdQty - OdExpQty) as bal_qty,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PPLN' ) ppln,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc IN ('PSTN', 'PINV', 'PDIA') ) inv,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PWAX' ) pwax,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PWXT' ) pwxt,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PBOM' ) pbom,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PMOD' ) pmod,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PMST' ) pmst,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PEFOM' ) pefom,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PSET' ) pset,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'GCL2' ) dy,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PFQC') pfqc,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and Bag.BLoc  = 'PFG') pfg,
					(SELECT SUm(Bag.BQty) FROM Bag WHERE BOdIdNo = OdIdNo and BCls = 'N' and 
							Bag.BLoc NOT IN 
							('PPLN', 'PSTN', 'PINV', 'PDIA', 'PWAX', 'PWXT', 'PBOM', 'PMOD', 'PMST', 'PEFOM', 'PSET', 'GCL2', 'PFQC', 'PFG')
								      ) other
				FROM OrdDsg
				JOIN OrdMst ON OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				WHERE  (OdPrdQty - OdExpQty) > 0   {conditions}
				ORDER BY export_date DESC
					"""

	# IF ( OrdMst.OmCoCd == 'PJ2',
	# 						Bag.BLoc NOT IN 
	# 						('PPLN', 'PSTN', 'PINV', 'PDIA', 'PWAX', 'PWXT', 'PBOM', 'PMOD', 'PMST', 'PEFOM', 'PSET', 'GCL2', 'PFQC', 'PFG'),
	# 						Bag.BLoc NOT IN 
	# 						('PPLN', 'PSTN', 'PINV', 'PDIA', 'PWAX', 'PWXT', 'PBOM', 'PMOD', 'PMST', 'PEFOM', 'PSET', 'PFQC', 'PFG') )
	
	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


