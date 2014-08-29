'use strict';

var app = angular.module('myapp', []);

// AngularJS Table service
app.service('angularTable', function () {
    var configureClient = function ($scope, data, itemsPerPage) {
        init($scope, itemsPerPage);

        $scope.load = function () {
            if (_.isEmpty($scope.filterText)) {
                $scope.filteredItems = data;
            } else {
                var filter = $scope.filterText.toLowerCase();
                $scope.currentPage = 0;
                $scope.filteredItems = data.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(filter) != -1;
                });
            }

            $scope.groupToPages();
        };

        // Calculates page records
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.sortBy = function (newSortingOrder) {
            data = _.sortBy(data, newSortingOrder);

            if ($scope.sort.order === 'desc') {
                data = data.reverse();
            }

            $scope.sort.order = $scope.sort.order === 'asc' ? 'desc' : 'asc';

            $scope.sort.column = newSortingOrder;
            $scope.load();
        };
    };

    function init($scope, itemsPerPage) {
        $scope.sort = {
            column: 'Id',
            order: 'asc'
        };
        $scope.gap = 5;
        $scope.filteredItems = [];
        $scope.itemsPerPage = itemsPerPage;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.filterText = '';
        $scope.totalItems = 0;
        $scope.totalPages = 0;

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function (pageSize) {
            if ($scope.currentPage < pageSize) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };

        $scope.range = function (size, start, end) {
            var ret = [];

            if (size < end) {
                end = size;
                start = size - $scope.gap;
            }
            for (var i = start; i < end; i++) {
                if (i >= 0) ret.push(i);
            }

            return ret;
        };

        $scope.selectedCls = function (column) {
            if (column == $scope.sort.column) {
                return ('glyphicon glyphicon-sort-by-attributes' + ($scope.sort.order === 'asc' ? '-alt' : ''));
            } else {
                return 'glyphicon glyphicon-sort';
            }
        };

        $scope.search = function (searchText) {
            if (_.isEmpty(searchText)) {
                $scope.filterText = '';
            }
            $scope.load();
        };
    }

    return {
        createClient: function ($scope, data, itemsPerPage) {
            configureClient($scope, data, itemsPerPage);

            return $scope;
        }
    };
});

// AngularJS Table paging directive
app.directive('tablePaging', function () {
    return {
        scope: {
            tablePaging: '='
        },
        template:
            '<div class="row" ng-show="tablePaging.filteredItems.length">' +
                '<div class="col-xs-4"><div class="pagination"><strong>Total:</strong> {{tablePaging.filteredItems.length}} items</div></div>' +
                '<div class="col-xs-8">' +
                    '<div class="pagination pull-right">' +
                        '<ul class="pagination">' +
                            '<li ng-class="{disabled: tablePaging.currentPage == 0}">' +
                                '<a href ng-click="tablePaging.setPage(0)">First</a>' +
                            '</li>' +
                            '<li ng-class="{disabled: tablePaging.currentPage == 0}">' +
                                '<a href ng-click="tablePaging.prevPage()">« Prev</a>' +
                            '</li>' +
                            '<li ng-repeat="n in tablePaging.range(tablePaging.pagedItems.length, tablePaging.currentPage, tablePaging.currentPage + tablePaging.gap)"' +
                                'ng-class="{active: n == tablePaging.currentPage}" ng-click="tablePaging.setPage(n)">' +
                                '<a href ng-bind="n + 1">1</a>' +
                            '</li>' +
                            '<li ng-class="{disabled: tablePaging.currentPage == tablePaging.pagedItems.length - 1}">' +
                                '<a href ng-click="tablePaging.nextPage(tablePaging.pagedItems.length - 1)">Next »</a>' +
                            '</li>' +
                            '<li ng-class="{disabled: tablePaging.currentPage == tablePaging.pagedItems.length - 1}">' +
                                '<a href ng-click="tablePaging.setPage(tablePaging.pagedItems.length - 1)">Last</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
});