'use strict';

angular.module('demoapp.controllers', [])
    .controller('DemoCtrl', ['$scope', 'api', 'angularTable', function ($scope, api, angularTable) {
        $scope.items = []; // Holds table data
        $scope.table = {}; // Object that will hold an instance of angular-table
        $scope.filterText = '';
        
        $scope.reset = function () {
            $scope.filterText = '';
        };
        
        // Watches
        $scope.$watch('filterText', function(val) {
            $scope.table.search(val);
        });

        (function init() {
            api.getCustomers(function (data) {
                $scope.items = data;
                angularTable.createClient($scope.table, $scope.items, 5).load();
            });
        }());
    }]);