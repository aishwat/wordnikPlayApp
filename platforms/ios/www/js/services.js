angular.module('wordnikPlay.services', [])
    .factory('Api', function($http) {
        return {
            get: function(caller, word, callback) {
                if (word === "" && caller != "full_dict") {
                    console.log('in word null');
                    callback("Please enter a word");
                } else {
                    var url = "https://flow-app-server.herokuapp.com/" + caller + "/" + word; //later

                    $http.get(url).then(function(resp) {
                        //console.log(JSON.stringify(resp));
                        if (resp.status == 200) {
                            callback(null, resp.data);
                            console.log('callback executed');
                        } else
                            callback('Response not 200 ' + resp.status);
                    }, function(err) {
                        console.log(err);
                        callback('Something Went Wrong ' + err);

                    });
                }
            }
        };
    })
    .factory('Detail', function() {
        var data;
        return {
            get: function() {
                return data;
            },
            set: function(_data) {
                data = _data;
            }
        };

    })
    .factory('Play', function($http) {
        return {
            get: function(callback) {

                var url = "https://flow-app-server.herokuapp.com/play";
                $http.get(url).then(function(resp) {

                    if (resp.status == 200) {
                        callback(null, resp.data);
                        console.log('callback executed');
                    } else
                        callback('Response not 200 ' + resp.status);
                }, function(err) {
                    console.log(err);
                    callback('Something Went Wrong ' + err);

                });

            }
        };
    });
