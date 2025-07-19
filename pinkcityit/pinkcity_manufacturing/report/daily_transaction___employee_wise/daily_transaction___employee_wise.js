// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Daily Transaction - Employee Wise"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
			"default": frappe.defaults.get_user_default("Company")
		},
		{
			"fieldname": "date_from",
			"label": __("Date From"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "date_to",
			"label": __("Date To"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "cell_no",
			"label": __("Cell No"),
			"fieldtype": "Link",
			"options": "Sub Department",
		},

		{
			"fieldname": "employee",
			"label": __("Employee Code"),
			"fieldtype": "Link",
			"options": "Employee",
		},

		{
			"fieldname": "designation",
			"label": __("Designation"),
			"fieldtype": "Link",
			"options": "Designation",
		},


	]
};
