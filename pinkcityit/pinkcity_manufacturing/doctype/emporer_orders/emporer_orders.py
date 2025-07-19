# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe,pymssql
from frappe.model.document import Document
from frappe.utils import (
	cint
)

class EmporerOrders(Document):
	
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
		order_by = order_by.replace('`tabEmporer Orders`.', '')
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
		server = '192.168.2.5'
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
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'

	order_id = frappe.form_dict.get("order_id", "")
	order_design_id = frappe.form_dict.get("order_design_id", "")
	design_no = frappe.form_dict.get("design_no", "")
	company_code = frappe.form_dict.get("company_code", 'PC')
	order_no = frappe.form_dict.get("order_no", '')

	
	if frappe.db.exists("Photography Request", {"design_no": design_no}) :
		frappe.response['status'] = False
		frappe.response['data'] = []
		frappe.response['msg'] = f"Photography Request already exits for design {design_no}"
	else :
		if company_code != 'PC':
			server = '192.168.5.88'
	
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						OrdMst.OmIdNo,
						OrdMst.OmCoCd,
						OrdMst.OmTc,
						OrdMst.OmYy,
						OrdMst.OmChr,
						OrdMst.OmNo,
						OrdMst.OmCmCd,
						( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) client_name,
						OrdDsg.OdIdNo,
                        OrdDsg.OdDmCd,
						OrdDsg.OdKt, 
						DsgMst.DmCtg,
						DsgMst.DmDesc
					FROM OrdDsg 
					JOIN OrdMst On OrdMst.OmIdNo = OrdDsg.OdOmIdNo
					LEFT JOIN DsgMst ON DsgMst.DmIdNo = OrdDsg.OdDmIdNo
					WHERE OrdDsg.OdIdNo = {order_design_id}
						 AND OrdMst.OmCoCd = '{company_code}'
					"""
		
		cursor.execute(query)
		row = cursor.fetchone()
		frappe.response['row'] = row

		doc = frappe.new_doc("Photography Request")
		doc.order_id = row.get("OmIdNo")
		doc.company_code = row.get("OmCoCd")
		doc.order_no_prefix = row.get("OmTc")
		doc.order_year = row.get("OmYy")
		doc.order_type = row.get("OmChr")
		doc.order_num = row.get("OmNo")
		doc.final_order_no = row.get("OmCoCd") + "/" + str(row.get("OmTc")) + "/" + str(row.get("OmYy")) + "/" + row.get("OmChr") + "/" + str(row.get("OmNo"))
		doc.customer_code = row.get("OmCmCd")
		doc.customer_name = row.get("client_name")
		doc.order_design_id = row.get("OdIdNo")
		doc.design_no = row.get("OdDmCd")
		doc.metal = row.get("OdKt")
		doc.itemdesign_category = row.get("DmCtg")
		doc.description = row.get("DmDesc")

		query2 = f"""SELECT 
						OrRmCtg,
						OrRmSCtg,
						OrRmCd,
						( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = OrdRm.OrRmCd ) raw_material_code_name,
						OrLn1,
						OrLn2,
						OrQty,
						OrWt,
						OrSetSCd,
						OrWsQty,
						OrHsQty,
						OrAlyCd,
						OrMainMet,
						OrSubShp,
						OrRmPtr,
						OrPrdQty,
						OrPrdWt
					FROM OrdRm 
					WHERE OrdRm.OrOdIdNo = {order_design_id}  AND OrdRm.OrCoCd = '{company_code}'
					"""
		cursor.execute(query2)
		all_bom_details = cursor.fetchall()

		frappe.response['all_bom_details'] = all_bom_details

		for bom in all_bom_details :
			doc.append("bom_details", {
				"category" : bom.get("OrRmCtg"),
				"sub_category" : bom.get("OrRmSCtg"),
				"raw_material_code" : bom.get("OrRmCd"),
				"raw_material_code_name" : bom.get("raw_material_code_name"),
				"length" : bom.get("OrLn1"),
				"width" : bom.get("OrLn2"),
				"quantity" : bom.get("OrQty"),
				"weight" : bom.get("OrWt"),
				"setting" : bom.get("OrSetSCd"),
				"alloy" : bom.get("OrAlyCd"),
				"wax_setting" : bom.get("OrWsQty"),
				"hand_setting" : bom.get("OrHsQty"),
				"production_quantity_new" : bom.get("OrPrdQty"),
				"production_weight" : bom.get("OrPrdWt"),
				"main_metal" : bom.get("OrMainMet"),
				"sshp" : bom.get("OrSubShp"),
				"rm_ptr" : bom.get("OrRmPtr"),
				"design_code" : row.get("OdDmCd"),
			})

		
		# doc.order_id = order_id
		# doc.order_design_id = order_design_id
		# doc.design_no = design_no
		# doc.company_code = company_code
		doc.save()

		frappe.response['status'] = True
		frappe.response['data'] = doc
		frappe.response['msg'] = "Photography Request added."




@frappe.whitelist()
def create_order_status():
	order_id = frappe.form_dict.get("order_id", "")
	company_code = frappe.form_dict.get("company_code", 'PC')

	if frappe.db.exists("Order Status", {"order_id": order_id, 'company_code' : company_code}) :
		frappe.response['status'] = False
		frappe.response['data'] = []
		frappe.response['msg'] = "Order Status already exits for design"
	else :
		
		doc = frappe.new_doc("Order Status")
		doc.order_id = order_id
		doc.company_code = company_code
		doc.save()
		frappe.response['status'] = True
		frappe.response['data'] = doc
		frappe.response['msg'] = "Order Status added."


	
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
