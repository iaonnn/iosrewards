var app = angular.module('app', ['onsen', 'uiGmapgoogle-maps'])

app.config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self'
   ]);
});

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

app.factory('Share', function($http) {
	var tel = '222'
	var id = false

	return {
		getTel : function() {
			return tel
		},
		setTel : function(newTel) {
			tel = newTel
		},
		getId : function() {
			return id
		},
		setId : function(newId) {
			id = newId
		}
	}
})