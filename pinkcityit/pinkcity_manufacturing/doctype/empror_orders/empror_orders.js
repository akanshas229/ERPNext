// Copyright (c) 2025, Pink city IT team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Empror Orders', {
	
});


frappe.ui.form.on("EO Design Details",{
	create_photography_request: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        if (child.photography_request) {
            frappe.msgprint("Photography Request already exixts.");
        }
		else {
			checkPhotographyRequest(frm, cdt, cdn)
		}
    }
});



function checkPhotographyRequest(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.empror_orders.empror_orders.add_photography_request",
		type: "post",
		args: {
			order_id: frm.doc.name,
			order_design_id: child.name,
			design_no: child.design_code,
			company_code: frm.doc.company_code,
		},
		error: function(r) {
			console.log("hi2332"); 
			console.log(r)
		},
		always: function(obj) {
			console.log(obj)
			if (obj.status) {
				frappe.model.set_value(cdt, cdn, 'photography_request', obj.data.name);
				frappe.msgprint(obj.msg);
			} else {
				frappe.msgprint(obj.msg);
			}
		},
		async: true,
	});
}
