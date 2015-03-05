/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var ItemRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.ItemFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			app.items.trigger('filter');
		}
	});

	app.ItemRouter = new ItemRouter();
	Backbone.history.start();
})();
