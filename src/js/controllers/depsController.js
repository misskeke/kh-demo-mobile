define(['views/depsView', 'models/depsModel'], function (View, Model) {

	var bindings = [{
		element: '#depsList .label-radio',
		event: 'click',
		handler: selectDeps
	}];

	function init(query) {
        var city = decodeURIComponent(query.city);
		Model.fetchDeps(city, function (data) {
            View.render({
                model: data,
                bindings: bindings
            });
        });
	}

	function selectDeps() {
		var button = $$('.deps-select-button');
		var input = $$(this).find('input')[0];

		setTimeout(function () {
            selectHandler();
		}, 200);
	}

	function selectHandler() {
		var input = $$('#depsList').find('input:checked');
        var depsno = input.val();
		var parent = input.parent();
		var depsname = parent.find('.item-title').html();

		mainView.goBack({
            url: 'department.html?depsname=' + depsname + '&depsno=' + depsno,
            forceUrl: true
        });
	}

	return {
		init: init
	};
});
