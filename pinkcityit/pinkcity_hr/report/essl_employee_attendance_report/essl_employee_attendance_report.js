// Copyright (c) 2025, Pink city IT team and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["ESSL Employee Attendance Report"] = {
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
			"fieldname": "attendance_date",
			"label": __("Date"),
			"fieldtype": "Date",
			"reqd": 1,
		},

		// {
		// 	"fieldname": "month",
		// 	"label": __("Month"),
		// 	"fieldtype": "Select",
		// 	"options": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		// 	"reqd": 1
		// },

		// {
		// 	"fieldname": "year",
		// 	"label": __("Year"),
		// 	"options": "2020\n2021\n2022\n2023\n2024\n2025\n2026\n2027\n2028\n2029\n2030",
		// 	"fieldtype": "Select",
		// 	"reqd": 1
		// },

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



	]
};
