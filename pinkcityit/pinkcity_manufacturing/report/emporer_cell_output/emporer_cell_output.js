// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Emporer Cell Output"] = {
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
			fieldname: "from_location",
			label: __("From Location"),
			fieldtype: "Data",
		},
		{
			fieldname: "voucher_date_from",
			label: __("Voucher Date - From"),
			fieldtype: "Date",
		},
		{
			fieldname: "voucher_date_to",
			label: __("Voucher Date - To"),
			fieldtype: "Date",
			// reqd: 1,
		},


		{
			fieldname: "fg_voucher_date_from",
			label: __("FG Date - From"),
			fieldtype: "Date",
			reqd: 1,
		},
		{
			fieldname: "fg_voucher_date_to",
			label: __("FG Date - To"),
			fieldtype: "Date",
			reqd: 1,
		},
	]
};
