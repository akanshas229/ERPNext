

frappe.ui.form.on('ESSL Company', {

	onload_post_render(frm) {
		if(frm.doc.name == 4 || frm.doc.name == 8) {
			frm.set_value('start_time', '07:00:00');
			frm.set_value('end_time', '06:59:59');
		} else {
			frm.set_value('start_time', '08:00:00');
			frm.set_value('end_time', '07:59:59');
		}
		
	},

	get_employee_check_in: function (frm) {
		employee_checkin(frm)
	},

	

});

function employee_checkin(frm) {
	if(frm.doc.date){
		frappe.dom.freeze();
		frappe.call({
			method: "pinkcityit.pinkcity_hr.doctype.essl_company.essl_company.employee_checkin",
			type: "post",
			args: {
			'company_id': frm.doc.name,
			'date' : frm.doc.date,
			'start_time' : frm.doc.start_time,
			'end_time' : frm.doc.end_time,
			},
			error: function(obj) {
				frappe.dom.unfreeze();
				console.log("Error response:", obj);
				frappe.msgprint("Something went wrong.");
			},
			always: function(obj) {
				frappe.dom.unfreeze();
				console.log("hi23"); 
				console.log("Response:", obj);

				frappe.msgprint("Checkin Added");

				// if (obj.status) {
				// 	// frm.set_value('check', obj.data.company);
				// 	// frm.set_value('date_two', obj.data.date);
				// } else {
				// 	frappe.msgprint(obj.msg);
				// }
			},
		})
	} else {
		frappe.msgprint("Please select date.");
	}
	

}


// 		var = frm.doc.get_employee_checkin
// 			get_employee_checkin: function (frm) {
// 				if (frm.doc.get_employee_checkin) {
// 				var get_employee_checkin = frm.doc.get_employee_checkin.replace('\n', '');
// 				get_employee_checkin = get_employee_checkin.trim();
// 				employee_checkin(frm, get_employee_checkin, 'get_employee_checkin', 'Check');
// 			}}