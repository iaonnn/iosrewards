var app = angular.module('app', ['onsen'])

app.config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self'
   ]);
});

app.factory('Share', function($http) {
	var tel = false

	return {
		getTel : function() {
			return tel
		},
		setTel : function(newTel) {
			tel = newTel
		}
	}
})