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

/* user : reg new */
app.controller('RegController', function($scope, $http) {
	
	var serverUrl = 'http://localhost:2222'

	$scope.save = function() {
		var p1 = $scope.password1
	    var p2 = $scope.password2

	    if(p1 == p2) {
		    var password = p1
		    var data = {
			    'name' 		: $scope.name,
			    'lastname' 	: $scope.lastname,
			    'tel' 		: $scope.tel,
			    'birthday' 	: $scope.birthday,
			    'gender' 	: $scope.gender,
			    'email' 	: $scope.email,
			    'password' 	: password,
			    'type' 		: 'USER'
			}

		    console.log(data)
			
		    $http.post(serverUrl + '/user/reg', data).success(function(data) {
		    	alert(data)
		    	myNav.pushPage('index.html')
		    })
	    } else {
	    	alert('pw not wrong')
	    }
	}

})