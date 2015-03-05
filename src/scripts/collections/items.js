/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Items = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Item,

		url: "data.json"
	});

	// Create our global collection of **Todos**.
	app.items = new Items();
})();
