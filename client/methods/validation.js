$.validator.addMethod('bookIsUnique', function( title ){
	var exist = Books.findOne({'name': title}, {fields: {'name': 1}});
	console.log(Books.find().fetch())
	return exist ? false : true;
});
