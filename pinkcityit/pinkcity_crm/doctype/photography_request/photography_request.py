# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document

class PhotographyRequest(Document):
	pass



@frappe.whitelist()
def update_photography_request_details():
	server = '192.168.2.5'
	user = 'Pankaj.Kumar'
	password = 'admin@123'
	database = 'Emr'
	

	all_pr = frappe.db.get_all('Photography Request',
										# filters={
										# 	'name' : 'PG-02059'
										# },
										fields=['name', 'order_design_id', 'company_code'],
										# order_by='date desc',
										# as_dict=True
									)

	for pr_row in all_pr :
		if pr_row.get("order_design_id", False) and pr_row.get("company_code", False) :
			order_design_id = pr_row.get("order_design_id", False)
			company_code = pr_row.get("company_code", False)

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

			if row :
				pass
			else :
				continue

			frappe.response['row'] = row

			doc = frappe.get_doc("Photography Request", pr_row.get("name", False))
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

			doc.bom_details = []

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
			doc.save()



