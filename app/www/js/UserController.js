/* user : main menu */
app.controller('AppController', function($scope, $http) {
	$scope.rewardslist = function() {
		$http.get(serverUrl + '/rewards/list').success(function(data) {
			ons.notification.alert({
				title: 'เงื่อนไขการสะสมแต้ม',
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
		/* get data : total points */
		$http.get(serverUrl+'/userlog/'+Share.getTel()+'/balance').success(function(data) {
			$scope.userlog = data
		})
		/* get data : update points */
		$http.get(serverUrl+'/userlog/'+Share.getTel()+'/update').success(function(data) {
			$scope.update = $filter('date')(data.date, 'yyyy-MM-dd HH:mm:ss')
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
			myNav.popPage()
		})
	}

	$scope.genQRCode = function() {
		if(Share.getQrCode()) {
			code = Share.getQrCode()
			Share.setQrCode(false)
		} else {
			code = Share.getUser().tel
		}
		var div_qrcode = document.getElementById("qrcode")
  		//clear div
  		div_qrcode.innerHTML = ''
  		
  		//option for create
		var options = {
		    text : code,
		    width: 150,
		    height: 150,
		    colorDark : "black",
		    colorLight : "white"
		}
		//cretate qrcode
  		new QRCode(div_qrcode, options);
	}

	/* function for page 'user/card_points.html' */
	$scope.listUserlog = function() {
		$http.get(serverUrl + '/userlog/list').success(function(data) {
			$scope.datas = data
		})

		console.log('listUserlog Active')
	}

	/* function for page 'user/card_exchanging.html' */
	$scope.total = 0
	$scope.listExchanging = function() {
		console.log('listExchanging Active')
		$http.get(serverUrl + '/exchanging/list').success(function(data) {
			$scope.exchangings = data

			var currentPoints = $scope.userlog.points
			console.log(currentPoints)
			for(var i = 0; i < data.length; i++) {
				if(currentPoints >= data[i].points) {
					$scope.total += 1;
				}
			}
			console.log($scope.total)
		})
	}

	$scope.exchange = function(id, point) {
		ons.notification.confirm({
			message: 'คุณต้องการแลกบัตรกำนัลนี้ ?',
			callback: function(idx) {
				if(idx == 0) {
					console.log('Cencel')
				} else {
					console.log('OK')
					var data = {
						_exchangingId: id,
					    tel: Share.getTel()
					}
					console.log(angular.toJson(data))
					
					$http.post(serverUrl + '/voucher/save', data).success(function(data) {
						console.log(data)
					})
					data = {
						date 	: new Date(),
					    tel 	: Share.getUser().tel,
					    point 	: parseInt(point) * -1
					}
					console.log(angular.toJson(data))
					$http.post(serverUrl + '/userlog/save', data).success(function(data) {
						console.log(data)
						$scope.listRewards()
						$scope.listExchanging()
					})
				}
			}
		})
	}

	/* function for page 'user/card_vouchers.html' */
	$scope.exchangingNew = 0
	$scope.exchangingUsed = 0
	$scope.listVouchers = function() {
		console.log('listVouchers Active')
		$http.get(serverUrl + '/voucher/list/' + Share.getTel()).success(function(data) {
			$scope.vouchers = data

			for(var i = 0; i < data.length; i++) {
				if(data[i].status == true) {
					$scope.exchangingUsed += 1;
				}
			}
			$scope.exchangingNew = data.length - parseInt($scope.exchangingUsed)
		})
	}

	$scope.getVoucher = function(status, id) {
		if(!status) {
			Share.setQrCode(id)
			myNav.pushPage('user/card_qrcode.html')

			console.log(id)
		}
	}
})

/* user : show news */
app.controller('NewsController', function($scope, $http) {
	$scope.newslist = function() {
		$http.get(serverUrl + '/news/list').success(function(data) {
			$scope.datas = data
			$scope.total = data.length
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