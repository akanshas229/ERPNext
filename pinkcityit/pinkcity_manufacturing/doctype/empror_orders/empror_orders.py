# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document
from frappe.utils import (
	cint
)

class EmprorOrders(Document):
	
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
						OrdMst.OmIdNo name,
                        CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) order_no, 
						OmCoCd company_code,
						OrdMst.OmCmCd client_code,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) client_name,
						OrdMst.OmPoNo purchase_order_no,
						CAST(OrdMst.OmDt AS DATE) order_date,
						CAST(OrdMst.OmExpDelDt AS DATE) export_delivery_date,
						OrdMst.ModDt creation,
						OrdMst.ModDt modified
					FROM OrdMst 
					WHERE OrdMst.OmIdNo = {self.name}
					"""
				
		cursor.execute(query)
		row = cursor.fetchone()

		super(Document, self).__init__(row)


		query2 = f"""SELECT 
						OrdDsg.OdIdNo name,
                        OrdDsg.OdDmCd design_code, 
						OrdDsg.OdDmSz size,
						OrdDsg.OdKt karat,
						OrdDsg.OdDmCol color,
						OrdDsg.OdSr order_design_sr_no,
						OrdDsg.ModDt creation,
						OrdDsg.ModDt modified
					FROM OrdDsg 
					WHERE OrdDsg.OdOmIdNo = {self.name}
					"""
		cursor.execute(query2)
		row2 = cursor.fetchall()
		if row2:
			for row_data in row2:
				self.append("design_list", {
					"name": row_data.get('name', ''),
					"design_code": row_data.get('design_code', ''),
					"size": row_data.get('size', ''),
					"karat": row_data.get('karat', ''),
					"color": row_data.get('color', ''),
					"order_design_sr_no": row_data.get('order_design_sr_no', ''),
				})



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

		start = cint(args.get("start")) or 0
		page_length = cint(args.get("page_length")) or 20

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabEmpror Orders`.', '')
		order_by = order_by.replace('`', '')

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='order_no':
				where_query = where_query + " CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='purchase_order_no':
				where_query = where_query + " OrdMst.OmPoNo " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='client_code':
				where_query = where_query + " OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='company':
				where_query = where_query + " OrdMst.OmCoCd =  '" + filter[3].replace('%', '') + "'"
				i = i + 1
			if filter[1]=='order_date_from':
				where_query = where_query + " OrdMst.OmDt >=  '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='order_date_to':
				where_query = where_query + " OrdMst.OmDt <=  '" + filter[3] + "'"
				i = i + 1

		query = f"""SELECT 
						OrdMst.OmIdNo name,
                        CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) order_no, 
						OmCoCd company_code,
						OrdMst.OmCmCd client_code,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) client_name,
						OrdMst.OmPoNo purchase_order_no,
						CAST(OrdMst.OmDt AS DATE) order_date,
						CAST(OrdMst.OmExpDelDt AS DATE) export_delivery_date,
						OrdMst.ModDt creation,
						OrdMst.ModDt modified
					FROM OrdMst 
					"""
		
		
		if where_query :
			query = query + " WHERE  " + where_query

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
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='order_no':
				where_query = where_query + " CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='purchase_order_no':
				where_query = where_query + " OrdMst.OmPoNo " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='client_code':
				where_query = where_query + " OrdMst.OmCmCd " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='company':
				where_query = where_query + " OrdMst.OmCoCd =  '" + filter[3].replace('%', '') + "'"
				i = i + 1
			if filter[1]=='order_date_from':
				where_query = where_query + " OrdMst.OmDt >=  '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='order_date_to':
				where_query = where_query + " OrdMst.OmDt <=  '" + filter[3] + "'"
				i = i + 1

		query = f"""SELECT 
                        COUNT(OrdMst.OmIdNo) total_no
                    FROM OrdMst 
					"""
		
		if where_query :
			query = query + " WHERE " + where_query

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no

	@staticmethod
	def get_stats(args):
		pass




@frappe.whitelist()
def add_photography_request():
	order_id = frappe.form_dict.get("order_id", "")
	order_design_id = frappe.form_dict.get("order_design_id", "")
	design_no = frappe.form_dict.get("design_no", "")
	company_code = frappe.form_dict.get("company_code", 'PC')
	
	if frappe.db.exists("Photography Request", {"design_no": design_no}) :
		frappe.response['status'] = False
		frappe.response['data'] = []
		frappe.response['msg'] = f"Photography Request already exits for design {design_no}"
	else :
		doc = frappe.new_doc("Photography Request")
		doc.order_id = order_id
		doc.order_design_id = order_design_id
		doc.design_no = design_no
		doc.company_code = company_code
		doc.save()
		frappe.response['status'] = True
		frappe.response['data'] = doc
		frappe.response['msg'] = "Photography Request added."



# @frappe.whitelist()
# def fetch_order_design_details():

#     server = '192.168.2.5'
#     user = 'Pankaj.Kumar'
#     password = 'admin@123'
#     database = 'Emr'
	
# 	order_design_id = frappe.form_dict.get("order_design_id", "")
# 	company_code = frappe.form_dict.get("company_code", 'PC')

# 	if company_code == "PJ" or company_code == "PJ2":
# 		server = '192.168.5.88'

# 	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
# 	cursor = conn.cursor(as_dict=True)

# 	# connectionString = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={user};PWD={password};Trusted_Connection=yes;Encrypt=no;"
# 	# connectionString = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={user};PWD={password};TrustServerCertificate=yes;Trusted_Connection=yes;Encrypt=no;"
# 	# connectionString = f"DRIVER=/usr/lib/x86_64-linux-gnu/libodbc.so;SERVER={server};DATABASE={database};UID={user};PWD={password};TrustServerCertificate=yes;Trusted_Connection=yes"
# 	# conn = pyodbc.connect(connectionString)

# 	query = f"""SELECT 
# 					Bag.BIdNo, Bag.BOdDmCd, Bag.BQty,
# 					CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) order_no,
# 					CONCAT(BYy, '/', BChr, '/', BNo) bag_no,
# 					OrdMst.OmCmCd,
# 					OrdDsg.OdCmStmpInst,
# 					(SELECT MAX(DsgMst.DmCtg) FROM DsgMst WHERE DsgMst.DmIdNo = BDmIdNo ) DmCtg,
# 					(SELECT MAX(CustMst.CmName) FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer_name,
# 					(SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_qty,
# 					(SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_qty,
# 					(SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_wt,
# 					(SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_wt,
# 					(SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrRmCtg NOT IN ('C', 'D') ) bom_wt
# 				FROM Bag 
# 				JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
# 				JOIN OrdDsg ON OrdDsg.OdIdNo = Bag.BOdIdNo
# 				LEFT JOIN CustMst ON CustMst.CmCd = OrdMst.OmCmCd
# 				WHERE 
# 					CONCAT(BYy, '/', BChr, '/', BNo)  = '{bag_no}'
# 					AND Bag.BCoCd = '{company_code}' """

# 	cursor.execute(query)
# 	row = cursor.fetchone()
# 	if row.get("bag_no", False) :
# 		frappe.response['status'] = True
# 		frappe.response['data'] = row
# 		frappe.response['msg'] = "Bag details found"
# 	else :
# 		frappe.response['status'] = False
# 		frappe.response['data'] = row
# 		frappe.response['msg'] = "Bag details not found"
	
# 	cursor.close()
# 	conn.close()
