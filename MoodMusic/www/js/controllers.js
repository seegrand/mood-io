angular.module('MoodMusic.controllers', [])

  .controller('IntroCtrl', function($scope, $state, $ionicHistory){
    $scope.go = (path, disableBack) => {

      $ionicHistory.nextViewOptions({
        disableBack: disableBack
      });

      $state.go(path);
    }
  })

  .controller('LoginCtrl', function($ionicPlatform, $scope, $window, $ionicHistory, $state) {
    $scope.data = {};
    $scope.windowHeight = $window.innerHeight + 'px';

		$scope.login = function() {
			// Login user

			$ionicHistory.nextViewOptions({
				disableBack: true
			});

      $state.go('tab.dash');

		};

    $scope.go = function(view) {
      $ionicHistory.nextViewOptions({
        disableBack: false
      });

			$state.go(view);
		};
	})

	.controller('SignupCtrl', function($ionicPlatform, $scope, $window, $ionicHistory, $state) {
		$scope.data = {};
		$scope.windowHeight = $window.innerHeight + 'px';

		$scope.signup = function() {
			// Register user

			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$state.go('genres-like');
		}

		$scope.go = function(path) {
			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$state.go(path);
		}
	})

	.controller('DashCtrl', function($rootScope, $scope, $state, Songs, Moods) {

		$scope.recentSongs = Songs.all();
		$scope.recentMoods = Moods.all();

    $scope.go = function(view) {

      $ionicHistory.nextViewOptions({
        disableBack: false
      });

      $state.go(view);

    }

  })

		// $scope.playSong = function() {
		// 	$rootScope.go('play', false);
		// }

	})

	.controller('GenresCtrl', function($scope, $ionicHistory, $state, Genres) {

		var likes = [];
		var dislikes = [];

		$scope.genres = Genres.all();

    $scope.toggleDislikes = function() {
      this.isActive = !this.isActive;

      if (this.isActive) {
        dislikes.push(this.genre.name);
      } else {
        var i = likes.indexOf(this.genre.name);
        dislikes.splice(i, 1);
      }
    }

		$scope.toggleLikes = function() {
			this.isActive = !this.isActive;

			if (this.isActive) {
				likes.push(this.genre.name);
			} else {
				var i = likes.indexOf(this.genre.name);
				likes.splice(i, 1);
			}
		}

		$scope.go = function(path) {

			// TODO: Save liked / disliked genres
			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$state.go(path);
		}

	})

	.controller('SearchCtrl', function($scope, Songs) {

		$scope.songs = Songs.all();
	})

	.controller('SettingsCtrl', function($scope) {
		$scope.settings = {
			enableFriends: true
		};
	})

  .controller('ChangeMyMoodCtrl', function($scope, $state, Moods) {

    var currentMood = "";

    $scope.moods = Moods.all();

    $scope.selectedMood = function(){

      currentMood = this.mood.mood;
      console.log(currentMood);
    }

    $scope.go = function(path) {

      // TODO: Send current mood to API
      $state.go(path);
    }

  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };

    $scope.logout = function(){
      // TODO: Logout
      console.log("Logging out.");

    }
  });
