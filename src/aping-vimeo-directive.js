"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-vimeo
 @licence MIT
 */

var jjtApingVimeo = angular.module("jtt_aping_vimeo", ['jtt_vimeo'])
    .directive('apingVimeo', ['apingApiKeys', 'apingVimeoHelper', 'apingUtilityHelper', 'vimeoFactory', function (apingApiKeys, apingVimeoHelper, apingUtilityHelper, vimeoFactory) {
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
                        'per_page': request.items || appSettings.items,
                        'access_token': apingUtilityHelper.getApiCredentials(apingVimeoHelper.getThisPlattformString(), "access_token"),
                    };
                    if(request.search) {
                        requestObject.query = request.search;
                    }


                    if (request.user) { //search for videos by user

                        requestObject.user = request.user;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromUser(requestObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.channel) { //search for videos by channel

                        requestObject.channel = request.channel;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromChannel(requestObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.tag) { //search for videos by tag
                        requestObject.tag = request.tag;

                        vimeoFactory.getVideosFromTag(requestObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });

                    } else if (request.category) { //search for videos by category
                        requestObject.category = request.category;
                        requestObject.filter = "embeddable";
                        requestObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromCategory(requestObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    }
                });
            }
        }
    }]);