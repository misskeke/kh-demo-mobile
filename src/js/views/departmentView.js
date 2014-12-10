define(['utils'], function (Utils) {

	var previous;

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderSelect(params) {
		var template = $$('#departmentTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#departmentContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		resetSelect();
	}

	function renderPackage(params) {
		var template = $$('#packageTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate(params.model);

		$$('#packages').html(renderTemplate);
		// renderCommission(params.model.originCommission);
		// $$('.commission').text(params.model.originCommission);
		// original = $$('.package-choosen').html();
		// $$('.package-choosen').hide();
		Utils.bindEvents(params.bindings);
	}

	function renderName(text) {
		$$('.department-name').find('h2').text(text);
	}

	function renderBadge() {
		$$('.department-badge').html('您选择的是');
	}

	function renderCommission(commission) {
		$$('.package-choosen').text('根据所选营业部，您的佣金是');
		$$('.package-choosen').append('<mark class="commission">' + commission + '</mark>');
		previous = $$('.package-choosen').html();
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	function selectPackage(li, text) {
		$$(li).parent().find('li').removeClass('selected');
		$$(li).addClass('selected');
		changeCommission(text);
	}

	function deselectPackage(li) {
		$$(li).removeClass('selected');
		$$('.package-choosen').text('根据所选营业部，您的佣金是');
		$$('.package-choosen').html(previous);
		// $$('.package-choosen').hide();
	}

	function changeCommission(commission) {
		$$('.package-choosen').text('根据所选营业部及服务套餐，您的佣金是');
		$$('.package-choosen').append('<mark class="commission">' + commission + '</mark>');
	}

	return {
		render: render,
		renderName: renderName,
		renderBadge: renderBadge,
		renderSelect: renderSelect,
		renderPackage: renderPackage,
		selectPackage: selectPackage,
		deselectPackage: deselectPackage,
		renderCommission: renderCommission
	};
});
