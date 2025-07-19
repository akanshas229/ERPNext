# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe,pymssql
from frappe.model.document import Document

class PhotographyRequestImageView(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		
		query = f"""SELECT 
						tpl.name name,
						tpl.file image,
						tpr.design_no design_code,
						tpr.name photography_request,
						tpr.itemdesign_category design_category,
						tpr.description description,
						CONCAT(tpr.customer_name, "-", tpr.customer_code) customer_name,
						tpr.collection_name collection_name,
						GROUP_CONCAT(CASE
										WHEN tedbd.category != 'C' and tedbd.category != 'D'   THEN tedbd.raw_material_code_name
										ELSE ''
									END) metal_name,
						GROUP_CONCAT(CASE
										WHEN tedbd.category = 'C' THEN tedbd.raw_material_code_name
										ELSE ''
									END) stone_name,
						GROUP_CONCAT(CASE
										WHEN tedbd.category = 'D' THEN tedbd.raw_material_code_name
										ELSE ''
									END) diamond_name,
						tpl.creation,
						tpl.modified,
						tpl.owner,
						tpl.modified_by
					FROM `tabPhotography Links` tpl 
					LEFT JOIN `tabPhotography Request` tpr on  tpr.name = tpl.parent
					LEFT JOIN `tabEMR Design BOM Details` tedbd  on  tedbd.parent = tpr.name
					WHERE tpl.name = '{self.name}'
					GROUP BY tpl.name
					"""
		
		all_row = frappe.db.sql(query, as_dict=1,)
		super(Document, self).__init__(all_row[0])


	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		start = int(args.get("start") or 0)
		page_length = int(args.get("page_length") or 0) 

		order_by = 'name desc'

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='design_code':
				where_query = where_query + " tpr.design_no " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='photography_request':
				where_query = where_query + " tpr.name " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='design_category':
				where_query = where_query + " tpr.itemdesign_category " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='description':
				where_query = where_query + " tpr.description " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='customer_name':
				where_query = where_query + " ( tpr.customer_name " + filter[2] + " '" + filter[3] + "'"
				where_query = where_query + " or tpr.customer_code " + filter[2] + " '" + filter[3] + "' )"
				i = i + 1
			if filter[1]=='collection_name':
				where_query = where_query + " tpr.collection_name " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='metal_name' or filter[1]=='stone_name' or filter[1]=='diamond_name':
				where_query = where_query + " tedbd.raw_material_code_name " + filter[2] + " '" + filter[3] + "'"
				i = i + 1

		query = f"""SELECT 
						tpl.name name,
						tpl.file image,
						tpr.design_no design_code,
						tpr.name photography_request,
						tpr.itemdesign_category design_category,
						tpr.description description,
						CONCAT(tpr.customer_name, "-", tpr.customer_code) customer_name,
						tpr.collection_name collection_name,
						tpl.creation,
						tpl.modified,
						tpl.owner,
						tpl.modified_by
					FROM `tabPhotography Links` tpl 
					LEFT JOIN `tabPhotography Request` tpr on  tpr.name = tpl.parent
					LEFT JOIN `tabEMR Design BOM Details` tedbd  on  tedbd.parent = tpr.name
					"""
		if where_query :
			query = query + " WHERE  " + where_query

		query = query + f""" 
					GROUP BY tpl.name
					ORDER BY {order_by}
					OFFSET {start} ROWS
					FETCH NEXT {page_length} ROWS ONLY """
		
		all_row = frappe.db.sql(query, as_dict=1,)
		return all_row

	@staticmethod
	def get_count(args):
		# pass
		start = int(args.get("start") or 0)
		page_length = int(args.get("page_length") or 0) 

		order_by = 'name desc'

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='design_code':
				where_query = where_query + " tpr.design_no " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='photography_request':
				where_query = where_query + " tpr.name " + filter[2] + " '" + filter[3] + "'"
				i = i + 1

		total_no = 0 
		query = f"""SELECT 
                        COUNT(tpl.idx) total_no
                    FROM `tabPhotography Links` tpl 
					LEFT JOIN `tabPhotography Request` tpr on  tpr.name = tpl.parent 
					"""
		if where_query :
			query = query + " WHERE  " + where_query
		all_row = frappe.db.sql(query, as_dict=1,)
		total_no = all_row[0].get("total_no", 0) 
		return  total_no

	@staticmethod
	def get_stats(args):
		pass

