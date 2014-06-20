var app = {};

app.Party = Backbone.Model.extend({
	defaults: {
		name: '',
		dead: false
	}
});

app.Combatants = Backbone.Collection.extend({
    model: app.Party,
    localStorage: new Store("backbone-party")
});
app.combatants = new app.Combatants();

app.CombatantView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#combatant-template').html()),
    render: function(){
    	this.$el.html(this.template(this.model.toJSON()));
    	return this;
    }
});

app.AppView = Backbone.View.extend({
	el: '#combatants',
	initialize: function(){
		this.input = this.$('#new-combatant');
		app.combatants.on('add', this.addOne, this);
		app.combatants.on('reset', this.addAll, this);
		app.combatants.fetch();
	},
	events: {
		'keypress #new-combatant': 'createCombatantOnEnter'
	},
	createCombatantOnEnter: function(e){
		if(e.which !== 13 || !this.input.val().trim()){ return; }
	    app.combatants.create(this.newAttributes());
	    this.input.val('');
	},
    addOne: function(combatant){
    	var view = new app.CombatantView({model: combatant});
    	$("#combatant-list").append(view.render().el);
    },
    addAll: function(){
        this.$("#combatant-list").html('');
        app.combatants.each(this.addOne, this);
    },
    newAttributes: function(){
    	return {
    		name: this.input.val().trim(),
    		dead: false
    	}
	} 
});

app.appView = new app.AppView();