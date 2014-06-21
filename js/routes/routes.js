var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },
    setFilter: function(params){
        if (!params) return;
        
        console.log('app.router.params= ' + params);
        window.filter = params.trim() || '';
        app.combatants.trigger('reset');
    }
});
