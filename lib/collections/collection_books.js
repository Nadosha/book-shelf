Books = new Mongo.Collection('books');


booksSchema = new SimpleSchema({
	name: {
  	  	type: String,
  	  	label: "Title",
  	  	max: 200
  	},
	author: {
  	  	type: String,
  	  	label: "Author",
  	  	max: 200
  	},
	isbn: {
  	  	type: Number,
  	  	label: "ISNB"
  	},
	img: {
  	  	type: String,
  	  	label: "Image"
  	},
	user: {
  	  	type: this.userId,
  	  	label: "User"
  	},
  pubDate: {
    	type: Date,
    	label: "Publication Date fuck"
  },
	createdDate: {
  	  	type: Date,
  	  	autoValue: function() {
  	  		if(this.isInsert) {
  	  			return new Date;
  	  		}
  	  	}
  	}
});

Books.attachSchema( booksSchema );