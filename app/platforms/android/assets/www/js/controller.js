app.controller('AppController', function($scope, $http) {

})

/* user, admin : Login */
app.controller('LoginController', function($scope, $http) {
	
	var serverUrl = 'http://localhost:2222'

	$scope.checklogin = function() {
		
		var tel = $scope.tel

		$http.get(serverUrl + '/login/' + tel).success(function(user) {
			if(user != null) {
				if(user.type == 'ADMIN')
					myNav.resetToPage('admin/index.html', {animation: 'lift'})
				else
					myNav.resetToPage('user/index.html', {animation: 'lift'})
			} else {
				alert('No User')
			}
		})
	}
})