// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Salary Sheet"] = {
	"filters": [

		{
			"fieldname": "month",
			"label": "Month",
			"fieldtype": "Select",
			"options": "\nJanuary\nFebruary\nMarch\nApril\nMay\nJune\nJuly\nAugust\nSeptember\nOctober\nNovember\nDecember",
			"default": "January",
			"reqd": 1
		},
		{
			"fieldname": "year",
			"label": "Year",
			"fieldtype": "Select",
			"options": "\n2022\n2023\n2024\n2025\n2026",
			"default": "2025",
			"reqd": 1
		},
		{
			"fieldname": "company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"default": "Pinkcity Jewelhouse Private Limited - Unit 1",
			"reqd": 1
		},

		{
			"fieldname": "based_on",
			"label": __("Report Based On"),
			"fieldtype": "Select",
			"options": ["", "Occupassion", "Account",],
			"default": "Occupassion",
			"reqd": 1
		},
	],

	// "formatter" : function(value, row, column, data, default_formatter) {
	// 	console.log("value : ", value)
	// 	console.log("row : ", row)
	// 	console.log("column : ", column)
	// 	console.log("data : ", data)
	// 	console.log("default_formatter : ", default_formatter)
	// },

	onload: function (report) {

		report.page.add_inner_button(__("Download Excel"), function () {
			let filters = report.get_values();

			frappe.call({
				method: 'pinkcityit.pinkcity_hr.report.salary_sheet.salary_sheet.get_excel_data',
				args: {
					// data: JSON.stringify(report.data),
					// report_name: report.report_name,
					// filters: JSON.stringify(filters)
					filters: filters
				},
				callback: function (r) {
					if (r.message) {
						const args = {
							cmd: 'pinkcityit.pinkcity_hr.report.salary_sheet.salary_sheet.download_file',
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
