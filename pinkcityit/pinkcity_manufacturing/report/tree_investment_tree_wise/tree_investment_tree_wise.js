// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Tree Investment Tree Wise"] = {
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
			"label": __("Tree Date From"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "date_to",
			"label": __("Tree Date To"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "tree_no",
			"label": __("Tree No"),
			"fieldtype": "Data",
		},
	]
};
