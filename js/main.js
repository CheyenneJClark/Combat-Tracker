'use strict';

var app = {}; //app namespace


//Models

app.Party = Backbone.Model.extend({
	defaults: {
		name: '',
		dead: false
	},
    toggle: function(){
        this.save({ dead: !this.get('dead') });
    }
});

//Collections

app.Combatants = Backbone.Collection.extend({
    model: app.Party,
    localStorage: new Store("backbone-party")
});
app.combatants = new app.Combatants();

//Views
//Renders each combatant
app.CombatantView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#combatant-template').html()),
    render: function(){
    	this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
    	return this;
    },
    initialize: function(){
        this.model.on('change', this.render, this);
    },
    events:{
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'click .toggle': 'toggleDead'
    },
    edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
    },
    close: function(){
        var value = this.input.val().trim();
        if(value){
            this.model.save({name: value});
        }
        this.$el.removeClass('editing');
    },
    updateOnEnter: function(e){
        if(e.which == 13){
            this.close();
        }
    },
    toggleDead: function(){
        this.model.toggle();
    }
});

//Renders the full list by calling each combatant
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


//Initializers
app.appView = new app.AppView();

