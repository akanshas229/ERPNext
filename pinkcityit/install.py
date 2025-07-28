import frappe
from frappe.custom.doctype.custom_field.custom_field import (
    create_custom_fields as _create_custom_fields,
)

CUSTOM_FIELDS = {
    "Job Applicant": [
        {
            "fieldname": "gender",
            "fieldtype": "Link",
            "options": "Gender",
            "label": "Gender",
            "insert_after": "job_title",
        }, 
        {
            "fieldname": "address",
            "fieldtype": "Text",
            "label": "address",
            "insert_after": "date_of_birth",
        }, 
    ],
}

def after_install():
    create_custom_fields()

def create_custom_fields():
    _create_custom_fields(CUSTOM_FIELDS, ignore_validate=True)