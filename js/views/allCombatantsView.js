var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#combatants',
	initialize: function(){
		this.input = this.$('.js-initiative');

		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addAll, this);
		
		this.collection.fetch({reset: true});


	},
	events: {
		'keypress .js-initiative': 'createCombatantOnEnter'
	},
	createCombatantOnEnter: function(e){
		if(e.which !== 13 || !this.input.val().trim()){ return; }
	    this.collection.create({name: $('#new-combatant').val().trim(),
	                           initiative: $('.js-initiative').val().trim(),
	                           dead: false });
	    $('#new-combatant').val('');
	    $('.js-initiative').val('');
	},
    addOne: function(combatant){
    	var view = new app.CombatantView({model: combatant});
    	$('#combatant-list').append(view.render().el);
    },
    addAll: function(){
        this.$('#combatant-list').html('');
        this.collection.each(this.addOne, this);
    }
});

app.appView = new app.AppView({ collection: new app.allCombatants() });
