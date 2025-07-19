// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["ESSL Employee Check In"] = {
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
			"fieldname": "month",
			"label": __("Month"),
			"fieldtype": "Select",
			"options": "Jan\nFeb\nMar\nApr\nMay\nJun\nJul\nAug\nSep\nOct\nNov\nDec",
			"reqd": 1
		},
		{
			"fieldname": "year",
			"label": __("Year"),
			"options": "2020\n2021\n2022\n2023\n2024\n2025\n2026\n2027",
			"fieldtype": "Select",
			"reqd": 1
		},
		{
			"fieldname": "employee_name",
			"label": __("Employee Name"),
			"fieldtype": "Data",
		},

		{
			"fieldname": "employee_code",
			"label": __("Employee Code"),
			"fieldtype": "Data",
		},

		{
			"fieldname": "designation",
			"label": __("Designation"),
			"fieldtype": "Data",
		},

		{
			"fieldname": "logdate",
			"label": __("Date"),
			"fieldtype": "Date",
		},
	]
};
