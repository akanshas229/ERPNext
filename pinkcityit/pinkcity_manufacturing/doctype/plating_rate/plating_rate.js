// Copyright (c) 2025, Pink city IT team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Plating Rate', {
	// refresh: function(frm) {

	// }
	get_data: function (frm) {
		update_bag_details(frm)
	}
});

frappe.ui.form.on("Plating Price CT", {
    rate_in: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		if(child.rate_in) {
			frappe.model.set_value(cdt, cdn, 'price_date', frappe.datetime.now_datetime());
		}
    },
});



function update_bag_details(frm) {
	const table_name = "plating_price";

	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.plating_rate.plating_rate.fetch_plating_transaction",
		type: "POST",
		args: {
			company: frm.doc.company,
		},
		callback: function (response) {
			console.log("Raw response:", response);

			const obj = response;

			if (!obj) {
				frappe.msgprint("No response received from server.");
				return;
			}

			if (obj.status && Array.isArray(obj.data)) {
				if (obj.data.length === 0) {
					frappe.msgprint("No new design codes found.");
					return;
				}
				const existing_design_codes = (frm.doc[table_name] || []).map(row => row.design_code);

				let added_count = 0;

				obj.data.forEach(row => {
					if (!existing_design_codes.includes(row.design_code)) {
						const child = frm.add_child(table_name);
						child.company = row.company;
						child.design_code = row.design_code;
						child.micron = row.micron;
						child.po_no = row.purchase_order_no;
						added_count++;
					}
				});

				if (added_count > 0) {
					frm.refresh_fields(table_name);
					frappe.msgprint(`${added_count} new design code(s) added.`);
				} else {
					frappe.msgprint("All design codes already exist in the table.");
				}
			} else {
				frappe.msgprint(obj.msg || "Unexpected response format.");
			}
		},
		error: function (err) {
			console.error("Error during fetch:", err);
			frappe.msgprint("An error occurred while fetching data.");
		},
		async: true,
	});
}


