/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		max_items: 250,

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#mainContainer', //# March madness prefx

		// Delegated events for creating new items, and clearing completed ones.
		events: {
		},

		colleges: [],

		initialize: function () {
			this.$list = $('#mainTable');
			this.$main = this.$('#main');
			this.listenTo(app.items, 'filter', this.filterAll);
			this.listenTo(app.items, 'reset', this.addAll);
			this.listenTo(app.items, 'add', this.addOne);
			this.listenTo(app.items, 'all', this.render);
			this.listenTo(app.items, 'change:completed', this.filterOne);
			app.items.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
		  this.data = app.items;
			this.$list.html('<tr><th>Name</th></tr>');
			if (this.data.length) {
				this.addAll();
			}
		},

		addOne: function (item) {
			var view = new app.ItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the **items** collection at once.
		addAll: function () {
			this.data.each(this.addOne, this);
		},

		filterOne: function (item) {
			
		},

		filterAll: function () {
			app.items.each(this.filterOne, this);
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {

		}
	});
})($);
