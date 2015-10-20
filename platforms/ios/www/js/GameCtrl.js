angular.module('wordnikPlay.controllers')
    .controller('GameCtrl', function($q, $scope, $ionicLoading, Play) {
        //global
        var last_hint_def;
        var last_hint_syn;

        $scope.$on('$ionicView.beforeEnter', function(viewInfo, state) {
            console.log('beforeEnter');
            initialize();
        });

        var callback = function(err, result) {
            $scope.hide();
            if (err)
                alert(err);
            else {
                console.log(JSON.stringify(result));
                $scope.data = result;
                $scope.definition = $scope.data.Definitions[0];
            }
        }

        $scope.show = function() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in'
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };

        function initialize() {
            $scope.show();
            Play.get(callback);
            $scope.showHint = false;
            $scope.showQuit = false;
            last_hint_def = 1;
            last_hint_syn = 1;
        }

        $scope.verify = function() {
            var word = document.getElementById("word_game").value;
            if ($scope.data.word[0] === word || $scope.data.Synonyms.indexOf(word) > -1)
                alert('Great! Its correct');
            else if (word == '') {
                alert('Please enter a word');
            } else {
                alert('Nops! Try again');
                document.getElementById("word_game").value = "";
            }
        }
        $scope.hint = function() {
            var def_len = $scope.data.Definitions.length;
            var syn_len = $scope.data.Synonyms.length;

            $scope.showHint = 'true';
            if (def_len === 1 && syn_len === 0) {
                $scope.hint_text = 'Sorry, no hint available';
            } else if ($scope.data.Definitions[last_hint_def] != null) {
                $scope.hint_text = $scope.data.Definitions[last_hint_def]; //rndomize later
                last_hint_def += 1;
            } else if ($scope.data.Synonyms[last_hint_syn] != null) {
                $scope.hint_text = $scope.data.Synonyms[last_hint_syn]; //rndomize later
                last_hint_syn += 1;
            } else {
                $scope.hint_text = 'Sorry, no more hint available';
            }

        }
        $scope.quit = function() {
            $scope.showQuit = true;
        }
        $scope.try_next = function() {
            initialize();
        }

    })
