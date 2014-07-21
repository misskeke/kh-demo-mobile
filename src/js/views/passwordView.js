define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function toggleInputs(visiable) {
		var $$wrapper = $$('.item-set').parent();
		var $$itemSet = $$('.item-set');
		var $$itemContent = $$itemSet.nextAll('li').css('overflow', 'hidden').find('.item-content');
		var height = $$itemSet.outerHeight();
		if (visiable === 'hide') {
			$$wrapper.css('height', height * 3 + 'px');
			var clientHeight = $$wrapper[0].clientHeight;
			$$wrapper.css('height', height + 'px').transition('300ms');
			$$itemContent.transform('translate3d(0,-200%,0)')
				.transition('300ms')
				.transitionEnd(function () {
					$$itemSet.find('.item-inner').css('border-bottom', '1px solid transparent');
					$$itemContent.hide();
				});
		} else if (visiable === 'show') {
			$$itemContent.show();
			$$itemSet.find('.item-inner').css('border-bottom', '1px solid #c8c7cc');
			$$wrapper.css('height', height + 'px');
			var clientHeight = $$wrapper[0].clientHeight;
			$$wrapper.css('height', height * 3 + 'px').transition('300ms');
			$$itemContent.transform('translate3d(0,0,0)').transition('300ms')
		}
	}

	return {
		render: render,
		toggleInputs: toggleInputs
	}
});
