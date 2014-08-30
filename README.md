angular-table
=============

Simple and clean AngularJS Table with Sorting, Filtering and Paging

Demo: http://remakelabs.github.io/angular-table/

#### Sample Usage
Create a service and a directive using the angular-table.js code (angularTable and tablePaging).
Please note that the service has a dependency on Lo-Dash, which can easily be replaced.

Inject the service in the controller, then invoke the createClient function passing on the scope object that will hold the instance of the table and its data.
```javascript
angular.module('myapp', [])
    .controller('AppCtrl', ['$scope', 'api', 'angularTable', function ($scope, api, angularTable) {
        $scope.items = []; // Holds table data
        $scope.table = {}; // Object that will hold an instance of angular-table

        (function init() {
            api.getData(function (data) {
                $scope.items = data;
                angularTable.createClient($scope.table, $scope.items, 5).load();
            });
        }());
    }]);
```

On the the html page define your bindings and paging directive.
```html
<table class="table table-condensed table-striped table-hover">
    <thead>
        <tr>
            <th ng-click="table.sortBy('name')">
                <span>Name</span> <span ng-class="table.selectedCls('name')"></span>
            </th>
            <th ng-click="table.sortBy('email')">
                <span>Email</span> <span ng-class="table.selectedCls('email')"></span>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="item in table.pagedItems[table.currentPage]">
            <td>{{item.name}}</td>
            <td>{{item.email}}</td>
        </tr>
    </tbody>
</table>
<div table-paging="table"></div>
```

You can also specify an input field that will work as a filter on the table data.
```html
<form>
    <div class="form-inline">
        <div class="input-group">
            <input class="input-medium form-control" ng-model="table.filterText" placeholder="Search..." />
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary" ng-click="table.search(table.filterText)">
                    <span class="glyphicon glyphicon-search"></span> Search
                </button>
                <button type="button" class="btn btn-grey" ng-click="table.search('')">
                    <span class="glyphicon glyphicon-ban-circle"></span> Reset
                </button>
            </span>
        </div>
    </div>
</form>
```

Hopefully this will help you out!