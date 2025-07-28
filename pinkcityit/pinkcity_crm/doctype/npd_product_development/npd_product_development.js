// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on("NPD Product Development", {
    refresh(frm) {

    },
    designer: function (frm) {
        var designer = frm.doc.owner;
        frm.set_value("designer", designer);
    }
});
