sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], function(
	Controller,
    MessageToast
) {
	"use strict";

	return Controller.extend("zappfreestylelpb.parceiroslpb.controller.CriarParceiro", {

        onInit: function () {

            let oRouter = this.getOwnerComponent().getRouter();

            let oRouterView = oRouter.getRoute("RouteCriarParceiro");

            oRouterView.attachPatternMatched(this.attachPattern, this);

            this.getOwnerComponent().getModel().setDefaultBindingMode('TwoWay');

        },

        attachPattern: function(oRouter) {

            let sCodigoParceiro = oRouter.getParameter("arguments").CodigoParceiro;

            let oModel = this.getOwnerComponent().getModel();

            let sCaminho = oModel.createKey("/ParceiroSet", {CodigoParceiro: sCodigoParceiro});

            this.getView().bindElement(sCaminho);


        },

        onCancelButton: function(oEvent) {
            
            //Resetar Alteracoes
            
            this.getOwnerComponent().getModel().resetChanges();

            //Voltar para o item menu
            let oRouter = this.getOwnerComponent().getRouter();

            // Get Last Router to return to            
            let oModel= this.getOwnerComponent().getModel("route");
            let sLastRoute  = oModel.getProperty("/lastRoute");
            let sLastPattern = oModel.getProperty("/lastPattern");
            let sLastCodigoParceiro = oModel.getProperty("/lastCodigoParceiro");
            
            if (sLastRoute === "RouteParceiro")
            {
                oRouter.navTo(sLastRoute, {CodigoParceiro: sLastCodigoParceiro} );

            }
            else{
                oRouter.navTo(sLastRoute);
            }

        },

        onSaveButton: function(oEvent) {
            
            let oDadosTela = this.getView().getBindingContext().getObject();

            let oInfoInsert = {
                CodigoParceiro: oDadosTela.CodigoParceiro,
                Tipo: this.getView().byId("cboTipo").getSelectedKey(),
                Nome1: oDadosTela.Nome1,
                Nome2: oDadosTela.Nome2,
                TermoDePesquisa1: oDadosTela.TermoDePesquisa1,
                TermoDePesquisa2: oDadosTela.TermoDePesquisa2,
                Rua: oDadosTela.Rua,
                NumeroCasa: oDadosTela.NumeroCasa,
                Bairro: oDadosTela.Bairro,
                Cidade: oDadosTela.Cidade,
                Estado: oDadosTela.Estado,
                Pais: oDadosTela.Pais,
                CEP: oDadosTela.CEP
            }

            let oModel = this.getOwnerComponent().getModel();

            oModel.create("/ParceiroSet", oInfoInsert, {
                success: () => {
                    MessageToast.show("Parceiro criado com sucesso.")
                    this.getOwnerComponent().getRouter().navTo("RouteListaParceiros")
                },

                error: (onError) => {
                    let sErrorMessage = JSON.parse(onError.responseText).error.message.value
                    var sMessage = "Erro criar parceiro!"+ sErrorMessage
                     MessageToast.show(sMessage)                    
                }
            })

        }
	});
});