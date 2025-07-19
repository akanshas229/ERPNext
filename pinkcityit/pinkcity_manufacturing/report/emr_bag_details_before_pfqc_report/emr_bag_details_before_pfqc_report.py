# Copyright (c) 2025, Pink city IT team and contributors
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
		_("Voucher ID") + ":Data:120",
		_("Bag No") + ":Data:120",
		_("Voucher No") + ":Data:200",
		_("Voucher Date") + ":Date:100",
		_("Company") + ":Data:80",
		_("From Location") + ":Data:120",
		_("To Location") + ":Data:120",
		_("Order No") + ":Data:120",
		_("Order Date") + ":Date:120",
		_("Customer") + ":Data:120",
		_("Customer Code") + ":Data:120",
		_("Design Code") + ":Data:120",
		_("Bag Open Location") + ":Data:120",
		_("Bag Location") + ":Data:120",
		_("Bag Open Date") + ":Date:120",
		_("Bag Qty") + ":Float:120",
		_("Gross Wt") + ":Float:120",
		_("Stone Wt") + ":Float:120",
		_("Other Wt") + ":Float:120",
		_("Bag Created Date") + "::120",
	]


def get_data(filters):
	conditions = get_conditions(filters)

	server = '192.168.5.88'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'

	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	# cursor = conn.cursor(as_dict=True)
	cursor = conn.cursor()

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
						( SELECT SUM(or2.OrWt) FROM OrdRm or2 WHERE or2.OrOdIdNo = Bag.BOdIdNo AND or2.OrRmCtg = 'C') stone_wt,
						( SELECT SUM(or2.OrWt) FROM OrdRm or2 WHERE or2.OrOdIdNo = Bag.BOdIdNo AND or2.OrRmCtg != 'C') other_wt,
						CAST(Bag.ModDt AS DATE) tran_date
					FROM Txnd 
					JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
					JOIN Bag ON Bag.BIdNo = TdBIdNo
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					WHERE 
						Txn.TTc = 'BV' 
						AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
						{conditions}
						ORDER BY name DESC
					"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row
	


def get_conditions(filters):
	conditions = ""

	if filters.get("bag_no"):
		conditions += " AND CONCAT(BYy, '/', BChr, '/', BNo) LIKE '%"+filters.get("bag_no")+"%' " 
	if filters.get("order_no"):
		conditions += " AND CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) LIKE '%"+filters.get("order_no")+"%' " 
	if filters.get("from_location"):
		conditions += " AND Txnd.TdFrBLoc = '" +filters.get("from_location")+ "'"
	if filters.get("customer_code"):
		conditions += " AND OrdMst.OmCmCd '" +filters.get("customer_code")+ "'"
	if filters.get("company"):
		conditions += " AND Txn.TCoCd =  '" +filters.get("company")+ "'"
	if filters.get("voucher_date_from"):
		conditions += " AND Txn.TDt >=  '" +filters.get("voucher_date_from")+ "'"
	if filters.get("voucher_date_to"):
		conditions += " AND Txn.TDt <=  '" +filters.get("voucher_date_to")+ "'"


	return conditions

