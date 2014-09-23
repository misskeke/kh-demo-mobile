define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#accountTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model, groupName: params.groupName});

		$$('#accountList').html(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	function renderTitle(text) {
		var navTitle = $$('.navbar .center').eq(1);
		navTitle.text(text);
	}

	return {
		render: render,
		renderTitle: renderTitle
	};
});
