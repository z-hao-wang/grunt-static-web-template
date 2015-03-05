/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.ItemView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'tr',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		initialize: function () {
		},

		// Re-render the item
		render: function () {
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});
})($);
