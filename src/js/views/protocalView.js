define([], function () {

	function render(params) {
		var template = $$('#protocalTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#protocalContent').html(renderTemplate);
	}

	return {
		render: render
	};
});
