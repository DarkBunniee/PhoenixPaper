// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
// function (Controller) {
//     "use strict";

//     return Controller.extend("pp.phoenixpaper.controller.View1", {
//         onInit: function () {

//         }
//     });
// });



// RUNNING VERSION 
// JUST ADD rows="{/ZPurchaseOrderGetItem_CDS}" IN XML TABLE
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], function (Controller, Filter, FilterOperator) {
//     "use strict";

//     return Controller.extend("pp.phoenixpaper.controller.View1", {
//         onInit: function () {
//             // Any initial logic
//         },

//         onFilterPO: function () {
//             // Get Purchase Order number from input field
//             var oView = this.getView();
//             var sPO = oView.byId("_IDGenInput8").getValue(); // Assuming this is the PO input

//             if (!sPO) {
//                 sap.m.MessageToast.show("Please enter a Purchase Order number.");
//                 return;
//             }

//             // Get the table and its binding
//             var oTable = oView.byId("_IDGenTable");
//             var oBinding = oTable.getBinding("rows");

//             // Create filter
//             var oFilter = new Filter("PurchaseOrder", FilterOperator.EQ, sPO);

//             // Apply filter
//             oBinding.filter([oFilter]);
//         }
//     });
// });








// RUNNING VERSION WITH DYNAMICS SEARCH
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("pp.phoenixpaper.controller.View1", {
        onInit: function () {
            // Any initial logic
        },

        // onFilterPO: function () {
        //     // Get Purchase Order number from input field
        //     var oView = this.getView();
        //     var sPO = oView.byId("_IDGenInput8").getValue(); // Assuming this is the PO input

        //     if (!sPO) {
        //         sap.m.MessageToast.show("Please enter a Purchase Order number.");
        //         return;
        //     }

        //     // Get the table and its binding
        //     var oTable = oView.byId("_IDGenTable");
        //     var oBinding = oTable.getBinding("rows");

        //     // Create filter
        //     var oFilter = new Filter("PurchaseOrder", FilterOperator.EQ, sPO);

        //     // Apply filter
        //     oBinding.filter([oFilter]);
        // }


        // v.0.1 working
        // onFilterPO: function () {
        //     var oView = this.getView();
        //     var sPO = oView.byId("_IDGenInput8").getValue().trim();
        
        //     if (!sPO) {
        //         sap.m.MessageToast.show("Please enter a Purchase Order number.");
        //         return;
        //     }
        
        //     // Get the table control
        //     var oTable = oView.byId("_IDGenTable");
        
        //     // Define the filter
        //     var oFilter = new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, sPO);
        
        //     // Bind rows to table with filter
        //     oTable.bindRows({
        //         path: "/ZPurchaseOrderGetItem_CDS",
        //         filters: [oFilter]
        //     });
        // }        


        // v.0.2 updated with validation 
        onFilterPO: function () {
            var oView = this.getView();
            var sPO = oView.byId("_IDGenInput8").getValue().trim();
        
            // Check if Purchase Order number is entered
            if (!sPO) {
                sap.m.MessageToast.show("Please enter a Purchase Order number.");
                return;
            }
        
            // Get the table control
            var oTable = oView.byId("_IDGenTable");
        
            // Define the filter for the Purchase Order
            var oFilter = new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, sPO);
        
            // Bind rows to table with filter
            oTable.bindRows({
                path: "/ZPurchaseOrderGetItem_CDS",
                filters: [oFilter],
                // This event triggers when the data is loaded
                events: {
                    dataReceived: function (oEvent) {
                        var oData = oEvent.getParameter("data");
                        // Check if data is empty
                        if (!oData || oData.length === 0) {
                            // Show a toast if no data is found for the given Purchase Order
                            sap.m.MessageToast.show("The specified Purchase Order is not available.");
                        }
                    }
                }
            });
        }
        

    });
});





