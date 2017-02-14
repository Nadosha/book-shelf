Template.registerHelper('pathFor', function(routeName) {
	var route = routeName;
	var params = {
    	id: this._id
    }

	var path = FlowRouter.path(route, params);
	
	return path;
})