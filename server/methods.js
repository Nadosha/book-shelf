Meteor.startup(function() {
	return Meteor.methods({
		insertBook: function(insertPack) {
			check( insertPack, Books.simpleSchema() );
			Books.insert(insertPack, function(error, result) {
				if(error) {
					console.log(error);
				} 
			});
		},
		updateBook: function(bookId, insertPack) {
			Books.update({_id: bookId}, {$set: insertPack})
		},
		removeBook: function(bookId, userId) {
			Books.remove({_id: bookId, user: userId});
		},
		removeLastImg: function(imgId) {
			Covers.remove(imgId)
		},
		booksAmount: function(usrId) {
			return Books.find({'user': usrId}).count();
		} 
	})
})