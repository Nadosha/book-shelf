Meteor.publish('books', function(limit, userId) {
	if (limit) {
		console.log()
		return Books.find({'user': userId}, {limit: limit}, {sort: {createdDate: 1}});
	}
});

Meteor.publish('singleBook', function(bookId) {
	return Books.find(bookId);
});

Meteor.publish('covers', function(objId) {
	return Covers.find({_id: objId});
});