Template.navBar.helpers({
	'user': function() {
		var user = Meteor.user();
		if (user) {
			return {
				first: user.profile.firstName,
				last: user.profile.lastName,
				exist: true
			}
		}
	}
})