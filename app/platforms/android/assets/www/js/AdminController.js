/* user, admin : Login */
app.controller('LoginController', function($scope, $http, Share) {

	myNav.resetToPage('admin/index.html', {animation: 'none'})
	$scope.checklogin = function() {
		
		var tel = $scope.tel
		//tel = Share.getTel()
		//tel = '111'
		$http.get(serverUrl + '/login/' + tel).success(function(user) {
			console.log(user)
			if(user != null) {
				Share.setTel(user.tel)
				Share.setUser(user)
				if(user.type == 'ADMIN')
					myNav.resetToPage('admin/index.html', {animation: 'lift'})
				else
					myNav.resetToPage('user/index.html', {animation: 'lift'})
			} else {
				alert('No User')
			}
		})
	}
	//$scope.checklogin()
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

/* admin : give point */
app.controller('PointController', function($scope, $http, $filter) {

	$scope.date = $filter('date')(new Date(), 'fullDate')

	$scope.list = function() {
		$http.get(serverUrl + '/rewards/list').success(function(data) {
			$scope.rewards = data
		})
	}
	$scope.list()
	
	$scope.sumPoint = function() {
		var total = parseInt($scope.total)
		var rwTotal = parseInt($scope.rewards.total)
		var rwPoint = parseInt($scope.rewards.point)

		var getPoint = Math.floor((total/rwTotal)) * rwPoint

		$scope.point = getPoint
	}

	$scope.save = function() {
		var tel = $scope.tel
		$http.get(serverUrl + '/user/list/' + tel).success(function(data) {
			var fullName = data.name + ' ' + data.lastname
			var data = {
				date 	: new Date(),
				tel 	: tel,
	      		total 	: parseInt($scope.total),
	     		point 	: parseInt($scope.point),
	     		fullName : fullName
			}
			console.log(data)

			/* save to sellopoint */
			$http.post(serverUrl + '/sellpoint/save', data).success(function(data) {
				alert(data)
				$scope.tel = ''
				$scope.total = ''
				$scope.point = ''
				$scope.list()
			})

			/* save to userlog */
			data = {
				date 	: new Date(),
				tel 	: tel,
		     	point 	: parseInt($scope.point),
			}
			console.log(data)
			$http.post(serverUrl + '/userlog/save', data).success(function(data) {
				alert(data)
			})
		})
	}

	$scope.scanQrCode = function() {
		console.log('scanQrCode Active')

		cordova.plugins.barcodeScanner.scan(success, fail);

	   	function success(result) {
	   		/*
	        alert("We got a barcode\n" +
	            "Result: " + result.text + "\n" +
	            "Format: " + result.format + "\n" +
	            "Cancelled: " + result.cancelled);
			*/
			$scope.tel = result.text
			document.getElementById("tel").value = result.text
	    }

	    function fail(error) {
	        alert("Scanning failed: " + error);
	    }
	}
})

/* admin : report */
app.controller('ReportController', function($scope, $http) {

	$scope.tab = 'day'

	$scope.reportSellpoint = function() {
		$http.get(serverUrl + '/sellpoint/report').success(function(data) {
			$scope.sellpoints = data
		})
	}
	$scope.reportSellpoint()

	$scope.report = function() {
		var val = $scope.tab
		$http.get(serverUrl + '/sellpoint/report/' + val).success(callback) 
	}
	$scope.report()

	function callback(data) {
		$scope.datas = data
	}
})

/* admin : manage news */
app.controller('NewsManageController', function($scope, $http, Share) {

	$scope.newslist = function() {
		$http.get(serverUrl + '/news/list').success(function(data) {
			$scope.datas = data
		})
	}	
	$scope.newslist()

	$scope.save = function() {
		var data = {
			title: $scope.title,
			content: $scope.content,
			picUrl: $scope.picUrl,
			date: new Date
		}
		console.log(data)

		$http.post(serverUrl + '/news/save', data).success(function(data) {
			alert(data)
			adminNav.popPage()
		})
	}

	$scope.update = function() {
		var id = $scope._id
		var data = {
			title: $scope.title,
			content: $scope.content,
			picUrl: $scope.picUrl,
			date: new Date
		}
		console.log(data)

		$http.post(serverUrl + '/news/update/' + id, data).success(function(data) {
			alert(data)
			Share.setId(false)
			adminNav.popPage()
		})
	}

	$scope.delete = function() {
		var id = $scope._id

		$http.get(serverUrl + '/news/remove/' + id).success(function(data) {
			alert(data)
			Share.setId(false)
			adminNav.popPage()
		})
	}

	$scope.editPage = function(id) {
		Share.setId(id)
		adminNav.pushPage('admin/pages/news_manage_edit.html')
  	}

  	if(Share.getId()) {
  		$http.get(serverUrl + '/news/list/' + Share.getId()).success(function(data) {
  			$scope._id 		= data._id
  			$scope.picUrl 	= data.picUrl
  			$scope.title 	= data.title
  			$scope.content 	= data.content
  		})
  	}

	adminNav.on('postpop', function() {
		$scope.newslist()
	})
})