'use strict';

angular.module('demoapp.services', [])
    .service('angularTable', function () {
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
            
            $scope.search = function (val) {
                $scope.filterText = val;
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