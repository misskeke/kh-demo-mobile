define([], function () {

	var storage = [];

	function save(data) {
		storage.push(data);
	}

	function saved() {
		var result = fetch();
		return result.length > 0;
	}

	function fetch(subentry) {
		if (subentry) {
			return storage[0][subentry];
		} else {
			return storage;
		}
	}

	return {
		save: save,
		saved: saved,
		fetch: fetch
	};
});
