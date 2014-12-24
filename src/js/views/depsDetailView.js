define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#depsDetailTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#depsDetailContent').html(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	function renderTitle(text) {
		var navTitle = $$('.navbar .center').eq(0);
		navTitle.text(text);
	}

	return {
		render: render,
		renderTitle: renderTitle
	};
});
