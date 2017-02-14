Template.bookShelf.onRendered(function() {
	var usr = Meteor.userId();
	Session.set('queryLimit', 10);

	Meteor.autorun(function() {
  		Meteor.subscribe('books', Session.get('queryLimit'), usr);
  		
  		if (Session.get("queryLimit") >= Session.get('itemsInQuery')) {
  			$('#loadMore').addClass('hidden');
  		} else {
  			$('#loadMore').removeClass('hidden');
  		}
  	});	
});

Template.bookShelf.helpers({
	'books': function() {
		var usr = Meteor.userId()
		Meteor.call('booksAmount', usr, function(err, result) {
			Session.set('itemsInQuery', result)
		});

		var bookss = Books.find().count()
		return Books.find({'user': usr});;
	},
	'ifAnyBook': function() {
		var usr = Meteor.userId()
		var booksCount = Books.find({'user': usr}).count();
		if (booksCount <= 0) {
			return false;
		}
		return true;
	}
});

Template.bookShelf.events({
	'click #loadMore': function() {
  		var queryLimit = Session.get("queryLimit") + 10;
  		Session.set("queryLimit", queryLimit);
	}
	
})