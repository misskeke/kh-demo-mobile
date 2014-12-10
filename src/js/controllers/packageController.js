define(['views/packageView'], function (View) {

	function init() {
		$$.ajax({
			url: 'api/package-detail.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model
					});
				}
			}
		});
	}

	return {
		init: init
	}
});
