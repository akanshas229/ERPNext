
frappe.ui.form.on("Design NPD", {
    refresh: function (frm) {

    },

    metal_weight: function (frm) {
		total_cad_weight(frm)
	},

	finding_weight: function (frm) {
		total_cad_weight(frm)
	}
})

frappe.ui.form.on('Design NPD Assign CT', {

    due_date: function (frm, cdt, cdn) {
        due_date_creation(frm, cdt, cdn)

    },

//     assigner_name: function (frm,cdt,cdn) {
//         var child = locals[cdt][cdn];
//         frm.set_query('assigner_name', 'assignment_details', (frm, cdt, cdn) => {
//             var child = locals[cdt][cdn];
//             if (child.assign_to == "PD Team") {
//                 return { filters: { designer_type: 'Sales Person' } };
//             }
//             else if (child.assign_to == "2D Team") {
//                 return { filters: { designer_type: '2D Designer' } };
//             }
//             else if (child.assign_to == "3D Team") {
//                 return { filters: { designer_type: '3D Designer' } };
//             }
//             else if (child.assign_to == "Design Head") {
//                 return { filters: { designer_type: 'NPD Head' } };
//             }

//         });
//     },
});

function due_date_creation(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var creation_date = child.creation_date;
    var due_date = child.due_date;
    console.log("creation_date", creation_date);
    console.log("due_date", due_date);
    if (creation_date > due_date) {
        frappe.msgprint("You can not select past date from Creation Date")
        frappe.model.set_value(cdt, cdn, 'due_date', null);
    }
}

function total_cad_weight(frm) {
	frm.set_value('cad_design_weight', parseFloat(frm.doc.metal_weight) + parseFloat(frm.doc.finding_weight))
}