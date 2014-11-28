define(['GS'], function (GS) {

	var hash = {
		guide       : 'guide',
		login       : 'login',
		identity    : 'identity',
		collect     : 'collect',
		profile     : 'profile',
		department  : 'department',
		departments : 'departments',
		depsDetail  : 'depsDetail',
		video       : 'video',
		appoint     : 'appoint',
		cert        : 'cert',
		sign        : 'sign',
		account     : 'account',
		accountList : 'accountList',
		risk        : 'risk',
		password    : 'password',
		depository  : 'depository',
		review      : 'review',
		audit       : 'audit',
		protocal    : 'protocal',
		reform      : 'reform',
		prov        : 'prov',
		city        : 'city',
		deps        : 'deps'
	};

	var mainNodes = {
		account: 'account.html',
		department: 'department.html',
		collect: 'collect.html',
		profile: 'profile.html',
		video: 'video.html',
		cert: 'cert.html',
		password: 'password.html',
		depository: 'depository.html',
		risk: 'risk.html',
		review: 'review.html'
	};

	/**
	 * Init router, that handle page events
	 */
	function init() {
		$$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			load(page.name, page.query);
		});

		$$('.logout').on('click', GS.logout);
		$$('.version').on('click', GS.checkUpdate);

		if (!GS.isLogin()) {
			mainView.loadPage('maintain.html');
			// mainView.loadPage(GS.startPage, false);
		} else {
			var currentUser = GS.getCurrentUser();
			mainView.loadPage(currentUser.node + '.html');
		}
	}

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param  controllerName
	 * @param  query
	 */
	function load(controllerName, query) {
		if (controllerName in hash) {
			require(['controllers/' + hash[controllerName] + 'Controller'], function (controller) {
				controller.init(query);
			});
		}
	}

	function preprocess(content, url, next) {
		var isMainNode = false;

		for (var node in mainNodes) {
			if (mainNodes[node] === url) {
				isMainNode = true;
				$$.ajax({
					type: 'GET',
					data: null,
					url: url + '?rnd=' + new Date().getTime(),
					success: function (data) {
						next(data);
					},
					error: function () {
						khApp.hideIndicator();
						khApp.closeModal();
						khApp.alert(MESSAGE_TIMEOUT);
					}
				});
				break;
			}
		}

		if (!isMainNode) {
			return content;
		}
	}

	return {
		init: init,
		load: load,
		preprocess: preprocess
	};
});
