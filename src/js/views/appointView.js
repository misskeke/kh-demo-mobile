define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.appoint-done-button');
	}

	return {
		render: render
	};
});
