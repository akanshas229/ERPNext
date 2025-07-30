frappe.ui.form.on("Job Applicant", {
    refresh(frm) {
		// your code here
	}
});


frappe.ui.form.on("Employee External Work History", {
    start_date: function (frm, cdt, cdn) {
        updateData(frm, cdt, cdn)
    },
    end_date: function (frm, cdt, cdn) {
        updateData(frm, cdt, cdn)
    },
});


function updateData(frm, cdt, cdn) {
    // console.log("hi22")
    let child = locals[cdt][cdn];
    if(child.start_date && child.end_date) {
        let total_year = parseFloat(parseFloat(checkDigit(frappe.datetime.get_day_diff(child.end_date, child.start_date))) / 365 ).toFixed(2);
        frappe.model.set_value(cdt, cdn, "total_experience", total_year);
    }
}

function checkDigit(value) {
    if(value > 0 || value < 0 ) {
        return value;
    }
    else {
        return 0;
    }
}
