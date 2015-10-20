angular.module('wordnikPlay.controllers')
    .controller('DetailCtrl', function($q, $scope, $ionicLoading,Detail) {
    		console.log('in detail ctrl');
    		console.log(Detail.get());
    		$scope.detail=Detail.get();
    		
    })
