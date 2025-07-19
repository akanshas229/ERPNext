// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Employee's Bonus"] = {
	"filters": [

		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
		},

		{
			"fieldname": "year",
			"label": __("Year"),
			"options": ["",2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, ],
			"fieldtype": "Select",
			"reqd": 1
		},

		{
			"fieldname": "employee",
			"label": __("Employee"),
			"fieldtype": "Link",
			"options": "Employee",
		},

		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype": "Select",
			"options": ["", "Active", "Left"],
		},

		{
			"fieldname": "show",
			"label": __("Show"),
			"fieldtype": "Select",
			"options": ["", "Bonus", "Pay Days", "Basic Amount"],
			"default" : "Bonus",
			"reqd": 1
		},
	]
};
