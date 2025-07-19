# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class TestCosting(Document):
	# pass


	def autoname(self):
		temp_name = 'TCost'

		# if self.clients_code : 
		# 	temp_name = temp_name + "-" + self.clients_code 

		if self.clients_code : 
			temp_name = temp_name + '-' + self.clients_code
			last_doc_name = frappe.db.get_all('Costing',
                filters={
                    # "name": ["like", "%"+temp_name+"%"],
					"clients_code" : self.clients_code
                },
                fields=['name'],
                order_by='name desc',
                # start=10,
                page_length=1,
                # as_list=True
            )
		else :
			last_doc_name = frappe.db.get_all('Costing',
                filters={
                    # "name": ["like", "%"+temp_name+"%"],
					"clients_code" : ['=', '']
                },
                fields=['name'],
                order_by='name desc',
                # start=10,
                page_length=1,
                # as_list=True
            )

		####### this only gave name for new entry
		new_name = temp_name + "-0001"
		# frappe.msgprint(self.clients_code)
		# frappe.msgprint(str(last_doc_name))
		if last_doc_name :
			for last_doc in last_doc_name:
				# frappe.msgprint(last_doc.get("name", "00-0"))
				last_doc_arr_name = last_doc.get("name", "00-0")
				last_name_digit_array = last_doc_arr_name.split("-")

				last_name_digit = last_name_digit_array[-1]
				# frappe.msgprint(last_name_digit)
				# frappe.msgprint(str(last_name_digit_array))
				last_no = 1
				if self.clients_code : 
					# frappe.msgprint("hi22")
					if(len(last_name_digit_array) >= 4) :
						# frappe.msgprint("hi23")
						last_name_digit = last_name_digit_array[-2]
					else :
						# frappe.msgprint("hi24")
						last_name_digit = last_name_digit_array[-1]
					# last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
				else :
					# frappe.msgprint("hi25")
					if(len(last_name_digit_array) >= 3) :
						# frappe.msgprint("hi26")
						last_name_digit = last_name_digit_array[-2]
					else :
						# frappe.msgprint("hi27")
						last_name_digit = last_name_digit_array[-1]
					# last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
				
				# frappe.msgprint(last_no)
				# frappe.msgprint(last_name_digit)
				try :
					last_no = int(last_name_digit) + 1
					# frappe.msgprint(last_no)
				except :
					last_no = 1
				
				# frappe.msgprint(last_no)
					
				new_name =  temp_name + "-"+ str(last_no).zfill(4)
        
		self.name = new_name
	

	
	def before_insert(self) :
		temp_name = 'TCost'

		if self.clients_code : 
			temp_name = temp_name + '-' + self.clients_code
			last_doc_name = frappe.db.get_all('Costing',
                filters={
                    # "name": ["like", "%"+temp_name+"%"],
					"clients_code" : self.clients_code
                },
                fields=['name'],
                order_by='name desc',
                # start=10,
                page_length=1,
                # as_list=True
            )
		else :
			last_doc_name = frappe.db.get_all('Costing',
                filters={
                    # "name": ["like", "%"+temp_name+"%"],
					"clients_code" : ['=', '']
                },
                fields=['name'],
                order_by='name desc',
                # start=10,
                page_length=1,
                # as_list=True
            )

		# last_doc_name = frappe.db.get_list('Costing',
        #         filters={
        #             "name": ["like", "%"+temp_name+"%"],
		# 			"clients_code" : self.clients_code
        #         },
        #         fields=['name'],
        #         order_by='name desc',
        #         # start=10,
        #         page_length=1,
        #         # as_list=True
        #     )

		####### this only gave name for new entry
		new_name = temp_name + "-0001"
		# frappe.msgprint(last_doc_name)
		if last_doc_name :
			for last_doc in last_doc_name:
				# frappe.msgprint(last_doc.get("name", "00-0"))
				last_doc_arr_name = last_doc.get("name", "00-0")
				last_name_digit_array = last_doc_arr_name.split("-")

				last_name_digit = last_name_digit_array[-1]
				# frappe.msgprint(last_name_digit)
				# frappe.msgprint(str(last_name_digit_array))
				last_no = 1
				if self.clients_code : 
					# frappe.msgprint("hi12")
					if(len(last_name_digit_array) >= 4) :
						# frappe.msgprint("hi13")
						last_name_digit = last_name_digit_array[-2]
					else :
						# frappe.msgprint("hi14")
						last_name_digit = last_name_digit_array[-1]
					# last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
				else :
					# frappe.msgprint("hi15")
					if(len(last_name_digit_array) >= 3) :
						# frappe.msgprint("hi16")
						last_name_digit = last_name_digit_array[-2]
					else :
						# frappe.msgprint("hi17")
						last_name_digit = last_name_digit_array[-1]
					# last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
				
				# frappe.msgprint(last_no)
				# frappe.msgprint(last_name_digit)
				try :
					last_no = int(last_name_digit) + 1
					# frappe.msgprint(last_no)
				except :
					last_no = 1
				
				# frappe.msgprint(last_no)
					
				new_name =  temp_name + "-"+ str(last_no).zfill(4)
        
		self.name = new_name

	# def autoname(self):

	# 	temp_name = 'TCost'

	# 	if self.clients_code : 
	# 		temp_name = temp_name + "-" +self.clients_code

	# 	last_doc_name = frappe.db.get_all('Test Costing',
    #             filters={
    #                 "name": ["like", "%"+temp_name+"%"]
    #             },
    #             fields=['name'],
    #             order_by='name desc',
    #             # start=10,
    #             page_length=1,
    #             # as_list=True
    #         )

	# 	####### this only gave name for new entry
	# 	new_name = temp_name + "-0001"
	# 	# try :
	# 	if last_doc_name :
	# 		for last_doc in last_doc_name:
	# 			# frappe.msgprint(last_doc.get("name", "00-0"));
	# 			last_doc_arr_name = last_doc.get("name", "00-0")
	# 			last_name_digit_array = last_doc_arr_name.split("-")

	# 			last_name_digit = last_name_digit_array[-1]
	# 			last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
	# 			# if self.clients_code : 
	# 			# 	if(len(last_name_digit_array) >= 4) :
	# 			# 		last_name_digit = last_name_digit_array[-2]
	# 			# 	else :
	# 			# 		last_name_digit = last_name_digit_array[-1]
	# 			# 	last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
	# 			# else :
	# 			# 	if(len(last_name_digit_array) >= 3) :
	# 			# 		last_name_digit = int(last_name_digit_array[-2]) or int(last_name_digit_array[-1])
	# 			# 	else :
	# 			# 		last_name_digit = last_name_digit_array[-1]
	# 			# 	last_no = int( int(last_name_digit or 0) + 1 or 1 ) 
					
	# 			new_name =  temp_name + "-"+ str(last_no).zfill(4)
	# 	# except :
	# 	# 	pass
        
	# 	self.name = new_name



@frappe.whitelist()
def send_opportunity_details() :
	customer = frappe.form_dict.get("customer", False)
	costing = frappe.form_dict.get("costing", "")
	opportunity_id = frappe.form_dict.get("opportunity_id", "")
	npd = frappe.form_dict.get("npd", "")
	data = {}

	if costing:
		costing_doc = frappe.get_doc("Test Costing", costing)
		data["status"] = False
		data["data"] = costing_doc
		data["msg"] = "Costing already exists."
		frappe.response["data"] = data
	else:
		
		doc = frappe.new_doc("Test Costing")
		doc.customer = customer
		doc.opportunity_id = opportunity_id

		if npd :
			npd_doc = frappe.get_doc('NPD', npd)
			doc.npd_id = npd
			
			stone_details = npd_doc.get('stone_npd', [])
			for row in stone_details:
				doc.append("stone_child", {
					"stone_name": row.get('stone_name', ''),
					"shape_name": row.get('shape_name', ''),
					"cut_name": row.get('cut_name', ''),
					"quality": row.get('quality', ''),
					"size": row.get('size', ''),
					"width": row.get('width', ''),
					"height": row.get('height', ''),
					"medium": row.get('medium', ''),
					"setting_type": row.get('setting_type', ''),
					"setting_category": row.get('setting_category', '')
				})
			diamond_details = npd_doc.get('diamond', [])
			for row in diamond_details:
				doc.append("diamond_costing", {
					"diamond_name": row.get('diamond_name', ''),
					"diamond_cut": row.get('diamond_cut', ''),
					"diamond_shape": row.get('diamond_shape', ''),
					"diamond_size": row.get('diamond_size', ''),
					"diamond_width": row.get('diamond_width', ''),
					"diamond_height": row.get('diamond_height', ''),
					"diamond_quality": row.get('diamond_quality', ''),
					"diamond_color": row.get('diamond_color', ''),
					"setting_type": row.get('setting_type', ''),
					"setting_category": row.get('setting_category', '')
				})
			finding_details = npd_doc.get('finding_details', [])
			for row in finding_details:
				doc.append("findings_list", {
					"finding_code": row.get('finding_code', ''),
					"finding_type": row.get('finding_type', ''),
					"description": row.get('description', ''),
					"weight": row.get('weight', ''),
					"quantity": row.get('quantity', ''),
				})

			doc.metal_type = npd_doc.get('metal_type', '')
			if npd_doc.get('design_code', False) :
				doc.design__type = '2D Design'
				doc.design_code_2d = npd_doc.get('design_code', '')
				doc.image = npd_doc.get('2d_drawing', '')

		# doc.npd_id = npd
		doc.save()

		data["status"] = True
		data["data"] = doc
		data["msg"] = "Costing detail added."
		frappe.response["data"] = data









# @frappe.whitelist()
# def send_npd_detail_to_costing() :
# 	customer = frappe.form_dict.get("customer", False)
# 	costing = frappe.form_dict.get("costing", "")
# 	opportunity_id = frappe.form_dict.get("opportunity_id", "")
# 	costing_state = frappe.form_dict.get("workflow_state", "")
# 	data = {}

# 	if costing:
# 		existing_stone = frappe.get_doc("Test Costing", costing)
# 		data["status"] = False
# 		data["data"] = existing_stone
# 		data["msg"] = "Costing already exists."
# 		frappe.response["data"] = data
# 	else:
		
# 		doc = frappe.new_doc("Test Costing")
# 		doc.customer = customer
# 		doc.opportunity_id = opportunity_id
# 		doc.costing_state = costing_state
# 		doc.save()

# 		data["status"] = True
# 		data["data"] = doc
# 		data["msg"] = "Costing detail added."
# 		frappe.response["data"] = data