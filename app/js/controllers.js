'use strict';

/* Controllers */
angular.module('pluffApp.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .controller('LanguageCtrl', LanguageCtrl)
  .controller('NavCtrl', NavCtrl)
  .controller('TimeTableCtrl', TimeTableCtrl)
  .controller('HolidaysCtrl', HolidaysCtrl)
  .controller('RoomsCtrl', RoomsCtrl)
  .controller('ColorsCtrl', ColorsCtrl)
  .controller('ErrorCtrl', ErrorCtrl);

function MainCtrl($scope) {
  // Show footer when ngView is loaded
  $scope.$on('$viewContentLoaded', function(){
    $scope.showFooter = true;
  });
}

function NavCtrl($scope, dataService, $timeout, $rootScope, $location, lessonService, dayService) {
  // Get timetable title (from TimeTableCtrl) and update if the title changes
  $scope.$watch(function() {
    return lessonService.getTitle();
  }, function(newValue) {
    if (newValue) {
      $scope.tableTitle = newValue;
    }
  });

  // If this data can't be loaded the user isn't authenticated yet
  // Add the resulting array in the global scope for the autocomplete plugin to use it
  dataService.getSuggestions().then(function(payload) {
    $scope.searchAuto = payload.data;
  });

  // Fired when a search suggestion is selected
  $scope.searchSelected = function(selected) {
    if (selected !== undefined) {
      var title = $rootScope.encode(selected.originalObject.name);
      var category = selected.originalObject.category;

      // Check which category is selected (room or class) to update the url
      console.log('Autocomplete ' + category + ' ' + title);
      $location.path('/search/' + category + '/' + title);
    }
  };

  $scope.showSearchFormFunc = function() {
    if (!$scope.searchFormFocused) {
      $scope.showSearchForm = !$scope.showSearchForm;

      if ($scope.showSearchForm === true) {
        $timeout(function() {
          var searchInput = document.getElementById('search-query_value');
          searchInput.focus();
        }, 0);
      }
    }
    $scope.searchFormFocused = false;
  };

  $scope.searchFormFocusOut = function() {
    $scope.showSearchForm = false;

    // If the form was hidden because of a focus out event, the showSearchFormFunc needs to know this
    $scope.searchFormFocused = true;
  };
}

function LanguageCtrl($scope, $translate, $route, $window) {
  $scope.switch = function($lang) {
    // Switch to the given language
    $translate.use($lang);
    // Full page reload to apply all languages
    // This is necessary because of the one-time bindings used for performance reasons
    $window.location.reload();
  };
}

function TimeTableCtrl($scope, $rootScope, $http, lessonService, $window, $location, weekService, dataService, dayService, timetableData, ngDialog) {
  // Get the personal schedule from the API
  $scope.weeks = lessonService.getTimeTable(timetableData.data);

  // Get the title of the timetable and filter some words out of it
  $scope.tableTitle = lessonService.setTitle(timetableData.title);

  // Watch for changes in the weeknumber
  $scope.$watch(function() {
    return weekService.getWeekUsed();
  }, function(newValue) {
    if (newValue) {
      $scope.weekNumberUsed = newValue;
    }
  });

  $scope.nextWeek = function() {
    if (weekService.addWeek()) {
      console.log('To the next week! ' + weekService.getWeekUsed() + ' year:' + weekService.getYearUsed());
    }
  };

  $scope.currentWeek = function() {
    weekService.currentWeek();
    console.log('To the current week! ' + weekService.getWeekUsed() + ' year:' + weekService.getYearUsed());
  };

  $scope.previousWeek = function() {
    if (weekService.subtractWeek()) {
      console.log('To the previous week! ' + weekService.getWeekUsed() + ' year:' + weekService.getYearUsed());
    }
  };

  $scope.isOldWeek = function() {
    return weekService.isOldWeek();
  };

  $scope.isNewWeek = function() {
    return weekService.isNewWeek();
  };

  // Bind keybindings to the window to enable right and left arrow navigation
  angular.element($window).on('keydown', function(e) {
    // Go to the next week on right arrow key
    if (e.keyCode === 39) {
      $scope.$apply(function() {
        $scope.nextWeek();
      });
    }
    // Go to the previous week on left arrow key
    if (e.keyCode === 37) {
      $scope.$apply(function() {
        $scope.previousWeek();
      });
    }
  });

  $scope.currentDayDate = function(dayNumber) {
    return dayService.getCurrentDayDate(dayNumber);
  };

  $scope.countLessons = function(day) {
    return lessonService.countLessons(day);
  };

  // Check if the current day is today
  $scope.isCurrentDay = function(dayNumber) {
    return dayService.isCurrentDay(dayNumber);
  };

  // Check if the current day is today, and if it's weekend, select monday
  $scope.isActiveDay = function(dayNumber) {
    return dayService.isActiveDay(dayNumber);
  };

  $scope.teacherDialog = function(teacherAbr) {
    // When the API data is loaded, open the dialog
    dataService.getTeacher(teacherAbr).then(function(payload) {
      var data = payload.data;

      ngDialog.open({
        template: 'partials/dialog-teacher.html',
        data: data
      });
    });
  };

  $scope.calculateLine = function() {
    dayService.setCalculateLine();
  };

  $window.setInterval($scope.calculateLine, 60000); // Refresh every minute
}

// Holidays dialog
function HolidaysCtrl($scope, holidayService) {
  // Load the holiday JSON and insert it in the scope
  holidayService.getHolidays().then(function(payload) {
    $scope.holidays = payload;
  });

}

// Holidays dialog
function RoomsCtrl($scope, roomService, moment) {
  // Load all the rooms with occupied information if it isn't sunday (API gives an error on sundays)
  var isSunday = moment().day() === 0;

  if (!isSunday) {
    roomService.getFreeRooms().then(function(payload) {
      $scope.rooms = payload;
    });
  }

}

// Colors controller (only for testing purposes)
function ColorsCtrl($scope, colorService, lessonService) {
  colorService.getSubjects().then(function(payload) {
    $scope.subjects = payload.data;
  });

  $scope.setColor = function(name) {
    return lessonService.generateColor(name);
  };

}

// Error controller
function ErrorCtrl() {
  //
}