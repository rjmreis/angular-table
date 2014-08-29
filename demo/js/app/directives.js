'use strict';

angular.module('demoapp.directives', [])
    .directive('tablePaging', function () {
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