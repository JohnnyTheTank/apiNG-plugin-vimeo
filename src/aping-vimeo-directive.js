"use strict";

angular.module("jtt_aping_vimeo", ['jtt_vimeo'])
    .directive('apingVimeo', ['apingVimeoHelper', 'apingUtilityHelper', 'vimeoFactory', function (apingVimeoHelper, apingUtilityHelper, vimeoFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingVimeo, apingVimeoHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingVimeoHelper.getThisPlattformString(), "access_token"),
                    };

                    if(typeof request.items !== "undefined") {
                        requestObject.per_page = request.items;
                    } else {
                        requestObject.per_page = appSettings.items;
                    }

                    if (requestObject.per_page === 0 || requestObject.per_page === '0') {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(requestObject.per_page < 0 || isNaN(requestObject.per_page)) {
                        requestObject.per_page = undefined;
                    }

                    // the api has a limit of 50 items per request
                    if(requestObject.per_page > 50) {
                        requestObject.per_page = 50;
                    }


                    if(typeof request.search !== "undefined") {
                        requestObject.query = request.search;
                    }

                    if (request.user) { //search for videos by user

                        requestObject.user = request.user;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromUser(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.channel) { //search for videos by channel

                        requestObject.channel = request.channel;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromChannel(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.tag) { //search for videos by tag
                        requestObject.tag = request.tag;

                        vimeoFactory.getVideosFromTag(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.category) { //search for videos by category
                        requestObject.category = request.category;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromCategory(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    }
                });
            }
        }
    }]);