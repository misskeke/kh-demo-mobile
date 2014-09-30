define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.identity-next-button');
	}

	return {
		render: render
	};
});
