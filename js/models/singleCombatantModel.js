var app = app || {}; //app namespace

app.singleCombatant = Backbone.Model.extend({
	defaults: {
		name: '',
		dead: false
	},
    toggle: function(){
        this.save({ dead: !this.get('dead') });
    }
});