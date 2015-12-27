"use strict";

angular.module('jtt_aping_design_blanko', [])
    .controller('apingBlankoDesignController', ['$scope', function ($scope) {

        $scope.$on('apiNG.resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });
    }]);