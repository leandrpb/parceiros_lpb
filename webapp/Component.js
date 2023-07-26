/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zappfreestylelpb/parceiroslpb/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("zappfreestylelpb.parceiroslpb.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                let oModel = new JSONModel();
                
                // Set Layout as a global model
                this.setModel(oModel, "layout");

                oModel = new JSONModel();
                oModel.setProperty("/lastRoute", "");
                oModel.setProperty("/lastPattern", "':?query:'");
                oModel.setProperty("/lastCodigoParceiro", "");
                this.setModel(oModel, "route");
                
                // Bind method to NavTo Router
                this.getRouter().attachBeforeRouteMatched(this.onChangeModel, this);
            
                
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            onChangeModel: function (oModel) {

                let oLayout = this.getModel("layout");

                let sRouter = oModel.getParameter("name");

                if (sRouter === "RouteParceiro")
                {
                    oLayout.setProperty("/visual", sap.f.LayoutType.TwoColumnsMidExpanded);
                }
                else
                {
                    oLayout.setProperty("/visual", sap.f.LayoutType.OneColumn);
                }
            }
        });
    }
);