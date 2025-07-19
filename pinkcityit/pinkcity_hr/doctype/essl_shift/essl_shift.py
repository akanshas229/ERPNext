# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document

class ESSLShift(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						ShiftId name,
						ShiftFName shift_name,
						ShiftSName short_name,
						BeginTime begin_time,
						EndTime end_time,	
						PunchBeginDuration punch_begin_before,
						PunchEndDuration punch_end_after,
						GraceTime grace_time,
						GETDATE() creation,
						GETDATE() modified
					FROM Shifts
					WHERE ShiftId = '{self.name}'
					"""
		
		cursor.execute(query)
		row = cursor.fetchone()
		super(Document, self).__init__(row)


	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		start = int(args.get("start") or 0)
		page_length = int(args.get("page_length") or 0) 

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabESSL Shift`.', '')
		order_by = order_by.replace('`', '')


		query = f"""SELECT 
						ShiftId name,
						ShiftFName shift_name,
						ShiftSName short_name,
						BeginTime begin_time,
						EndTime end_time,	
						PunchBeginDuration punch_begin_before,
						PunchEndDuration punch_end_after,
						GraceTime grace_time,
						GETDATE() creation,
						GETDATE() modified
					FROM Shifts
					"""

		query = query + f""" 
					ORDER BY {order_by}
					OFFSET {start} ROWS
					FETCH NEXT {page_length} ROWS ONLY """
		
		cursor.execute(query)
		all_row = cursor.fetchall()
		return all_row

	@staticmethod
	def get_count(args):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		total_no = 0 
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
					COUNT (ShiftId) total_no
					FROM Shifts 
					"""

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no


	@staticmethod
	def get_stats(args):
		pass
