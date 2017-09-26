
var appmain = angular.module('appmain', []);

appmain.controller('appcontrol1', function($scope, $http){

	$http.post("PHP/insert_db.php", {opcion:2}).then(function(resp){
		$scope.premas = resp.data;
	});
	
});

$(document).ready(function(){
});