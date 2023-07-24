sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/MessageToast" 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Dialog, DialogType, Text, Button, ButtonType, MessageToast) {
        "use strict";

        return Controller.extend("zappfreestylelpb.parceiroslpb.controller.ListaParceiros", {
            onInit: function () {

            },

            onClickItem: function(oEvent) {
                 
                // Caputar parceiro da linha selecionada!
                let oContexto = oEvent.getSource().getBindingContext().getObject();
                let sCodigoParceiro = oContexto.CodigoParceiro;

                let oRouteModel = this.getOwnerComponent().getModel("route");

                // Armazenar ultimo codigo clicado
                oRouteModel.setProperty("/lastCodigoParceiro", sCodigoParceiro);


                // Navegacao para segunda ROTA
                let oRoteador = this.getOwnerComponent().getRouter();
                oRoteador.navTo("RouteParceiro", {CodigoParceiro: sCodigoParceiro});                
            },

            onCriarButton: function(oEvent) {

                let oRoteador = this.getOwnerComponent().getRouter();
                
               // Get Current Route
               let sCurrentHash = this.getOwnerComponent().getRouter().getHashChanger().getHash();
               let sLastRoute = oRoteador.getRouteInfoByHash(sCurrentHash).name;
               let sLastPattern = this.getOwnerComponent().getRouter().getRoute(sLastRoute)._aPattern[0];
               
               //Store lastRoute for returning in create view
               let oModel= this.getOwnerComponent().getModel("route");
               oModel.setProperty("/lastRoute", sLastRoute);
               oModel.setProperty("/lastPattern", this.getOwnerComponent().getRouter().getRoute(sLastRoute)._aPattern[0]);

                oRoteador.navTo("RouteCriarParceiro", {CodigoParceiro: "novo_parc"});
            },

            onDeletarButton: function(oEvent)
            {
                let oSelectedItem = this.getView().byId("tab").getSelectedItem()

                if (oSelectedItem != null){

                    let sPath = oSelectedItem.getBindingContext().sPath;
                    this.oApproveDialog = new Dialog({type: DialogType.Message,
                                                      title: "Deletar Parceiro?",
                                                      content: new Text({text: "Deseja deletar parceiro selecionado?"}),
                                                      beginButton: new Button({type: ButtonType.Emphasized,
                                                                               text: "Sim",
                                                                                press: function () {
                                                                                        
                                                                                     this._deletarParceiro(sPath);
                                                                                     this.oApproveDialog.close();

                                                                                   }.bind(this)
                                                                                }),
                                                      endButton: new Button({type: ButtonType.Negative,
                                                                             text: "Não",
                                                                             press: function () {
                                                                             this.oApproveDialog.close();
                                                                             }.bind(this)

                                                                             })

                        });

                    if (this.oApproveDialog){
                        this.oApproveDialog.open();
                    }
                }


            },

            _deletarParceiro: function(sPath) {

                let oModel = this.getOwnerComponent().getModel();

                oModel.remove(sPath, {
                              success: () => {
                                MessageToast.show("Parceiro deletado com sucesso!");
                              },
                              error: (oError) => {
                                let sMessage = JSON.parse(oError.responseText).error.message.value;
                                MessageToast.show(sMessage);
                              }
                });
                              

            }
        });
    });
