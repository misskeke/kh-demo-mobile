define(['utils'], function (Utils) {

	var titles = ['股票及场内基金', '开放式基金及理财产品', '创新产品', '增值服务'];

	function render(params) {
		var template = $$('#accountTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var assemblyModel = assembly(params.model);
		// console.log(assemblyModel);
		var renderTemplate = compiledTemplate(assemblyModel);

		$$('#accountContent').html(renderTemplate);
		checkDefaultSelected();
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.account-next-button');
	}

	function assembly(model) {
		var accounts = model.accountTypeListMap;
		var accountsModel = [];

		for (var account in accounts) {
			var accountInfo = [];
			var index = parseInt(account, 10) - 1;
			// console.log(accounts[account]);
			// console.log(titles[index]);
			for (var i = 0; i < accounts[account].length; i++) {
				accountInfo.push(accounts[account][i]);
			}

			accountsModel.push({
				accountTitle: titles[index],
				accountInfo: accountInfo
			});
		}
		console.log(accountsModel);

		return {model: accountsModel};
	}

	function checkDefaultSelected() {
		$$('#accountContent select').each(function () {
			checkSelected(this);
		});
	}

	function checkSelected(select) {
		var valueText = [];
		var itemBefore = $$(select).parent().find('.item-before');
		var itemAfter = $$(select).parent().find('.item-after');
		var itemInner = $$(select).parent().find('.item-inner');

		for (var i = 0; i < select.length; i++) {
			if (select[i].selected) valueText.push(select[i].textContent.trim());
		}

		if (valueText.length > 0) {
			itemBefore.text('已选择');
			itemAfter.text(valueText.join(', '));
			itemInner.addClass('selected');
		} else {
			itemBefore.text('请选择');
			itemInner.removeClass('selected');
		}
	}

	return {
		render: render,
		checkSelected: checkSelected
	};
});
