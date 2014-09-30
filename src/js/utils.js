define([], function () {

	/**
	 * Bind DOM event to some handler function in controller
	 * @param  {Array} bindings
	 */
	function bindEvents(bindings) {
		if ($$.isArray(bindings) && bindings.length > 0) {
			for (var i in bindings) {
				$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			}
		}
	}

	/**
	 * Set the position of buttons, which queried by selector, dynamic
	 * @param {String} selector
	 */
	function setButtonPosition(selector) {
		var pageContent = $$(selector).parents('.page-content')[0];
		var isScrollable = isScroll(pageContent);

		if (isScrollable) {
			$$(selector).removeClass('fixed-bottom');
		} else {
			$$(selector).addClass('fixed-bottom bottom-button');
		}
	}

	/**
	 * Detect whether the element has scrollbar
	 * @param  {HTMLElement}  elem
	 * @return {Boolean}      true: has scrollbar; false: hasn't
	 */
	function isScroll(elem) {
		return elem.scrollHeight > elem.clientHeight;
	}

	return {
		bindEvents: bindEvents,
		setButtonPosition: setButtonPosition
	};
});
