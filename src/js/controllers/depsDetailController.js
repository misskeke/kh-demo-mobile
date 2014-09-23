define(['views/depsDetailView'], function (View) {

	var bindings = [];

	function init(query) {

		var title = decodeURIComponent(query.name);
		console.log(title);
		View.renderTitle(title);

		$$.ajax({
			url: 'api/deps-detail.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model,
						bindings: bindings
					});
				}
			}
		});
	}

	return {
		init: init
	};
});
