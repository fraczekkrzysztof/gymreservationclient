var app = angular.module('app', []);

/*-------------------ActivityCtrl--------------------*/
app.controller('ActivityCtrl', function($scope, ActivityCRUDService) {

  $scope.newActivity = null;
  $scope.isUpdate = false;
  $scope.activitiesList = null;

  $scope.clearNewActivity = function() {
    $scope.isUpdate = false;
    $scope.newActivity = null;
    angular.element(document.querySelector('#activityAddUpdateButton')).prop("value", "Add");
    angular.element(document.querySelector('#addError')).addClass("nonDisplay");
    $scope.activityAddForm.$setUntouched();
    $scope.activityAddForm.$setPristine();
  };

  $scope.getClickedActivity = function(activity) {
    $scope.isUpdate = true;
    angular.element(document.querySelector('#activityAddUpdateButton')).prop("value", "Update");
    $scope.newActivity = activity;

  }

  $scope.getAllActivities = function() {
    ActivityCRUDService.getAllActivities()
      .then(function success(response) {
          $scope.activitiesList = response.data;
        },
        function error(response) {
          $scope.message = '';
          $scope.errorMessage = 'Error getting users!';
        });
  };

  $scope.addActivity = function(newActivity) {
    ActivityCRUDService.addActivity(newActivity.symbol, newActivity.name).
    then(
      function succes(response) {
        $('#addActivityModal.modal').modal('hide');
        $scope.getAllActivities();
      },
      function error(response) {
        angular.element(document.querySelector('#addError')).removeClass("nonDisplay");
        $scope.addErrorMessage = response.data.message;
      }
    );
  };
  $scope.deleteActivity = function(activity) {
    ActivityCRUDService.deleteActivity(activity.id).
    then(
      function succes(response) {
        $scope.getAllActivities();
      },
      function error(respone) {
        console.log(response.errorMessage);
      });
  };

  $scope.updateActivity = function(activity) {
    ActivityCRUDService.updateActivity(activity.id, activity.symbol, activity.name).
    then(
      function succes(response) {
        $('#addActivityModal.modal').modal('hide');
        $scope.getAllActivities();
      },
      function error(respone) {
        console.log(response.message);
      }
    );
  };


  $scope.addOrUpdateActivity = function(Activity) {
    if ($scope.isUpdate) {
      $scope.updateActivity(Activity);
    } else {
      $scope.addActivity(Activity);
    }
  };
});
/*-------------------TrainerCtrl--------------------*/
app.controller('TrainerCtrl', function($scope, TrainerCRUDService) {
  $scope.listOfTrainers == null;

  $scope.newTrainer = null;
  $scope.isUpdate = false;

  $scope.clearNewTrainer = function() {
    $scope.isUpdate = false;
    $scope.newTrainer = null;
    angular.element(document.querySelector('#trainerAddUpdateButton')).prop("value", "Add");
    angular.element(document.querySelector('#addError')).addClass("nonDisplay");
    $scope.trainerAddForm.$setUntouched();
    $scope.trainerAddForm.$setPristine();
  };

  $scope.getClickedTrainer = function(trainer) {
    $scope.isUpdate = true;
    angular.element(document.querySelector('#trainerAddUpdateButton')).prop("value", "Update");
    $scope.newTrainer = trainer;

  }

  $scope.getAllTrainers = function() {
    TrainerCRUDService.getAllTrainers().
    then(
      function succes(response) {
        $scope.listOfTrainers = response.data;
      },
      function error(respone) {
        console.log(response.errorMessage);
      }
    );
  };

  $scope.deleteTrainer = function(trainer) {
    TrainerCRUDService.deleteTrainer(trainer.id).
    then(
      function succes(respone) {
        $scope.getAllTrainers();
      },
      function error(response) {
        console.log(response.errorMessage);
      }
    )
  };

  $scope.addTrainer = function(newTrainer) {
    TrainerCRUDService.addTrainer(newTrainer.symbol, newTrainer.name).
    then(
      function succes(response) {
        $('#addTrainerModal.modal').modal('hide');
        $scope.getAllTrainers();
      },
      function error(response) {
        angular.element(document.querySelector('#addError')).removeClass("nonDisplay");
        $scope.addErrorMessage = response.data.message;
      }
    );
  };

  $scope.updateTrainer = function(newTrainer) {
    TrainerCRUDService.updateTrainer(newTrainer.id, newTrainer.symbol, newTrainer.name).
    then(
      function succes(response) {
        $('#addTrainerModal.modal').modal('hide');
        $scope.getAllTrainers;
      },
      function error(respone) {
        angular.element(document.querySelector('#addError')).removeClass("nonDisplay");
        $scope.addErrorMessage = response.data.message;
      }
    )
  }
  $scope.addOrUpdateTrainer = function(Trainer) {
    if ($scope.isUpdate) {
      $scope.updateTrainer(Trainer);
    } else {
      $scope.addTrainer(Trainer);
    }
  };
});

/*app.controller('MenuCtrl',function($scope){
  $scope.isActivityVisible = function(){
    angular.element(document.querySelector('#activity')).removeClass("nonDisplay");
    angular.element(document.querySelector('#welcome')).addClass("nonDisplay");
  };
  $scope.isWelcomeVisible = function(){
    angular.element(document.querySelector('#welcome')).removeClass("nonDisplay");
    angular.element(document.querySelector('#activity')).addClass("nonDisplay");
  };
});*/
/*-------------------LessonCtrl--------------------*/
app.controller('LessonCtrl', function($scope, $filter, $rootScope, $location, LessonCRUDService, ActivityCRUDService, TrainerCRUDService, ReservationCRUDService) {

  $scope.listOfLessons = null;
  $scope.listOfTrainers = null;
  $scope.listOfActivities = null;
  $scope.listOfReservation = null;
  $scope.listShow = false;
  $scope.show = true;
  $scope.message = null;
  $scope.clearNewLesson = function() {
    $scope.newLesson = null;
    $scope.lessonAddForm.$setUntouched();
    $scope.lessonAddForm.$setPristine();
  };
  $scope.isVisible = function() {
    return $scope.show;
  };
  $scope.isListShow = function() {
    return $scope.listShow;
  };
  $scope.showMessage = function() {
    if (!($scope.message == null)) {
      return true;
    }
    return false;
  }
  $scope.getMessage = function() {
    returnData = $scope.message;
    $scope.message = null;
    return returnData;
  }

  $scope.getAllTrainers = function() {
    TrainerCRUDService.getAllTrainers().
    then(
      function succes(response) {
        console.log("pobieram trenerów");
        $scope.listOfTrainers = response.data;
      },
      function error(respone) {
        console.log(response.errorMessage);
      }
    );
  };

  $scope.getAllActivities = function() {
    ActivityCRUDService.getAllActivities()
      .then(function success(response) {
          $scope.listOfActivities = response.data;
        },
        function error(response) {
          $scope.message = '';
          $scope.errorMessage = 'Error getting users!';
        });
  };

  $scope.init = function() {
    console.log("jestem w init");
    $scope.getAllLessons();
    $scope.getAllTrainers();
    $scope.getAllActivities();
    $scope.show = true;
  };

  $scope.getAllLessons = function() {
    LessonCRUDService.getAllLessons().
    then(
      function succes(response) {

        $scope.listOfLessons = response.data;
      },
      function error(respone) {
        console.log(respone.errorMessage);
      }
    );
  };
  $scope.deleteLesson = function(id) {
    LessonCRUDService.deleteLesson(id).
    then(
      function succes(response) {
        $scope.getAllLessons();
      },
      function error(respone) {
        console.log(respone.errorMessage);
      }
    );
  };
  $scope.addLesson = function(newLesson) {
    console.log(newLesson);
    LessonCRUDService.addLesson(newLesson.name, $filter('date')(newLesson.date, "dd-MM-yyyy"), newLesson.maxAvailable, newLesson.maxAvailable, newLesson.trainer, newLesson.activity).
    then(
      function succes() {
        $('#addLessonModal.modal').modal('hide');
        $scope.getAllLessons();
      },
      function erros(response) {
        console.log(response.errorMessage)
      }
    );
  };
  $scope.goToReservation = function(lessonId) {
    $rootScope.$broadcast("goToAddReservation", {
      "lesson": lessonId
    });
    $scope.show = false;
    /*window.location = 'add-reservation.html';*/
    /* $location.path("static/add-reservation.html");*/
  };
  $scope.goToWaiting = function(lessonId) {
    $rootScope.$broadcast("goToWaiting", {
      "lesson": lessonId
    });
    $scope.show = false;
  }
  $scope.$on("reservationSuccess", function(event, args) {
    $scope.message = args.message;
    $scope.show = true;
    $scope.getAllLessons();
  });
  $scope.showAllReservation = function(lessonId) {
    ReservationCRUDService.getAllReservation(lessonId).
    then(
      function succes(response) {
        $scope.listOfReservation = response.data;
        $scope.show = false;
        $scope.listShow = true;
      },
      function error(response) {}
    )
  };
  $scope.showListBack = function() {
    $scope.show = true;
    $scope.listShow = false;
  };
});
/*--------------------------ReservationCtrl---------------*/
app.controller('ReservationCtrl', function($scope, $rootScope, LessonCRUDService, ActivityCRUDService, TrainerCRUDService, ReservationCRUDService) {
  $scope.lessonId = null;
  $scope.show = false;
  $scope.errmessage = null;
  $scope.isAddReservation = false;
  $scope.isVisible = function() {
    return $scope.show;
  }
  $scope.getErrMessage = function() {
    returnData = $scope.errmessage;
    $scope.errmessage = null;
    return returnData
  }
  $scope.init = function() {
    $scope.show = false;
  };
  $scope.$on("goToAddReservation", function(event, args) {
    $scope.lessonId = args.lesson;
    $scope.isAddReservation = true;
    $scope.show = true;
  });
  $scope.$on("goToWaiting", function(event, args) {
    $scope.lessonId = args.lesson;
    $scope.isAddReservation = false;
    $scope.show = true;
  });
  $scope.addReservation = function(newReservation) {
    if ($scope.isAddReservation) {
      ReservationCRUDService.addReservation($scope.lessonId, newReservation.name, newReservation.email).
      then(
        function succes(response) {
          $scope.show = false;
          $rootScope.$broadcast("reservationSuccess", {
            message: "Reservation Success!"
          });
        },
        function erros(response) {
          $scope.errmessage = "Reservation failed!";
        }
      );
    } else {
      ReservationCRUDService.addWaiting($scope.lessonId, newReservation.name, newReservation.email).
      then(
        function succes(response) {
          $scope.show = false;
          $rootScope.$broadcast("reservationSuccess", {
            message: "Adding To Waiting List Success! Your place on waiting list " + response.data.waiting
          });
        },
        function erros(response) {
          $scope.errmessage = "Adding To Waiting List failed!";
        }
      );
    }
  };
});
/*-------------------ActivityCRUDService--------------------*/
app.service('ActivityCRUDService', function($http) {
  this.getAllActivities = function getAllActivities() {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/activity'
    });
  }
  this.addActivity = function(symbol, name) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8080/api/activity',
      data: {
        "id": 0,
        "symbol": symbol,
        "name": name
      }
    });
  };
  this.deleteActivity = function(id) {
    return $http({
      method: 'DELETE',
      url: 'http://localhost:8080/api/activity/' + id
    })
  };
  this.updateActivity = function(id, symbol, name) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:8080/api/activity',
      data: {
        "id": id,
        "symbol": symbol,
        "name": name
      }
    });
  }
});
/*-------------------TrainerCRUDService--------------------*/
app.service('TrainerCRUDService', function($http) {
  this.baseUrl = 'http://localhost:8080/api/trainer';
  this.getAllTrainers = function getAllTrainers() {
    return $http({
      method: 'GET',
      url: this.baseUrl
    });
  };
  this.addTrainer = function(symbol, name) {
    return $http({
      method: 'POST',
      url: this.baseUrl,
      data: {
        "id": 0,
        "symbol": symbol,
        "name": name
      }
    })
  };
  this.updateTrainer = function(id, symbol, name) {
    return $http({
      method: 'PUT',
      url: this.baseUrl,
      data: {
        "id": id,
        "symbol": symbol,
        "name": name
      }
    })
  }
  this.deleteTrainer = function(id) {
    return $http({
      method: 'DELETE',
      url: this.baseUrl + '/' + id
    });
  };
});
/*-------------------LessonCRUDService--------------------*/
app.service('LessonCRUDService', function($http) {
  this.baseUrl = 'http://localhost:8080/api/lesson';
  this.getAllLessons = function() {
    return $http({
      method: 'GET',
      url: this.baseUrl
    });
  };
  this.addLesson = function(name, date, max, available, trainer, activity) {
    return $http({
      method: 'POST',
      url: this.baseUrl,
      data: {
        "id": 0,
        "name": name,
        "date": date,
        "max": max,
        "available": available,
        "trainer": trainer,
        "activity": activity
      }
    });
  };
  this.deleteLesson = function(id) {
    return $http({
      method: 'DELETE',
      url: this.baseUrl + '/' + id
    });
  };
});

/*-------------------ReservationCRUDService ----------------*/
app.service('ReservationCRUDService', function($http) {
  this.baseUrl = 'http://localhost:8080/api/reservation';
  this.addReservation = function(lesson, name, email) {
    return $http({
      method: 'POST',
      url: this.baseUrl,
      data: {
        "id": 0,
        "lesson": lesson,
        "name": name,
        "email": email
      }
    });
  };
  this.addWaiting = function(lesson, name, email) {
    return $http({
      method: 'POST',
      url: this.baseUrl + '/waiting',
      data: {
        "id": 0,
        "lesson": lesson,
        "name": name,
        "email": email
      }
    });
  };
  this.getAllReservation = function(lessonId) {
    return $http({
      method: 'GET',
      url: this.baseUrl + "/lesson/" + lessonId
    });
  };
});
