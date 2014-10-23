define(['services/openTypeService'], function (OTS) {
	//常量JS
	var MESSAGE_TIMEOUT 	= "网络或服务异常，请检查手机网络情况后重试！";
	var MESSAGE_INITFAIL 	= "初始化失败，请注销后重新登陆再试！";
	var MESSAGE_INITUN 		= "初始化未完成，请稍后再试！";
	//////////////////////////////////////////////////////////////////////

	var $CONFIG = null;
	init();

	function init() {
		if (!$CONFIG) {
			$CONFIG = {};
			$CONFIG.currentUser = {};

			if (localStorage.getItem('user')) {
				$CONFIG.currentUser = JSON.parse(localStorage.getItem('user'));
			}

			if (localStorage.getItem('sid')) {
				$CONFIG.currentUser.sid = localStorage.getItem('sid');
			}
		}
	}

	function getCurrentUser() {
		return $CONFIG.currentUser;
	}

	function getSid() {
		var m = $$.parseUrlQuery(window.location.href || '');
		return m.sid || localStorage.getItem('sid');
	}

	function setCurrentUser(sid, user) {
		$CONFIG.currentUser = user;
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('sid', sid);
	}

	function removeCurrentUser() {
		$CONFIG.currentUser = {};
		localStorage.removeItem('user');
		localStorage.removeItem('sid');
	}

	function isLogin() {
		if ($CONFIG.currentUser && localStorage.getItem('sid')) {
			return true;
		} else {
			return false;
		}
	}

	var startPage = OTS.setStartPage();

	function logout() {
		khApp.confirm('您确定要退出登录吗？', function () {
			var currentPage = $$('.page-on-center').data('page');
			removeCurrentUser();
			khApp.closeModal();
			khApp.closePanel();
			if (currentPage === 'video') {
				clearTimeout(window.videoQueryTimer);
				console.log('quit video query successful');
			}
			mainView.loadPage(startPage);
		});
	}

	function checkUpdate() {
		khApp.modal({
			title: '当前版本',
			text: window.appParams.version,
			buttons: [{
				text: '检测更新',
				onClick: function () {
					khApp.alert('您当前的版本已经是最新');
				}
			}, {
				text: '返回'
			}]
		});
	}

	function getData(url, cb) {
		khApp.showIndicator();
		$$.ajax({
			url: url + '?rnd=' + new Date().getTime(),
			type: 'GET',
			timeout: 15000, //超时时间设置，单位毫秒
			success: function (data) {
				khApp.hideIndicator();
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					cb(data);
				} else {
					khApp.alert(data.errorInfo);
				}
			},
			error: function() {
				khApp.hideIndicator();
				khApp.alert(MESSAGE_TIMEOUT);
			},
			timeout: function() {
				khApp.hideIndicator();
				khApp.alert(MESSAGE_TIMEOUT);
			}
		});
	}

	return {
		getSid: getSid,
		getCurrentUser: getCurrentUser,
		setCurrentUser: setCurrentUser,
		removeCurrentUser: removeCurrentUser,
		isLogin: isLogin,
		logout: logout,
		checkUpdate: checkUpdate,
		startPage: startPage,
		getData: getData
	};
});
