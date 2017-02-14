Template.addBook.onCreated(function() {
	Session.setDefault('imgObj', undefined)
	var self = this;
	var bookId = FlowRouter.getParam('id');
  	self.autorun(function() {
  		self.subscribe('covers', Session.get('fileObj'))
    	self.subscribe('singleBook', bookId);  
  	});
});

Template.addBook.onRendered(function() {
	var validation = $('#bookForm').validate({
		rules: {
			title: {
				required: true,
				minlength: 3
			},
			author: {
				required: true,
				minlength: 3
			},
			pubpate: {
				required: true,
				date: true
			},
			isbn: {
				required: true,
				number: true
			},
			cover: {
				required: false
			}
		},
		messages: {
			title: {
				required: "<strong>I see you forgot to fill this field</strong>"
			},
			author: {
				required: "<strong>Whom this book was written?</strong>"
			},
			pubpate: {
				required: "<strong>When this book was written?</strong>",
				date: true
			},
			isbn: {
				required: "<strong>I see you forgot to fill this field</strong>",
				number: "<strong>This uncorrect ISBN</strong>"
			},
			cover: {
				required: "<strong>This book need a cover</strong>"
			}
		},
		errorElement: 'p',
		errorClass: 'warning-text',
		highlight: function(element, errorClass, validClass) {
			$(element).nextAll('#input-error').removeClass('hidden');
			$(element).nextAll('#input-success').addClass('hidden');
  		},
  		unhighlight: function(element, errorClass, validClass) {
    		$(element).nextAll('#input-error').addClass('hidden');
    		$(element).nextAll('#input-success').removeClass('hidden');
  		},
  		submitHandler: function() {

			var insertPack = {
				name: $('#book-name').val(),
				author: $('#book-author').val(),
				isbn: +$('#book-isbn').val(),
				img: Session.get('imgUrl'),
				user: Meteor.userId(),
				pubDate: new Date($('#book-pubpate').val()),
				createdDate: new Date
			}
			
			var exist = FlowRouter.getParam('id');

			if (exist) {
				Meteor.call('updateBook', exist, insertPack, function(error) {
					if(error) {
						validator.showErrors();
					} else {
						FlowRouter.go('home')
					}
				});
			} else {
				Meteor.call('insertBook', insertPack, function(error) {
					if(error) {
						validator.showErrors();
					} else {
						FlowRouter.go('home')
					}
				});
			}

	
  		}
	});
});

Template.addBook.events({
	'change #book-img': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
      		var newFile = new FS.File(file);
      		Covers.insert(file, function(err, fileObj){
				if (err) {
					alert(err);
				} else {
					var imageURL = '/cfs/files/images/' + fileObj._id;
					
				}

				if (fileObj) {
					Session.set('fileObj', fileObj._id)
				}
			});
    	});
	}
});

Template.addBook.helpers({
	'isEditBooks': function(){
		var bookId = FlowRouter.getParam('id');
		var book = Books.findOne(bookId);


		if (bookId) {
			return false;
		} else {
			return true;
		}
	}
});

Template.addBookForm.helpers({
	'image': function(){
    	var imgId = Session.get('fileObj');

    	if (imgId != undefined) {
    		var img = Covers.findOne();
    		Session.set('imgUrl',img.url())
    		return img;
    	}
	}
});


Template.editBookForm.helpers({
	'image': function(){
		var imgId = Session.get('fileObj');
    	if (imgId != undefined) {
    		var img = Covers.findOne();

    		Session.set('imgUrl',img.url())
    		return img;
    	}
	},
	'book': function() {
		var bookId = FlowRouter.getParam('id');
		var book = Books.findOne(bookId);
		
		
		return book;
	}
});



























