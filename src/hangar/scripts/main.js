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
		$scope.formData = data;
	});

	if (!$scope.formData.length) {
		songService.getSongs().success(function (result) {
			$scope.formData = result;
		});
	}

	if (!$scope.formData.length) {
		$scope.formData = [
		{
			"url": "spotify:track:4GHF75LwRT2Hsv9z3ZXpM8",
			"id": 25479197,
			"songname": "johnny b3. goode",
			"artistid": 45,
			"artistname": "chuck berry",
			"albumid": 235469,
			"albumname": "roll over beethoven"
		},
		{
			"url": "spotify:track:3DNRdudZ2SstnDCVKFdXxG",
			"id": 8815585,
			"songname": "moonlight sonata",
			"artistid": 1833,
			"artistname": "beethoven",
			"albumid": 5619520,
			"albumname": "beethoven piano sonatas"
		},
		{
			"url": "spotify:track:0URp9jOJtiWKR1AfMGH2Qj",
			"id": 8815585,
			"songname": "twist and shout",
			"artistid": 1833,
			"artistname": "beatles",
			"albumid": 5619520,
			"albumname": "beatles"
		},
		{
			"url": "spotify:track:63nTBScSLXWwyeizXi9Rmi",
			"id": 8815585,
			"songname": "i saw her standing there",
			"artistid": 1833,
			"artistname": "beatles",
			"albumid": 5619520,
			"albumname": "beatles"
		},
		{
			"url": "spotify:track:45yEy5WJywhJ3sDI28ajTm",
			"id": 8815585,
			"songname": "here comes the sun",
			"artistid": 1833,
			"artistname": "beatles",
			"albumid": 5619520,
			"albumname": "beatles"
		},
		{
			"url": "spotify:track:2LOwEiLjnZEI24yeKV5zRt",
			"id": 8815585,
			"songname": "ain't she sweet",
			"artistid": 1833,
			"artistname": "beatles",
			"albumid": 5619520,
			"albumname": "beatles"
		},
		{
			"url": "spotify:track:4GHF75LwRT2Hsv9z3ZXpM8",
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
  	$scope.songIdUrl = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + $routeParams.songId);
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
