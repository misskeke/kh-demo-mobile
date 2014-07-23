define(['utils', 'hbs!js/templates/review'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model})
		$$('.page-content').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});