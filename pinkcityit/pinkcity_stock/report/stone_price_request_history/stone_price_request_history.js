// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Stone Price Request History"] = {
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
			"label": __("Order Date From"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "date_to",
			"label": __("Order Date To"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "rm_code",
			"label": __("RM Code"),
			"fieldtype": "Data",
		},
		{
			"fieldname": "supplier_code",
			"label": __("Supplier Code"),
			"fieldtype": "Data",
		},

	]
};
