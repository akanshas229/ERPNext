# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ProductDevelopment(Document):
	def validate(self):
		self.workflow_states = self.workflow_state
		self.status = self.workflow_state

@frappe.whitelist()
def create_product_development_from_opp() :
	product_development = frappe.form_dict.get("product_development", False)
	opportunity_no = frappe.form_dict.get("opportunity_new_no", "")
	product_specification = frappe.form_dict.get("product_specification", "")
	customer_name = frappe.form_dict.get("customer_name", "")
	opportunity_owner = frappe.form_dict.get("opportunity_owner", "")
	costing_id = frappe.form_dict.get("costing", "")
	designer = frappe.form_dict.get("designer", "")
	attachment = frappe.form_dict.get("attachment", "")
	assigner_name = frappe.form_dict.get("assigner_name", "")
	primary_assigned = frappe.form_dict.get("primary_assigner", "")
	description = frappe.form_dict.get("description", "")


	data = {}
	if product_development:
		product_development_doc = frappe.get_doc('Product Development', product_development)
		data['status'] = False
		data['data'] = product_development_doc
		data['msg'] = "Product Development Sheet already exists."
		frappe.response["data"] = data
	else :
		doc = frappe.new_doc('Product Development')
		doc.opportunity_no = opportunity_no
		doc.opportunity_owner = opportunity_owner
		doc.customer_name = customer_name
		doc.product_specification = product_specification
		doc.designer = designer
		doc.assigner_name = assigner_name
		doc.primary_assigned = primary_assigned
		doc.description = description

		if attachment :
			field_name = '2d_drawing'
			setattr(doc, field_name, attachment)
			doc.attached = attachment

		if opportunity_no :
			opp_array = opportunity_no.split("-")
			try:
				doc.naming = opp_array[-1]
			except :
				pass

		if costing_id :
			costing_doc = frappe.get_doc('Costing', costing_id)
			doc.costing_id = costing_id
			
			stone_details = costing_doc.get('stone_child', [])
			if stone_details :
				for row in stone_details:
					doc.append("stone_details", {
						"stone_name": row.get('stone_name', ''),
						"shape_name": row.get('shape_name', ''),
						"cut_name": row.get('cut_name', ''),
						"qty": row.get('qty', ''),
						"size": row.get('size', ''),
						"width": row.get('width', ''),
						"quality": row.get('quality', ''),
						"medium": row.get('medium', ''),
						"setting_type": row.get('setting_type', '')
					})
					doc.append("pd_stoned", {
						"stone_name": row.get('stone_name', ''),
						"shape_name": row.get('shape_name', ''),
						"cut_name": row.get('cut_name', ''),
						"quality": row.get('quality', ''),
						"size": row.get('size', ''),
						"width": row.get('width', ''),
						"description": row.get('description', ''),
						"medium": row.get('medium', ''),
						"setting_type": row.get('setting_type', '')
					})
			diamond_details = costing_doc.get('diamond_costing', [])
			if diamond_details :
				for row in diamond_details:
					doc.append("diamond_details", {
						"diamond_name": row.get('diamond_name', ''),
						"diamond_cut": row.get('diamond_cut', ''),
						"diamond_shape": row.get('diamond_shape', ''),
						"diamond_size": row.get('diamond_size', ''),
						"diamond_width": row.get('diamond_width', ''),
						# "diamond_height": row.get('diamond_height', ''),
						"diamond_quality": row.get('diamond_quality', ''),
						"diamond_color": row.get('diamond_color', ''),
						"setting_type": row.get('setting_type', ''),
						# "setting_category": row.get('setting_category', ''),
						"quantity": row.get('quantity_no_of_pcs', ''),  
						"description": row.get('description', '')  
					})
					doc.append("pd_diamondd", {
						"diamond_name": row.get('diamond_name', ''),
						"diamond_cut": row.get('diamond_cut', ''),
						"diamond_shape": row.get('diamond_shape', ''),
						"diamond_size": row.get('diamond_size', ''),
						"diamond_width": row.get('diamond_width', ''),
						# "diamond_height": row.get('diamond_height', ''),
						"diamond_quality": row.get('diamond_quality', ''),
						"diamond_color": row.get('diamond_color', ''),
						"setting_type": row.get('setting_type', ''),
						# "setting_category": row.get('setting_category', ''),
						"quantity": row.get('quantity', ''),  
						"description": row.get('description', '')  
					})

			finding_details = costing_doc.get('findings_list', [])
			if finding_details :
				for row in finding_details:
					doc.append("finding_details", {
						"finding_code": row.get('finding_code', ''),
						"finding_type": row.get('finding_type', ''),
						"description": row.get('description', ''),
						"weight": row.get('weight', ''),
						"quantity": row.get('quantity', ''),
					})
					doc.append("finding_details_pd", {
						"finding_code": row.get('finding_code', ''),
						"finding_type": row.get('finding_type', ''),
						"description": row.get('description', ''),
						"weight": row.get('weight', ''),
						"quantity": row.get('quantity', ''),
					})
				
			
			if costing_doc.get('plating', False):
				doc.append("plating_details", {
					"plating_type": costing_doc.get('plating', ''),
					"micron": costing_doc.get('micron', ''),
					"gold_kt": costing_doc.get('gold_kt', ''),
					"color": costing_doc.get('color', ''),
					"gold": costing_doc.get('gold', ''),
					"anti_tarnish": costing_doc.get('anti_tarnish', ''),
					"plating_code": costing_doc.get('code', ''),
				})
			if costing_doc.get('plating_types', False):
				doc.append("plating_details", {
					"plating_type": costing_doc.get('plating_types', ''),
					"micron": costing_doc.get('	microns', ''),
					"gold_kt": costing_doc.get('gold_kts', ''),
					"color": costing_doc.get('colors', ''),
					"gold": costing_doc.get('golds', ''),
					"anti_tarnish": costing_doc.get('anti_tarnishs', ''),
					"plating_code": costing_doc.get('plating_codes', ''),
				})
			plating_details = costing_doc.get('other_platings', [])
			if plating_details : 
				for row in plating_details:
					doc.append("plating_details", {
						"plating_type": row.get('plating_type', ''),
					})

			doc.design_code = costing_doc.get('design_code_2d', '')
			doc.designer = costing_doc.get('assigned_to', '')
			doc.metal_type = costing_doc.get('metal_type', '')
			doc.itemproduct_category = costing_doc.get('design_category', '')
			# doc.target_metal_weight = costing_doc.get('design_category', '')
			doc.customer_item_code = costing_doc.get('customer_design_code', '')
			doc.target_metal_weight = costing_doc.get('metal_weights', '')
			# doc['2d_drawing'] = costing_doc.get('image', '')
			# doc.customer_item_code = costing_doc.get('customer_design_code', '')
			if costing_doc.get('image', False) :
				# doc.2d_drawing = costing_doc.get('image', '')
				field_name = '2d_drawing'
				setattr(doc, field_name, costing_doc.get('image', ''))
			# doc.metal_type = costing_doc.get('metal_type', '')


		doc.save()
		data['status'] = True
		data['data'] = doc
		data['msg'] = "Product Development Sheet added."
		frappe.response["data"] = data



