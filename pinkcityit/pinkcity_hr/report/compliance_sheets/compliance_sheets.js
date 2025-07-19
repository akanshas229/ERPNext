// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Compliance Sheets"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			// "default": "Pinkcity Jewelhouse Private Limited- Unit 1"

			// "reqd": 1
		},
		{
			"fieldname": "employee_name",
			"label": "Employee Name",
			"fieldtype": "Data",
			"options": "Employee",
			// "default": "Akansha Saxena"
		},
	]
};
