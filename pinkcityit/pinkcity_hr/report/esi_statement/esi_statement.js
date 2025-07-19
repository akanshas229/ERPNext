// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["ESI Statement"] = {
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
			"options": ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			"reqd": 1
		},

		{
			"fieldname": "year",
			"label": __("Year"),
			"options": ["", 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,],
			"fieldtype": "Select",
			"reqd": 1
		},

		{
			"fieldname": "employee",
			"label": __("Employee"),
			"fieldtype": "Link",
			"options": "Employee",
		},
	],
	onload: function (report) {
		report.page.add_inner_button(__("Download Excel"), function () {
			let filters = report.get_values();

			frappe.call({
				method: 'pinkcityit.pinkcity_hr.report.esi_statement.esi_statement.get_excel_data',
				args: {
					// data: JSON.stringify(report.data),
					// report_name: report.report_name,
					// filters: JSON.stringify(filters)
					filters: filters
				},
				callback: function (r) {
					if (r.message) {
						const args = {
							cmd: 'pinkcityit.pinkcity_hr.report.esi_statement.esi_statement.download_file',
							content: r.message.content,
							filename: r.message.filename,
							extension: r.message.extension,
							filters: r.message.filters,
						};
						open_url_post(frappe.request.url, args);
					}
				}
			});
		});
	}
};
