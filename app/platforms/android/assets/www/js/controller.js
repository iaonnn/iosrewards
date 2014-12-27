var serverUrl = 'http://localhost:2222'

app.controller('AppController', function($scope, $http) {

})

/* user, admin : Login */
app.controller('LoginController', function($scope, $http) {

	myNav.resetToPage('admin/index.html', {animation: 'none'})
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

/* admin : Create Update User */
app.controller('UserManageController', function($scope, $http, $filter, Share) {

	var tel = Share.getTel()
	adminNav.on('prepop', function() {
		Share.setTel(false)
	})
	if(tel) {
		$http.get(serverUrl + '/user/list/' + tel).success(function(user) {
			$scope.name 	= user.name
	        $scope.lastname = user.lastname
	        $scope.tel 		= user.tel
	        $scope.birthday = new Date($filter('date')(user.birthday, 'longDate'))
	        $scope.gender 	= user.gender
	        $scope.email 	= user.email
	        $scope.password = user.password
		})
	} else {
		$http.get(serverUrl + '/user/list').success(function(user) {
			$scope.users = user
		})
	}

	$scope.edit = function(tel) {
		//alert(tel)
		Share.setTel(parseInt(tel))
		adminNav.pushPage('admin/pages/member_manage_edit.html')
	}

	$scope.update = function() {
	    var data = {
	        'name'    	: $scope.name,
	        'lastname'  : $scope.lastname,
	        'tel'     	: $scope.tel,
	        'birthday'  : $scope.birthday,
	        'gender'  	: $scope.gender,
	        'email'   	: $scope.email,
	        'password'  : $scope.password,
      	}

        console.log(data)
      		
      	$http.post(serverUrl + '/user/update/' + data.tel, data).success(function(data) {
	        alert(data)
	        Share.setTel(false)
	        adminNav.popPage()
	    })
	}
})