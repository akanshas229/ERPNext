# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe,pymssql
from frappe.model.document import Document
from frappe.utils import (
	cint
)

class StonePriceRequestHistory(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		server = '192.168.2.5'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						Txnd.TdIdNo name, 
						CONCAT(TTc, '/', TYy, '/', TChr, '/', TNo) voucher_no,
						Txn.TBillNo bill_no, 
						Txn.TBillDt bill_date,
						Txn.TSuppCd supplier_code,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = Txn.TSuppCd) supplier_name, 
						Txnd.TdLotNo lot_no,
						Txn.TCoCd company,
						Txnd.TdRmCd rm_code,
						( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = Txnd.TdRmCd) rm_code_description, 
						Txnd.TdRmSz size,
						Txnd.TdRmStkRt stock_rate,
						Txnd.TdRmQty rm_qty,
						Txnd.TdRmWt rm_weight,
						Txnd.TdPurRt purchase_rate,
						Txnd.TdPurAmt purchase_amount,
						Txnd.ModDt creation,
						Txnd.ModDt modified
					FROM Txnd 
					JOIN Txn  ON Txn.TIdNo = Txnd.TdTIdNo 
					WHERE Txn.TTc = 'PR'
						AND Txnd.TdIdNo = {self.name}
					"""
				
		cursor.execute(query)
		row = cursor.fetchone()

		super(Document, self).__init__(row)

		# pass

	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		server = '192.168.2.5'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		start = int(args.get("start")) or 0
		page_length = int(args.get("page_length")) or 20

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabStone Price Request History`.', '')
		order_by = order_by.replace('`', '')

		filters = args.get("filters", [])
		where_query = ""
		# i = 0
		for filter in filters :
			# if i > 0 :
			# 	where_query = where_query + " AND "
			if filter[1]=='bill_no':
				where_query = where_query + " AND Txn.TBillNo " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='supplier_code':
				where_query = where_query + " AND Txn.TSuppCd " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			# if filter[1]=='supplier_name':
			# 	where_query = where_query + " AND OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
			# 	i = i + 1
			if filter[1]=='rm_code':
				where_query = where_query + " AND  Txnd.TdRmCd " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1

		query = f"""SELECT 
						Txnd.TdIdNo name, 
						CONCAT(TTc, '/', TYy, '/', TChr, '/', TNo) voucher_no,
						Txn.TBillNo bill_no, 
						Txn.TBillDt bill_date,
						Txn.TSuppCd supplier_code,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = Txn.TSuppCd) supplier_name, 
						Txnd.TdLotNo lot_no,
						Txn.TCoCd company,
						Txnd.TdRmCd rm_code,
						( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = Txnd.TdRmCd) rm_code_description, 
						Txnd.TdRmSz size,
						Txnd.TdRmStkRt stock_rate,
						Txnd.TdRmQty rm_qty,
						Txnd.TdRmWt rm_weight,
						Txnd.TdPurRt purchase_rate,
						Txnd.TdPurAmt purchase_amount,
						Txnd.ModDt creation,
						Txnd.ModDt modified
					FROM Txnd 
					JOIN Txn  ON Txn.TIdNo = Txnd.TdTIdNo 
					WHERE Txn.TTc = 'PR'
					"""
		
		
		if where_query :
			query = query + " " + where_query

		query = query + f""" 
					ORDER BY {order_by}
					OFFSET {start} ROWS
					FETCH NEXT {page_length} ROWS ONLY """
		
		cursor.execute(query)
		all_row = cursor.fetchall()
		return all_row

		# pass

	@staticmethod
	def get_count(args):
		server = '192.168.2.5'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		total_no = 0 
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		filters = args.get("filters", [])
		where_query = ""
		# i = 0
		for filter in filters :
			# if i > 0 :
			# 	where_query = where_query + " AND "
			if filter[1]=='bill_no':
				where_query = where_query + " AND Txn.TBillNo " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='supplier_code':
				where_query = where_query + " AND Txn.TSuppCd " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			# if filter[1]=='supplier_name':
			# 	where_query = where_query + " OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
			# 	i = i + 1
			if filter[1]=='rm_code':
				where_query = where_query + " AND Txnd.TdRmCd " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1

		query = f"""SELECT 
                        COUNT(Txnd.TdIdNo) total_no
                    FROM Txnd 
					JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
					WHERE Txn.TTc = 'PR'
					"""
		
		if where_query :
			query = query + " " + where_query

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no

		# pass

	@staticmethod
	def get_stats(args):
		pass
