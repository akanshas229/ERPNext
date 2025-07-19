// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on('Emporer Orders Sitapura', {
	refresh(frm) {
		fetch_all_photography_links(frm);
		fetch_order_status_links(frm);
	},

	create_order_status: function(frm) {
        if (frm.doc.order_status) {
            frappe.msgprint("Order Status already exixts.");
        }
		else {
			create_order_status_api(frm)
		}
    }
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

function fetch_all_photography_links(frm) {
	if(frm.doc.design_list) {
		for (var i = 0; i < frm.doc.design_list.length; i++) {
			fetch_photography_links(frm, frm.doc.design_list[i].doctype, frm.doc.design_list[i].name);
		}
	}
}

function fetch_photography_links(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.db.get_list("Photography Request", {
		fields: ["*"],
		filters: { design_no: child.design_code},
	}).then( (obj) => {
		for (var i = 0; i < obj.length; i++) {
			frappe.model.set_value(cdt, cdn, 'photography_request', obj[i].name);
		}
	});
}



function fetch_order_status_links(frm) {
	frappe.db.get_list("Order Status", {
		fields: ["*"],
		filters: { company_code: frm.doc.company_code, order_id: frm.doc.name },
	}).then( (obj) => {
		for (var i = 0; i < obj.length; i++) {
			frm.set_value('order_status', obj[i].name);
		}
	});
}


function checkPhotographyRequest(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.emporer_orders_sitapura.emporer_orders_sitapura.add_photography_request",
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



function create_order_status_api(frm, cdt, cdn) {
	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.emporer_orders_sitapura.emporer_orders_sitapura.create_order_status",
		type: "post",
		args: {
			order_id: frm.doc.name,
			company_code: frm.doc.company_code,
		},
		error: function(r) {
			console.log("hi2332"); 
			console.log(r)
		},
		always: function(obj) {
			console.log(obj)
			if (obj.status) {
				frm.set_value('order_status', obj.data.name);
				frappe.msgprint(obj.msg);
			} else {
				frappe.msgprint(obj.msg);
			}
		},
		async: true,
	});
}

