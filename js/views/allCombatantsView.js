var app = app || {};

app.combatants = new app.allCombatants();

app.AppView = Backbone.View.extend({
	el: '#combatants',
	initialize: function(){
		this.input = this.$('#new-combatant');
		app.combatants.on('add', this.addOne, this);
		app.combatants.on('reset', this.addAll, this);
		app.combatants.fetch();
	},
	events: {
		'keypress .js-initiative': 'createCombatantOnEnter'
	},
	createCombatantOnEnter: function(e){
		if(e.which !== 13 || !this.input.val().trim()){ return; }
	    app.combatants.create({name: $("#new-combatant").val().trim(),
	                           initiative: $(".js-initiative").val().trim(),
	                           dead: false });
	    $("#new-combatant").val('');
	    $(".js-initiative").val('');
	},
    addOne: function(combatant){
    	var view = new app.CombatantView({model: combatant});
    	$("#combatant-list").append(view.render().el);
    },
    addAll: function(){
        this.$("#combatant-list").html('');
        app.combatants.each(this.addOne, this);
    },
});

app.appView = new app.AppView();
