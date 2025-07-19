// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["FG Bag Wise"] = {
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
			"fieldname": "order_date_from",
			"label": __("Order Date From"),
			"fieldtype": "Date",
			// "reqd": 1,
		},
		{
			"fieldname": "order_date_to",
			"label": __("Order Date To"),
			"fieldtype": "Date",
			// "reqd": 1,
		},


		{
			"fieldname": "bag_no",
			"label": __("Bag No"),
			"fieldtype": "Data",
		},

		{
			"fieldname": "design_code",
			"label": __("Design Code"),
			"fieldtype": "Data",
		},
		{
			"fieldname": "order_no",
			"label": __("Order No"),
			"fieldtype": "Data",
			// "reqd": 1,
		},


		{
			"fieldname": "date_from",
			"label": __("FG Date From"),
			"fieldtype": "Date",
			"reqd": 1,
		},
		{
			"fieldname": "date_to",
			"label": __("FG Date To"),
			"fieldtype": "Date",
			"reqd": 1,
		},
	]
};
