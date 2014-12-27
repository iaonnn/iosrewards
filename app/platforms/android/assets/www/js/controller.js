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

/* user : reg new */
app.controller('RegController', function($scope, $http) {
 
  	$scope.save = function() {
    	var p1 = $scope.password1
      	var p2 = $scope.password2

      	if(p1 == p2) {
        	var password = p1
        	var data = {
          		'name'    	: $scope.name,
          		'lastname'  : $scope.lastname,
          		'tel'     	: $scope.tel,
          		'birthday'  : $scope.birthday,
          		'gender'  	: $scope.gender,
          		'email'   	: $scope.email,
          		'password'  : password,
          		'type'    	: 'USER'
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

/* admin : give & condition rewards */
app.controller('RewardsController', function($scope, $http) {

	$scope.listRewards = function(){
		$http.get(serverUrl + '/rewards/list').success(function(data) {
			$scope.rewards = data
		})
		$http.get(serverUrl + '/spacialrewards/list').success(function(data) {
			$scope.spacialrewards = data
		})
		$http.get(serverUrl + '/programlist/list').success(function(data) {
			$scope.programlists = data
		})
	}
	$scope.listRewards()

	$scope.rewardssave = function() {
		var data = {
			total : parseInt($scope.total),
			point : parseInt($scope.point)
		}
		
		$http.post(serverUrl + '/rewards/save', data).success(function(data) {
			alert(data)
			$scope.total = ''
			$scope.point = ''
			$scope.listRewards()
		})
	}

	$scope.spacialrewardsSave = function() {
		var data = {
			_pId 	: $scope.pSelect._id,
			point 	: parseInt($scope.point)
		}

		console.log(data)

		$http.post(serverUrl + '/spacialrewards/save', data).success(function(data) {
			//alert(data)
			$scope.pSelect = {}
			$scope.point = ''
			$scope.listRewards()
		})

	}

	$scope.spacialrewardsDelete = function(pId) {
		$http.get(serverUrl + '/spacialrewards/delete/' + pId).success(function(data) {
			//alert(data)
			$scope.listRewards()
		})
	}

	$scope.selectpId = function(id, name) {
		$scope.pSelect = {_id: id, name: name}
		List.hide()
	}

})