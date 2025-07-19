# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PinkCityTask(Document):
	# pass
	def on_update(self):
		add_child_in_task(self)


	def after_insert(self):
		add_child_in_task(self)



@frappe.whitelist()
def add_child_in_task(doc):
	if doc.parent_task_new:
		parent_name = doc.parent_task_new
		parent_doc = frappe.get_doc("PinkCity Task", parent_name)
		already_exists = False
		for row in parent_doc.sub_task:
			if row.name1 == doc.name:
				# row.name1 = doc.name
				row.status = doc.workflow_state
				row.start_date = doc.start_date
				row.end_date = doc.description
				row.description = doc.description
				parent_doc.save()
				already_exists = True
				break
	
		if not already_exists:
			parent_doc.append("sub_task", {
				"name1" : doc.name,
				"status" : doc.workflow_state,
				"start_date" : doc.start_date,
				"end_date" : doc.end_date,
				"description" : doc.description,
			})
			parent_doc.save()

		# add_child_in_task()