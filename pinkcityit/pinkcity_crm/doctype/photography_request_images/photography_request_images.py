# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PhotographyRequestImages(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		pass

	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		start = int(args.get("start") or 0)
		page_length = int(args.get("page_length") or 20)

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabPhotography Request Images`.', '')
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
		pass

	@staticmethod
	def get_stats(args):
		pass
