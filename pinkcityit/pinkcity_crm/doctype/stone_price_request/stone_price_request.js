frappe.ui.form.on('Stone Price Request', {
	refresh(frm) {
		// generate_stone_code(frm);
	},

	stone: function (frm) {
		if (frm.doc.stone) {
			frappe.db.get_doc("Gemstone", frm.doc.stone).then((doc) => {
				console.log(doc);
				let check = 0;
				if (doc.short_name && doc.short_name.length === 3) {
					check = 1;
				}
				if (check === 1) {
					frm.set_value('stone_short_name', doc.short_name);
					generate_stone_code(frm);
				} else {
					frm.set_value('stone', "");
					frappe.msgprint("Please update the stone short name.");
				}
			});
		}
	},

	shape: function (frm) {
		if (frm.doc.shape) {
			frappe.db.get_doc("Stone Shape", frm.doc.shape).then((doc) => {
				console.log(doc);
				let check = 0;
				if (doc.shape_aliases && doc.shape_aliases.length === 2) {
					check = 1;
				}
				if (check === 1) {
					frm.set_value('stone_short_shape', doc.shape_aliases);
					generate_stone_code(frm);
				} else {
					frm.set_value('shape', "");
					frappe.msgprint("Please update the shape short name.");
				}
			});
		}
	},

	cut: function (frm) {
		if (frm.doc.cut) {
			frappe.db.get_doc("Stone Cut", frm.doc.cut).then((doc) => {
				console.log(doc);
				let check = 0;
				if (doc.cut_aliases && doc.cut_aliases.length === 2) {
					check = 1;
				}
				if (check === 1) {
					frm.set_value('stone_short_cut', doc.cut_aliases);
					generate_stone_code(frm);
				} else {
					frm.set_value('cut', "");
					frappe.msgprint("Please update the cut short name.");
				}
			});
		}
	},

	quality: function (frm) {
		if (frm.doc.quality) {
			frappe.db.get_doc("Stone Quality", frm.doc.quality).then((doc) => {
				console.log(doc);
				let check = 0;
				if (doc.quality_aliases && doc.quality_aliases.length === 2) {
					check = 1;
				}
				if (check === 1) {
					frm.set_value('stone_short_quality', doc.quality_aliases);
					generate_stone_code(frm);
				} else {
					frm.set_value('quality', "");
					frappe.msgprint("Please update the quality short name.");
				}
			});
		}
	},

	length: function (frm) {
		if (frm.doc.length) {
			if (frm.doc.length > 0 && frm.doc.length <= 99) {
				generate_stone_code(frm);
			} else {
				frm.set_value('length', "");
				frappe.msgprint("Length should be between 0 to 99");
			}
		}
	},

	width: function (frm) {
		if (frm.doc.width) {
			if (frm.doc.width > 0 && frm.doc.width <= 99) {
				generate_stone_code(frm);
			} else {
				frm.set_value('width', "");
				frappe.msgprint("Width should be between 0 to 99");
			}
		}
	},
	price: function (frm) {
		var price = frm.doc.price || '';
		if (price) {
			frm.set_value("btn_price", "Demanding Price");
		}
	},
	before_save(frm) {
		if (checkDigit(frm.doc.price)) {
			update_price_history_table(frm);
		}
		if (checkDigit(frm.doc.weight_per_pcs_cts)) {
			update_price_history_table(frm);
		}
		if (checkDigit(frm.doc.btn_price)) {
			update_price_history_table(frm);
		}
		generate_stone_code(frm);
	},
});

function update_price_history_table(frm) {
	let check = 0;
	for (let i = 0; i < frm.doc.price_history.length; i++) {
		if (frm.doc.price == frm.doc.price_history[i].price && frm.doc.weight_per_pcs_cts == frm.doc.price_history[i].weight_per_pcs_cts && frm.doc.uom == frm.doc.price_history[i].uom) {
			check = 1;
		}
	}
	if (check === 0) {
		let childTable = frm.add_child("price_history");
		childTable.price = frm.doc.price;
		childTable.weight_per_pcs_cts = frm.doc.weight_per_pcs_cts;
		childTable.btn_price = frm.doc.btn_price;
		childTable.uom = frm.doc.uom;
		// childTable.uom = frm.doc.uom;
		frm.refresh_field("price_history");
	}
	generate_stone_code(frm);
}

function checkDigit(value) {
	return value !== 0 ? value : 0;
}

function generate_stone_code(frm) {
	let stone_code = "";

	stone_code += checkString(frm.doc.stone_short_name) || 'XXX';
	stone_code += checkString(frm.doc.stone_short_cut) || 'XX';
	stone_code += checkString(frm.doc.stone_short_shape) || 'XX';
	stone_code += generate_stone_code_for_digit(frm.doc.length);
	stone_code += generate_stone_code_for_digit(frm.doc.width);
	stone_code += checkString(frm.doc.stone_short_quality) || 'XX';

	frm.set_value('stone_code', stone_code);
}

function checkString(value) {
	return value ? value : '';
}

function generate_stone_code_for_digit(value) {
	let digit_code = '00';
	if (checkDigit(value)) {
		digit_code = value < 10 ? '0' + value : value.toString();
	}
	return digit_code;
}
