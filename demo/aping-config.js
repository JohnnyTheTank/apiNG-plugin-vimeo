"use strict";
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            vimeo: [
                {'access_token':'<YOUR_VIMEO_ACCESS_TOKEN>'},
            ],
            //...
        }
    });
}]);