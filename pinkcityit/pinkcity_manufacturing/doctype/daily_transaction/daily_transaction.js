// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on('Daily Transaction', {
	refresh(frm) {

		frm.set_query('work_type', 'bag_transaction', (frm, cdt, cdn) => {
			var child = locals[cdt][cdn];
			if (child.designation == "Setter") {
				return { filters: { name: ['in', ['Stone Setting', 'Repair']] } }
			}
			else if (child.designation == "Filer") {
				return { filters: { name: ['in', ['Filing', 'Assembling', 'Lip Setting', 'Repair']] } }
			}
			else if (child.designation == "Polisher") {
				return { filters: { name: ['in', ['Pre Polish', 'Final Polish', 'Repair']] } }
			}
			else {
				return { filters: { name: ['in', ['']] } }
			}
		});

		frm.set_query('work_type', 're_work_daily', (frm, cdt, cdn) => {
			var child = locals[cdt][cdn];
			if (child.designation == "Setter") {
				return { filters: { name: ['in', ['Stone Setting', 'Repair']] } }
			}
			else if (child.designation == "Filer") {
				return { filters: { name: ['in', ['Filing', 'Assembling', 'Lip Setting', 'Repair']] } }
			}
			else if (child.designation == "Polisher") {
				return { filters: { name: ['in', ['Pre Polish', 'Final Polish', 'Repair']] } }
			}
			else {
				return { filters: { name: ['in', ['']] } }
			}
		});

		frm.set_query('work_type', 'mix_work_daily', (frm, cdt, cdn) => {
			var child = locals[cdt][cdn];
			if (child.designation == "Setter") {
				return { filters: { name: ['in', ['Stone Setting', 'Repair']] } }
			}
			else if (child.designation == "Filer") {
				return { filters: { name: ['in', ['Filing', 'Assembling', 'Lip Setting', 'Repair']] } }
			}
			else if (child.designation == "Polisher") {
				return { filters: { name: ['in', ['Pre Polish', 'Final Polish', 'Repair']] } }
			}
			else {
				return { filters: { name: ['in', ['']] } }
			}
		});

	},

	onload_post_render(frm) {
		// if(frappe.user.has_role('MIS Rights')){
		// 	update_all_bom_details(frm);
		// }
	},

	scan: function (frm) {
		const scanner = new frappe.ui.Scanner({
			dialog: true, // open camera scanner in a dialog
			multiple: false, // stop after scanning one value
			on_scan(data) {
				// handle_scanned_barcode(data.decodedText);
				console.log(data);
				// update_bag_transaction(frm, data.decodedText);
			}
		});
	},
	barcode: function (frm) {
		if (frm.doc.barcode) {
			var barcode = frm.doc.barcode.replace('\n', '');
			barcode = barcode.trim();
			fetchEmployeeDetails(frm, barcode, 'barcode', 'bag_transaction', 'employee_code', 'employee_name', 'sub_department', 'designation');
		}
	},

	fetch_data: function (frm) {
		if (frm.doc.manual_barcode) {
			var manual_barcode = frm.doc.manual_barcode;
			fetchEmployeeDetails(frm, manual_barcode, 'manual_barcode', 'bag_transaction', 'employee_code', 'employee_name', 'sub_department', 'designation');
		}
	},

	company: function (frm) {
		if (frm.doc.company) {
			frm.set_value('re_work_company', frm.doc.company);
			frm.set_value('mix_work_company', frm.doc.company);
		}
	},

	re_work_barcode: function (frm) {
		if (frm.doc.re_work_barcode) {
			var re_work_barcode = frm.doc.re_work_barcode.replace('\n', '');
			re_work_barcode = re_work_barcode.trim();
			fetchEmployeeDetails(frm, re_work_barcode, 're_work_barcode', 're_work_daily', 're_work_emp_code', 're_work_emp_name', 're_work_sub_dpt', 're_work_designation');
		}
	},


	fetch_data_button: function (frm) {
		if (frm.doc.manual_barcode_rework) {
			var manual_barcode_rework = frm.doc.manual_barcode_rework;
			fetchEmployeeDetails(frm, manual_barcode_rework, 'manual_barcode_rework', 're_work_daily', 're_work_emp_code', 're_work_emp_name', 're_work_sub_dpt', 're_work_designation');
		}
	},

	mix_work_barcode: function (frm) {
		if (frm.doc.mix_work_barcode) {
			var mix_work_barcode = frm.doc.mix_work_barcode.replace('\n', '');
			mix_work_barcode = mix_work_barcode.trim();
			fetchEmployeeDetails(frm, mix_work_barcode, 'mix_work_barcode', 'mix_work_daily', 'mix_work_emp_code', 'mix_work_emp_name', 'mix_work_sub_dpt', 'mix_work_designation');
		}
	},

	fetch_data_mix_work: function (frm) {
		if (frm.doc.manual_barcode_mixwork) {
			var manual_barcode_mixwork = frm.doc.manual_barcode_mixwork;
			fetchEmployeeDetails(frm, manual_barcode_mixwork, 'manual_barcode_mixwork', 'mix_work_daily', 'mix_work_emp_code', 'mix_work_emp_name', 'mix_work_sub_dpt', 'mix_work_designation');
		}
	},


});



frappe.ui.form.on("DT Bag Transaction", {
	out_time: function (frm, cdt, cdn) {
		updateOutTimeManually(frm, cdt, cdn)
	},
	in_quantity: function (frm, cdt, cdn) {
		calculate_weight(frm, cdt, cdn);
		// frm.enable_save();
		// var child = locals[cdt][cdn];
		// frappe.model.set_value(cdt, cdn, 'diff_qty', parseFloat(checkDigit(child.in_quantity)) - parseFloat(checkDigit(child.out_quantity)));
		// if (child.in_quantity > child.bag_quantity) {
		//     frappe.model.set_value(cdt, cdn, 'in_quantity', 0);
		//     frappe.throw("In Quantity should be less than Bag Quantity");
		//     frm.disable_save();
		// }
	},
	out_quantity: function (frm, cdt, cdn) {
		calculate_weight(frm, cdt, cdn);
		// frm.enable_save();
		// var child = locals[cdt][cdn];
		// frappe.model.set_value(cdt, cdn, 'diff_qty', parseFloat(checkDigit(child.in_quantity)) - parseFloat(checkDigit(child.out_quantity)));
		// if (child.out_quantity > child.in_quantity) {
		//     frappe.model.set_value(cdt, cdn, 'out_quantity', 0);
		//     frappe.throw("Out Quantity should be less than IN Quantity");
		//     frm.disable_save();
		// }
	},
	bag_quantity:function (frm,cdt,cdn){
		calculate_total_stone_man(frm, cdt, cdn);
	},

	stone_qty:function (frm,cdt,cdn){
		calculate_total_stone_man(frm, cdt, cdn);
	}



	// update_out_time: function (frm, cdt, cdn) {
	//     updateOutTime(frm, cdt, cdn);
	// },


});

function update_all_bom_details(frm) {
	if (frm.doc.bag_transaction) {
		for (var i = 0; i < frm.doc.bag_transaction.length; i++) {
			update_bag_details(frm, frm.doc.bag_transaction[i].doctype, frm.doc.bag_transaction[i].name, 'bag_transaction');
		}
	}

	if (frm.doc.re_work_daily) {
		for (var i = 0; i < frm.doc.re_work_daily.length; i++) {
			update_bag_details(frm, frm.doc.re_work_daily[i].doctype, frm.doc.re_work_daily[i].name, 're_work_daily');
		}
	}

	if (frm.doc.mix_work_daily) {
		for (var i = 0; i < frm.doc.mix_work_daily.length; i++) {
			update_bag_details(frm, frm.doc.mix_work_daily[i].doctype, frm.doc.mix_work_daily[i].name, 'mix_work_daily');
		}
	}
}



function calculate_weight(frm, cdt, cdn) {
	frm.enable_save();
	var child = locals[cdt][cdn];

	frappe.model.set_value(cdt, cdn, 'diff_qty', parseFloat(parseFloat(checkDigit(child.in_quantity)) - parseFloat(checkDigit(child.out_quantity))).toFixed(4));

	if (child.in_quantity > child.bag_quantity) {
		frappe.model.set_value(cdt, cdn, 'in_quantity', 0);
		frappe.throw("In Quantity should be less than Bag Quantity");
		frm.disable_save();
	}

	if (child.out_quantity > child.in_quantity) {
		frappe.model.set_value(cdt, cdn, 'out_quantity', 0);
		frappe.throw("Out Quantity should be less than IN Quantity");
		frm.disable_save();
	}

	if(child.total_design_bom_weight > 0) { }
	else { frappe.model.set_value(cdt, cdn, 'total_design_bom_weight', parseFloat(parseFloat(checkDigit(child.in_quantity)) * parseFloat(checkDigit(child.design_bom_weight))).toFixed(4)); }

	
	frappe.model.set_value(cdt, cdn, 'total_stone_quantity', parseFloat(parseFloat(checkDigit(child.in_quantity)) * parseFloat(checkDigit(child.stone_quantity))).toFixed(1));
	frappe.model.set_value(cdt, cdn, 'total_diamond_quantity', parseFloat(parseFloat(checkDigit(child.in_quantity)) * parseFloat(checkDigit(child.diamond_quantity))).toFixed(1));
	frappe.model.set_value(cdt, cdn, 'total_wax_set_quantity', parseFloat(parseFloat(checkDigit(child.in_quantity)) * parseFloat(checkDigit(child.wax_set_quantity))).toFixed(1));
	frappe.model.set_value(cdt, cdn, 'total_hand_set_quantity', parseFloat(parseFloat(checkDigit(child.in_quantity)) * parseFloat(checkDigit(child.hand_set_quantity))).toFixed(1));

}

function calculate_total_stone_man(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var total_stone_man = parseFloat(parseFloat(checkDigit(child.bag_quantity)) * parseFloat(checkDigit(child.stone_qty))).toFixed(4);

	frappe.model.set_value(cdt, cdn, 'total_stone_man', parseFloat(parseFloat(checkDigit(total_stone_man)).toFixed(4)));

}



function update_bag_transaction(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation) {
	frappe.dom.freeze();
	console.log("data : ", data);
	// frm.set_value(field_name, '');
	if (frm.doc[emp_code]) {
		frappe.call({
			method: "pinkcityit.pinkcity_manufacturing.doctype.daily_transaction.daily_transaction.get_bag_details",
			type: "post",
			args: {
				'bag_no': data,
				'company_code': frm.doc.company,
			},
			error: function (obj) {
				console.log("hi22");
				console.log(obj);
			},
			always: function (obj) {
				console.log("hi23");
				// var obj = resp.data
				frappe.dom.unfreeze();
				console.log("Response:", obj);
				if (obj.status) {

					var check_bag = 0;
					if (frm.doc[table_name]) {
						for (let i = 0; i < frm.doc[table_name].length; i++) {
							if (obj.data.bag_no == frm.doc[table_name][i].bag_no && frm.doc[table_name][i].employee_code == frm.doc[emp_code]) {
								// check_bag = 1;

								if (frm.doc[table_name][i].out_time) {
									// check_bag = 0;
									// console.log("hi25:");
									// frappe.warn('Are you sure you want to update out time again ?',
									// 'This will update out time again for bag ' + data,
									// 		() => {
									// 				updateOutTime(frm, frm.doc.bag_transaction[i].doctype, frm.doc.bag_transaction[i].name)
									// 		},
									// 		'Continue',
									// 		true // Sets dialog as minimizable
									// )
								} else {
									check_bag = 1;
									console.log("hi26:");
									frm.doc[table_name][i].out_time = frappe.datetime.get_datetime_as_string();
									frm.doc[table_name][i].out_quantity = frm.doc[table_name][i].bag_quantity;
									frm.doc[table_name][i].diff_qty = parseFloat(checkDigit(frm.doc[table_name][i].in_quantity)) - parseFloat(checkDigit(frm.doc.bag_transaction[i].out_quantity));
									frm.doc[table_name][i].difference_minute = moment(frm.doc[table_name][i].out_time).diff(frm.doc[table_name][i].in_time, 'minutes', true);
									frm.refresh_fields("bag_transaction");
									// frm.save();

									frappe.show_alert({
										message: __('Bag ' + frm.doc[table_name][i].bag_no + ' out time is updated.'),
										indicator: 'green'
									}, 5);
								}


							}
						}
					}

					console.log("check_bag : ", check_bag);

					if (check_bag == 0) {
						if (obj.data.bag_no) {

							console.log("hi27:");
							var childTable = frm.add_child(table_name);
							childTable.bag_no = obj.data.bag_no;
							childTable.order_no = obj.data.order_no;
							childTable.bag_id = obj.data.BIdNo;
							childTable.design_code = obj.data.BOdDmCd;
							childTable.bag_quantity = obj.data.BQty;
							childTable.in_quantity = obj.data.BQty;
							childTable.diff_qty = obj.data.BQty;
							childTable.customer_code = obj.data.OmCmCd;
							childTable.customer_name = obj.data.customer_name;
							childTable.in_time = frappe.datetime.get_datetime_as_string();
							childTable.employee_code = frm.doc[emp_code];
							childTable.employee_name = frm.doc[emp_name];
							childTable.sub_department = frm.doc[emp_sub_dpt];
							childTable.designation = frm.doc[emp_designation];
							// if (childTable.designation == "Setter") {
							// 	childTable.work_type = "Stone Setting"
							// }
							// childTable.stone_quantity = parseFloat(checkDigit(obj.data.stone_qty)).toFixed(3);
							// childTable.diamond_quantity = parseFloat(checkDigit(obj.data.dia_qty)).toFixed(3);
							// childTable.design_bom_weight = parseFloat(checkDigit(obj.data.bom_wt)).toFixed(3);
							// childTable.total_stone_quantity = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.stone_qty))).toFixed(3);
							// childTable.total_diamond_quantity = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.dia_qty))).toFixed(3);
							// childTable.total_design_bom_weight = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.bom_wt))).toFixed(3);
							// frm.save();
							update_bag_details(frm, childTable.doctype, childTable.name, table_name)

							frappe.show_alert({
								message: __('Bag ' + obj.data.bag_no + ' is successfully added.'),
								indicator: 'green'
							}, 5);
						}
					}

					frm.refresh_fields(table_name);

				} else {
					frappe.msgprint(obj.msg);
				}
			},
			// btn: opts.btn, freeze: false, freeze_message: "",
			async: true,
			// url: "" || frappe.request.url,
		});

	} else {
		frappe.dom.unfreeze();
		frappe.msgprint("Please scan employee barcode first.");
	}
}




function update_bag_details(frm, cdt, cdn, table_name) {
	var child = locals[cdt][cdn];
	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.daily_transaction.daily_transaction.get_bag_more_details",
		type: "post",
		args: {
			'bag_no': child.bag_no,
			'company_code': frm.doc.company,
		},
		error: function (obj) {
			console.log("hi22");
			console.log(obj);
		},
		always: function (obj) {
			console.log("hi23");
			console.log("Response:", obj);
			if (obj.status) {
				if (obj.data.bag_no) {

					for (let i = 0; i < frm.doc[table_name].length; i++) {
						if (obj.data.bag_no == frm.doc[table_name][i].bag_no) {

							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "stone_quantity", parseFloat(checkDigit(obj.data.stone_qty)).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "wax_set_quantity", parseFloat(checkDigit(obj.data.stone_wset_qty)).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "hand_set_quantity", parseFloat(checkDigit(obj.data.stone_hset_qty)).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "diamond_quantity", parseFloat(checkDigit(obj.data.dia_qty)).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "design_bom_weight", parseFloat(checkDigit(obj.data.bom_wt)).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_stone_quantity", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.stone_qty))).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_wax_set_quantity", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.stone_wset_qty))).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_hand_set_quantity", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.stone_hset_qty))).toFixed(3));
							frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_diamond_quantity", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.dia_qty))).toFixed(3));
							// frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_design_bom_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.bom_wt))).toFixed(3));

							calculate_weight(frm, frm.doc[table_name][i].doctype, frm.doc[table_name][i].name);
						}
					}



					// frm.save();

					// frappe.show_alert({
					// 	message: __('Bag ' + obj.data.bag_no + ' is successfully added.'),
					// 	indicator: 'green'
					// }, 5);
				}

				frm.refresh_fields(table_name);

			} else {
				frappe.msgprint(obj.msg);
			}
		},
		// btn: opts.btn, freeze: false, freeze_message: "",
		async: true,
		// url: "" || frappe.request.url,
	});
}








function fetchEmployeeDetails(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation) {
	console.log("emp data : ", data)
	// frm.set_value('employee_barcode', '');
	frm.set_value(field_name, '');
	frappe.db.get_list("Employee", {
		fields: ["*"],
		filters: {
			name: data,
			company: frm.doc.company,
			status: 'Active'
		},
	}).then((obj) => {
		if (obj.length == 0) {
			update_bag_transaction(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation);
			// frappe.msgprint("No employee details found for barcode");
		}
		for (var i = 0; i < obj.length; i++) {
			frm.set_value(emp_code, obj[i].name);
			frm.set_value(emp_name, obj[i].employee_name);
			frm.set_value(emp_sub_dpt, obj[i].custom_sub_department);
			frm.set_value(emp_designation, obj[i].designation);

			frappe.show_alert({
				message: __('Employee : ' + obj[i].employee_name + ', is set for Transaction.'),
				indicator: 'green'
			}, 5);
		}
	});
}


// function updateOutTime(frm, cdt, cdn) {
//     var child = locals[cdt][cdn];
//     var out_time = frappe.datetime.get_datetime_as_string();
//     frappe.model.set_value(cdt, cdn, "out_time", out_time);
//     frappe.model.set_value(cdt, cdn, "difference_minute", moment(out_time).diff(child.in_time, 'minutes', true));

//     frappe.show_alert({
//         message: __('Bag ' + child.bag_no + ' out time is updated again.'),
//         indicator: 'green'
//     }, 5);
// }


function updateOutTimeManually(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var out_time = child.out_time;
	// frappe.model.set_value(cdt, cdn, "out_time", out_time);
	frappe.model.set_value(cdt, cdn, "difference_minute", moment(out_time).diff(child.in_time, 'minutes', true));

	frappe.show_alert({
		message: __('Bag ' + child.bag_no + ' out time is updated again.'),
		indicator: 'green'
	}, 5);
}


function checkDigit(value) {
	if (value > 0 || value < 0 ) {
		return value;
	} else {
		return 0;
	}
}




// let code = "";
// let reading = false;
//
// document.addEventListener('keypress', e => {
//   //usually scanners throw an 'Enter' key at the end of read
//    if (e.keyCode === 13) {
//           if(code.length >= 6) {
//             console.log(code);
// 						var barcode = code.replace('\n', '');
// 						barcode = barcode.trim();
// 						fetchEmployeeDetails(cur_frm, barcode);
//             code = "";
//             /// code ready to use
//          }
//     } else {
//         code += e.key; //while this is not an 'enter' it stores the every key
//     }
//
//     //run a timeout of 200ms at the first read and clear everything
//     if(!reading) {
//         reading = true;
//         setTimeout(() => {
//             code = "";
//             reading = false;
//         }, 200);  //200 works fine for me but you can adjust it
//     }
// });
