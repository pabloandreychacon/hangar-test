var app = angular.module("hangarApp", ['ngRoute', 'songsControllers']);

app.service("songService", function ($http) {
	return {
		getSongs: function () {
			return $http.get("db/songs.json", { responseType: "json" });
		}
	};
});

var songsControllers = angular.module('songsControllers', []);

songsControllers.controller("mainCtrl", function ($scope, $http, songService) {
	$scope.formData = [];

	$http.get("http://localhost:3000/db").success(function (data) {
		for (var i = 0; i < data.length; i++) {
			var curTrack = data[i].url;
			data[i].url = curTrack.replace('spotify:track:', '');
		}
		$scope.formData = data;
	});

	if (!$scope.formData.length) {
		songService.getSongs().success(function (result) {
			for (var i = 0; i < result.length; i++) {
				var curTrack = result[i].url;
				result[i].url = curTrack.replace('spotify:track:', '');
			}
			$scope.formData = result;
		});
	}

	if (!$scope.formData.length) {
		$scope.formData = [
	{
		"url": "4GHF75LwRT2Hsv9z3ZXpM8",
		"id": 25479197,
		"songname": "johnny bb. goode",
		"artistid": 45,
		"artistname": "chuck berry",
		"albumid": 235469,
		"albumname": "roll over beethoven"
	},
	{
		"url": "3DNRdudZ2SstnDCVKFdXxG",
		"id": 8815585,
		"songname": "moonlight sonata",
		"artistid": 1833,
		"artistname": "beethoven",
		"albumid": 5619520,
		"albumname": "beethoven piano sonatas"
	},
	{
		"url": "0URp9jOJtiWKR1AfMGH2Qj",
		"id": 8815585,
		"songname": "twist and shout",
		"artistid": 1833,
		"artistname": "beatles",
		"albumid": 5619520,
		"albumname": "beatles"
	},
	{
		"url": "63nTBScSLXWwyeizXi9Rmi",
		"id": 8815585,
		"songname": "i saw her standing there",
		"artistid": 1833,
		"artistname": "beatles",
		"albumid": 5619520,
		"albumname": "beatles"
	},
	{
		"url": "45yEy5WJywhJ3sDI28ajTm",
		"id": 8815585,
		"songname": "here comes the sun",
		"artistid": 1833,
		"artistname": "beatles",
		"albumid": 5619520,
		"albumname": "beatles"
	},
	{
		"url": "2LOwEiLjnZEI24yeKV5zRt",
		"id": 8815585,
		"songname": "ain't she sweet",
		"artistid": 1833,
		"artistname": "beatles",
		"albumid": 5619520,
		"albumname": "beatles"
	},
	{
		"url": "4GHF75LwRT2Hsv9z3ZXpM8",
		"id": 8815585,
		"songname": "beatles reimagined",
		"artistid": 1833,
		"artistname": "beatles",
		"albumid": 5619520,
		"albumname": "beatles"
	}
		];
	}	

	$scope.filterByText = "";

	$scope.isFound = function (formData) {
		if ($scope.filterByText.trim().length === 0) return true;
		var curFilter = formData.songname.toLowerCase();
		var success = (curFilter.indexOf($scope.filterByText.toLowerCase()) >= 0);
		if (success) return success;
		return success;
	};
});

songsControllers.controller('playCtrl', ['$scope', '$routeParams', '$sce',
  function ($scope, $routeParams, $sce) {
  	$scope.songIdUrl = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:" + $routeParams.songId);
  }
]);

app.config(['$routeProvider',
  function ($routeProvider) {
  	$routeProvider.
      when('/', {
      	templateUrl: 'views/songs-list.html',
      	controller: 'mainCtrl'
      }).
      when('/songs/:songId', {
      	templateUrl: 'views/song-player.html',
      	controller: 'playCtrl'
      }).
      otherwise({
      	redirectTo: '/'
      });
  }]);
