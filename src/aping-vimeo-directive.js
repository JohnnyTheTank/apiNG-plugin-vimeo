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

                    var vimeoSearchObject = {
                        'per_page': request.items || appSettings.items,
                        'access_token': apingApiKeys.vimeo,
                    };

                    if(request.search) {
                        vimeoSearchObject.query = request.search;
                    }

                    if (request.user) { //search for videos by user

                        vimeoSearchObject.user = request.user;
                        vimeoSearchObject.filter = "embeddable";
                        vimeoSearchObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromUser(vimeoSearchObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, appSettings.model));
                                }
                            });

                    } else if (request.channel) { //search for videos by channel

                        vimeoSearchObject.channel = request.channel;
                        vimeoSearchObject.filter = "embeddable";
                        vimeoSearchObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromChannel(vimeoSearchObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, appSettings.model));
                                }
                            });

                    } else if (request.tag) { //search for videos by tag
                        vimeoSearchObject.tag = request.tag;

                        vimeoFactory.getVideosFromTag(vimeoSearchObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, appSettings.model));
                                }
                            });

                    } else if (request.category) { //search for videos by category
                        vimeoSearchObject.category = request.category;
                        vimeoSearchObject.filter = "embeddable";
                        vimeoSearchObject.filter_embeddable = true;

                        vimeoFactory.getVideosFromCategory(vimeoSearchObject)
                            .success(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingVimeoHelper.getObjectByJsonData(_data, appSettings.model));
                                }
                            });
                    }
                });
            }
        }
    }]);