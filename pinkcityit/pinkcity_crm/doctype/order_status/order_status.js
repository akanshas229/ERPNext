frappe.ui.form.on('Order Status', {
    onload: function (frm) {

        let check = 0;
        if (checkDigit(frm.doc.total_order_quantity) > 0) {
            if (frm.doc.total_order_quantity == frm.doc.total_sales_invoice_qty) {
                check = 1;
            }
        }

        if (check == 0) {
            // fetch_order_details_api(frm);
            // fetch_diamond_details_api(frm);
        }



    },
    onload_post_render: function (frm) {
        // Loop through all the grids on the form
        for (let i = 0; i < frm.grids.length; i++) {
            // Hide all grid actions for everyone
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-remove-rows').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-add-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-delete-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-duplicate-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-move-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-append-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-insert-row-below').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-insert-row').hide();
            frm.fields_dict[frm.grids[i].df.fieldname].grid.wrapper.find('.grid-upload').hide();
        }
    },

    refresh(frm) {


        // if (frappe.user.has_role('MIS Rights')) {
        //     frm.add_custom_button(__("Fetch Order Details"), function () {
        //         fetch_order_details_api(frm);
        //         fetch_diamond_details_api(frm);
        //     });
        // }

        if (frappe.user.has_role('MIS Rights')) {
            frm.add_custom_button(__("Update Details"), function () {

                fetch_order_details_api(frm);
                // fetch_diamond_details_api(frm);
                // fetch_costing_status(frm);

                // fetch_stone_procurement_data(frm);

                // fetch_diamond_pro_details(frm);

                if (frm.doc.order_status != "Order Completed") {
                    fetch_what_is_where_api(frm);
                }
                else {
                    // frm.doc.what_is_where = [];
                    delete_summary_table(frm, 'what_is_where');
                    frm.set_value('total_bag_qty', 0);
                    frm.refresh_fields("what_is_where");
                    // calculate_what_is_where_master(frm);
                }


            });
        }

        if (frm.doc.docstatus == 0 && !frm.is_new()) {
            frm.set_intro("This document will be auto update until, Order Quantity is equal to Sales Invoice Quantity", 'red');
        }


        $(` input[data-fieldname="order_value"],
            input[data-fieldname="remark"]
            `).css({
            'background': 'linear-gradient(45deg, rgb(243 219 243), rgb(191 194 239), rgb(239 232 255))',
            'color': 'black',
        });
        const $labelsToColor = $(`label.control-label:contains("Priority"),
                                        label.control-label:contains("Order Type"),
                                        label.control-label:contains("Sales Person Name"),
                                        label.control-label:contains("Order Recieved Date"),
                                        label.control-label:contains("Shipment Date"),
                                        label.control-label:contains("Shipment Month"),
                                        label.control-label:contains("ERP Planning Sent"),
                                        label.control-label:contains("Order Status")`);

        $labelsToColor.css({
            'color': '#6e6eeb',
            'font-weight': 'bold'
        });
        //   background: linear-gradient(45deg, rgb(243 219 243), rgb(191 194 239), rgb(239 232 255));
        // color: black;

        //   $('select[data-fieldname="erp_planning_set"]').css({
        //         'background':'linear-gradient(45deg, rgb(222 148 225), rgb(228 230 255))',
        //       'color': 'black',
        //   });
        $('select[data-fieldname="status"]').css({
            'background': 'linear-gradient(45deg, rgb(222 148 225), rgb(228 230 255))',
            'color': 'black',
        });
        $($($($('div[data-fieldname ="buyers_name"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="final_order_no"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_no_of_qty"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_order_quantity"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });



        $($($($('div[data-fieldname ="total_sales_invoice_qty_sum"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_sales_invoice_price"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_quantity"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_design_weight"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });

        $($($($('div[data-fieldname ="req_total_stone_qty"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="req_total_stone_wt"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_diamond_weight"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_accessories_by_weight"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_diamond_weigh"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_stone_bom_qty"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_quantity"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_sales_invoice_qty"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_sales_qty_weight"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_design_weight"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $($($($('div[data-fieldname ="total_bag_qty"]')).children().children()[1]).children()[1]).css({
            'background-color': 'rgb(205 204 242 / 74%)',  // Change to your desired background color
            'color': 'rgb(0, 0, 0)',                 // Example text color
            'border': '1px solid rgb(204, 204, 204)'
        });
        $('.grid-heading-row').css('font-weight', 'bold');


        // $('div[data-fieldname="status"], div[data-fieldname="location"]').css({
        //     'background-color': '#ff9200',
        //     'color': '#ffffff'
        // });
        //     $($($('div[data-fieldname="customer_code"]').children().children()[0]).children()[0]).css({
        //       'color': 'pink',
        //       '-webkit-text-stroke': 'medium'
        //   })

        $('.control-label').css('font-weight', 'bold');


        $('div[data-fieldname="status"]').each(function () {
            if ($($(this).children()[1])[0].innerText == 'Order Completed') {
                $($($(this).children()[1])[0]).css({
                    'color': 'green',
                    '-webkit-text-stroke': 'medium'
                })
            }
            else if ($($(this).children()[1])[0].innerText == 'Completed') {
                $($($(this).children()[1])[0]).css({
                    'color': 'green',
                    '-webkit-text-stroke': 'medium'
                })
            }
            else if ($($(this).children()[1])[0].innerText == 'Status') {
                $($($(this).children()[1])[0]).css({
                    'color': '#313b44',
                    '-webkit-text-stroke': 'medium'
                })
            }
            else {
                $($($(this).children()[1])[0]).css({
                    'color': 'red',
                    '-webkit-text-stroke': 'medium'
                })
            }
        });


        // your code here
        // calculate_total_stone_master(frm);
    },


    order_recieved_date: function (frm) {
        date_validation(frm);
    },
    shipment_date: function (frm) {
        date_validation(frm);
    },

    // req_total_stone_wt: function (frm) {
    //     calculate_total_stone_master(frm);
    // },
    // req_total_stone_qty: function (frm) {
    //     calculate_total_stone_master(frm);
    // },


})

frappe.ui.form.on('OS Sales Invoice Price', {
    sales_price: function (frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        if (row.sales_price && row.quantity) {
            var invoice_price = checkDigit(row.sales_price) * checkDigit(row.quantity);
            frappe.model.set_value(cdt, cdn, 'invoice_price', invoice_price);
            update_total_invoice_rate(frm);
        }
    }
});

frappe.ui.form.on("OS Order Designs", {
    product_price: function (frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'order_value', parseFloat(checkDigit(child.product_price)) * parseFloat(checkDigit(child.quantity)));
        update_order_value_usd(frm, cdt, cdn);
    }
});


function update_order_value_usd(frm, cdt, cdn) {
    var order_value_usd = 0
    if (frm.doc.order_designs) {
        for (let i = 0; i < frm.doc.order_designs.length; i++) {
            order_value_usd += parseFloat(checkDigit(frm.doc.order_designs[i].order_value))
        }
    }
    frm.set_value('order_value', order_value_usd);
}

function update_total_invoice_rate(frm) {
    let total_invoice_rate = 0;
    frm.doc.invoice_price.forEach(function (row) {
        total_invoice_rate += parseFloat(checkDigit(row.invoice_price)); // Adding invoice_price to the total
    });
    frm.set_value('total_invoice_rate', total_invoice_rate);
    frm.set_value('total_sales_invoice_price', total_invoice_rate);

    // frm.doc.sale_invoice_price = [];
    // var sale_invoice_price = [];
    // for (var i = 0; i < frm.doc.invoice_price.length; i++) {
    //     if (frm.doc.invoice_price[i]) {
    //         // let invoices = frm.doc.invoice_price[i];
    //         let check = 0;

    //         for (let j = 0; j < frm.doc.sale_invoice_price.length; j++) {
    //             if (frm.doc.sale_invoice_price[j].invoice_no == frm.doc.invoice_price[i].invoice_no) {
    //                 check = 1;
    //                 frm.doc.sale_invoice_price[j].quantity += parseFloat(checkDigit(frm.doc.invoice_price[i].quantity));
    //                 frm.doc.sale_invoice_price[j].invoice_price += parseFloat(checkDigit(frm.doc.invoice_price[i].invoice_price));
    //             }
    //         }

    //     }
    // };

    for (var i = 0; i < frm.doc.sale_invoice_price.length; i++) {
        // if (frm.doc.invoice_price[i]) {
        // let invoices = frm.doc.invoice_price[i];
        // let check = 0;
        frm.doc.sale_invoice_price[i].quantity = 0
        frm.doc.sale_invoice_price[i].invoice_price = 0

        for (let j = 0; j < frm.doc.invoice_price.length; j++) {
            if (frm.doc.sale_invoice_price[i].invoice_no == frm.doc.invoice_price[j].invoice_no) {
                // check = 1;
                frm.doc.sale_invoice_price[i].quantity += parseFloat(checkDigit(frm.doc.invoice_price[j].quantity));
                frm.doc.sale_invoice_price[i].invoice_price += parseFloat(checkDigit(frm.doc.invoice_price[j].invoice_price));
            }
        }

        // }
    };


    // delete_summary_table(frm, 'sale_invoice_price');

    // var sale_invoice_price = []

    // var total_invoice_qty = 0

    // var total_sales_invoice_qty_sum = 0
    // var total_sales_invoice_price = 0

    // for (let i = 0; i < frm.doc.sale_invoice_price.length; i++) {

    //     total_invoice_qty += parseFloat(checkDigit(frm.doc.sale_invoice_price[i].quantity));

    //     // if (obj.data.invoice_design_details) {
    //         // let invoices = obj.data.invoice_design_details[i];
    //         let check = 0;

    //         for (let j = 0; j < sale_invoice_price.length; j++) {
    //             if (sale_invoice_price[j].invoice_no == frm.doc.sale_invoice_price[i].invoice_no) {
    //                 check = 1;
    //                 sale_invoice_price[j].quantity = parseFloat(checkDigit(sale_invoice_price[j].quantity)) + parseFloat(checkDigit(frm.doc.sale_invoice_price[i].quantity));
    //                 sale_invoice_price[j].invoice_price += parseFloat(checkDigit(frm.doc.sale_invoice_price[i].invoice_price));
    //             }
    //         }

    //         if (check == 0) {
    //             sale_invoice_price.push({
    //                 invoice_no: frm.doc.sale_invoice_price[i].invoice_no,
    //                 invoice_date: frm.doc.sale_invoice_price[i].invoice_date,
    //                 quantity: frm.doc.sale_invoice_price[i].quantity,
    //                 invoice_price: parseFloat(checkDigit(frm.doc.sale_invoice_price[i].invoice_price)),
    //             });
    //         }
    //     // }
    // }

    // for (let i = 0; i < sale_invoice_price.length; i++) {
    //     let child = frm.add_child("sale_invoice_price");
    //     child.invoice_no = sale_invoice_price[i].invoice_no;
    //     child.quantity = sale_invoice_price[i].quantity;
    //     child.invoice_date = sale_invoice_price[i].invoice_date;
    //     child.invoice_price = sale_invoice_price[i].invoice_price;

    //     total_sales_invoice_qty_sum += parseFloat(checkDigit(sale_invoice_price[i].quantity));
    //     total_sales_invoice_price += parseFloat(checkDigit(sale_invoice_price[i].invoice_price));
    // }


    // frm.set_value('total_invoice_qty', total_invoice_qty)

    // frm.set_value('total_sales_invoice_qty_sum', total_sales_invoice_qty)
    // frm.set_value('total_sales_invoice_price', total_sales_qty_weight)



    frm.refresh_field("sale_invoice_price");

}

function fetch_order_details_api(frm) {

    frappe.call({
        method: "pinkcityit.pinkcity_crm.doctype.order_status.order_status.get_order_details",
        args: {
            order_id: frm.doc.order_id,
            company_code: frm.doc.company_code
        },
        always: function (obj) {
            console.log(obj);
            if (obj.status) {


                // For Order Details  ---------------------------------------------------------------------------------

                frm.set_value('buyers_name', obj.data.orders_details.CmName)
                frm.set_value('customer_code', obj.data.orders_details.OmCmCd)
                if (obj.data.orders_details.OmCoCd == "PJ2") { frm.set_value('production_unit_name', "Pinkcity Jewelhouse Private Limited-Unit 2") }
                if (obj.data.orders_details.OmCoCd == "PJ") { frm.set_value('production_unit_name', "Pinkcity Jewelhouse Private Limited- Unit 1") }
                if (obj.data.orders_details.OmCoCd == "PC") { frm.set_value('production_unit_name', "Pinkcity Jewelhouse Private Ltd-Mahapura") }
                frm.set_value('purchase_order_no', obj.data.orders_details.OmPoNo)
                frm.set_value('order_year', obj.data.orders_details.OmYy)
                frm.set_value('order_type', obj.data.orders_details.OmChr)
                frm.set_value('order_num', obj.data.orders_details.OmNo)
                frm.set_value('final_order_no', obj.data.orders_details.OmCoCd + "/" + obj.data.orders_details.order_no)
                frm.set_value('production_due_date', obj.data.orders_details.OmExpDelDt)
                frm.set_value('open_order_in_erp', obj.data.orders_details.OmDt)

                if (obj.data.orders_details.bal_qty == 0) {
                    if (obj.data.orders_details.order_qty == 0) {
                        frm.set_value('order_status', "Order Inserting")
                    }
                    else if (obj.data.orders_details.order_qty > 0) {
                        frm.set_value('order_status', "Order Completed")
                    }
                }
                else {
                    if (obj.data.orders_details.order_qty == obj.data.orders_details.bal_qty) {
                        frm.set_value('order_status', "Order in Production")
                    }
                    else if (obj.data.orders_details.order_qty > obj.data.orders_details.bal_qty) {
                        frm.set_value('order_status', "Partially Completed")
                    }
                }





                // For Order Design ---------------------------------------------------------------------------------

                insert_or_update_entries(frm, 'order_designs', 'order_design_id', 'orders_design_details', 'OdIdNo', obj)
                delete_summary_table(frm, 'order_design_detail');

                var order_design_detail = []
                var total_no_of_qty = 0
                var total_order_quantity = 0

                for (let i = 0; i < obj.data.orders_design_details.length; i++) {

                    total_no_of_qty += obj.data.orders_design_details[i].OdOrdQty


                    /// for summary --------------------------------------------------------------------
                    let bomDetail = obj.data.orders_design_details[i];
                    let check = 0;
                    for (let j = 0; j < order_design_detail.length; j++) {
                        if (order_design_detail[j].category === bomDetail.DmCtg && order_design_detail[j].metal === bomDetail.OdKt) {
                            check = 1;
                            order_design_detail[j].quantity = parseFloat(parseFloat(order_design_detail[j].quantity) + parseFloat(bomDetail.OdOrdQty));
                        }
                    }
                    if (check === 0) {
                        order_design_detail.push({
                            category: bomDetail.DmCtg,
                            metal: bomDetail.OdKt,
                            quantity: bomDetail.OdOrdQty
                        });
                    }

                }

                for (let i = 0; i < order_design_detail.length; i++) {
                    let childTableOrdr_design_det = frm.add_child("order_design_detail");
                    childTableOrdr_design_det.category = order_design_detail[i].category;
                    childTableOrdr_design_det.metal = order_design_detail[i].metal;
                    childTableOrdr_design_det.quantity = parseFloat(order_design_detail[i].quantity);
                    total_order_quantity += parseFloat(checkDigit(order_design_detail[i].quantity));
                }

                frm.set_value('total_no_of_qty', total_no_of_qty)
                frm.set_value('total_order_quantity', total_order_quantity)

                frm.set_value('total_order_quantity_wiw', total_no_of_qty) // ---- for what is where




                // For Sales Invoice ---------------------------------------------------------------------------------

                insert_or_update_entries(frm, 'sales_invoice', 'invoice_design_id', 'invoice_design_details', 'IdIdNo', obj)
                delete_summary_table(frm, 'sale_invoives');


                var order_sales_invoices = []

                var total_quantity = 0
                var total_invoice_rate = 0

                var total_design_weight = 0
                var total_gold_weight = 0
                var total_silver_weight = 0
                var total_rm__diamond_weight = 0
                var total_stone_weight = 0
                var total_metal_weight = 0
                var total_other_weight = 0

                var total_sales_invoice_qty = 0
                var total_sales_qty_weight = 0
                var temp_weight = 0

                for (let i = 0; i < obj.data.invoice_design_details.length; i++) {

                    total_quantity += parseFloat(checkDigit(obj.data.invoice_design_details[i].IdQty));
                    total_invoice_rate += parseFloat(checkDigit(obj.data.invoice_design_details[i].invoicePrice));

                    // total_design_weight += parseFloat(checkDigit(obj.data.invoice_design_details[i].total_weight))
                    total_gold_weight += parseFloat(checkDigit(obj.data.invoice_design_details[i].gold_weight))
                    total_silver_weight += parseFloat(checkDigit(obj.data.invoice_design_details[i].silver_weight))
                    total_rm__diamond_weight += (parseFloat(checkDigit(obj.data.invoice_design_details[i].diamond_weight)) / 5)
                    total_stone_weight += (parseFloat(checkDigit(obj.data.invoice_design_details[i].stone_weight)) / 5)
                    total_metal_weight += parseFloat(checkDigit(obj.data.invoice_design_details[i].other_metal_weight))
                    total_other_weight += parseFloat(checkDigit(obj.data.invoice_design_details[i].mis_weight))

                    temp_weight = (parseFloat(checkDigit(obj.data.invoice_design_details[i].gold_weight)) +
                        parseFloat(checkDigit(obj.data.invoice_design_details[i].silver_weight)) +
                        (parseFloat(checkDigit(obj.data.invoice_design_details[i].diamond_weight)) / 5) +
                        (parseFloat(checkDigit(obj.data.invoice_design_details[i].stone_weight)) / 5) +
                        parseFloat(checkDigit(obj.data.invoice_design_details[i].other_metal_weight)) +
                        parseFloat(checkDigit(obj.data.invoice_design_details[i].mis_weight)))


                    if (obj.data.invoice_design_details) {
                        // let invoice = obj.data.invoice_design_details[i];
                        let check = 0;

                        for (let j = 0; j < order_sales_invoices.length; j++) {
                            if (order_sales_invoices[j].invoice_no == (obj.data.invoice_design_details[i].IdTc + "/" + obj.data.invoice_design_details[i].IdYy + "/" + obj.data.invoice_design_details[i].IdChr + "/" + obj.data.invoice_design_details[i].IdNo)) {
                                check = 1;
                                order_sales_invoices[j].quantity = parseFloat(checkDigit(order_sales_invoices[j].quantity)) + parseFloat(checkDigit(obj.data.invoice_design_details[i].IdQty));
                                order_sales_invoices[j].weight = parseFloat(checkDigit(order_sales_invoices[j].weight)) + temp_weight;
                            }
                        }

                        if (check == 0) {
                            order_sales_invoices.push({
                                invoice_no: (obj.data.invoice_design_details[i].IdTc + "/" + obj.data.invoice_design_details[i].IdYy + "/" + obj.data.invoice_design_details[i].IdChr + "/" + obj.data.invoice_design_details[i].IdNo),
                                invoice_date: obj.data.invoice_design_details[i].InDt,
                                quantity: obj.data.invoice_design_details[i].IdQty,
                                weight: temp_weight,
                            });
                        }
                    }

                }
                // total_stone_weight = parseFloat(checkDigit(total_stone_weight)) / 5;
                // total_rm__diamond_weight = parseFloat(checkDigit(total_rm__diamond_weight)) / 5;
                total_design_weight = total_gold_weight + total_silver_weight + total_rm__diamond_weight + total_stone_weight + total_metal_weight + total_other_weight

                for (let i = 0; i < order_sales_invoices.length; i++) {
                    let childTableSale_invoives = frm.add_child("sale_invoives");
                    childTableSale_invoives.invoice_no = order_sales_invoices[i].invoice_no;
                    childTableSale_invoives.total_quantity = order_sales_invoices[i].quantity;
                    childTableSale_invoives.total_design_weight = parseFloat(order_sales_invoices[i].weight);
                    // childTableSale_invoives.total_design_weight = parseFloat(order_sales_invoices[i].weight);
                    childTableSale_invoives.invoice_date = order_sales_invoices[i].invoice_date;

                    total_sales_invoice_qty += parseFloat(checkDigit(order_sales_invoices[i].quantity));
                    total_sales_qty_weight += parseFloat(checkDigit(order_sales_invoices[i].weight));
                    // total_sales_qty_weight += total_gold_weight + total_silver_weight + total_rm__diamond_weight + total_stone_weight + total_metal_weight + total_other_weight;

                }

                insert_or_update_entries(frm, 'row_material_details', 'invoide_design_rm_id', 'invoice_rm_details', 'IrIdNo', obj)


                frm.set_value('total_quantity', total_quantity)
                frm.set_value('total_invoice_rate', total_invoice_rate)

                frm.set_value('total_design_weight', total_design_weight)
                frm.set_value('total_gold_weight', total_gold_weight)
                frm.set_value('total_silver_weight', total_silver_weight)
                frm.set_value('total_rm__diamond_weight', total_rm__diamond_weight)
                frm.set_value('total_stone_weight', total_stone_weight)
                frm.set_value('total_metal_weight', total_metal_weight)
                frm.set_value('total_other_weight', total_other_weight)

                frm.set_value('total_sales_invoice_qty', total_sales_invoice_qty)
                frm.set_value('total_sales_qty_weight', total_sales_qty_weight)




                // For Invoice Price ---------------------------------------------------------------------------------

                insert_or_update_entries(frm, 'invoice_price', 'invoice_design_id', 'invoice_design_details', 'IdIdNo', obj)
                delete_summary_table(frm, 'sale_invoice_price');

                var sale_invoice_price = []

                var total_invoice_qty = 0

                var total_sales_invoice_qty_sum = 0
                var total_sales_invoice_price = 0

                for (let i = 0; i < obj.data.invoice_design_details.length; i++) {

                    total_invoice_qty += parseFloat(checkDigit(obj.data.invoice_design_details[i].IdQty));

                    if (obj.data.invoice_design_details) {
                        // let invoices = obj.data.invoice_design_details[i];
                        let check = 0;

                        for (let j = 0; j < sale_invoice_price.length; j++) {
                            if (sale_invoice_price[j].invoice_no == (obj.data.invoice_design_details[i].IdTc + "/" + obj.data.invoice_design_details[i].IdYy + "/" + obj.data.invoice_design_details[i].IdChr + "/" + obj.data.invoice_design_details[i].IdNo)) {
                                check = 1;
                                sale_invoice_price[j].quantity = parseFloat(checkDigit(sale_invoice_price[j].quantity)) + parseFloat(checkDigit(obj.data.invoice_design_details[i].IdQty));
                                sale_invoice_price[j].invoice_price += parseFloat(checkDigit(sale_invoice_price[j].invoice_price));
                            }
                        }

                        if (check == 0) {
                            sale_invoice_price.push({
                                invoice_no: (obj.data.invoice_design_details[i].IdTc + "/" + obj.data.invoice_design_details[i].IdYy + "/" + obj.data.invoice_design_details[i].IdChr + "/" + obj.data.invoice_design_details[i].IdNo),
                                invoice_date: obj.data.invoice_design_details[i].InDt,
                                quantity: obj.data.invoice_design_details[i].IdQty,
                                invoice_price: parseFloat(checkDigit(obj.data.invoice_design_details[i].invoice_price)),
                            });
                        }
                    }
                }

                for (let i = 0; i < sale_invoice_price.length; i++) {
                    let childTablesale_invoice_price = frm.add_child("sale_invoice_price");
                    childTablesale_invoice_price.invoice_no = sale_invoice_price[i].invoice_no;
                    childTablesale_invoice_price.quantity = sale_invoice_price[i].quantity;
                    childTablesale_invoice_price.invoice_date = sale_invoice_price[i].invoice_date;
                    childTablesale_invoice_price.invoice_price = sale_invoice_price[i].invoice_price;

                    total_sales_invoice_qty_sum += parseFloat(checkDigit(sale_invoice_price[i].quantity));
                    total_sales_invoice_price += parseFloat(checkDigit(sale_invoice_price[i].invoice_price));
                }


                frm.set_value('total_invoice_qty', total_invoice_qty)

                frm.set_value('total_sales_invoice_qty_sum', total_sales_invoice_qty)
                frm.set_value('total_sales_invoice_price', total_sales_qty_weight)

                update_total_invoice_rate(frm);

                frm.refresh();

                fetch_diamond_details_api(frm);
                fetch_stone_procurement_data(frm);
                fetch_costing_status(frm);
                // fetch_diamond_pro_details(frm);

                if (frm.doc.order_status != "Order Completed") {
                    fetch_what_is_where_api(frm);
                }
                else {
                    delete_summary_table(frm, 'what_is_where');

                    frm.set_value('total_bag_qty', 0);
                    // frm.doc.what_is_where = [];
                    frm.refresh_fields("what_is_where");
                    // calculate_what_is_where_master(frm);
                }
                // console.log("frm.doc.order_design_detail", order_design_detail)

            } else {
                frappe.msgprint(obj.msg);
            }
        },
        error: function (r) {
            console.error(r);
        },
    });

}



function delete_summary_table(frm, child_field) {
    if (frm.doc[child_field]) {
        // for (let i = 0; i < frm.doc[child_field].length; i++) {
        //     frm.get_field(child_field).grid.grid_rows[i].remove()
        //     // frappe.model.clear_table(cur_frm.doc, 'what_is_where')
        // }
        frappe.model.clear_table(frm.doc, child_field)
    }

}



function insert_or_update_entries(frm, child_field, match_field, api_table, api_field, obj) {
    var check_data = 0



    for (let i = 0; i < obj.data[api_table].length; i++) {
        check_data = 0
        if (frm.doc[child_field]) {
            for (let j = 0; j < frm.doc[child_field].length; j++) {
                if (frm.doc[child_field][j][match_field] == obj.data[api_table][i][api_field]) {
                    update_details(frm, frm.doc[child_field][j].doctype, frm.doc[child_field][j].name, obj.data[api_table][i], child_field)
                    check_data = 1
                }
            }
        }
        if (check_data == 0) {
            var childTable = frm.add_child(child_field);
            update_details(frm, childTable.doctype, childTable.name, obj.data[api_table][i], child_field)
        }
    }

    delete_unmatch_entries(frm, child_field, match_field, api_table, api_field, obj)
}


function delete_unmatch_entries(frm, child_field, match_field, api_table, api_field, obj) {
    var check_again = 0
    if (frm.doc[child_field]) {
        for (let i = 0; i < frm.doc[child_field].length; i++) {
            check_again = 0
            for (let j = 0; j < obj.data[api_table].length; j++) {
                if (frm.doc[child_field][i][match_field] == obj.data[api_table][j][api_field]) {
                    check_again = 1
                }
            }

            if (check_again == 0) {
                console.log("child_field : ", child_field)
                if (frm.get_field(child_field).grid.grid_rows[i]) {

                    frm.get_field(child_field).grid.grid_rows[i].remove()
                }
            }
        }
    }
}


function update_details(frm, cdt, cdn, data, child_field) {
    var child = locals[cdt][cdn];
    if (child_field == "order_designs") {
        child.order_sr = data.OdSr
        child.image = data.file_name
        child.design_code = data.OdDmCd
        child.category = data.DmCtg
        child.quantity = data.OdOrdQty
        child.weight = data.OdGldAsWt
        child.stamping = data.OdCmStmpInst
        child.color = data.OdDmCol
        child.production_instruction = data.OdDmPrdInst
        child.customer_instruction = data.OdCmPrdInst
        child.metal = data.OdKt
        child.size = data.OdDmSz
        child.order_design_id = data.OdIdNo
    }
    if (child_field == "sales_invoice") {
        child.sr_no = data.IdSr
        child.invoice_no = data.IdTc + "/" + data.IdYy + "/" + data.IdChr + "/" + data.IdNo
        child.invoice_date = data.InDt
        child.design_code = data.IdDmCd
        child.size = data.IdDmSz
        child.quantity = data.IdQty
        child.invoice_fob = data.IdIFob
        child.weight = checkDigit(data.total_weight)
        child.gold_weight = checkDigit(data.gold_weight)
        child.silver_weight = checkDigit(data.silver_weight)
        child.diamond_weight = checkDigit(data.diamond_weight)
        child.stone_weight = checkDigit(data.stone_weight)
        child.metal_weight = checkDigit(data.other_metal_weight)
        child.other_weight = checkDigit(data.mis_weight)
        child.invoice_design_id = data.IdIdNo
    }
    if (child_field == "row_material_details") {
        child.sr_no = data.IdSr
        child.invoice_no = data.IdTc + "/" + data.IdYy + "/" + data.IdChr + "/" + data.IdNo
        child.invoice_date = data.InDt
        child.design_code = data.IdDmCd
        child.size = data.IdDmSz
        child.quantity = data.IdQty
        child.rm_code = data.IrRmCd
        child.rm_description = data.raw_material_code_name
        child.rm_category = data.IrRmCtg
        child.rm_weight = checkDigit(data.IrRmAWt)
        child.rm_quantity = checkDigit(data.IrRmQty)
        child.total_weight = parseFloat(checkDigit(data.IrRmAWt)) * parseFloat(checkDigit(data.IdQty))
        child.total_qty = parseFloat(checkDigit(data.IrRmQty)) * parseFloat(checkDigit(data.IdQty))
        child.invoide_design_rm_id = data.IrIdNo
    }
    if (child_field == "invoice_price") {
        child.sr_no = data.IdSr;
        child.invoice_no = data.IdTc + "/" + data.IdYy + "/" + data.IdChr + "/" + data.IdNo;
        child.invoice_date = data.InDt;
        child.design_code = data.IdDmCd;
        child.quantity = data.IdQty;
        child.weight = checkDigit(data.total_weight);
        child.invoice_design_id = data.IdIdNo
    }
    if (child_field == "diamond_detail") {
        if (data.category == 'D') {
            child.diamond_code = data.raw_material_code
            child.description = data.raw_material_code_name
            child.design_code = data.OdDmCd
            child.length = data.length
            child.quantity = data.quantity
            child.design_quantity = data.OdOrdQty
            child.weight = data.weight
            child.width = data.width
            child.size = data.OdDmSz
            child.total_required_qty_pcs = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.quantity))
            child.total_diamond_weight_cost_per_cts = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.weight))
            child.order_design_rm_id = data.OrIdNo
            child.order_design_id = data.OdIdNo
        }

    }
    if (child_field == "accessories") {
        if (data.category != 'D' && data.category != 'C') {
            child.accessory_code = data.raw_material_code
            child.description = data.raw_material_code_name
            child.design_code = data.OdDmCd
            child.weight = data.weight
            child.quantity = data.quantity
            child.design_quantity = data.OdOrdQty
            child.category = data.category
            child.width = data.width
            child.size = data.OdDmSz
            child.total_required_qty_pcs = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.quantity))
            child.total_accessory_weight = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.weight))
            child.order_design_id = data.OdIdNo
            child.order_design_rm_id = data.OrIdNo
        }
    }
    if (child_field == "os_stone_proc") {
        if (data.category == 'C') {
            child.stone_code = data.raw_material_code
            child.description = data.raw_material_code_name
            child.design_code = data.OdDmCd
            child.length = data.length
            child.width = data.width
            child.weight = data.weight
            child.quantity = data.quantity
            child.design_quantity = data.OdOrdQty
            child.total_required_qty_pcs = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.quantity))
            child.total_accessory_weight = parseFloat(checkDigit(data.OdOrdQty)) * parseFloat(checkDigit(data.weight))
            child.order_design_id = data.OdIdNo
            child.order_design_rm_id = data.OrIdNo
        }
    }
    // if (child_field == "stone_detail") {
    //     child.stone_po_id = data.name;
    //     child.stone_name = data.stone_name;
    //     child.stone_cut = data.cut;
    //     child.stone_shape = data.shape;
    //     child.design_code = data.main_design_no;
    //     child.status = data.workflow_state
    //     child.stone_size = data.size
    //     child.uom_purchase = data.uom
    //     child.targetdue_date = data.target_date
    //     child.target_purchase_price_per_uom = data.target_price
    //     child.req_stone_wt_in_cts = checkDigit(data.total_target_weight);
    //     child.target_weight_per_piece_in_cts = data.target_weight_per_piece
    //     child.req_stone_qty_in_pcs = data.req_stone_qty
    //     child.design_order_qty_as_per_po = data.design_order_qty
    //     child.last_dispatch_date = data.last_dispatch_date
    //     child.accepted_date = data.accepted_date
    //     child.source = data.source
    // }
}


function date_validation(frm) {
    if (
        frm.doc.order_recieved_date &&
        frm.doc.open_order_in_erp &&
        frm.doc.production_due_date &&
        frm.doc.shipment_date
    ) {
        const orderReceivedDate = frappe.datetime._date(frm.doc.order_recieved_date);
        const openOrderDate = frappe.datetime._date(frm.doc.open_order_in_erp);
        const productionDueDate = frappe.datetime._date(frm.doc.production_due_date);
        const shipmentDate = frappe.datetime._date(frm.doc.shipment_date);

        // Validate order_received_date before open_order_in_erp
        if (orderReceivedDate >= openOrderDate) {
            frappe.msgprint("Order Received Date must be before Open Order Date in ERP.");
            return;  // Stop further execution
        }

        // Validate production_due_date before shipment_date
        if (productionDueDate >= shipmentDate) {
            frappe.msgprint("Production Due Date must be before Shipment Date.");
            return;  // Stop further execution
        }
    }
}


// frappe.ui.form.on('OS Accessoey Code By Weight', {
//     refresh(frm, cdt, cdn) {

//     },

// })

function fetch_diamond_details_api(frm) {
    console.log('Fetching diamond details with:', {
        order_id: frm.doc.order_id,
        company_code: frm.doc.company_code
    });

    frappe.call({
        method: "pinkcityit.pinkcity_crm.doctype.order_status.order_status.get_order_bom_details",
        args: {
            order_id: frm.doc.order_id,
            company_code: frm.doc.company_code
        },
        always: function (obj) {
            console.log(obj);
            if (obj.status) {
                // var total_accessories_by_weight = 0;
                // var total_stone_bom_qty = 0;
                // var total_stone_quantity = 0;
                // var total_diamond_weigh = 0;
                // frm.doc.diamond_detail = []; // Clear existing data
                // frm.doc.accessories = []; // Clear existing data
                // frm.doc.os_stone_proc = []; // Clear existing data
                // // frm.doc.accessories_by_weight = []; // Clear existing data
                // // var accessories_by_weight = [];
                // var os_stone_bom_detail = [];
                // var os_diamond_bom_detail = [];
                // var os_stone_proc = [];
                var check = 0;



                // for Stone ----------------------------------------------------------------
                insert_or_update_entries(frm, 'os_stone_proc', 'order_design_rm_id', 'orders_design_bom_details', 'OrIdNo', obj)
                delete_summary_table(frm, 'os_stone_bom_detail');

                var os_stone_bom_detail = [];
                var total_stone_quantity = 0;
                var total_stone_bom_qty = 0;

                for (let i = 0; i < obj.data.orders_design_bom_details.length; i++) {

                    total_stone_quantity += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity));

                    if (obj.data.orders_design_bom_details[i].category == "C") {

                        check = 0;
                        for (var j = 0; j < os_stone_bom_detail.length; j++) {
                            console.log("gggggggggggggggggggggggggggggggggggggggggggg");

                            if (os_stone_bom_detail[j]['stone_code'] == obj.data.orders_design_bom_details[i].raw_material_code && os_stone_bom_detail[j]['length'] == obj.data.orders_design_bom_details[i].length && os_stone_bom_detail[j]['width'] == obj.data.orders_design_bom_details[i].width) {
                                check = 1;
                                os_stone_bom_detail[j]['design_quantity'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty));
                                os_stone_bom_detail[j]['quantity'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity));
                                os_stone_bom_detail[j]['weight'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight));
                                os_stone_bom_detail[j]['total_required_qty_pcs'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity));
                                os_stone_bom_detail[j]['total_accessory_weight'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight));
                            }
                        }

                        if (check == 0) {
                            console.log("qwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
                            os_stone_bom_detail.push({

                                "stone_code": obj.data.orders_design_bom_details[i].raw_material_code,
                                "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                                "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                                "length": obj.data.orders_design_bom_details[i].length,
                                "width": obj.data.orders_design_bom_details[i].width,
                                "weight": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight)),
                                "quantity": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity)),
                                "design_quantity": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)),
                                "total_required_qty_pcs": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity)),
                                "total_accessory_weight": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight)),
                                "order_design_id": obj.data.orders_design_bom_details[i].OdIdNo,
                                "order_design_rm_id": obj.data.orders_design_bom_details[i].OrIdNo,
                            })
                        }
                    }

                }

                for (var i = 0; i < os_stone_bom_detail.length; i++) {
                    var child = frm.add_child("os_stone_bom_detail");
                    child.stone_code = os_stone_bom_detail[i].stone_code;
                    child.description = os_stone_bom_detail[i].description;
                    child.weight = os_stone_bom_detail[i].weight;
                    child.quantity = os_stone_bom_detail[i].quantity;
                    child.design_quantity = os_stone_bom_detail[i].design_quantity;
                    child.total_required_qty_pcs = os_stone_bom_detail[i].total_required_qty_pcs;
                    child.total_accessory_weight = os_stone_bom_detail[i].total_accessory_weight;
                    child.length = os_stone_bom_detail[i].length;
                    child.width = os_stone_bom_detail[i].width;

                    total_stone_bom_qty += parseFloat(checkDigit(os_stone_bom_detail[i].total_required_qty_pcs));
                }

                frm.set_value("total_stone_quantity", total_stone_quantity);
                frm.set_value("total_stone_bom_qty", total_stone_bom_qty);




                // for Diamond ----------------------------------------------------------------

                var os_diamond_bom_detail = [];
                var total_diamond_weigh = 0;

                insert_or_update_entries(frm, 'diamond_detail', 'order_design_rm_id', 'orders_design_bom_details', 'OrIdNo', obj)
                delete_summary_table(frm, 'os_diamond_bom_detail');

                for (let i = 0; i < obj.data.orders_design_bom_details.length; i++) {


                    if (obj.data.orders_design_bom_details[i].category == "D") {
                        check = 0;
                        for (var j = 0; j < os_diamond_bom_detail.length; j++) {
                            if (os_diamond_bom_detail[j]['diamond_code'] == obj.data.orders_design_bom_details[i].raw_material_code && os_diamond_bom_detail[j]['length'] == obj.data.orders_design_bom_details[i].length && os_diamond_bom_detail[j]['width'] == obj.data.orders_design_bom_details[i].width && os_diamond_bom_detail[j]['design_code'] == obj.data.orders_design_bom_details[i].OdDmCd) {
                                check = 1;
                                os_diamond_bom_detail[j]['design_quantity'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty));
                                os_diamond_bom_detail[j]['quantity'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity));
                                os_diamond_bom_detail[j]['weight'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight));
                                os_diamond_bom_detail[j]['total_required_qty_pcs'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity));
                                os_diamond_bom_detail[j]['total_diamond_weight_cost_per_cts'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight));
                            }
                        }

                        if (check == 0) {
                            os_diamond_bom_detail.push({
                                "diamond_code": obj.data.orders_design_bom_details[i].raw_material_code,
                                "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                                "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                                "length": obj.data.orders_design_bom_details[i].length,
                                "width": obj.data.orders_design_bom_details[i].width,
                                "weight": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight)),
                                "quantity": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity)),
                                "design_quantity": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)),
                                "total_required_qty_pcs": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity)),
                                "total_diamond_weight_cost_per_cts": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight)),
                            })
                        }
                    }

                }

                for (var i = 0; i < os_diamond_bom_detail.length; i++) {
                    var child = frm.add_child("os_diamond_bom_detail");
                    child.diamond_code = os_diamond_bom_detail[i].diamond_code;
                    child.description = os_diamond_bom_detail[i].description;
                    child.design_code = os_diamond_bom_detail[i].design_code;
                    child.length = os_diamond_bom_detail[i].length;
                    child.width = os_diamond_bom_detail[i].width;
                    child.weight = os_diamond_bom_detail[i].weight;
                    child.quantity = os_diamond_bom_detail[i].quantity;
                    child.design_quantity = os_diamond_bom_detail[i].design_quantity;
                    child.total_required_qty_pcs = os_diamond_bom_detail[i].total_required_qty_pcs;
                    child.total_diamond_weight_cost_per_cts = os_diamond_bom_detail[i].total_diamond_weight_cost_per_cts;

                    total_diamond_weigh += parseFloat(checkDigit(os_diamond_bom_detail[i].weight));
                }

                frm.set_value("total_stone_bom_qty", total_stone_bom_qty);





                // for Accessories ----------------------------------------------------------------

                var accessories_by_weight = [];
                var total_accessories_by_weight = 0;

                insert_or_update_entries(frm, 'accessories', 'order_design_rm_id', 'orders_design_bom_details', 'OrIdNo', obj)
                delete_summary_table(frm, 'accessories_by_weight');

                for (let i = 0; i < obj.data.orders_design_bom_details.length; i++) {


                    if (obj.data.orders_design_bom_details[i].category != "C" && obj.data.orders_design_bom_details[i].category != "D") {
                        check = 0;
                        for (var j = 0; j < accessories_by_weight.length; j++) {
                            if (accessories_by_weight[j]['accessory_code'] == obj.data.orders_design_bom_details[i].raw_material_code) {
                                check = 1;
                                accessories_by_weight[j]['weight'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight));
                            }
                        }
                        if (check == 0) {
                            accessories_by_weight.push({
                                "category": obj.data.orders_design_bom_details[i].category,
                                "accessory_code": obj.data.orders_design_bom_details[i].raw_material_code,
                                "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                                // "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                                // "weight": obj.data.orders_design_bom_details[i].weight,
                                // "quantity": obj.data.orders_design_bom_details[i].quantity,
                                // "design_quantity": obj.data.orders_design_bom_details[i].OdOrdQty,
                                // "total_required_qty_pcs": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].quantity)),
                                "total_accessory_weight": parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty)) * parseFloat(checkDigit(obj.data.orders_design_bom_details[i].weight)),
                                // "order_design_id": obj.data.orders_design_bom_details[i].OdIdNo,
                                // "order_design_rm_id": obj.data.orders_design_bom_details[i].OrIdNo,
                            })
                        }
                    }
                }

                for (var i = 0; i < accessories_by_weight.length; i++) {
                    var child = frm.add_child("accessories_by_weight");
                    child.accessory_code = accessories_by_weight[i].accessory_code;
                    child.description = accessories_by_weight[i].description;
                    child.total_accessory_weight = accessories_by_weight[i].total_accessory_weight;
                    child.category = accessories_by_weight[i].category;

                    total_accessories_by_weight += checkDigit(accessories_by_weight[i].total_accessory_weight);
                }

                frm.set_value("total_accessories_by_weight", total_accessories_by_weight);
                frm.set_value("total_weight", total_accessories_by_weight);





                // for (let i = 0; i < obj.data.orders_design_bom_details.length; i++) {

                // if (obj.data.orders_design_bom_details[i].category == "D") {
                //     var childTable = frm.add_child("diamond_detail");
                //     childTable.diamond_code = obj.data.orders_design_bom_details[i].raw_material_code;
                //     childTable.description = obj.data.orders_design_bom_details[i].raw_material_code_name;
                //     childTable.design_code = obj.data.orders_design_bom_details[i].OdDmCd;
                //     childTable.length = obj.data.orders_design_bom_details[i].length;
                //     childTable.width = obj.data.orders_design_bom_details[i].width;
                //     childTable.weight = obj.data.orders_design_bom_details[i].weight;
                //     childTable.quantity = obj.data.orders_design_bom_details[i].quantity;
                //     childTable.design_quantity = obj.data.orders_design_bom_details[i].OdOrdQty;
                //     childTable.total_required_qty_pcs = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //     childTable.total_diamond_weight_cost_per_cts = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                //     childTable.order_design_id = obj.data.orders_design_bom_details[i].OdIdNo;
                //     childTable.order_design_rm_id = obj.data.orders_design_bom_details[i].OrIdNo;
                // }


                // if (obj.data.orders_design_bom_details[i].category == "D") {
                //     check = 0;
                //     for (var j = 0; j < os_diamond_bom_detail.length; j++) {
                //         if (os_diamond_bom_detail[j]['diamond_code'] == obj.data.orders_design_bom_details[i].raw_material_code && os_diamond_bom_detail[j]['length'] == obj.data.orders_design_bom_details[i].length && os_diamond_bom_detail[j]['width'] == obj.data.orders_design_bom_details[i].width && os_diamond_bom_detail[j]['design_code'] == obj.data.orders_design_bom_details[i].OdDmCd) {
                //             check = 1;
                //             os_diamond_bom_detail[j]['design_quantity'] += parseFloat(checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty));
                //             os_diamond_bom_detail[j]['quantity'] += checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_diamond_bom_detail[j]['weight'] += checkDigit(obj.data.orders_design_bom_details[i].weight);
                //             os_diamond_bom_detail[j]['total_required_qty_pcs'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_diamond_bom_detail[j]['total_diamond_weight_cost_per_cts'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                //         }
                //     }

                //     if (check == 0) {
                //         os_diamond_bom_detail.push({
                //             "diamond_code": obj.data.orders_design_bom_details[i].raw_material_code,
                //             "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                //             "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                //             "length": obj.data.orders_design_bom_details[i].length,
                //             "width": obj.data.orders_design_bom_details[i].width,
                //             "weight": checkDigit(obj.data.orders_design_bom_details[i].weight),
                //             "quantity": checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "design_quantity": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty),
                //             "total_required_qty_pcs": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "total_diamond_weight_cost_per_cts": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight),
                //         })
                //     }
                // }


                // if (obj.data.orders_design_bom_details[i].category != "C" && obj.data.orders_design_bom_details[i].category != "D") {
                // var childTableAccessory = frm.add_child("accessories");
                // childTableAccessory.accessory_code = obj.data.orders_design_bom_details[i].raw_material_code;
                // childTableAccessory.description = obj.data.orders_design_bom_details[i].raw_material_code_name;
                // childTableAccessory.design_code = obj.data.orders_design_bom_details[i].OdDmCd;
                // childTableAccessory.weight = obj.data.orders_design_bom_details[i].weight;
                // childTableAccessory.quantity = obj.data.orders_design_bom_details[i].quantity;
                // childTableAccessory.design_quantity = obj.data.orders_design_bom_details[i].OdOrdQty;
                // childTableAccessory.category = obj.data.orders_design_bom_details[i].category;
                // childTableAccessory.total_required_qty_pcs = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                // childTableAccessory.total_accessory_weight = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                // childTableAccessory.order_design_id = obj.data.orders_design_bom_details[i].OdIdNo;
                // childTableAccessory.order_design_rm_id = obj.data.orders_design_bom_details[i].OrIdNo;
                // }

                // if (obj.data.orders_design_bom_details[i].category != "C" && obj.data.orders_design_bom_details[i].category != "D") {
                //     check = 0;
                //     for (var j = 0; j < accessories_by_weight.length; j++) {
                //         if (accessories_by_weight[j]['accessory_code'] == obj.data.orders_design_bom_details[i].raw_material_code) {
                //             check = 1;
                //             accessories_by_weight[j]['weight'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                //         }
                //     }
                //     if (check == 0) {
                //         accessories_by_weight.push({
                //             "accessory_code": obj.data.orders_design_bom_details[i].raw_material_code,
                //             "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                //             "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                //             "weight": obj.data.orders_design_bom_details[i].weight,
                //             "quantity": obj.data.orders_design_bom_details[i].quantity,
                //             "design_quantity": obj.data.orders_design_bom_details[i].OdOrdQty,
                //             "category": obj.data.orders_design_bom_details[i].category,
                //             "total_required_qty_pcs": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "total_accessory_weight": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight),
                //             "order_design_id": obj.data.orders_design_bom_details[i].OdIdNo,
                //             "order_design_rm_id": obj.data.orders_design_bom_details[i].OrIdNo,
                //         })
                //     }
                // }

                // frappe.model.set_value(cdt, cdn, 'accessory_code', accessory_code.toFixed(3));
                // frappe.model.set_value(cdt, cdn, 'total_accessory_weight', total_accessory_weight.toFixed(3));
                // frm.set_value('accessory_code', accessory_code.toFixed(3));
                // frm.set_value('total_accessory_weight', total_accessory_weight.toFixed(3));



                // if (obj.data.orders_design_bom_details[i].category == "C") {
                // var childTableStoneProc = frm.add_child("os_stone_proc");
                // childTableStoneProc.stone_code = obj.data.orders_design_bom_details[i].raw_material_code;
                // childTableStoneProc.description = obj.data.orders_design_bom_details[i].raw_material_code_name;
                // childTableStoneProc.design_code = obj.data.orders_design_bom_details[i].OdDmCd;
                // childTableStoneProc.length = obj.data.orders_design_bom_details[i].length;
                // childTableStoneProc.width = obj.data.orders_design_bom_details[i].width;
                // childTableStoneProc.weight = obj.data.orders_design_bom_details[i].weight;
                // childTableStoneProc.quantity = obj.data.orders_design_bom_details[i].quantity;
                // childTableStoneProc.design_quantity = obj.data.orders_design_bom_details[i].OdOrdQty;
                // childTableStoneProc.total_required_qty_pcs = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                // childTableStoneProc.total_accessory_weight = checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                // childTableStoneProc.order_design_id = obj.data.orders_design_bom_details[i].OdIdNo;
                // childTableStoneProc.order_design_rm_id = obj.data.orders_design_bom_details[i].OrIdNo;
                // childTableStoneProc.order_design_rm_id = obj.data.orders_design_bom_details[i].OrIdNo;

                // total_stone_quantity += checkDigit(parseFloat(obj.data.orders_design_bom_details[i].quantity));

                // }

                // if (obj.data.orders_design_bom_details[i].category == "C") {
                //     check = 0;
                //     for (var j = 0; j < os_stone_bom_detail.length; j++) {
                //         if (os_stone_bom_detail[j]['stone_code'] == obj.data.orders_design_bom_details[i].raw_material_code && os_stone_bom_detail[j]['length'] == obj.data.orders_design_bom_details[i].length && os_stone_bom_detail[j]['width'] == obj.data.orders_design_bom_details[i].width) {
                //             check = 1;
                //             os_stone_bom_detail[j]['design_quantity'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty);
                //             os_stone_bom_detail[j]['quantity'] += checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_stone_bom_detail[j]['weight'] += checkDigit(obj.data.orders_design_bom_details[i].weight);
                //             os_stone_bom_detail[j]['total_required_qty_pcs'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_stone_bom_detail[j]['total_accessory_weight'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                //         }
                //     }

                //     if (check == 0) {
                //         os_stone_bom_detail.push({
                //             "stone_code": obj.data.orders_design_bom_details[i].raw_material_code,
                //             "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                //             "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                //             "length": obj.data.orders_design_bom_details[i].length,
                //             "width": obj.data.orders_design_bom_details[i].width,
                //             "weight": checkDigit(obj.data.orders_design_bom_details[i].weight),
                //             "quantity": checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "design_quantity": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty),
                //             "total_required_qty_pcs": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "total_accessory_weight": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight),
                //             "order_design_id": obj.data.orders_design_bom_details[i].OdIdNo,
                //             "order_design_rm_id": obj.data.orders_design_bom_details[i].OrIdNo,
                //             "order_design_rm_id": obj.data.orders_design_bom_details[i].OrIdNo,
                //         })
                //     }


                // }



                // }


                // for (var i = 0; i < os_stone_bom_detail.length; i++) {
                //     var childTable_STONE_BOM_DET = frm.add_child("os_stone_bom_detail");
                //     childTable_STONE_BOM_DET.stone_code = os_stone_bom_detail[i].stone_code;
                //     childTable_STONE_BOM_DET.description = os_stone_bom_detail[i].description;
                //     childTable_STONE_BOM_DET.weight = os_stone_bom_detail[i].weight;
                //     childTable_STONE_BOM_DET.quantity = os_stone_bom_detail[i].quantity;
                //     childTable_STONE_BOM_DET.design_quantity = os_stone_bom_detail[i].design_quantity;
                //     childTable_STONE_BOM_DET.total_required_qty_pcs = os_stone_bom_detail[i].total_required_qty_pcs;
                //     childTable_STONE_BOM_DET.total_accessory_weight = os_stone_bom_detail[i].total_accessory_weight;
                //     childTable_STONE_BOM_DET.length = os_stone_bom_detail[i].length;
                //     childTable_STONE_BOM_DET.width = os_stone_bom_detail[i].width;

                //     total_stone_bom_qty += checkDigit(os_stone_bom_detail[i].total_required_qty_pcs);
                // }


                // if (obj.data.orders_design_bom_details[i].category == "D") {
                //     check = 0;
                //     for (var j = 0; j < os_diamond_bom_detail.length; j++) {
                //         if (os_diamond_bom_detail[j]['diamond_code'] == obj.data.orders_design_bom_details[i].raw_material_code && os_diamond_bom_detail[j]['length'] == obj.data.orders_design_bom_details[i].length && os_diamond_bom_detail[j]['width'] == obj.data.orders_design_bom_details[i].width && os_diamond_bom_detail[j]['design_code'] == obj.data.orders_design_bom_details[i].OdDmCd) {
                //             check = 1;
                //             os_diamond_bom_detail[j]['design_quantity'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty);
                //             os_diamond_bom_detail[j]['quantity'] += checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_diamond_bom_detail[j]['weight'] += checkDigit(obj.data.orders_design_bom_details[i].weight);
                //             os_diamond_bom_detail[j]['total_required_qty_pcs'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity);
                //             os_diamond_bom_detail[j]['total_diamond_weight_cost_per_cts'] += checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight);
                //         }
                //     }

                //     if (check == 0) {
                //         os_diamond_bom_detail.push({
                //             "diamond_code": obj.data.orders_design_bom_details[i].raw_material_code,
                //             "description": obj.data.orders_design_bom_details[i].raw_material_code_name,
                //             "design_code": obj.data.orders_design_bom_details[i].OdDmCd,
                //             "length": obj.data.orders_design_bom_details[i].length,
                //             "width": obj.data.orders_design_bom_details[i].width,
                //             "weight": checkDigit(obj.data.orders_design_bom_details[i].weight),
                //             "quantity": checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "design_quantity": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty),
                //             "total_required_qty_pcs": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].quantity),
                //             "total_diamond_weight_cost_per_cts": checkDigit(obj.data.orders_design_bom_details[i].OdOrdQty) * checkDigit(obj.data.orders_design_bom_details[i].weight),
                //         })
                //     }


                // }
                // for (var i = 0; i < os_diamond_bom_detail.length; i++) {
                //     var childTable_Diamond_BOM_DET = frm.add_child("os_diamond_bom_detail");
                //     childTable_Diamond_BOM_DET.diamond_code = os_diamond_bom_detail[i].diamond_code;
                //     childTable_Diamond_BOM_DET.description = os_diamond_bom_detail[i].description;
                //     childTable_Diamond_BOM_DET.design_code = os_diamond_bom_detail[i].design_code;
                //     childTable_Diamond_BOM_DET.length = os_diamond_bom_detail[i].length;
                //     childTable_Diamond_BOM_DET.width = os_diamond_bom_detail[i].width;
                //     childTable_Diamond_BOM_DET.weight = os_diamond_bom_detail[i].weight;
                //     childTable_Diamond_BOM_DET.quantity = os_diamond_bom_detail[i].quantity;
                //     childTable_Diamond_BOM_DET.design_quantity = os_diamond_bom_detail[i].design_quantity;
                //     childTable_Diamond_BOM_DET.total_required_qty_pcs = os_diamond_bom_detail[i].total_required_qty_pcs;
                //     childTable_Diamond_BOM_DET.total_diamond_weight_cost_per_cts = os_diamond_bom_detail[i].total_diamond_weight_cost_per_cts;

                //     total_diamond_weigh += checkDigit(os_diamond_bom_detail[i].weight);
                // }

                // for (var i = 0; i < accessories_by_weight.length; i++) {
                //     var childTableAccessories_by_weight = frm.add_child("accessories_by_weight");
                //     childTableAccessories_by_weight.accessory_code = accessories_by_weight[i].accessory_code;
                //     childTableAccessories_by_weight.description = accessories_by_weight[i].description;
                //     childTableAccessories_by_weight.total_accessory_weight = accessories_by_weight[i].weight;
                //     childTableAccessories_by_weight.category = accessories_by_weight[i].category;

                //     total_accessories_by_weight += checkDigit(accessories_by_weight[i].weight);
                // }


                // frm.set_value("total_accessories_by_weight", total_accessories_by_weight);
                // frm.set_value("total_diamond_weigh", total_diamond_weigh);

                // frm.set_value("total_stone_quantity", total_stone_quantity);
                // frm.set_value("total_stone_bom_qty", total_stone_bom_qty);
                // console.log("os_stone_bom_detail", os_stone_bom_detail);
                // console.log("os_diamond_bom_detail", os_diamond_bom_detail);
                // console.log("os_stone_proc", os_stone_proc);
                // console.log("accessories_by_weight : ", accessories_by_weight);
                // console.log("total_stone_quantity : ", total_stone_quantity);
                // frm.refresh_fields("diamond_detail"); // Refresh the child table to show new data
                // frm.refresh_fields("accessories"); // Refresh the child table to show new data
                // frm.refresh_fields("os_stone_proc"); // Refresh the child table to show new data
                // frm.refresh_fields("os_stone_bom_detail");
                // frm.refresh_fields("os_diamond_bom_detail");

                // calculate_diamond_master(frm);
                //   calculate_accessories_master(frm);
            } else {
                frappe.msgprint(obj.msg);
            }
        },
        error: function (obj) {
            console.log("Error response:", obj.responseText);
            frappe.msgprint("Something went wrong.");
        },
    });
}


function checkDigit(value) {
    if (value > 0) { return value; } else { return 0; }
}

function fetch_stone_procurement_data(frm) {
    console.log("hi23?#")
    frappe.call({
        method: "pinkcityit.pinkcity_crm.doctype.order_status.order_status.get_stone_procurement_list_api",
        // method: "get_stone_procurement_list_api",
        type: "POST",
        args: {
            final_order_no: frm.doc.order_no_prefix + '/' + frm.doc.order_year + '/' + frm.doc.order_type + '/' + frm.doc.order_num,
            company: frm.doc.production_unit_name,
        },
        // args: {'email' : frappe.user_id },
        beforeSend: function (request) {
            request.withCredentials = false;
        },
        success: function (obj) {
            console.log("hi22?#")
            console.log(obj)
            if (obj.obj.status) {
            } else {
            }
        },
        error: function (r) {
            console.log("hi2332"); console.log(r)
        },
        always: function (obj) {
            // console.log("hi22"); console.log(r)
            if (obj.obj.status) {
                console.log("stone ", obj)

                // frm.doc.stone_detail = []; // Clear existing data
                // for Stone ----------------------------------------------------------------
                // insert_or_update_entries(frm, 'stone_detail', 'order_design_rm_id', 'orders_design_bom_details', 'OrIdNo', obj)

                delete_summary_table(frm, 'stone_detail');

                var req_total_stone_wt = 0;
                var req_total_stone_qty = 0;

                for (let i = 0; i < obj.obj.data.length; i++) {
                    var child = frm.add_child("stone_detail");
                    child.stone_po_id = obj.obj.data[i].name;
                    child.stone_name = obj.obj.data[i].stone_name;
                    child.stone_cut = obj.obj.data[i].cut;
                    child.stone_shape = obj.obj.data[i].shape;
                    child.design_code = obj.obj.data[i].main_design_no;
                    child.status = obj.obj.data[i].workflow_state;
                    child.stone_size = obj.obj.data[i].size;
                    child.uom_purchase = obj.obj.data[i].uom;
                    child.targetdue_date = obj.obj.data[i].target_date;
                    child.required_dispatch_qty = obj.obj.data[i].required_dispatch_qty;
                    child.target_purchase_price_per_uom = obj.obj.data[i].target_price;
                    child.req_stone_wt_in_cts = obj.obj.data[i].total_target_weight;
                    child.target_weight_per_piece_in_cts = obj.obj.data[i].target_weight_per_piece;
                    child.req_stone_qty_in_pcs = obj.obj.data[i].req_stone_qty;
                    child.design_order_qty_as_per_po = obj.obj.data[i].design_order_qty;
                    child.last_dispatch_date = obj.obj.data[i].last_dispatch_date;
                    child.accepted_date = obj.obj.data[i].accepted_date;
                    child.source = obj.obj.data[i].source;

                    req_total_stone_wt += parseFloat(checkDigit(obj.obj.data[i].total_target_weight));
                    req_total_stone_qty += parseFloat(checkDigit(obj.obj.data[i].req_stone_qty));
                }
                //   console.log("stone ", stone_detail)

                frm.refresh_fields("stone_detail"); // Refresh the child table to show new data

                frm.set_value('req_total_stone_wt', req_total_stone_wt.toFixed(3));
                frm.set_value('req_total_stone_qty', req_total_stone_qty.toFixed(3));

                // calculate_total_stone_master(frm);

            } else {
            }
        },
        async: true,
    });
}


// function calculate_total_stone_master(frm) {
//     var req_total_stone_wt = 0;
//     var req_total_stone_qty = 0;

//     if (frm.doc.stone_detail) {
//         frm.doc.stone_detail.forEach(child => {
//             req_total_stone_wt += parseFloat(checkDigit(child.req_stone_wt_in_cts));
//             req_total_stone_qty += parseFloat(checkDigit(child.req_stone_qty_in_pcs));
//         });
//     }
//     frm.set_value('req_total_stone_wt', req_total_stone_wt.toFixed(3));
//     frm.set_value('req_total_stone_qty', req_total_stone_qty.toFixed(3));
// }



frappe.ui.form.on('OS What Is Where', {
    // refresh(frm, cdt, cdn) {

    // },

    // bag_quantity: function (frm, cdt, cdn) {
    //     calculate_what_is_where_master(frm);
    // }

    // form_render:function(frm, cdt, cdn) {
    // 	$('div[data-fieldname="location"]').css({
    //         'background-color': '#ff9200',
    //         'color': '#ffffff'
    //     });

    // }

})

function fetch_what_is_where_api(frm) {
    console.log('Fetching What Is Where details with:', {
        order_id: frm.doc.order_id,
        company_code: frm.doc.company_code
    });

    frappe.call({
        method: "pinkcityit.pinkcity_crm.doctype.order_status.order_status.get_what_is_where_details",
        args: {
            order_id: frm.doc.order_id,
            company_code: frm.doc.company_code
        },
        always: function (obj) {
            console.log(obj);
            if (obj.status) {
                delete_summary_table(frm, 'what_is_where');
                delete_summary_table(frm, 'what_is_where_table');
                // frm.doc.what_is_where = [];
                // frm.doc.what_is_where_table = [];
                obj.data.fg_bag_raw_material_list.forEach(item => {
                    let childTable = frm.add_child("what_is_where");
                    childTable.design_code = item.OdDmCd;
                    childTable.bag_no = item.bag_no;
                    childTable.bag_id_no = item.BIdNo;
                    childTable.size = item.OdDmSz;
                    childTable.metal = item.OdKt;
                    childTable.design_category = item.DmCtg;
                    childTable.location = item.BLoc;
                    childTable.bag_quantity = item.bag_qty;
                    childTable.order_design_id_no = item.OdIdNo;
                });

                let what_is_where_loc = [];
                obj.data.fg_bag_raw_material_list.forEach(item => {
                    let existingLocation = what_is_where_loc.find(data => data.location === item.BLoc);
                    if (existingLocation) {
                        existingLocation.bag_quantity += parseFloat(checkDigit(item.bag_qty));
                    } else {
                        what_is_where_loc.push({
                            location: item.BLoc,
                            design_category: item.DmCtg,
                            bag_quantity: parseFloat(checkDigit(item.bag_qty))
                        });
                    }
                });

                var total_bag_qty = 0;

                what_is_where_loc.forEach(data => {
                    let childTableWIW = frm.add_child("what_is_where_table");
                    childTableWIW.location = data.location;
                    childTableWIW.design_category = data.design_category;
                    childTableWIW.bag_quantity = data.bag_quantity;

                    total_bag_qty += parseFloat(checkDigit(data.bag_quantity))
                });

                frm.refresh_fields("what_is_where");
                frm.refresh_fields("what_is_where_table");

                frm.set_value('total_bag_qty', total_bag_qty);

                // calculate_what_is_where_master(frm);
            } else {
                frappe.msgprint(obj.msg || "Failed to fetch What Is Where details.");
            }
        },
        error: function (obj) {
            console.error("Error response:", obj.responseText);
            frappe.msgprint("Something went wrong while fetching What Is Where details.");
        },
    });
}





// function fetch_diamond_pro_details(frm) {
//     frappe.db.get_list("Diamond Procurement", {
//         fields: ["*"],
//         filters: { final_order_no: frm.doc.final_order_no },
//         // order_by: 'idx asc' ,
//     })
//         .then((obj) => {
//             for (var i = 0; i < obj.length; i++) {
//                 frappe.call({
//                     method: 'frappe.client.get',
//                     args: {
//                         doctype: "Diamond Procurement",
//                         name: obj[i].name,

//                     },
//                     callback: function (response) {
//                         console.log("response : ", response)

//                         for (var j = 0; j < response.message.receive_qc_details.length; j++) {
//                             for (var k = 0; k < frm.doc.diamond_detail.length; k++) {
//                                 if (frm.doc.diamond_detail[k].order_design_rm_id == response.message.receive_qc_details[j].order_design_rm_id) {
//                                     frm.doc.diamond_detail[k].status = response.message.receive_qc_details[j].status
//                                 }
//                             }
//                         }
//                         for (var y = 0; y < response.message.diamond_details_table.length; y++) {
//                             for (var z = 0; z < frm.doc.diamond_detail.length; z++) {
//                                 if (frm.doc.diamond_detail[z].order_design_rm_id == response.message.diamond_details_table[y].order_design_rm_id) {
//                                     frm.doc.diamond_detail[z].targetdue_date = response.message.diamond_details_table[y].targetdue_date
//                                 }
//                             }
//                         }
//                         frm.refresh_field('diamond_detail');


//                     },
//                     error: function (error) {
//                         frappe.msgprint(__('An error occurred while fetching Diamond details.'));
//                         console.error(error);
//                     }
//                 });
//             }
//         });
// }


function fetch_costing_status(frm) {
    var design_codes = []

    if (frm.doc.order_designs) {
        for (let i = 0; i < frm.doc.order_designs.length; i++) {
            design_codes.push(frm.doc.order_designs[i].design_code)
        }
    }

    console.log(design_codes)

    frappe.db.get_list("Costing", {
        fields: ["*"],
        filters: { main_design_code: ["in", design_codes] },
        // order_by: 'idx asc' ,
    }).then((obj) => {
        console.log(obj)
        // frm.doc.costing_details = [];
        delete_summary_table(frm, 'costing_details');

        for (let i = 0; i < obj.length; i++) {
            let childTable = frm.add_child("costing_details");
            childTable.costing = obj[i].name
            childTable.design_code = obj[i].main_design_code
            childTable.status = obj[i].workflow_state
            // childTable.currency = 'USD'
            childTable.sale_price = obj[i].total_ss_cost

            var new_str = " "
            new_str += '   <table  class="table   table-bordered table-new_striped" style="margin-top: -24px !important; width:100%"> '
            new_str += '   <thead> '
            new_str += '       <tr style="text-align:center;text-shadow: 1px 1px 1px lightgrey, 3px 3px 5px lightgrey;"> '
            new_str += '          <td>Category</td> '
            new_str += '          <td>Cost</td> '
            new_str += '       </tr> '
            new_str += '    </thead> '
            new_str += '    <tbody >  ';
            if (obj[i].stone_cost_amount) {

                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Stone Cost </td> '
                new_str += '    <td>' + checkString(obj[i].stone_cost_amount) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].diamond_cost_amount) {

                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Diamond Cost </td> '
                new_str += '    <td>' + checkString(obj[i].diamond_cost_amount) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].setting_cost_amount) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Setting Cost </td> '
                new_str += '    <td>' + checkString(obj[i].setting_cost_amount) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].labour_cost_amount) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Labour Cost </td> '
                new_str += '    <td>' + checkString(obj[i].labour_cost_amount) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].findings_cost) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Finding Cost </td> '
                new_str += '    <td>' + checkString(obj[i].findings_cost) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].plating_cost_in_ss) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Plating Cost </td> '
                new_str += '    <td>' + checkString(obj[i].plating_cost_in_ss) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].labour_cost_not_inc) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Labour Cost Not Inc </td> '
                new_str += '    <td>' + checkString(obj[i].labour_cost_not_inc) + '</td>';
                new_str += ' </tr> ';
            }
            if (obj[i].other_cost_not_inc_va) {
                new_str += '<tr style="text-align:center;">';
                new_str += '          <td>Other Cost </td> '
                new_str += '    <td>' + checkString(obj[i].other_cost_not_inc_va) + '</td>';
                new_str += ' </tr> ';
            }
            new_str += '         </tbody> '
            new_str += '     </table>  ';
            childTable.category = new_str
        }
        frm.refresh_fields("costing_details");
    });
}

function checkString(value) {
    if (value) { return value; }
    else { return ''; }
}

// frappe.ui.form.on('OS What Is Where', {
//     refresh(frm, cdt, cdn) {

//     },

//     total_diamond_weight_cost_per_cts: function (frm, cdt, cdn) {
//         calculate_diamond_master(frm);
//     }

// })


// function calculate_what_is_where_master(frm) {
//     var total_bag_qty = 0;

//     if (frm.doc.what_is_where) {
//         frm.doc.what_is_where.forEach(child => {
//             total_bag_qty += parseFloat(child.bag_quantity) || 0;
//         });
//     }
//     frm.set_value('total_bag_qty', total_bag_qty.toFixed(3));
// }



// function calculate_diamond_master(frm) {
//     var total_diamond_weight = 0;

//     if (frm.doc.diamond_detail) {
//         frm.doc.diamond_detail.forEach(child => {
//             total_diamond_weight += parseFloat(child.total_diamond_weight_cost_per_cts) || 0;
//         });
//     }
//     frm.set_value('total_diamond_weight', total_diamond_weight.toFixed(3));
// }

function update_feild_of_value_additions(frm, category, field, deleted_flag) {
    // console.log(" category :" , category)
    // console.log(" deleted_flag :" , deleted_flag)
    if (parseFloat(checkDigit(frm.doc[field])) > 0) { // For Metal -------------------
        // console.log(" category value  :" , frm.doc[field])
        if (parseFloat(checkDigit(frm.doc[deleted_flag])) == 0) {
            // console.log(" deleted_flag value  :" , frm.doc[deleted_flag])
            var check_data = 0;
            if (frm.doc.value_additions) {
                check_data = 0;
                for (let i = 0; i < frm.doc.value_additions.length; i++) {
                    if (frm.doc.value_additions[i].category == category) {
                        // console.log(" category update  :" , category)
                        check_data = 1;
                        frm.doc.value_additions[i].category = category;
                        frm.doc.value_additions[i].cost_in_dollar = parseFloat(checkDigit(frm.doc[field]));
                        frm.doc.value_additions[i].amount_in_dollar_value_added = parseFloat(parseFloat(checkDigit(frm.doc[field])) * (parseFloat(checkDigit(frm.doc.value_additions[i].value_addition_on_weight)) / 100)).toFixed(3)
                    }
                }
            }
            if (check_data == 0) {
                // console.log(" category new  :" , category)
                frm.add_child('value_additions', {
                    category: category,
                    cost_in_dollar: frm.doc[field],
                    value_addition_on_weight: 0,
                    amount_in_dollar_value_added: 0,
                });
            }

        }
    }

    if (parseFloat(checkDigit(frm.doc[field])) <= 0) { // For Metal -------------------
        if (frm.doc.value_additions) {
            var check_index = -1;
            for (let i = 0; i < frm.doc.value_additions.length; i++) {
                if (frm.doc.value_additions[i].category == category) {
                    check_index = i;
                }
            }
            if (check_index >= 0) {
                frm.doc.value_additions.splice(check_index, 1)
            }
        }
    }
}


function update_category(frm) {

    update_feild_of_value_additions(frm, 'Metal', 'amount_in_dollar_in_metal', 'metal_value_add_deleted')
    update_feild_of_value_additions(frm, 'Setting', 'total_setting_per_pcs_in_dolllar_master', 'setting_value_add_deleted')
    update_feild_of_value_additions(frm, 'Labour', 'total_labour_cost', 'labour_value_add_deleted')
    update_feild_of_value_additions(frm, 'Findings', 'findings_in_dollar', 'finding_value_add_deleted')
    update_feild_of_value_additions(frm, 'Plating', 'total_plating_cost', 'plating_value_add_deleted')
    frm.refresh_field('value_additions');

    calculate_total_value_addition(frm);
}
