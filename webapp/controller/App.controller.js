sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("zappfreestylelpb.parceiroslpb.controller.App", {
        onInit() {
          
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteListaParceiros");

        }
      });
    }
  );
  