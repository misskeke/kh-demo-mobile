define(['utils'], function (Utils) {

	function render(params) {
		// var template = $$('#departmentTemplate').html();
		// var compiledTemplate = Template7.compile(template);
		// var renderTemplate = compiledTemplate({model: params.model});

		// $$('#departmentContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.department-next-button');
	}

	function renderSelect(params) {
		var template = $$('#departmentTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#departmentContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		resetSelect();
	}

	function renderName(text) {
		var titleLink = $$('.department-header-link');
		titleLink.text(text);
		titleLink[0].search = '?name=' + text;
	}

	function renderBadge(selectedBadge) {
		if(selectedBadge=="recommend")
		{
			$$('.department-badge').html('<i class="iconfont icon-recommend"></i> 推荐');
		}
		else{
			$$('.department-badge').html('<i class="iconfont icon-lookfor"></i> 自选');
		}
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	function selectResult(params){
		// var template = $$('#department').html();
		// var compiledTemplate = Template7.compile(template);
		// var renderTemplate = compiledTemplate({model: params.model});

		// $$('.have-result').append(renderTemplate);
		// Utils.bindEvents(params.bindings);
		// selectResult();
	}

	function renderSearch(params){
		var template = $$('#marketerTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('.have-result').html('').append(renderTemplate);
	}

	return {
		render: render,
		renderName: renderName,
		renderBadge: renderBadge,
		renderSelect: renderSelect,
		selectResult: selectResult,
		renderSearch: renderSearch
	};
});
