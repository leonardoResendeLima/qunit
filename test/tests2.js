QUnit.module("Fundos Private Controller", function (hooks) {
	let fundosPrivate = null;

	hooks.before(function () {
		fundosPrivate = new FundosPrivateController();
	});

	QUnit.test("Somar 1 e 2 e ser igual a 3", function (assert) {
		assert.ok(fundosPrivate.sum(1, 2) === 3);
	});

	QUnit.test("Deve retornar o header da tabela de fundos com a classe da borda preenchida",
		function (assert) {
			const macroClasseSelecionada = { "cor": "#cccccc" };
			const header = "<table class='tabela-fundos'><thead><tr>" +
				"<td class='border-#cccccc'>Classe</td>" +
				"<td>Produtos</td>" +
				"<td>Termo de Ades\u00e3o</td>" +
				"<td>Regulamento</td>" +
				"<td>Formul\u00e1rio de Informa\u00E7\u00F5es Complementares</td>" +
				"<td>Relat\u00F3rio Mensal</td>" +
				"</tr></thead><tbody></tbody></table>";
			assert.equal(
				fundosPrivate.createTableAndHeaderElement(macroClasseSelecionada),
				header
			);
		});
});