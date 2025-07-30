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
            "fieldtype": "Small Text",
            "label": "Address",
            "insert_after": "date_of_birth",
        }, 
        {
            "fieldname": "column_break_112",
            "fieldtype": "Column Break",
            "label": "",
            "insert_after": "disabilities",
        },
        {
            "fieldname": "in_hand_salary",
            "fieldtype": "Currency",
            "label": "Current/Last Company In-Hand Salary",
            "insert_after": "column_break_112",
        }, 
        {
            "fieldname": "ctc_per_month",
            "fieldtype": "Currency",
            "label": "Current/Last Company CTC Per Month",
            "insert_after": "in_hand_salary",
        },
        {
            "fieldname": "expected_salary",
            "fieldtype": "Currency",
            "label": "Expected Salary",
            "insert_after": "ctc_per_month",
        },
    ],
    "Employee External Work History" : [
        {
            "fieldname": "mobile_no",
            "fieldtype": "Data",
            "label": "Mobile No",
            "insert_after": "contact",
        },
    ],
}





PROPERTY_SETTERS = [
    # Job Applicant
    {
        "doctype_or_field": "DocField",
        "doctype": "Job Applicant",
        "fieldname": "source_name",
        "property": "fieldtype",
        "property_type": "Select",
        "value": "Data",
    },
    {
        "doctype_or_field": "DocField",
        "doctype": "Job Applicant",
        "fieldname": "source_name",
        "property": "options",
        "property_type": "Small Text",
        "value": "",
    },
    # Employee Education
    {
        "doctype_or_field": "DocField",
        "doctype": "Employee Education",
        "fieldname": "class_per",
        "property": "hidden",
        "property_type": "Check",
        "value": "1",
    },
    {
        "doctype_or_field": "DocField",
        "doctype": "Employee Education",
        "fieldname": "maj_opt_subj",
        "property": "hidden",
        "property_type": "Check",
        "value": "1",
    },
    # Employee External Work History
    {
        "doctype_or_field": "DocField",
        "doctype": "Employee External Work History",
        "fieldname": "contact",
        "property": "label",
        "property_type": "Data",
        "value": "Contact Person",
    },
    {
        "doctype_or_field": "DocField",
        "doctype": "Employee External Work History",
        "fieldname": "location",
        "property": "hidden",
        "property_type": "Check",
        "value": "1",
    }
]

def after_install():
    create_custom_fields()
    make_property_setters()

def create_custom_fields():
    _create_custom_fields(CUSTOM_FIELDS, ignore_validate=True, update=True)

def make_property_setters():
    for property_setter in PROPERTY_SETTERS:
        frappe.make_property_setter(property_setter, validate_fields_for_doctype=False)