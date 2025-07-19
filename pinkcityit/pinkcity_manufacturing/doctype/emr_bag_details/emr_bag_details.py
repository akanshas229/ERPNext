# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document
from frappe.utils import (
	cint
)

class EMRBagDetails(Document):
	
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
						Bag.BIdNo name,
                        CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo)  bag_no,
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
					FROM Bag
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					WHERE BIdNo = {self.name}
					"""
				
		cursor.execute(query)
		row = cursor.fetchone()

		super(Document, self).__init__(row)


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
		order_by = order_by.replace('`tabEMR Bag Details`.', '')
		order_by = order_by.replace('`', '')

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='bag_no':
				where_query = where_query + " CONCAT(BYy, '/', BChr, '/', BNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='order_no':
				where_query = where_query + " CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='customer_code':
				where_query = where_query + " OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			# if filter[1]=='customer':
			# 	where_query = where_query + " CustMst.CmName " + filter[2] + " '" + filter[3] + "'"
			# 	i = i + 1

		query = f"""SELECT 
						Bag.BIdNo name,
                        CONCAT(Bag.BYy, '/', Bag.BChr, '/', Bag.BNo)  bag_no,
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
					FROM Bag
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					"""
		
		
		if where_query :
			query = query + " WHERE " + where_query

		query = query + f""" 
					ORDER BY {order_by}
					OFFSET {start} ROWS
					FETCH NEXT {page_length} ROWS ONLY """
		
		cursor.execute(query)
		all_row = cursor.fetchall()
		return all_row

	@staticmethod
	def get_count(args):
		server = '192.168.2.5'
		user = 'Pankaj.Kumar'
		password = 'admin@123'
		database = 'Emr'

		total_bag = 0 
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='bag_no':
				where_query = where_query + " CONCAT(BYy, '/', BChr, '/', BNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='order_no':
				where_query = where_query + " CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='customer_code':
				where_query = where_query + " OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
				i = i + 1

		query = f"""SELECT 
                        COUNT(Bag.BIdNo) total_bag
                    FROM Bag 
					JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
					"""
		
		if where_query :
			query = query + " WHERE " + where_query

		cursor.execute(query)
		row = cursor.fetchone()
		total_bag = row.get("total_bag", 0) 
		return  total_bag

	@staticmethod
	def get_stats(args):
		pass
