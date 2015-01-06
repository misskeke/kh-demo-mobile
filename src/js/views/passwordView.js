define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function toggleInputs(visiable) {
		if (visiable === 'hide') {
			$$('#sync').hide();
		} else if (visiable === 'show') {
			$$('#sync').show();
		}
	}

	return {
		render: render,
		toggleInputs: toggleInputs
	};
});
