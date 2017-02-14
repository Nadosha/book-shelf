// Public routs
opend = FlowRouter.group({});

opend.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render('signregform', {signform: 'login'});
	}
});

opend.route('/signup', {
	name: 'signup',
	action: function() {
		BlazeLayout.render('signregform', {signform: 'registr'});
	}
});

// Private routs
loggedUsers = FlowRouter.group({
	triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go("login");
      }
    }
  ]
});

loggedUsers.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render('content', {content: 'bookShelf'});
	}
});

loggedUsers.route('/logout', {
	name: 'logout',
	action: function() {
		Meteor.logout(function() {
        	return FlowRouter.go(FlowRouter.path("login"));
     	 });
	}
});

loggedUsers.route('/add-book', {
	name: 'addBook',
	action: function() {
		BlazeLayout.render('content', {content: 'addBook'});
	}
});

loggedUsers.route('/:id', {
	name: 'bookDetail',
	action: function(params) {
		BlazeLayout.render('content', {content: 'bookDetail'});
	}
});

loggedUsers.route('/:id/edit', {
	name: 'editBook',
	action: function(params) {
		BlazeLayout.render('content', {content: 'addBook'});
	}
});