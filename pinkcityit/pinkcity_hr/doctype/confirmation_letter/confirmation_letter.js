// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on('Confirmation Letter', {
	refresh(frm) {
		// your code here
	},
	before_save: function (frm) {
		update_data(frm);
	},
})



function convertDate(date_var) {
	if (date_var) {
		var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var convert_date = new Date(date_var);
		return convert_date.getDate() + " " + month[convert_date.getMonth()] + " " + convert_date.getFullYear();
	}
	else {
		return "";
	}
}

function update_data(frm) {

	var confirmation_letter_updated = frm.doc.confirmation_letter;
	if (frm.doc.company) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{company}}', frm.doc.company) }
	if (frm.doc.employee) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{name}}', frm.doc.employee) }
	if (frm.doc.date) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{date}}', convertDate(frm.doc.date)) }
	if (frm.doc.employee_name) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{employee_name}}', frm.doc.employee_name) }
	if (frm.doc.attendance_device_id) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{attendance_device_id}}', frm.doc.attendance_device_id) }
	if (frm.doc.department) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{department}}', frm.doc.department) }
	if (frm.doc.date_of_joining) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{date_of_joining}}', convertDate(frm.doc.date_of_joining)) }
	if (frm.doc.confirmation_date) { confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{confirmation_date}}', convertDate(frm.doc.confirmation_date)) }

	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Mahapura") {
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{email}}', "hrm@pinkcityindia.com");
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{company_address}}', "Link Road Mahapura Near Infornt of Nirvana Jaipur PIN Code: 302001 India")
	}
	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Unit I") {
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{email}}', "hr@pinkcityindia.com");
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{company_address}}', "G1, 179-180 SEZ-II, Sitapura Industrial Area, Jaipur, Rajasthan-302022")
	}
	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Unit II") {
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{email}}', "hr2@pinkcityindia.com");
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{company_address}}', "G1, 179-180 SEZ-II, Sitapura Industrial Area, Jaipur, Rajasthan-302022")
	}
	if (frm.doc.company == "Atelier Pinkcity Private Limited") {
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{email}}', "hr@pinkcityindia.com");
		confirmation_letter_updated = confirmation_letter_updated.replaceAll('{{company_address}}', "PA-009-001015 & 16 Multi Product Sez of Mahindra World city, Kalwara, Jaipur 302027, India")
	}

	frm.set_value("confirmation_letter_updated", confirmation_letter_updated);


	var confirmation_letter_hindi_updated = frm.doc.confirmation_letter_hindi;
	if (frm.doc.company) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{company}}', frm.doc.company) }
	if (frm.doc.employee) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{name}}', frm.doc.employee) }
	if (frm.doc.date) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{confirmation_date}}', convertDate(frm.doc.confirmation_date)) }
	if (frm.doc.employee_name) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{employee_name}}', frm.doc.employee_name) }
	if (frm.doc.attendance_device_id) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{attendance_device_id}}', frm.doc.attendance_device_id) }
	if (frm.doc.department) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{department}}', frm.doc.department) }
	if (frm.doc.date_of_joining) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{date_of_joining}}', convertDate(frm.doc.date_of_joining)) }
	if (frm.doc.confirmation_date) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{confirmation_date}}', convertDate(frm.doc.confirmation_date)) }
	if (frm.doc.occupation) { confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{occupation}}', frm.doc.occupation) }

	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Mahapura") {
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{email}}', "hrm@pinkcityindia.com");
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{company_address}}', "Link Road Mahapura Near Infornt of Nirvana Jaipur PIN Code: 302001 India")
	}
	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Unit I") {
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{email}}', "hr@pinkcityindia.com");
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{company_address}}', "G1, 179-180 SEZ-II, Sitapura Industrial Area, Jaipur, Rajasthan-302022")
	}
	if (frm.doc.company == "Pinkcity Jewelhouse Private Limited - Unit II") {
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{email}}', "hr2@pinkcityindia.com");
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{company_address}}', "G1, 179-180 SEZ-II, Sitapura Industrial Area, Jaipur, Rajasthan-302022")
	}
	if (frm.doc.company == "Atelier Pinkcity Private Limited") {
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{email}}', "hr@pinkcityindia.com");
		confirmation_letter_hindi_updated = confirmation_letter_hindi_updated.replaceAll('{{company_address}}', "PA-009-001015 & 16 Multi Product Sez of Mahindra World city, Kalwara, Jaipur 302027, India")
	}

	frm.set_value("confirmation_letter_hindi_updated", confirmation_letter_hindi_updated);

	console.log(frm.doc);
}

