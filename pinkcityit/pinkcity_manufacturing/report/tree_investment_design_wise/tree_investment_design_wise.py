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
		# {"fieldname":"name", "fieldtype":"Int", "label":"Tree ID",  "width":140},
		{"fieldname":"tree_no", "fieldtype":"Data", "label":"Tree No.", "width":140},
		{"fieldname":"tree_date", "fieldtype":"Data", "label":"Tree Date", "width":120},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat",  "width":100},
		{"fieldname":"color", "fieldtype":"Data", "label":"Color", "width":100},
		{"fieldname":"gross_wt", "fieldtype":"Float", "label":"Gross Wax Wt",  "width":150},
		{"fieldname":"net_metal_wt", "fieldtype":"Float", "label":"Net Metal Wt", "width":150},
		{"fieldname":"add_metal_wt", "fieldtype":"Float", "label":"Added Metal Wt", "width":150},
		{"fieldname":"total_bag_pc", "fieldtype":"Float", "label":"Total Bag Pcs", "width":120},
		{"fieldname":"totol_dia_stone_wt", "fieldtype":"Float", "label":"Total Diamond / Stone Wt", "width":160},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":120},
		{"fieldname":"bag_pcs", "fieldtype":"Float", "label":"Bag Pcs", "width":100},
		{"fieldname":"dia_stone_wt", "fieldtype":"Float", "label":"Diamond / Stone Wt", "width":160},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":150},
		{"fieldname":"order_design_id", "fieldtype":"Int", "label":"Order Design ID", "width":140},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":140},
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
		conditions += f" TreeMst.TrCoCd =  '{company_code}'"

	if filters.get("date_from"):
		conditions += " AND TreeMst.TrDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND TreeMst.TrDt <=  '" +filters.get("date_to")+ "'"

	if filters.get("design_code"):
		conditions += " AND Bag.BOdDmCd LIKE '%"+filters.get("design_code")+"%' " 

	if filters.get("order_no"):
		conditions += " AND CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BOdChr, '/', Bag.BOdNo) LIKE '%"+filters.get("order_no")+"%' " 

	if filters.get("bag_no"):
		conditions += " AND CONCAT(TreeDet.TrdBYy, '/', TreeDet.TrdBChr, '/', TreeDet.TrdBNo) LIKE '%" +filters.get("bag_no")+ "%'"


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	                # SUM(TreeDet.TrdBagPcs) total_bag_pc,
	                # SUM(TreeDet.TrdDcWt) totol_dia_stone_wt,

	query = f"""SELECT    
	            	CONCAT(TreeMst.TrYmd, '/', TreeMst.TrChr, '/', TreeMst.TrNo) tree_no,
					CAST(TreeMst.TrDt AS DATE) tree_date,
	            	TreeMst.TrRmCd karat,
	            	TreeMst.TrCol color,
	            	TreeMst.TrGrsWaxWt gross_wt,
	            	TreeMst.TrNetMetWt net_metal_wt,
	            	TreeMst.TrAddMetWt add_metal_wt,
					( SELECT SUM(td1.TrdBagPcs) 
					  FROM TreeDet td1
					  WHERE td1.TrdCoCd = TreeDet.TrdCoCd
						AND td1.TrdYmd = TreeDet.TrdYmd
						AND td1.TrdChr = TreeDet.TrdChr
						AND td1.TrdNo = TreeDet.TrdNo ) total_bag_pc,
					( SELECT SUM(td1.TrdDcWt) 
					  FROM TreeDet td1
					  WHERE td1.TrdCoCd = TreeDet.TrdCoCd
						AND td1.TrdYmd = TreeDet.TrdYmd
						AND td1.TrdChr = TreeDet.TrdChr
						AND td1.TrdNo = TreeDet.TrdNo ) totol_dia_stone_wt,
	            	CONCAT(TreeDet.TrdBYy, '/', TreeDet.TrdBChr, '/', TreeDet.TrdBNo) bag_no,
	            	TreeDet.TrdBagPcs bag_pcs,
	            	TreeDet.TrdDcWt dia_stone_wt,
					CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BOdChr, '/', Bag.BOdNo) order_no,
	            	Bag.BOdIdNo order_design_id,
	            	Bag.BOdDmCd design_code,
	            	TreeDet.ModUsr mod_user,
					CAST(TreeDet.ModDt AS DATE) mod_date,
	            	TreeDet.ModTime mod_time
				FROM TreeDet 
				JOIN TreeMst ON TreeMst.TrCoCd = TreeDet.TrdCoCd
							 AND TreeMst.TrYmd = TreeDet.TrdYmd
							 AND TreeMst.TrChr = TreeDet.TrdChr
							 AND TreeMst.TrNo = TreeDet.TrdNo
				JOIN Bag ON Bag.BCoCd = TreeDet.TrdCoCd
						 AND Bag.BYy = TreeDet.TrdBYy
						 AND Bag.BChr = TreeDet.TrdBChr
						 AND Bag.BNo = TreeDet.TrdBNo
				WHERE  {conditions}
				ORDER BY tree_no DESC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


