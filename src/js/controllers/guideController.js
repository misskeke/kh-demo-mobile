define(['views/guideView'], function (View) {

	var bindings = [{
		element: '.entrance',
		event: 'click',
		handler: jumpPage
	}];

	function init() {
		View.render({
			bindings: bindings
		});

		autoHeightBlock();
	}

	function autoHeightBlock() {
		var viewHeight = document.documentElement.clientHeight;
		var calcHeight = viewHeight - 140 - $$('#extraInfo').height();
		var length = $$('.entrance').length;

		$$('.entrance').css('height', calcHeight / length + 'px');
	}

	function jumpPage() {
		var param = $$(this).data('type');
		mainView.loadPage('login.html?type=' + param);
	}

	return {
		init: init
	};
});
