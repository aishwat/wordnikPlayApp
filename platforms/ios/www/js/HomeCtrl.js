angular.module('wordnikPlay.controllers')
    .controller('HomeCtrl', function($q, $scope, $rootScope, $state, $ionicLoading, Api, Detail) {

        $scope.show = function() {
            $ionicLoading.show({
                content: 'Loading',
                 animation: 'fade-in'
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };

        var apiCall = function(caller, word) {
            console.log(caller);
            var callback = function(err, result) {
                if (err)
                    alert(err);
                else {
                    console.log(result);
                    Detail.set(result);
                    $state.go('tab.detail');
                }
                 $scope.hide();
            }
            Api.get(caller, word, callback);
        }


        $scope.definition = function() {
            var word = document.getElementById("word").value;
            $scope.show();
            apiCall('def', word);
        }
        $scope.synonyms = function() {
            var word = document.getElementById("word").value;
            $scope.show();
            apiCall('syn', word);
        }
        $scope.antonyms = function() {
            var word = document.getElementById("word").value;
            $scope.show();
            apiCall('ant', word);
        }
        $scope.examples = function() {
            var word = document.getElementById("word").value;
            $scope.show();
            apiCall('ex', word);
        }
        $scope.full_dict = function() {
            var word = document.getElementById("word").value;
            $scope.show();
            apiCall('full_dict', word);
        }

    })
