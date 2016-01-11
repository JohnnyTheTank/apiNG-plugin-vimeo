"use strict";
apingApp.config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            //...
            vimeo: [
                {'access_token':'<YOUR_VIMEO_ACCESS_TOKEN>'},
            ],
            //...
        }
    });
}]);