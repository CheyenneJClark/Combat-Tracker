var app = app || {};

app.singleCombatant = Backbone.Model.extend({
	defaults: {
		name: '',
		intiative: '',
		dead: false
	},
    toggle: function(){
        this.save({ dead: !this.get('dead') });
    }
});