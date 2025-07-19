# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe import _



def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	for row in data : 
		# frappe.msgprint(str(row))
		row['total_stone_wt'] = float(float(row.get('bag_qty', 0) or 0) *  float(row.get('stone_wt', 0) or 0) )
		row['total_dia_wt'] = float(float(row.get('bag_qty', 0) or 0) *  float(row.get('dia_wt', 0) or 0) )
		row['total_other_wt'] = float(float(row.get('bag_qty', 0) or 0) *  float(row.get('other_wt', 0) or 0) )
		# row.stone_wt = float( row.get('bag_qty', 0) *  row.get('stone_wt', 0) )
		# row.other_wt = float( row.get('bag_qty', 0) *  row.get('other_wt', 0) )

	return columns, data


def get_columns():
	return [

		{"fieldname":"name", "fieldtype":"Int", "label":"Voucher ID",  "width":120},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":130},
		{"fieldname":"voucher_no", "fieldtype":"Data", "label":"Voucher No", "width":150},
		{"fieldname":"voucher_date", "fieldtype":"Date", "label":"Voucher Date",  "width":120},
		{"fieldname":"company", "fieldtype":"Data", "label":"Company", "width":100},
		{"fieldname":"from_location", "fieldtype":"Data", "label":"From Location",  "width":130},
		{"fieldname":"to_location", "fieldtype":"Data", "label":"To Location", "width":130},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":150},
		{"fieldname":"order_date", "fieldtype":"Data", "label":"Order Date", "width":120},
		{"fieldname":"customer", "fieldtype":"Data", "label":"Customer", "width":220},
		{"fieldname":"customer_code", "fieldtype":"Data", "label":"Customer Code", "width":130},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":140},
		{"fieldname":"bag_open_location", "fieldtype":"Data", "label":"Bag Open Location", "width":150},
		{"fieldname":"bag_location", "fieldtype":"Data", "label":"Bag Location", "width":120},
		{"fieldname":"bag_open_date", "fieldtype":"Date", "label":"Bag Open Date", "width":120},
		{"fieldname":"bag_qty", "fieldtype":"Float", "label":"Bag Qty", "width":100},
		{"fieldname":"gross_wt", "fieldtype":"Float", "label":"Gross Wt", "width":100},
		# {"fieldname":"stone_wt", "fieldtype":"Float", "label":"Stone Wt", "width":100},
		# {"fieldname":"dia_wt", "fieldtype":"Float", "label":"Diamond Wt", "width":100},
		# {"fieldname":"other_wt", "fieldtype":"Float", "label":"Other Wt", "width":100},
		{"fieldname":"total_stone_wt", "fieldtype":"Float", "label":"Stone Wt", "width":100},
		{"fieldname":"total_dia_wt", "fieldtype":"Float", "label":"Diamond Wt", "width":120},
		{"fieldname":"total_other_wt", "fieldtype":"Float", "label":"Other Wt", "width":100},
		{"fieldname":"fg_id", "fieldtype":"Data", "label":"FG ID No", "width":120},
		{"fieldname":"fg_voucher_no", "fieldtype":"Data", "label":"FG Voucher No", "width":150},
		{"fieldname":"fg_date", "fieldtype":"Date", "label":"FG Date",  "width":120},
		{"fieldname":"fg_qty", "fieldtype":"Float", "label":"FG Qty", "width":120},
		{"fieldname":"fg_gross_wt", "fieldtype":"Float", "label":"FG Gross Wt", "width":120},
		{"fieldname":"fg_stone_wt", "fieldtype":"Float", "label":"FG Stone Wt", "width":120},
		{"fieldname":"fg_dia_wt", "fieldtype":"Float", "label":"FG Diamond Wt", "width":130},
		{"fieldname":"fg_other_wt", "fieldtype":"Float", "label":"FG Other Wt", "width":120},
	]


def get_data(filters):
	# conditions = get_conditions(filters)

	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	company_code = "PC"

	# cursor = conn.cursor()

	conditions = ""

	if filters.get("company"):
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" :
			server = '192.168.5.88'
			company_code = "PJ"
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2" :
			server = '192.168.5.88'
			company_code = "PJ2"
		if filters.get("company") == "Pinkcity Jewelhouse Private Ltd-Mahapura" :
			server = '192.168.2.5'
			company_code = "PC"
		conditions += f" AND Txn.TCoCd =  '{company_code}' "


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	
	if filters.get("bag_no"):
		conditions += " AND CONCAT(BYy, '/', BChr, '/', BNo) LIKE '%"+filters.get("bag_no")+"%' " 
	if filters.get("order_no"):
		conditions += " AND CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) LIKE '%"+filters.get("order_no")+"%' " 
	if filters.get("from_location"):
		conditions += " AND Txnd.TdFrBLoc = '" +filters.get("from_location")+ "' "
	if filters.get("customer_code"):
		conditions += " AND OrdMst.OmCmCd '" +filters.get("customer_code")+ "' "
	# if filters.get("company"):
	# 	conditions += " AND Txn.TCoCd =  '" +filters.get("company")+ "' "
	if filters.get("voucher_date_from"):
		conditions += " AND Txn.TDt >=  '" +filters.get("voucher_date_from")+ "' "
	if filters.get("voucher_date_to"):
		conditions += " AND Txn.TDt <=  '" +filters.get("voucher_date_to")+ "' "
	if filters.get("fg_voucher_date_from"):
		conditions += " AND Fg.FgDt >=  '" +filters.get("fg_voucher_date_from")+ "' "
	if filters.get("fg_voucher_date_to"):
		conditions += " AND Fg.FgDt <=  '" +filters.get("fg_voucher_date_to")+ "' "
	query = f"""SELECT 
					Txnd.TdIdNo name,
					CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo)  bag_no,
					CONCAT(TTc, '/', TYy, '/', TChr, '/', TNo) voucher_no,
					CAST(Txn.TDt AS DATE) voucher_date,
					Txn.TCoCd company,
					Txnd.TdFrBLoc from_location,
					Txnd.TdToBLoc to_location,
					CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BOdChr, '/', Bag.BOdNo)  order_no,
					CAST(OrdMst.OmDt AS DATE) order_date,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
					OrdMst.OmCmCd customer_code,
					Bag.BOdDmCd design_code,
					Bag.BOpnLoc bag_open_location,
					Bag.BLoc bag_location,
					CAST(Bag.BOpnDt AS DATE) bag_open_date,
					Bag.BQty bag_qty,
					Bag.BGrWt gross_wt,
					( SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrdRm.OrRmCtg = 'C') stone_wt,
					( SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrdRm.OrRmCtg = 'D') dia_wt,
					( SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrdRm.OrRmCtg NOT IN ('C', 'D') ) other_wt,
					Fgd.FdIdNo fg_id,
					CONCAT(Fgd.FdTc, '/', Fgd.FdYy, '/', Fgd.FdChr, '/', Fgd.FdNo) fg_voucher_no,
					CAST(Fg.FgDt AS DATE) fg_date,
					Fgd.FdQty fg_qty,
					Fgd.FdGrWt fg_gross_wt,
					( SELECT SUM(FgRm.FrRmWt) FROM FgRm WHERE FgRm.FrFdIdNo = Fgd.FdIdNo AND FgRm.FrRmCtg = 'C') fg_stone_wt,
					( SELECT SUM(FgRm.FrRmWt) FROM FgRm WHERE FgRm.FrFdIdNo = Fgd.FdIdNo AND FgRm.FrRmCtg = 'D') fg_dia_wt,
					( SELECT SUM(FgRm.FrRmWt) FROM FgRm WHERE FgRm.FrFdIdNo = Fgd.FdIdNo AND FgRm.FrRmCtg NOT IN ('C', 'D') ) fg_other_wt
				FROM Txnd 
				JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
				JOIN Bag ON Bag.BIdNo = TdBIdNo
				JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
				LEFT JOIN Fgd ON Fgd.FdBIdNo = Bag.BIdNo
				LEFT JOIN Fg ON Fg.FgIdNo = Fgd.FdFgIdNo 
				WHERE 
					Txn.TTc = 'BV' 
					AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
					{conditions}
					ORDER BY name DESC
				"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


# def get_conditions(filters):
	


# 	return conditions

