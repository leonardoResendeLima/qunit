function FundosPrivateController() {
	var self = this;

	self.loadPrivateFundsClassesAndProductsOnMacroClasses = function (idMacroClasse, macroClasseSelecionada) {
		if (macroClasseSelecionada) {
			macroClasseSelecionada = JSON.parse(macroClasseSelecionada);

			var id = macroClasseSelecionada.id;

			if (id) {
				self.cleanDetailsTableIfFilled(id);
				self.checkIfMacroClassHasClassAnPlaceErrorOrTable(macroClasseSelecionada);

				for (var classe in macroClasseSelecionada.classes) {
					var classeSelecionada = macroClasseSelecionada.classes[classe];

					for (var produtoIndex in classeSelecionada.produtoModels) {
						var tableElement = self.createTableElementForProduct(classeSelecionada, produtoIndex, macroClasseSelecionada);
						self.appendElementOnTable(tableElement);
					}
				}
			}
			self.openPrivateFundsDetail(id)
		} else {
			self.closePrivateFundsDetail(idMacroClasse);
		}
	};

	self.cleanDetailsTableIfFilled = function (id) {
		var fundsPrivateDetailEment = $(".detalhes-fundos-" + id);
		if (fundsPrivateDetailEment.find('table').length > 0) {
			fundsPrivateDetailEment.find('table').remove();
		}
	};

	self.checkIfMacroClassHasClassAnPlaceErrorOrTable = function (macroClasseSelecionada) {
		if (macroClasseSelecionada.classes) {
			self.createTableAndHeaderElementAndPlaceOnDetails(macroClasseSelecionada);
		} else {
			self.placeErrorMessageOnEmptyClass(macroClasseSelecionada);
		}
	};

	self.createTableAndHeaderElementAndPlaceOnDetails = function (macroClasseSelecionada) {
		var tableHeaderElement = "<table class='tabela-fundos'><thead><tr>" +
			"<td class='border-" + macroClasseSelecionada.cor + "'>Classe</td>" +
			"<td>Produtos</td>" +
			"<td>Termo de Ades\u00e3o</td>" +
			"<td>Regulamento</td>" +
			"<td>Formul\u00e1rio de Informa\u00E7\u00F5es Complementares</td>" +
			"<td>Relat\u00F3rio Mensal</td>" +
			"</tr></thead><tbody></tbody></table>";

		self.placeHeaderTableOnFundsDetail(tableHeaderElement, macroClasseSelecionada.id);
	};

	self.placeHeaderTableOnFundsDetail = function (tableHeaderElement, id) {
		$(".detalhes-fundos-" + id).append(tableHeaderElement);
	};

	self.placeErrorMessageOnEmptyClass = function (macroClasseSelecionada) {
		var tableHeaderElement = "<table class='tabela-fundos tabela-fundos-corpo error-background'><thead><tr>" +
			"<td class='border-" + macroClasseSelecionada.cor + "'><div>" +
			"<div class='error-icon inline-block'></div>" +
			"<div class='inline-block error-message'><label>N\u00e3o h\u00e1 fundo dispon\u00edvel.</label></div>" +
			"</div></td>" +
			"</tr></thead><tbody></tbody></table>";

		self.placeHeaderTableOnFundsDetail(tableHeaderElement, macroClasseSelecionada.id);
	};

	self.placeErrorMessageOnServerError = function (id, cor) {
		var tableHeaderElement = "<table class='tabela-fundos tabela-fundos-corpo error-background'><thead><tr>" +
			"<td class='border-" + cor + "'><div>" +
			"<div class='server-error-icon inline-block'></div>" +
			"<div class='inline-block error-message'><label>Servi\u00e7o indispon\u00edvel no momento.</label></div>" +
			"</div></td>" +
			"</tr></thead><tbody></tbody></table>";

		self.openPrivateFundsDetail(id);
		self.cleanDetailsTableIfFilled(id);
		self.placeHeaderTableOnFundsDetail(tableHeaderElement, id);
	};

	self.createTableElementForProduct = function (classe, produtoIndex, macroClasseSelecionada) {
		var produto = classe.produtoModels[produtoIndex];
		var indexProduto = $.inArray(produto, classe.produtoModels);
		var tableElement = "";

		tableElement += self.checkIfIsTheFirstProductOfClassAndApplyRowspanStyle(indexProduto, macroClasseSelecionada, classe);
		tableElement += "<td class='tf-produtos'>" + produto.titulo + "</td>";
		tableElement += "<td class='tf-termo-adesao'>" + self.openLinkToDocumentDownload(produto.termoAdesao.fileExists, produto.termoAdesao.base64) + "<div class=" + self.isProductAvailableForDownload(produto.termoAdesao) + "></div>" + self.closeLinkToDocumentDownload() + "</td>";
		tableElement += "<td class='tf-regulamento'>" + self.openLinkToDocumentDownload(produto.arquivoRegulamento.fileExists, produto.arquivoRegulamento.base64) + "<div class=" + self.isProductAvailableForDownload(produto.arquivoRegulamento) + "></div>" + self.closeLinkToDocumentDownload() + "</td>";
		tableElement += "<td class='tf-formulario-inf-cons'>" + self.openLinkToDocumentDownload(produto.informacoesComplementares.fileExists, produto.informacoesComplementares.base64) + "<div class=" + self.isProductAvailableForDownload(produto.informacoesComplementares) + "></div>" + self.closeLinkToDocumentDownload() + "</td>";
		tableElement += "<td class='tf-relatorios'>" + self.openLinkToDocumentDownload(produto.relatorioMensal.fileExists, produto.relatorioMensal.base64) + "<div class=" + self.isProductAvailableForDownload(produto.relatorioMensal) + "></div>" + self.closeLinkToDocumentDownload() + "</td>";
		tableElement += "</tr>";

		return tableElement
	};

	self.openLinkToDocumentDownload = function (fileExists, pathBase64) {
		if (!fileExists)
			return "";
		return "<a href='/ibpfprivateinvestimentos/pdf/relatorio?arquivo=".concat(pathBase64).concat("'>");
	};

	self.closeLinkToDocumentDownload = function (fileExists) {
		if (!fileExists)
			return "";
		return "</a>";
	};

	self.isProductDisabled = function (fileExists) {
		if (fileExists)
			return "onclick='downloadFundosPrivate($(this))'";
		return "";
	};

	self.checkIfIsTheFirstProductOfClassAndApplyRowspanStyle = function (indexProduto, macroClasseSelecionada, classe) {
		if (indexProduto === 0) {
			var alignClass = "";
			if (classe.produtoModels.length > 1) {
				alignClass = "align-top-funds"
			} else {
				alignClass = "align-middle-funds"
			}

			return "<tr><td class='tf-classe " + alignClass + " border-" + macroClasseSelecionada.cor + "' rowspan='" + classe.produtoModels.length + "'>" + classe.dsClasse + "</td>";
		} else
			return "<tr>";
	};

	self.appendElementOnTable = function (tableElement) {
		$(".tabela-fundos tbody").append(tableElement);
	};

	self.isProductAvailableForDownload = function (productObject) {
		if (productObject.fileExists)
			return 'image-download-enabled';
		return 'image-download-disabled';
	};

	self.openPrivateFundsDetail = function (id) {
		if (id) {
			$(".detalhes-fundos").addClass('hidden').removeClass('show');
			$(".detalhes-fundos-" + id).addClass('show').removeClass('hidden');

			$(".icone-fundos-mais").removeClass("hidden").addClass("show");
			$(".icone-fundos-menos").removeClass("show").addClass("hidden");

			$(".fundos-mais-" + id).removeClass("show").addClass("hidden");
			$(".fundos-menos-" + id).removeClass("hidden").addClass("show");

			$(".fundos-loading-" + id).removeClass("display-inline").addClass("display-none");
			$(".fundos-toggle-" + id).removeClass("display-none").addClass("display-inline");

			self.adjustPageHeigth();
		}
	};

	self.closePrivateFundsDetail = function (id) {
		if (id) {
			$(".detalhes-fundos").addClass('hidden');

			$(".icone-fundos-mais").removeClass("hidden").addClass("show");
			$(".icone-fundos-menos").removeClass("show").addClass("hidden");

			$(".fundos-linha-loading").removeClass('display-inline').addClass('display-none');
			$(".fundos-linha-icone-toggle").removeClass('display-none').addClass('display-inline');
		}
		self.adjustPageHeigth();
	};

	self.adjustPageHeigth = function () {
		try {
			setTimeout(function () {
				window.parent.autoIframe();
				setTimeout(function () {
					var tamanhoFrameMiolo = 1350;
					var paginaCentral = window.parent.document.getElementById("paginaCentral");
					if (paginaCentral) {
						tamanhoFrameMiolo = $(paginaCentral.contentWindow.document.getElementsByClassName('miolo')[0]).height();
						if (tamanhoFrameMiolo)
							tamanhoFrameMiolo = tamanhoFrameMiolo + 80;

						$(paginaCentral).animate({ height: tamanhoFrameMiolo + "px" }, 0, 'linear');
					}
				}, 550);
			}, 100);
		} catch (err) {
		}
	};

	self.clickOnOpenPrivateFundsDetail = function (id, cor) {
		$(".fundos-loading-" + id).removeClass("display-none").addClass("display-inline");
		$(".fundos-toggle-" + id).removeClass("display-inline").addClass("display-none");
		setTimeout(function () {
			self.expandirFundos(id, cor);
		}, 100);
	};

	self.expandirFundos = function (id, cor) {
		var params = "macroClasseId=" + id;
		$.ajax({
			type: "GET",
			url: "/ibpfprivateinvestimentos/fundos/enrichProducts.jsf",
			data: params,
			dataType: "application/json",
			async: false,
			success: function (data) {
				self.loadPrivateFundsClassesAndProductsOnMacroClasses(id, data);
			}, error: function (err) {
				self.placeErrorMessageOnServerError(id, cor);
			}
		});
	};


	return {
		loadPrivateFundsClassesAndProductsOnMacroClasses: self.loadPrivateFundsClassesAndProductsOnMacroClasses,
		openPrivateFundsDetail: self.openPrivateFundsDetail,
		closePrivateFundsDetail: self.closePrivateFundsDetail,
		clickOnOpenPrivateFundsDetail: self.clickOnOpenPrivateFundsDetail,
		adjustPageHeigth: self.adjustPageHeigth
	}
}
