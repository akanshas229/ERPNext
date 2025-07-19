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
		{"fieldname":"company", "fieldtype":"Data", "label":"Company", "width":100},
		{"fieldname":"tree_no", "fieldtype":"Data", "label":"Tree No.", "width":140},
		{"fieldname":"tree_date", "fieldtype":"Date", "label":"Tree Date", "width":120},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat",  "width":100},
		{"fieldname":"color", "fieldtype":"Data", "label":"Color", "width":100},
		{"fieldname":"gross_wt", "fieldtype":"Float", "label":"Gross Wax Wt",  "width":150},
		{"fieldname":"net_metal_wt", "fieldtype":"Float", "label":"Net Metal Wt", "width":150},
		{"fieldname":"add_metal_wt", "fieldtype":"Float", "label":"Added Metal Wt", "width":150},
		{"fieldname":"total_bag_pc", "fieldtype":"Float", "label":"Total Bag Pcs", "width":120},
		{"fieldname":"totol_dia_stone_wt", "fieldtype":"Float", "label":"Total Diamond / Stone Wt", "width":190},
		# {"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":120},
		# {"fieldname":"bag_pcs", "fieldtype":"Float", "label":"Bag Pcs", "width":100},
		# {"fieldname":"dia_stone_wt", "fieldtype":"Float", "label":"Diamond / Stone Wt", "width":160},
		# {"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":150},
		# {"fieldname":"order_design_id", "fieldtype":"Int", "label":"Order Design ID", "width":140},
		# {"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code", "width":140},
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

	# if filters.get("design_code"):
	# 	conditions += " AND Bag.BOdDmCd LIKE '%"+filters.get("design_code")+"%' " 

	if filters.get("tree_no"):
		conditions += " AND CONCAT(TreeMst.TrYmd, '/', TreeMst.TrChr, '/', TreeMst.TrNo) LIKE '%"+filters.get("order_no")+"%' " 

	# if filters.get("bag_no"):
	# 	conditions += " AND CONCAT(TreeDet.TrdBYy, '/', TreeDet.TrdBChr, '/', TreeDet.TrdBNo) LIKE '%" +filters.get("bag_no")+ "%'"


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	                # SUM(TreeDet.TrdBagPcs) total_bag_pc,
	                # SUM(TreeDet.TrdDcWt) totol_dia_stone_wt,

	query = f"""SELECT    
					TreeMst.TrCoCd company,
	            	CONCAT(TreeMst.TrYmd, '/', TreeMst.TrChr, '/', TreeMst.TrNo) tree_no,
	            	CAST(TreeMst.TrDt AS DATE) tree_date,
	            	TreeMst.TrRmCd karat,
	            	TreeMst.TrCol color,
	            	TreeMst.TrGrsWaxWt gross_wt,
	            	TreeMst.TrNetMetWt net_metal_wt,
	            	TreeMst.TrAddMetWt add_metal_wt,
					( SELECT SUM(TreeDet.TrdBagPcs) 
					  FROM TreeDet 
					  WHERE TreeDet.TrdCoCd = TreeMst.TrCoCd
						AND TreeDet.TrdYmd = TreeMst.TrYmd
						AND TreeDet.TrdChr = TreeMst.TrChr
						AND TreeDet.TrdNo = TreeMst.TrNo ) total_bag_pc,
					( SELECT SUM(td1.TrdDcWt) 
					  FROM TreeDet td1
					  WHERE td1.TrdCoCd = TreeMst.TrCoCd
						AND td1.TrdYmd = TreeMst.TrYmd
						AND td1.TrdChr = TreeMst.TrChr
						AND td1.TrdNo = TreeMst.TrNo ) totol_dia_stone_wt,
	            	TreeMst.ModUsr mod_user,
					CAST(TreeMst.ModDt AS DATE) mod_date,
	            	TreeMst.ModTime mod_time
				FROM TreeMst 
				WHERE  {conditions}
				ORDER BY tree_no DESC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


