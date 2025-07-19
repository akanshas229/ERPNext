# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe,pymssql
from frappe.model.document import Document
from frappe.utils import (
	cint
)


class EMRBagDetailsBeforePFQC(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		server = '192.168.5.88'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						Txnd.TdIdNo name,
                        CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo)  bag_no,
						CONCAT(TTc, '/', TYy, '/', TChr, '/', TNo) voucher_no,
						Txn.TDt voucher_date,
						Txn.TCoCd company,
						Txnd.TdFrBLoc from_location,
						Txnd.TdToBLoc to_location,
						Bag.BOdSr bag_order_sr_no,
                        CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BOdChr, '/', Bag.BOdNo)  order_no,
						OrdMst.OmDt order_date,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
						OrdMst.OmCmCd customer_code,
						Bag.BOpnLoc bag_open_location,
						Bag.BLoc bag_location,
						Bag.BOpnDt bag_open_date,
						Bag.BQty bag_qty,
						Bag.BGrWt gross_wt,
						Bag.ModDt creation,
						Bag.ModDt modified
					FROM Txnd 
					JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
					JOIN Bag ON Bag.BIdNo = TdBIdNo
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					WHERE 
						Txn.TTc = 'BV' 
						AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
						AND Txnd.TdIdNo = {self.name}
					"""
				
						# AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
				
		cursor.execute(query)
		row = cursor.fetchone()

		super(Document, self).__init__(row)


	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		server = '192.168.5.88'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		start = cint(args.get("start")) or 0
		page_length = cint(args.get("page_length")) or 20

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabEMR Bag  Details Before PFQC`.', '')
		order_by = order_by.replace('`', '')

		filters = args.get("filters", [])
		where_query = ""
		# i = 0
		for filter in filters :
			# if i > 0 :
			# 	where_query = where_query + " AND "
			if filter[1]=='bag_no':
				where_query = where_query + " AND CONCAT(BYy, '/', BChr, '/', BNo) " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='order_no':
				where_query = where_query + " AND CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='from_location':
				where_query = where_query + " AND Txnd.TdFrBLoc " + filter[2] + " '" + filter[3] + "'"
			if filter[1]=='customer_code':
				where_query = where_query + " AND OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
			if filter[1]=='company':
				where_query = where_query + " AND Txn.TCoCd =  '" + filter[3].replace('%', '') + "'"
			if filter[1]=='voucher_date_from':
				where_query = where_query + " AND Txn.TDt >=  '" + filter[3] + "'"
			if filter[1]=='voucher_date_to':
				where_query = where_query + " AND Txn.TDt <=  '" + filter[3] + "'"
				# i = i + 1
			# if filter[1]=='customer':
			# 	where_query = where_query + " CustMst.CmName " + filter[2] + " '" + filter[3] + "'"
			# 	i = i + 1

		query = f"""SELECT 
						Txnd.TdIdNo name,
                        CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo)  bag_no,
						CONCAT(TTc, '/', TYy, '/', TChr, '/', TNo) voucher_no,
						Txn.TDt voucher_date,
						Txn.TCoCd company,
						Txnd.TdFrBLoc from_location,
						Txnd.TdToBLoc to_location,
						Bag.BOdSr bag_order_sr_no,
                        CONCAT(Bag.BOdTc, '/', Bag.BOdYy, '/', Bag.BOdChr, '/', Bag.BOdNo)  order_no,
						OrdMst.OmDt order_date,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer,
						OrdMst.OmCmCd customer_code,
						Bag.BOpnLoc bag_open_location,
						Bag.BLoc bag_location,
						Bag.BOpnDt bag_open_date,
						Bag.BQty bag_qty,
						Bag.BGrWt gross_wt,
						Bag.ModDt creation,
						Bag.ModDt modified
					FROM Txnd 
					JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
					JOIN Bag ON Bag.BIdNo = TdBIdNo
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					WHERE 
						Txn.TTc = 'BV' 
						AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
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

	@staticmethod
	def get_count(args):
		server = '192.168.5.88'
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
			if filter[1]=='bag_no':
				where_query = where_query + " AND CONCAT(BYy, '/', BChr, '/', BNo) " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='order_no':
				where_query = where_query + " AND CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) " + filter[2] + " '" + filter[3] + "'"
				# i = i + 1
			if filter[1]=='from_location':
				where_query = where_query + " AND Txnd.TdFrBLoc " + filter[2] + " '" + filter[3] + "'"
			if filter[1]=='customer_code':
				where_query = where_query + " AND OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
			if filter[1]=='company':
				where_query = where_query + " AND Txn.TCoCd =  '" + filter[3].replace('%', '') + "'"
			if filter[1]=='voucher_date_from':
				where_query = where_query + " AND Txn.TDt >=  '" + filter[3] + "'"
			if filter[1]=='voucher_date_to':
				where_query = where_query + " AND Txn.TDt <=  '" + filter[3] + "'"
				# i = i + 1

		query = f"""SELECT 
                        COUNT(Txnd.TdIdNo) total_no
                    FROM Txnd 
					JOIN Txn ON Txn.TIdNo = Txnd.TdTIdNo 
					JOIN Bag ON Bag.BIdNo = TdBIdNo
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					WHERE 
						Txn.TTc = 'BV' 
						AND Txnd.TdToBLoc IN ('PFQC', 'PSFQC')
					"""
		
		if where_query :
			query = query + " " + where_query

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no

	@staticmethod
	def get_stats(args):
		pass

