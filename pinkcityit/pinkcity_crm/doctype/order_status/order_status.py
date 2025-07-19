# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document

class OrderStatus(Document):
	pass




@frappe.whitelist()
def get_order_details():
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	order_id = frappe.form_dict.get("order_id", "")
	company_code = frappe.form_dict.get("company_code", 'PC')
	
	if company_code != 'PC':
		server = '192.168.5.88'
	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)
	
	query = f"""SELECT 
					OrdMst.OmIdNo,
					( SELECT TOP 1 CustMst.CmName FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) CmName,
					OrdMst.OmCmCd, 
					OrdMst.OmCoCd,
					OrdMst.OmPoNo,
					OrdMst.OmYy,
					OrdMst.OmChr,
					OrdMst.OmNo,
					CONCAT(OmTc, '/', OmYy, '/', OmChr, '/', OmNo) order_no,
					OrdMst.OmExpDelDt,
					OrdMst.OmDt,
					(SELECT SUM(OdOrdQty) FROM OrdDsg WHERE OrdDsg.OdOmIdNo = OmIdNo ) order_qty,
					(SELECT SUM(OdPrdQty - OdExpQty) FROM OrdDsg WHERE OrdDsg.OdOmIdNo = OmIdNo ) bal_qty
				FROM OrdMst
				WHERE OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}'"""

	cursor.execute(query)
	orders_details = cursor.fetchone()

	query2 = f"""SELECT 
					OrdDsg.OdSr,
					OrdDsg.OdDmCd,
					( SELECT TOP 1 DsgMst.DmCtg FROM DsgMst WHERE DsgMst.DmCd = OrdDsg.OdDmCd ) DmCtg,
					OrdDsg.OdOrdQty,
					OrdDsg.OdGldAsWt,
					OrdDsg.OdCmStmpInst,
					OrdDsg.OdDmCol,
					OrdDsg.OdDmPrdInst,
					OrdDsg.OdCmPrdInst,
					OrdDsg.OdKt,
					OrdDsg.OdDmSz,
					OrdDsg.OdIdNo
				FROM OrdDsg  
				LEFT Join OrdMst on OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				WHERE OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}'"""
	cursor.execute(query2)
	orders_design_details = cursor.fetchall()

	query3 =f"""SELECT 
					InvDsg.IdSr,
					InvDsg.IdTc,
					InvDsg.IdYy,
					InvDsg.IdChr,
					InvDsg.IdNo,
					InvHd.InDt,
					InvDsg.IdDmCd,
					InvDsg.IdDmSz,
					InvDsg.IdQty,
					InvDsg.IdIFob,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo ) total_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg = 'G' ) gold_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg = 'S' ) silver_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg = 'D' ) diamond_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg = 'C' ) stone_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg = 'M' ) other_metal_weight,
					( SELECT SUM(InvRm.IrRmAWt) FROM InvRm WHERE InvRm.IrIdIdNo = InvDsg.IdIdNo AND IrRmCtg NOT IN ('G', 'S', 'D', 'C', 'M') ) mis_weight,
					InvDsg.IdAVal invoicePrice,
					InvHd.InIdNo,
					InvDsg.IdIdNo
				FROM InvDsg 
				LEFT Join OrdDsg on OrdDsg.OdIdNo = InvDsg.IdOdIdNo
				LEFT Join OrdMst on OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				LEFT Join InvHd on InvHd.InIdNo = InvDsg.IdInIdNo
				WHERE OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}' 
				"""

	cursor.execute(query3)
	invoice_design_details = cursor.fetchall()

	query4 =f"""SELECT 
					InvDsg.IdSr,
					InvDsg.IdTc,
					InvDsg.IdYy,
					InvDsg.IdChr,
					InvDsg.IdNo,
					InvHd.InDt,
					InvDsg.IdDmCd,
					InvDsg.IdDmSz,
					InvDsg.IdQty,
					InvDsg.IdIFob,
					InvRm.IrRmCd,
					( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = InvRm.IrRmCd ) raw_material_code_name,
					IrRmCtg,
					InvRm.IrRmAWt,
					InvRm.IrRmQty,
					InvDsg.IdIdNo,
					InvRm.IrIdNo
				FROM InvRm 
				LEFT Join InvDsg on InvDsg.IdIdNo = InvRm.IrIdIdNo
				LEFT Join OrdDsg on OrdDsg.OdIdNo = InvDsg.IdOdIdNo
				LEFT Join OrdMst on OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				LEFT Join InvHd on InvHd.InIdNo = InvDsg.IdInIdNo
				WHERE OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}' 
				"""

	cursor.execute(query4)
	invoice_rm_details = cursor.fetchall()
	
	if orders_details :
		frappe.response['status'] = True
		frappe.response['data'] = { "orders_details": orders_details,
									"orders_design_details": orders_design_details,
									"invoice_design_details": invoice_design_details,
									"invoice_rm_details": invoice_rm_details,
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order detail found."
	else :
		frappe.response['status'] = False
		frappe.response['data'] = { "orders_details": [],
									"orders_design_details": [],
									"invoice_design_details": [],
									"invoice_rm_details": [],
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order detail not found."





@frappe.whitelist()
def get_order_bom_details():
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	order_id = frappe.form_dict.get("order_id", "")
	company_code = frappe.form_dict.get("company_code", 'PC')
	
	if company_code != 'PC':
		server = '192.168.5.88'
	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)
	
	query = f"""SELECT 
					OrdRm.OrRmCtg category,
					OrdRm.OrRmCd raw_material_code,
					( SELECT TOP 1 RmMst.RmDesc FROM RmMst WHERE RmMst.RmCd = OrdRm.OrRmCd ) raw_material_code_name,
					OrdDsg.OdDmCd, 
					OrdRm.OrLn1 length, 
					OrdRm.OrLn2 width, 
					OrdRm.OrWt weight, 
					OrdRm.OrQty quantity, 
					OrdDsg.OdOrdQty,
					OrdDsg.OdIdNo,
					OrdRm.OrIdNo
				FROM OrdRm
				LEFT Join OrdDsg on OrdDsg.OdIdNo = OrdRm.OrOdIdNo
				LEFT Join OrdMst on OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				WHERE OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}'"""

	cursor.execute(query)
	orders_design_bom_details = cursor.fetchall()

	
	if orders_design_bom_details :
		frappe.response['status'] = True
		frappe.response['data'] = { "orders_design_bom_details": orders_design_bom_details,
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order detail found."
	else :
		frappe.response['status'] = False
		frappe.response['data'] = { "orders_design_bom_details": [],
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order detail not found."




@frappe.whitelist()
def get_what_is_where_details():
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	order_id = frappe.form_dict.get("order_id", "")
	company_code = frappe.form_dict.get("company_code", 'PC')
	
	if company_code != 'PC':
		server = '192.168.5.88'
	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)
	

					# ( SELECT TOP 1 DsgMst.DmDesc FROM DsgMst WHERE DmMst.DmCd = OrdDsg.OdDmCd ) DmDesc,

	query = f"""SELECT 
					MAX(OrdDsg.OdDmCd) OdDmCd,
					MAX(OrdDsg.OdDmSz) OdDmSz,
					MAX(OrdDsg.OdKt) OdKt,
					MAX(DsgMst.DmCtg) DmCtg,
					Bag.BLoc,
					CONCAT(MAX(Bag.BYy), '/', MAX(Bag.BChr), '/', MAX(Bag.BNo)) bag_no,
					SUM(Bag.BQty) bag_qty,
					OrdDsg.OdIdNo,
					Bag.BIdNo
				FROM OrdDsg
				LEFT Join DsgMst on DsgMst.DmIdNo = OrdDsg.OdDmIdNo
				LEFT Join Bag on Bag.BOdIdNo = OrdDsg.OdIdNo
				LEFT Join OrdMst on OrdMst.OmIdNo = OrdDsg.OdOmIdNo
				WHERE 	Bag.BCls = 'N' AND Bag.BQty > 0 
						AND OrdMst.OmIdNo= {order_id} AND OrdMst.OmCoCd = '{company_code}'
				GROUP BY OrdDsg.OdIdNo, Bag.BLoc, Bag.BIdNo """

	cursor.execute(query)
	fg_bag_raw_material_list = cursor.fetchall()

	
	if fg_bag_raw_material_list :
		frappe.response['status'] = True
		frappe.response['data'] = { "fg_bag_raw_material_list": fg_bag_raw_material_list,
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order - What is Where, detail found."
	else :
		frappe.response['status'] = False
		frappe.response['data'] = { "orders_details": [],
									"orders_design_details": [],
									"invoice_design_details": [],
									"company_code": company_code,
									"server" : server}
		frappe.response['msg'] = "Order - What is Where, detail not found."




@frappe.whitelist()
def get_stone_procurement_list_api():
	final_order_no = frappe.form_dict.get("final_order_no", False)
	company = frappe.form_dict.get("company", False)
	filters = [ ['docstatus', '!=', '2' ] ]

	if final_order_no :
		filters.append(['final_order_no', '=', final_order_no])

	if company :
		filters.append(['unit_name', '=', company])

	all_stone_po = frappe.db.get_list('Stone Procurement',
						filters=filters,
						fields=['*'],
						order_by='creation desc',
						# start=10,
						page_length=150,
						# as_list=True
					)
					
					
	frappe.response["filters"] = filters

	data = {}
	if all_stone_po :
		data['status'] = True
		data['data'] = all_stone_po
		data['msg'] = "Stone PO Found"
		frappe.response['obj'] = data
	else :
		data['status'] = False
		data['data'] = all_stone_po
		data['msg'] = "Stone PO not Found"
		frappe.response['obj'] = data