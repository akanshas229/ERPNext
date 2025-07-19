# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe import _



def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	# updated_data = []
	# i=0
	# temp_data = {}
	# for row in data:
	# 	if int(row.get("voucher_sr_no", 0) or 0) > 0:
	# 		temp_data = row
	# 		temp_data['bag_qty'] = data[i-1]['bag_qty']
	# 		temp_data['gross_wt'] = data[i-1]['gross_wt']
	# 		updated_data.append(temp_data)
	# 	i += 1

	# return columns, updated_data

	for row in data:
		if int(row.get("TpSrNo", 0) or 0) == 1:
			pass
		else :
			row['bag_qty'] = ""
			row['gross_wt'] = ""


	return columns, data


def get_columns():
	return [
		{"fieldname":"name", "fieldtype":"Int", "label":"Voucher ID",  "width":140},
		{"fieldname":"company", "fieldtype":"Data", "label":"Company", "width":100},
		{"fieldname":"from_location", "fieldtype":"Data", "label":"From Location", "width":120},
		{"fieldname":"design_category", "fieldtype":"Data", "label":"Design Category", "width":140},
		{"fieldname":"design_code", "fieldtype":"Data", "label":"Design Code",  "width":140},
		{"fieldname":"karat", "fieldtype":"Data", "label":"Karat", "width":100},
		{"fieldname":"rm_ctg", "fieldtype":"Data", "label":"RM Category",  "width":110},
		{"fieldname":"rm_s_ctg", "fieldtype":"Data", "label":"RM Sub Category", "width":135},
		# {"fieldname":"rm_code", "fieldtype":"Data", "label":"Raw Material Code", "width":150},
		{"fieldname":"voucher_date", "fieldtype":"Date", "label":"Voucher Date", "width":130},
		{"fieldname":"voucher_no", "fieldtype":"Data", "label":"Voucher No", "width":180},
		{"fieldname":"setting_type", "fieldtype":"Data", "label":"Setting Type", "width":120},
		{"fieldname":"bag_qty", "fieldtype":"Float", "label":"Bag Qty", "width":120},
		{"fieldname":"gross_wt", "fieldtype":"Float", "label":"Gross Wt", "width":110},
		{"fieldname":"rm_qty", "fieldtype":"Float", "label":"RM Quantity", "width":120},
		{"fieldname":"points", "fieldtype":"Float", "label":"Points", "width":100},
		{"fieldname":"rs_value", "fieldtype":"Float", "label":"RS Value", "width":110},
		{"fieldname":"bag_no", "fieldtype":"Data", "label":"Bag No", "width":130},
		{"fieldname":"order_no", "fieldtype":"Data", "label":"Order No", "width":140},
		{"fieldname":"emp_code", "fieldtype":"Data", "label":"Employee Code", "width":120},
		{"fieldname":"emp_name", "fieldtype":"Data", "label":"Employee Name", "width":150},
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
		# conditions += f" AND Txn.TCoCd =  '{company_code}'"
		conditions += f" AND TxndPrd.TpCoCd =  '{company_code}'"

	if filters.get("date_from"):
		conditions += " AND Txn.TDt >=  '" +filters.get("date_from")+ "'"
		# conditions += " AND TxndPrd.ModDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND Txn.TDt <=  '" +filters.get("date_to")+ "'"
		# conditions += " AND TxndPrd.ModDt <=  '" +filters.get("date_to")+ "'"

	if filters.get("voucher_no"):
		conditions += " AND CONCAT(Txnd.TdTc, '/', Txnd.TdYy, '/', Txnd.TdChr, '/', Txnd.TdNo) LIKE '%"+filters.get("voucher_no")+"%' " 

	if filters.get("voucher_type"):
		# conditions += " AND Txnd.TdChr =  '" +filters.get("voucher_type")+ "'"
		# conditions += " AND Txn.TFrBLoc =  '" +filters.get("voucher_type")+ "'"
		# conditions += " AND Txn.TChr =  '" +filters.get("voucher_type")+ "'"
		conditions += " AND TxndPrd.TpChr =  '" +filters.get("voucher_type")+ "'"



	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	                # SUM(TreeDet.TrdBagPcs) total_bag_pc,
	                # SUM(TreeDet.TrdDcWt) totol_dia_stone_wt,

	
	# query = f"""SELECT   
	# 				Txnd.TdSrNo voucher_sr_no,
	# 				Txnd.TdIdNo name,
	# 				Txn.TCoCd company,
	# 				Txn.TFrBLoc from_location,
	# 				DsgMst.DmCtg design_category,
	# 				Bag.BOdDmCd design_code,
	# 				OrdDsg.OdKt karat,
	# 				Txnd.TdRmCtg rm_ctg,
	# 				Txnd.TdRmSCtg rm_s_ctg,
	# 				Txnd.TdRmCd rm_code,
	#             	CAST(Txn.TDt AS DATE) voucher_date,
	#             	CONCAT(Txnd.TdTc, '/', Txnd.TdYy, '/', Txnd.TdChr, '/', Txnd.TdNo, '/', Txnd.TdSr, '/', Txnd.TdSrNo) voucher_no,
	#             	( SELECT TOP 1 OrdRm.OrSetScd FROM OrdRm WHERE OrdRm.OrOdIdNo = OrdDsg.OdIdNo AND Txnd.TdRmCd = OrdRm.OrRmCd  )  setting_type,
	#             	Txnd.TdBQty bag_qty,
	#             	Txnd.TdBGrWt gross_wt,
	#             	Txnd.TdRmQty rm_qty,
	#             	Txnd.TdPtQty points,
	#             	'**' rs_value,
	# 				CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo) bag_no,
	# 				CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BODChr, '/', Bag.BODNo) order_no,
	# 				Txnd.TdByWrk emp_code,
	# 				( SELECT TOP 1 vParam.vPDesc FROM vParam WHERE vParam.vPMCd = Txnd.TdByWrk AND vParam.vPCoCd = Txn.TCoCd  ) emp_name,
	#             	Txnd.ModUsr mod_user,
	# 				CAST(Txnd.ModDt AS DATE) mod_date,
	#             	Txnd.ModTime mod_time
	# 			FROM Txnd 
	# 			JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
	# 			JOIN Bag ON Bag.BIdNo = Txnd.TdBIdNo 
	# 			JOIN OrdDsg ON Bag.BOdIdNo = OrdDsg.OdIdNo 
	# 			JOIN DsgMst ON DsgMst.DmIdNo = Bag.BDmIdNo 
	# 			WHERE  Txnd.TdTc = 'DT'
	# 				{conditions}
	# 			ORDER BY TdByWrk ASC, Txn.TDt ASC, bag_no ASC
	# 				"""
	

					# Txnd.TdRmCd rm_code,
	
	query = f"""SELECT  
					TxndPrd.TpSrNo, 
					TxndPrd.TpIdNo name,
					Txn.TCoCd company,
					Txn.TFrBLoc from_location,
					DsgMst.DmCtg design_category,
					Bag.BOdDmCd design_code,
					OrdDsg.OdKt karat,
					TxndPrd.TpRmCtg rm_ctg,
					TxndPrd.TpRmSCtg rm_s_ctg,
	            	CAST(Txn.TDt AS DATE) voucher_date,
	            	CONCAT(TxndPrd.TpTc, '/', TxndPrd.TpYy, '/', TxndPrd.TpChr, '/', TxndPrd.TpNo, '/', TxndPrd.TpSr, '/', TxndPrd.TpSrNo) voucher_no,
	            	TxndPrd.TpSetTyp  setting_type,
	            	TxndPrd.TpBQty bag_qty,
	            	Txnd.TdBGrWt gross_wt,
	            	TxndPrd.TpRmQty rm_qty,
	            	TxndPrd.TpPts points,
	            	'' rs_value,
					CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo) bag_no,
					CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BODChr, '/', Bag.BODNo) order_no,
					TxndPrd.TpByWrk emp_code,
					( SELECT TOP 1 vParam.vPDesc FROM vParam WHERE vParam.vPMCd = TxndPrd.TpByWrk AND vParam.vPCoCd = TxndPrd.TpCoCd  ) emp_name,
	            	TxndPrd.ModUsr mod_user,
					CAST(TxndPrd.ModDt AS DATE) mod_date,
	            	TxndPrd.ModTime mod_time
				FROM TxndPrd
				JOIN Txnd ON Txnd.TdIdNo = TxndPrd.TpTdIdNo 
				JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
				LEFT JOIN Bag ON Bag.BIdNo = Txnd.TdBIdNo 
				LEFT JOIN OrdDsg ON Bag.BOdIdNo = OrdDsg.OdIdNo 
				LEFT JOIN DsgMst ON DsgMst.DmIdNo = Bag.BDmIdNo 
				WHERE  Txn.TTc = 'DT' AND TxndPrd.TpSrNo >= 1
					{conditions}
				ORDER BY TdByWrk ASC, Txn.TDt ASC, voucher_no ASC
					"""
	

	# query = f"""SELECT   
	# 				TxndPrd.TpIdNo name,
	# 				TxndPrd.TpRmCtg rm_ctg,
	# 				TxndPrd.TpRmSCtg rm_s_ctg,
	#             	CONCAT(Txnd.TdTc, '/', Txnd.TdYy, '/', Txnd.TdChr, '/', Txnd.TdNo, '/', Txnd.TdSr, '/', Txnd.TdSrNo) voucher_no,
	#             	TxndPrd.TpSetTyp  setting_type,
	#             	TxndPrd.TpBQty bag_qty,
	#             	Txnd.TdBGrWt gross_wt,
	#             	TxndPrd.TpRmQty rm_qty,
	#             	TxndPrd.TpPts points,
	#             	'**' rs_value,
	# 				TxndPrd.TpByWrk emp_code,
	# 				( SELECT TOP 1 vParam.vPDesc FROM vParam WHERE vParam.vPMCd = TxndPrd.TpByWrk AND vParam.vPCoCd = TxndPrd.TpCoCd  ) emp_name,
	#             	TxndPrd.ModUsr mod_user,
	# 				CAST(TxndPrd.ModDt AS DATE) mod_date,
	#             	TxndPrd.ModTime mod_time
	# 			FROM TxndPrd
	# 			LEFT JOIN Txnd ON Txnd.TdIdNo = TxndPrd.TpTdIdNo 
	# 			LEFT JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
	# 			WHERE  TxndPrd.TpTc = 'DT' 
	# 				{conditions}
	# 			ORDER BY TdByWrk ASC
	# 				"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	conn.close()
	return all_row
	


