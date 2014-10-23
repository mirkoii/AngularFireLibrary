var bookApp = angular.module('bookApp', ['firebase', 'ngRoute']);
var url = 'https://glaring-heat-6463.firebaseio.com/';

bookApp.controller('BookCtrl', ['$scope', 'angularFire',
  function BookCtrl($scope, angularFire) {

      var loaded = angularFire(url, $scope, 'books', []);

      $scope.greaterThan = function (prop, val) {
          return function (item) {
              if (item[prop] > val) return true;
          }
      }

      $scope.searchAll = function (p1, p2, p3, p4, val) {
          val = val.replace(/\s{2,}/g, ' ').toLowerCase();
          var res = val.split(" ");
          var isbn;
          for (i = 0; i < res.length; i++) {

              var mc = res[i].match(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/gi);
              if (mc != null) {
                  isbn = mc[0];
                  break;
              }
          }

          return function (item) {
              if (isbn != null) {
                  if (item[p4].toLowerCase().indexOf(isbn) > -1)
                      return true;
              }
              else
                  if ((item[p1].toLowerCase().indexOf(val) > -1) || (item[p2].toLowerCase().indexOf(val) > -1) || (item[p3].toLowerCase().indexOf(val) > -1) || (item[p4].toLowerCase().indexOf(val) > -1))
                      return true;
          }
      }

      $scope.add = function (isbn) {

          for (i in $scope.books) {
              if ($scope.books[i].ISBN == isbn) {//update
                  $scope.message = 'isbn already exists!';
                  return;
              }
          }
          $scope.newBook.Borrower = ' ';
          console.log($scope.newBook);
          $scope.books.push($scope.newBook);
          $scope.newBook = '';
      }
      $scope.delete = function (isbn) {

          //search book with given isbn and delete it
          for (i in $scope.books) {
              if ($scope.books[i].ISBN == isbn) {
                  $scope.books.splice(i, 1);
              }
          }

      }
      $scope.changeStatus = function (item) {

          for (i in $scope.books) {
              if ($scope.books[i].ISBN == item.ISBNs) {

                  $scope.$apply(function () {
                      $scope.books[i].Borrower = 'hih@hiiii.com';

                  });
              }
          }

      }
  }
]);



// configure our routes
bookApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page--search
        .when('/', {
            templateUrl: 'pages/search.html',
            controller: 'mainController'
        })

        // route for the about page--add
        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'addController'
        })

        // route for the contact page
        .when('/rank', {
            templateUrl: 'pages/rank.html',
            controller: 'rankController'
        });
});

// create the controller and inject Angular's $scope
bookApp.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

bookApp.controller('addController', function ($scope) {
    $scope.message = 'Adding new book.';
});

bookApp.controller('rankController', function ($scope) {
    $scope.message = 'High ranking books.';
});

