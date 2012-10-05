(function($) {
	
	window.ChatEvent = Backbone.Model.extend({
		isValidDate: function(jsonDate) {
			var date = new Date(parseInt(jsonDate.substr(6)));
			return _.isDate(date);
		}
	});
	
	window.ChatEvents = Backbone.Collection.extend({
		model: ChatEvent,
		url: '/chat-events',
		
		getEnterRoomEvents: function(hour) {
		    return this.filter(function(chatEvent, hour) {
		    	if ( (chatEvent.get('hour') == hour) && (chatEvent.get('event_type') == 'enter_room') )
			    	return chatEvent;
		    });
		}
	});

	window.chatEvents = new ChatEvents();


	window.ChatEventView = Backbone.View.extend({

		tag: 'li',
		className: 'chat-event',

		initialize: function() {
			_.bindAll(this, 'render');
			var date = new Date(parseInt(this.model.get('date').substr(6)));
			this.model.set('hour', date.getUTCHours());
			var minute = date.getUTCMinutes();
			minute = (minute > 9) ? minute.toString() : '0' + minute;
			this.model.set('minute', minute);
			this.model.bind('change', this.render);
			var template;
			switch (this.model.get('event_type')) {
			    case 'enter_room': 
					this.template = _.template($('#enter-room-template').html());
					break;
			    case 'comment':
			    	this.template = _.template($('#comment-template').html());
			    	break;
			    case 'high_five':
			    	this.template = _.template($('#high-five-template').html());
			    	break;
			    case 'exit_room':
			    	this.template = _.template($('#exit-room-template').html());
			    	break;
				default:
					this.template = _.template($('#chat-event-template').html());
			}
		},

		render: function() {
			var content = this.template(this.model.toJSON());
			$(this.el).html(content);
			return this;
		}
	});

	window.ListItemView = ChatEventView.extend({});

	window.ListView = Backbone.View.extend({

		tagName: 'section',
		className: 'chat-events',

		initialize: function() {
			_.bindAll(this, 'render');
			this.template = _.template($('#list-view-template').html());
			this.collection.bind('reset', this.render);
		},

		render: function() {
			var $chatEvents;
			var collection = this.collection;
			$(this.el).html(this.template({}));
			$chatEvents = this.$('.chat-events-list');
			collection.each(function(chatEvent) {
				var view = new ListItemView({
					model: chatEvent,
					collection: collection
				});
				$chatEvents.append(view.render().el);
			});
			return this;
		}
	});

	/*
	window.AggregatesView = Backbone.View.extend({
		
		tagName: 'section',
		className: 'aggregates',

		initialize: function() {
			_.bindAll(this, 'render');
			this.template = _.template($('#aggregates-template').html());
			this.collection.bind('reset', this.render);
		},

		render: function() {
			var collection = this.collection;
			var enteredRoomCount = collection.getEnterRoomEvents().size();
			$(this.el).html(this.template({}));
			return this;
		}

	});
	*/

	window.ChatEventsApp = Backbone.Router.extend({
		
		routes: {
			'': 'home'
		},

		initialize: function() {
			this.listView = new ListView({
				collection: window.chatEvents
			});
			//this.aggregatesView = new AggregatesView({
			//	collection: window.aggregatesView
			//});
		},

		home: function() {
			$('#chat-events-container').empty().append(this.listView.render().el);
			//$('#aggregates-container').empty().append(this.aggregatesView.render().el);
		}
	});

	$(function() {
	    window.App = new ChatEventsApp();
	    Backbone.history.start({pushState: true});
    });



})($);


