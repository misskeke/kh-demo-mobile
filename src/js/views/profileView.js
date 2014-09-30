define(['utils'], function (Utils) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function render(params) {
		var template = $$('#profileTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#profileContent').html(renderTemplate);
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.profile-next-button');
		resetSelect();
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	return {
		init: init,
		render: render
	};
});
