// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on('Plating Transaction', {
    refresh(frm) {
		// if(frappe.user.has_role('MIS Rights')){
		// 	// update_all_bom_details(frm);
		// }
    },

	onload_post_render(frm) {
		// if(frappe.user.has_role('MIS Rights')){
		// 	update_all_bom_details(frm);
		// }
    },

    scan: function (frm) {
        const scanner = new frappe.ui.Scanner({
            dialog: true, // open camera scanner in a dialoga
            multiple: false, // stop after scanning one value
            on_scan(data) {
                console.log(data);
                // update_bag_transaction(frm, data.decodedText);
            }
        });
    },

    barcode: function (frm) {
        if (frm.doc.barcode) {
            var barcode = frm.doc.barcode.replace('\n', '');
            barcode = barcode.trim();
            // fetchEmployeeDetails(frm, barcode, 'barcode', 'mateler_bag_detail');
            update_mateler_bag_detail(frm, barcode, 'barcode', 'mateler_bag_detail');
        }
    },

    company: function (frm) {
        if (frm.doc.company) {
            frm.set_value('re_work_company', frm.doc.company);
        }
    },

    re_work_barcode: function (frm) {
        if (frm.doc.re_work_barcode) {
            var re_work_barcode = frm.doc.re_work_barcode.replace('\n', '');
            re_work_barcode = re_work_barcode.trim();
            // fetchEmployeeDetails(frm, re_work_barcode, 're_work_barcode', 'bag_re_work_detail');
            update_mateler_bag_detail(frm, re_work_barcode, 're_work_barcode', 'bag_re_work_detail');
        }
    },





});



frappe.ui.form.on("Plating Matler Bag Detail", {

    plating_in_weight: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn);
    },
    plating_out_weight: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn);
    },
    before_weight: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn)
    },
    after_weight: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn)
    },

    stone_weight_per_pc: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn);
    },
    bag_quantity: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn);
    },
    total_stone_weight: function (frm, cdt, cdn) {
        calculate_weight(frm, cdt, cdn);
    },
});


function update_all_bom_details(frm) {
	if(frm.doc.mateler_bag_detail) {
		for (var i = 0; i < frm.doc.mateler_bag_detail.length; i++) {
			update_bag_details(frm, frm.doc.mateler_bag_detail[i].doctype, frm.doc.mateler_bag_detail[i].name, 'mateler_bag_detail');
		}
	}

	if(frm.doc.bag_re_work_detail) {
		for (var i = 0; i < frm.doc.bag_re_work_detail.length; i++) {
			console.log("hi82#")
			update_bag_details(frm, frm.doc.bag_re_work_detail[i].doctype, frm.doc.bag_re_work_detail[i].name, 'bag_re_work_detail');
		}
	}
}



function calculate_weight(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
	var total_stone_weight = parseFloat(checkDigit(child.stone_weight_per_pc)) * parseFloat(checkDigit(child.bag_quantity));
	var total_diamond_weight = parseFloat(checkDigit(child.diamond_weight_per_pc)) * parseFloat(checkDigit(child.bag_quantity));
	var total_design_bom_weight = parseFloat(checkDigit(child.design_bom_weight)) * parseFloat(checkDigit(child.bag_quantity));
	var total_design_metal_weight = parseFloat(parseFloat(checkDigit(child.design_bom_weight)) + parseFloat(checkDigit(child.stone_weight_per_pc)) + parseFloat(checkDigit(child.diamond_weight_per_pc)) )  * parseFloat(checkDigit(child.bag_quantity));
	frappe.model.set_value(cdt, cdn, "total_stone_weight", parseFloat(checkDigit( total_stone_weight )).toFixed(4));
	frappe.model.set_value(cdt, cdn, "total_diamond_weight", parseFloat(checkDigit( total_diamond_weight )).toFixed(4));
	frappe.model.set_value(cdt, cdn, "total_design_bom_weight", parseFloat(checkDigit( total_design_bom_weight )).toFixed(4));
	frappe.model.set_value(cdt, cdn, "total_design_metal_weight", parseFloat(checkDigit( total_design_metal_weight )).toFixed(4));

    var design_metal_in_weight = parseFloat(checkDigit(child.plating_in_weight)) - total_stone_weight;
    var design_metal_out_weight = parseFloat(checkDigit(child.plating_out_weight)) - total_stone_weight;
    frappe.model.set_value(cdt, cdn, "design_metal_in_weight", parseFloat(checkDigit(design_metal_in_weight)).toFixed(4));
    frappe.model.set_value(cdt, cdn, "design_metal_out_weight", parseFloat(checkDigit(design_metal_out_weight)).toFixed(4));

	var difference_weight = parseFloat(checkDigit(child.plating_out_weight)) - parseFloat(checkDigit(child.plating_in_weight));
    frappe.model.set_value(cdt, cdn, 'difference_weight', parseFloat(checkDigit(difference_weight)).toFixed(4));

    var difference = parseFloat(checkDigit(child.before_weight)) - parseFloat(checkDigit(child.after_weight));
    frappe.model.set_value(cdt, cdn, 'difference', parseFloat(checkDigit(difference)).toFixed(4));

}



function update_mateler_bag_detail(frm, data, field_name, table_name) {
    console.log("data : ", data)
    frm.set_value(field_name, '');


    frappe.call({
      method: "pinkcityit.pinkcity_manufacturing.doctype.plating_transaction.plating_transaction.get_bag_details",
      type: "post",
      args: {
        'bag_no': data,
        'company_code': frm.doc.company,
      },
      error: function(obj) {
        // console.log("hi22");
        // console.log(obj);
        console.log("Error response:", obj);
        frappe.msgprint("Something went wrong.");
      },
      always: function(obj) {
        console.log("Response:", obj);
        if (obj.status) {
            frm.set_value('current_bag', obj.data.bag_no);
            var check_bag = 0;
            if (frm.doc[table_name]) {
                for (let i = 0; i < frm.doc[table_name].length; i++) {
                    if (obj.data.bag_no == frm.doc[table_name][i].bag_no) {
                        if (frm.doc[table_name][i].plating_out_weight) {

                        } else {
                            check_bag = 1;
                            frm.doc[table_name][i].out_time = frappe.datetime.get_datetime_as_string();
                            frm.doc[table_name][i].difference_minute = moment(frm.doc[table_name][i].out_time).diff(frm.doc[table_name][i].in_time, 'minutes', true);
                            frm.refresh_fields(table_name);
                            frm.save();

                            frappe.show_alert({
                                message: __('Bag ' + frm.doc[table_name][i].bag_no + ' out time is updated and this bag is cuurent bag.'),
                                indicator: 'green'
                            }, 5);
                        }
                    }
                }
            }
            if (check_bag == 0) {
                if (obj.data) {

                    //  if (frm.fields_dict[table_name] && frm.fields_dict[table_name].grid) {
                    var childTable = frm.add_child(table_name);

                    childTable.customer_name = obj.data.customer_name;
                    childTable.customer_code = obj.data.OmCmCd;
                    childTable.order_no = obj.data.order_no;
                    childTable.bag_no = obj.data.bag_no;
                    childTable.bag_quantity = obj.data.BQty;
                    childTable.bag_quantitys = obj.data.BQty;
                    childTable.bag_id = obj.data.BIdNo;
                    childTable.design_code = obj.data.BOdDmCd;
                    childTable.design_category = obj.data.DmCtg;
					childTable.plating_code = obj.data.OdCmStmpInst;
					childTable.purchase_order_no = obj.data.OmPoNo;
					childTable.in_time = frappe.datetime.get_datetime_as_string();
                    // childTable.stone_weight_per_pc = parseFloat(parseFloat(checkDigit(obj.data.stone_wt)) / 5).toFixed(4);
                    // childTable.diamond_weight_per_pc = parseFloat(parseFloat(checkDigit(obj.data.dia_wt)) / 5).toFixed(4);
                    // childTable.design_bom_weight = parseFloat(checkDigit(obj.data.bom_wt)).toFixed(3);
                    // childTable.total_design_bom_weight = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.bom_wt))).toFixed(3);
                    // childTable.total_stone_weight = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.stone_wt)) / 5 ) ).toFixed(4);
                    // childTable.total_diamond_weight = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.dia_wt)) / 5 ) ).toFixed(4);
                    // childTable.total_design_metal_weight = parseFloat(parseFloat(checkDigit(obj.data.BQty)) * (parseFloat(checkDigit(obj.data.bom_wt)) + (parseFloat(checkDigit(obj.data.stone_wt)) / 5) + (parseFloat(checkDigit(obj.data.dia_wt)) / 5))).toFixed(3);
 

					update_bag_details(frm, childTable.doctype, childTable.name, table_name);

                    // frm.save();

                    frappe.show_alert({
                        message: __('Bag ' + obj.data.bag_no + ' is successfully added.'),
                        indicator: 'green'
                    }, 5);
                }
                //  else {
                //                         console.error("Child table not found:", table_name);
                //                         frappe.msgprint("Error: Child table does not exist in this form.");
                //                     }
                // 		}
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


function update_bag_details(frm, cdt, cdn, table_name) {
	var child = locals[cdt][cdn];
	frappe.call({
		method: "pinkcityit.pinkcity_manufacturing.doctype.plating_transaction.plating_transaction.get_bag_more_details",
		type: "post",
		args: {
			'bag_no': child.bag_no,
			'company_code': frm.doc.company,
		},
		error: function(obj) {
			console.log("hi22"); 
			console.log(obj);
		},
		always: function(obj) {
			console.log("hi23"); 
			console.log("Response:", obj);
			if (obj.status) {
				if (obj.data.bag_no) {
					
                    for (let i = 0; i < frm.doc[table_name].length; i++) {
                        if (obj.data.bag_no == frm.doc[table_name][i].bag_no) {
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "purchase_order_no", obj.data.OmPoNo);
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "stone_weight_per_pc", parseFloat(checkDigit(obj.data.stone_wt) / 5).toFixed(4));
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "diamond_weight_per_pc", parseFloat(checkDigit(obj.data.dia_wt) / 5).toFixed(4));
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "design_bom_weight", parseFloat(checkDigit(obj.data.bom_wt)).toFixed(3));
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_stone_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.stone_wt)) / 5 ) ).toFixed(4));
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_diamond_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.dia_wt)) / 5 ) ).toFixed(4));
                            frappe.model.set_value(frm.doc[table_name][i].doctype, frm.doc[table_name][i].name, "total_design_bom_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.bom_wt))).toFixed(3));

                            calculate_weight(frm, frm.doc[table_name][i].doctype, frm.doc[table_name][i].name);
                        }
                    }

					// frappe.model.set_value(cdt, cdn, "stone_weight_per_pc", parseFloat(checkDigit(obj.data.stone_wt) / 5).toFixed(4));
					// frappe.model.set_value(cdt, cdn, "diamond_weight_per_pc", parseFloat(checkDigit(obj.data.dia_wt) / 5).toFixed(4));
					// frappe.model.set_value(cdt, cdn, "design_bom_weight", parseFloat(checkDigit(obj.data.bom_wt)).toFixed(3));
					// frappe.model.set_value(cdt, cdn, "total_stone_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.stone_wt)) / 5 ) ).toFixed(4));
					// frappe.model.set_value(cdt, cdn, "total_diamond_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * ( parseFloat(checkDigit(obj.data.dia_wt)) / 5 ) ).toFixed(4));
					// frappe.model.set_value(cdt, cdn, "total_design_bom_weight", parseFloat(parseFloat(checkDigit(obj.data.BQty)) * parseFloat(checkDigit(obj.data.bom_wt))).toFixed(3));

					// calculate_weight(frm, cdt, cdn);

					frm.save();

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




function updateWeight(frm, table_name, weight) {
    var check_bag = 0;

    console.log("hi21");

    if (checkDigit(weight) == 0) {
        return;
    }

    if (frm.doc[table_name]) {
        console.log("hi22");
        for (let i = 0; i < frm.doc[table_name].length; i++) {
            console.log("hi23");
            if (frm.doc.current_bag == frm.doc[table_name][i].bag_no) {
                console.log("hi24");
                if (!frm.doc[table_name][i].plating_in_weight) {
                    console.log("hi25");
                    check_bag = 1;
                    frm.doc[table_name][i].plating_in_weight = checkDigit(weight);
                    calculate_weight(frm, frm.doc[table_name][i].doctype, frm.doc[table_name][i].name);

                    frm.refresh_fields(table_name);
                    frm.save();

                    frappe.show_alert({
                        message: __('Bag ' + frm.doc.current_bag + ' In weight is updated.'),
                        indicator: 'green'
                    }, 5);

                    break;

                }
                else if (!frm.doc[table_name][i].plating_out_weight) {
                    console.log("hi26");
                    check_bag = 1;
                    frm.doc[table_name][i].plating_out_weight = checkDigit(weight);
                    calculate_weight(frm, frm.doc[table_name][i].doctype, frm.doc[table_name][i].name);
                    frm.refresh_fields(table_name);
                    frm.save();

                    frappe.show_alert({
                        message: __('Bag ' + frm.doc.current_bag + ' Out weight is updated.'),
                        indicator: 'green'
                    }, 5);

                    break;

                }
            }
        }
    }


    if (check_bag == 0) {
        console.log("hi27");
        frappe.show_alert({
            message: __('Bag ' + frm.doc.current_bag + ' In weight and Out weight is already updated.'),
            indicator: 'red'
        }, 5);
    }

}


function checkDigit(value) {
    if (value > 0 || value < 0) {
        return value;
    } else {
        return 0;
    }
}


let code = "";
let reading = false;

// document.addEventListener('keypress', e => {

//     console.log("e : ", e)
//   //usually scanners throw an 'Enter' key at the end of read
//    if (e.keyCode === 13) {
//           if(code.length >= 3) {
//             console.log("code : ", code);
// 			var weight = code.replace('\n', '');
// 			weight = weight.trim();
// 			updateWeight(cur_frm, 'mateler_bag_detail', weight);
//             code = "";
//             /// code ready to use
//          }
//     } else {
//         code += e.key; //while this is not an 'enter' it stores the every key
//     }

//     //run a timeout of 200ms at the first read and clear everything
//     if(!reading) {
//         reading = true;
//         setTimeout(() => {
//             code = "";
//             reading = false;
//         }, 200);  //200 works fine for me but you can adjust it
//     }
// });




document.addEventListener('keypress', e => {

    console.log("e : ", e)
    //usually scanners throw an 'Enter' key at the end of read
    if (e.keyCode === 13) {
        if (code.length >= 3) {
            console.log("hi31 ")
            console.log("code : ", code);
            var weight = code.replace('\n', '');
            weight = weight.trim();
            updateWeight(cur_frm, 'mateler_bag_detail', weight);
            code = "";
            /// code ready to use
        }
    } else {
        code += e.key; //while this is not an 'enter' it stores the every key
    }

    //run a timeout of 200ms at the first read and clear everything
    if (!reading) {
        reading = true;
        setTimeout(() => {
            if (code.length >= 4) {
                console.log("hi32 ")
                console.log("code : ", code);
                var weight = code.replace('\n', '');
                weight = weight.trim();
                updateWeight(cur_frm, 'mateler_bag_detail', weight);
                code = "";
                /// code ready to use
            }
            code = "";
            reading = false;
        }, 300);  //200 works fine for me but you can adjust it
    }
});
