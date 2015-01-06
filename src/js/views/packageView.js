define([], function () {

	function render(params) {
		var renderTemplate = params.model.packageContent;
		$$('#packageDetailContent').append(renderTemplate);
	}

	return {
		render: render
	};
});
