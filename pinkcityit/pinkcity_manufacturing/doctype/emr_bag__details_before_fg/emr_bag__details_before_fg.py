# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document

class EMRBagDetailsBeforeFG(Document):
	# pass

	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		pass

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

		query = f"""SELECT 
						BId AS name,
                        CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) AS order_no,
                        CONCAT(BYy, '/', BChr, '/', BNo) AS bag_no,
						'shyam.sunder@pinkcityindia.com' AS owner
                    FROM Bag """
		
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

		total_bag = 0 
		data = {}
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
                        COUNT(Bag.Bid) total_bag
                    FROM Bag """

		cursor.execute(query)
		row = cursor.fetchone()
		total_bag = row.get("total_bag", 0) 
		# frappe.msgprint(total_bag)
		# print(total_bag)
		data['message'] = total_bag
		return  total_bag
		# return data

	@staticmethod
	def get_stats(args):
		pass






