// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Emporer Cell Output FG"] = {
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
			fieldname: "fg_date_from",
			label: __("FG Date - From"),
			fieldtype: "Date",
			reqd: 1,
		},
		{
			fieldname: "fg_date_to",
			label: __("FG Date - To"),
			fieldtype: "Date",
			reqd: 1,
		},
		{
			fieldname: "order_no",
			label: __("Order No"),
			fieldtype: "Data",
		},
		{
			fieldname: "bag_no",
			label: __("Bag No"),
			fieldtype: "Data",
		},
	]
};
