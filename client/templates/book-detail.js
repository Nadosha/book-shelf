Template.bookDetail.onRendered(function() {
	var self = this;
  	self.autorun(function() {
    	var bookId = FlowRouter.getParam('id');
    	self.subscribe('singleBook', bookId);  
  });
})
Template.bookDetail.helpers({
	book: function() {
		var bookId = FlowRouter.getParam('id');
		var book = Books.findOne(bookId);

		return book;
	}
});

Template.bookDetail.events({
	'click #removeBook': function(event) {
		var bookId = FlowRouter.getParam('id');
		var userId = Meteor.userId()
		Meteor.call('removeBook', bookId, userId, function(err, result) {
			if(!err) {
				FlowRouter.go('home');
			}
		});
	}
});