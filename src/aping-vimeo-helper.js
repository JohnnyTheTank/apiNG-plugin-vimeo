"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-vimeo
 @licence MIT
 */

jjtApingVimeo.service('apingVimeoHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "vimeo";
    };

    this.getThisPlattformLink = function () {
        return "https://vimeo.com/";
    };

    this.getIdFromUri = function (_uri) {
        return _uri.split("/").slice(-1)[0];
    };

    this.getActionCounter = function (_connections, _action) {
        if(_connections[_action]) {
            return _connections[_action].total || undefined;
        }
    };

    this.getGoodQualityImage = function (_sizesArray) {
        var favoritePosition = 4;

        if(_sizesArray.length >= favoritePosition) {
            return _sizesArray[favoritePosition-1].link;
        } else {
            return _sizesArray[_sizesArray.length-1].link;
        }
    };

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            if (_data.data) {

                angular.forEach(_data.data, function (value, key) {
                    var tempResult;
                    if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {
                        tempResult = _this.getItemByJsonData(value, _helperObject.model);
                    }
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "video":
                    returnObject = this.getVideoItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        $.extend(true, socialObject, {
            blog_name: _item.user.name,
            blog_id: this.getIdFromUri(_item.user.uri),
            blog_link: _item.user.link,
            intern_type: "video",
            type: "video",
            intern_id: this.getIdFromUri(_item.uri),
            img_url: this.getGoodQualityImage(_item.pictures.sizes),
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            post_url: _item.link,
            caption: _item.name,
            text: _item.description,
        });

        socialObject.date_time = new Date(socialObject.timestamp);

        if(_item.embed && _item.embed.html) {
            socialObject.source = _item.embed.html;
        }

        if(!socialObject.text) {
            socialObject.text = socialObject.caption;
            socialObject.caption = "";
        }

        if(_item.metadata && _item.metadata.connections ) {
            socialObject.likes = this.getActionCounter(_item.metadata.connections, "likes");
            socialObject.comments = this.getActionCounter(_item.metadata.connections, "comments");
        }

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        $.extend(true, videoObject, {
            blog_name: _item.user.name,
            blog_id: this.getIdFromUri(_item.user.uri),
            blog_link: _item.user.link,
            intern_id: this.getIdFromUri(_item.uri),
            img_url: this.getGoodQualityImage(_item.pictures.sizes),
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            post_url: _item.link,
            caption: _item.name,
            text: _item.description,
            duration: _item.duration, // in seconds
            width: _item.width,
            height: _item.height,
        });

        videoObject.date_time = new Date(videoObject.timestamp);

        if(_item.embed && _item.embed.html) {
            videoObject.markup = _item.embed.html;
        } else {
            return false;
        }

        if(!videoObject.text) {
            videoObject.text = videoObject.caption;
            videoObject.caption = "";
        }

        if(_item.metadata && _item.metadata.connections ) {
            videoObject.likes = this.getActionCounter(_item.metadata.connections, "likes");
            videoObject.comments = this.getActionCounter(_item.metadata.connections, "comments");
        }

        return videoObject;
    };

}]);