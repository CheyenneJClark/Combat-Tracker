var app = app || {};

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
