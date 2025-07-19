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
		{"fieldname":"voucher_no", "fieldtype":"Data", "label":"Voucher No",  "width":140},
		{"fieldname":"voucher_date", "fieldtype":"Date", "label":"Voucher Date",  "width":120},
		{"fieldname":"company", "fieldtype":"Data", "label":"Company",  "width":100},
		{"fieldname":"supplier_code", "fieldtype":"Data", "label":"Supplier Code", "width":120},
		{"fieldname":"supplier_name", "fieldtype":"Data", "label":"Supplier Name", "width":200},
		{"fieldname":"bill_no", "fieldtype":"Data", "label":"Bill No", "width":150},
		{"fieldname":"bill_date", "fieldtype":"Date", "label":"Bill Date", "width":120},
		{"fieldname":"lot_no", "fieldtype":"Data", "label":"Lot No", "width":120},
		{"fieldname":"rm_code", "fieldtype":"Data", "label":"Rm Code", "width":140},
		{"fieldname":"rm_code_description", "fieldtype":"Data", "label":"Rm Code Description",  "width":240},
		{"fieldname":"rm_qty", "fieldtype":"Float", "label":"Rm Qty", "width":120},
		{"fieldname":"rm_weight", "fieldtype":"Float", "label":"Rm Weight", "width":120},
		{"fieldname":"purchase_rate", "fieldtype":"Currency", "label":"Purchase Rate", "width":130},
		{"fieldname":"purchase_amount", "fieldtype":"Currency", "label":"Purchase Amount", "width":140},
		{"fieldname":"size", "fieldtype":"Data", "label":"Size", "width":80},
		{"fieldname":"stock_rate", "fieldtype":"Currency", "label":"Stock Rate", "width":120},
		{"fieldname":"mod_user", "fieldtype":"Data", "label":"User (Modified)", "width":130},
		{"fieldname":"mod_date", "fieldtype":"Date", "label":"Date (Modified)", "width":130},
		{"fieldname":"mod_time", "fieldtype":"Time", "label":"Time (Modified)", "width":130},
	]


def get_data(filters):
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	company_code = "PC"

	# conditions = ""
	# start = int(args.get("start")) or 0
	# page_length = int(args.get("page_length")) or 20

	# order_by = args.get("order_by", 'name desc')
	# order_by = order_by.replace('`tabStone Price Request History`.', '')
	# order_by = order_by.replace('`', '')

	conditions = ""

	if filters.get("company"):
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1" :
			server = '192.168.5.88'
			company_code = "PJ"
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2" :
			server = '192.168.5.88'
			company_code = "PJ2"
		conditions += f" AND Txn.TCoCd =  '{company_code}'"

	if filters.get("date_from"):
		conditions += " AND Txn.TDt >=  '" +filters.get("date_from")+ "'"

	if filters.get("date_to"):
		conditions += " AND Txn.TDt <=  '" +filters.get("date_to")+ "'"

	
	if filters.get("rm_code"):
		conditions += f" AND Txnd.TdRmCd LIKE '%" +filters.get("rm_code")+ "%'"
	if filters.get("supplier_code"):
		conditions += f" AND Txn.TSuppCd LIKE '%" +filters.get("supplier_code")+ "%'"


	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	query = f"""SELECT 
						Txnd.TdIdNo name, 
						CONCAT(Txn.TTc, '/', Txn.TYy, '/', Txn.TChr, '/', Txn.TNo) voucher_no,
						Txn.TDt voucher_date,
						Txn.TCoCd company,
						Txn.TSuppCd supplier_code,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = Txn.TSuppCd) supplier_name, 
						Txn.TBillNo bill_no, 
						Txn.TBillDt bill_date,
						Txnd.TdLotNo lot_no,
						Txnd.TdRmCd rm_code,
						( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = Txnd.TdRmCd) rm_code_description, 
						Txnd.TdRmQty rm_qty,
						Txnd.TdRmWt rm_weight,
						Txnd.TdPurRt purchase_rate,
						Txnd.TdPurAmt purchase_amount,
						Txnd.TdRmSz size,
						Txnd.TdRmStkRt stock_rate,
						Txnd.ModUsr mod_user,
						Txnd.ModDt mod_date,
						Txnd.ModTime mod_time
					FROM Txnd 
					JOIN Txn  ON Txn.TIdNo = Txnd.TdTIdNo 
					WHERE Txn.TTc = 'PR' 
							{conditions}
					ORDER BY name DESC
					"""
					# {conditions}
					# Txn.TTc = 'PR'
	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row	
	


