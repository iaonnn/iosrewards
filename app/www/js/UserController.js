var serverUrl = 'http://localhost:2222'

/* user : main menu */
app.controller('AppController', function($scope, $http) {
	$scope.rewardslist = function() {
		$http.get(serverUrl + '/rewards/list').success(function(data) {
			ons.notification.alert({
				message: 'เมื่อซื้อครบ '+ data.total +' บาทจะได้รับ '+ data.point +' แต้ม'
			})
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
				'name'      : $scope.name,
				'lastname'  : $scope.lastname,
				'tel'       : $scope.tel,
				'birthday'  : $scope.birthday,
				'gender'    : $scope.gender,
				'email'     : $scope.email,
				'password'  : password,
				'type'      : 'USER'
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

/* user : data of user */
app.controller('UserController', function($scope, $http, $filter, Share) {
	
	$scope.user = Share.getUser()

	$scope.listRewards = function() {
		$http.get(serverUrl + '/userrewards/' + Share.getTel()).success(function(data) {
			$scope.userrewards = data
			$scope.update = $filter('date')(data.update, 'yyyy-MM-dd HH:mm:ss')
		})
	}
	$scope.listRewards()

	$scope.listuser = function() {
		$http.get(serverUrl + '/user/list/' + Share.getTel()).success(function(data) {
			$scope.user = data
			$scope.date = new Date($filter('date')(data.birthday, 'longDate'))
		})
	}
	$scope.listuser()

	$scope.edit = function() {
		var tel = Share.getTel()
		var data = {
			'name'    	: $scope.user.name,
          	'lastname'  : $scope.user.lastname,
          	'tel'     	: $scope.user.tel,
          	'birthday'  : $scope.date,
          	'gender'  	: $scope.user.gender,
          	'email'   	: $scope.user.email,			
		}
		console.log(data)

		$http.post(serverUrl + '/user/update/' + tel, data).success(function(data) {
			//alert(data)
			menu.setMainPage('user/settings.html')
		})
	}

	$scope.genQRCode = function() {
		var div_qrcode = document.getElementById("qrcode")
  		//clear div
  		div_qrcode.innerHTML = ''
  		
  		//option for create
		var options = {
		    text : Share.getTel(),
		    width: 150,
		    height: 150,
		    colorDark : "black",
		    colorLight : "white"
		}
		//cretate qrcode
  		new QRCode(div_qrcode, options);
	}
})

/* user : show news */
app.controller('NewsController', function($scope, $http) {
	$scope.newslist = function() {
		$http.get(serverUrl + '/news/list').success(function(data) {
			$scope.datas = data
		})
	}	
	$scope.newslist()
})

/* user : google map */
app.controller('MapController', function($scope, $http) {
	$scope.map = { 
		center: { 
			latitude: 14.9047824,
			longitude: 102.0107774
		}, 
		zoom: 15,
		draggable: true
	}

	$scope.marker = {
		options : {
			draggable: false
		}
	}

	$scope.test = function() {
		alert('click')
	}

	$scope.windowOptions = {
        visible: true
    };

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible
    }

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false
    }
})