function FundosPrivateController() {
	var self = this;

	self.sum = function (num1, num2) {
		return num1 + num2;
	};

	self.createTableAndHeaderElement = function (macroClasseSelecionada) {
		var tableHeaderElement = "<table class='tabela-fundos'><thead><tr>" +
			"<td class='border-" + macroClasseSelecionada.cor + "'>Classe</td>" +
			"<td>Produtos</td>" +
			"<td>Termo de Ades\u00e3o</td>" +
			"<td>Regulamento</td>" +
			"<td>Formul\u00e1rio de Informa\u00E7\u00F5es Complementares</td>" +
			"<td>Relat\u00F3rio Mensal</td>" +
			"</tr></thead><tbody></tbody></table>";

		return tableHeaderElement;
	};

	return {
		sum: self.sum,
		createTableAndHeaderElement: self.createTableAndHeaderElement
	};
}

module.exports = FundosPrivateController;