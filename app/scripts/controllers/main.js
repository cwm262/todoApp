'use strict';

/**
 * @ngdoc function
 * @name todoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoAppApp
 */
angular.module('todoAppApp')
  .controller('MainCtrl', function ($scope, $filter, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
      $scope.remainingCount = $filter('filter')($scope.todos, { isDone: false}).length;
      $scope.completedCount = $scope.todos.length - $scope.remainingCount;
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function(){
      $scope.todos.push({taskName : $scope.todo , isDone : false });
      $scope.todo = '';//Reset the text field.
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };


  });
