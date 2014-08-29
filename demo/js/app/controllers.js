'use strict';

angular.module('demoapp.controllers', [])
    .controller('DemoCtrl', ['$scope', 'api', 'angularTable', function ($scope, api, angularTable) {
        $scope.items = []; // Holds table data
        $scope.table = {}; // Object that will hold an instance of angular-table

        (function init() {
            api.getCustomers(function (data) {
                $scope.items = data;
                angularTable.createClient($scope.table, $scope.items, 5).load();
            });
        }());
    }]);