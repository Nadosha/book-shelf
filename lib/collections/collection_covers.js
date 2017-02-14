var coverStore = new FS.Store.GridFS('covers', {
	beforWrite: function(fileObj) {
		return {
            extension: 'png',
            type: 'image/png'
         };
         gm(fileObj).size(function(err, value) {
			console.log('befor fileObj', value);
		});
	},
	transformWrite: function(fileObj, readStream, writeStream) {
		var height = '800';
		var width = '600';
  		gm(readStream).autoOrient().resize(width, height + '^').gravity('Center').extent(width, height).stream('PNG').pipe(writeStream);
	}
});

Covers = new FS.Collection('covers', {
	stores: [coverStore],
	filter: {
		maxSize: 1258291,
		allow: {
			contentTypes: ['image/*']
		},
		onInvalid: function(messege) {
			if(Meteor.isClient) {
				alert(messege);
			} else {
				console.log(messege);
			}
		}
	}
});