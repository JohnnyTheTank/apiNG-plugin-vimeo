"use strict";

angular.module("jtt_aping_vimeo")
    .service('apingVimeoHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
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
            if (_connections[_action]) {
                return _connections[_action].total || undefined;
            }
        };

        /**
         * returns the difference between two integers
         *
         * @param _int1 {number}
         * @param _int2 {number}
         * @returns {number}
         */
        this.getDifference = function (_int1, _int2) {
            if (_int1 > _int2) {
                return _int1 - _int2;
            } else {
                return _int2 - _int1;
            }
        };

        /**
         * returns an object with images urls and dimensions
         *
         * @param _array {Array}
         * @returns {Object}
         */
        this.getImagesFromImageArray = function (_array) {

            var that = this;

            var returnObject = {
                thumb_url: undefined,
                thumb_width: undefined, // best case 200px (min)
                thumb_height: undefined,
                img_url: undefined,
                img_width: undefined, // best case 700px
                img_height: undefined,
                native_url: undefined,
                native_width: undefined,
                native_height: undefined,
            };

            if (_array.constructor === Array) {


                angular.forEach(_array, function (value, key) {
                    if (typeof value.link !== "undefined") {
                        if (typeof returnObject.thumb_url === "undefined") {
                            returnObject.thumb_url = value.link;
                            returnObject.thumb_width = value.width;
                            returnObject.thumb_height = value.height;
                        } else {
                            if (
                                that.getDifference(returnObject.thumb_width, 200) > that.getDifference(value.width, 200)
                                &&
                                value.width >= 200
                            ) {
                                returnObject.thumb_url = value.link;
                                returnObject.thumb_width = value.width;
                                returnObject.thumb_height = value.height;
                            }
                        }

                        if (typeof returnObject.img_url === "undefined") {
                            returnObject.img_url = value.link;
                            returnObject.img_width = value.width;
                            returnObject.img_height = value.height;
                        } else {
                            if (
                                that.getDifference(returnObject.img_width, 700) > that.getDifference(value.width, 700)
                            ) {
                                returnObject.img_url = value.link;
                                returnObject.img_width = value.width;
                                returnObject.img_height = value.height;
                            }
                        }

                        if (typeof returnObject.native_url === "undefined") {
                            returnObject.native_url = value.link;
                            returnObject.native_width = value.width;
                            returnObject.native_height = value.height;
                        } else {
                            if (
                                value.width > returnObject.native_width
                            ) {
                                returnObject.native_url = value.link;
                                returnObject.native_width = value.width;
                                returnObject.native_height = value.height;
                            }
                        }
                    }
                });
            }

            return returnObject;
        };

        this.getObjectByJsonData = function (_data, _helperObject) {
            var requestResults = [];
            if (_data && _data.data) {
                var _this = this;

                if (_data.data.data) {

                    angular.forEach(_data.data.data, function (value, key) {
                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject.model);
                        }
                        if (tempResult) {
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

            angular.extend(socialObject, {
                blog_name: _item.user.name,
                blog_id: this.getIdFromUri(_item.user.uri),
                blog_link: _item.user.link,
                intern_type: "video",
                type: "video",
                intern_id: this.getIdFromUri(_item.uri),
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600 * 1000),
                post_url: _item.link,
                caption: _item.name,
                text: _item.description,
            });

            socialObject.date_time = new Date(socialObject.timestamp);

            if (_item.pictures && _item.pictures.sizes.length > 0) {
                var tempImageArray = this.getImagesFromImageArray(_item.pictures.sizes);
                socialObject.img_url = tempImageArray.img_url || undefined;
                socialObject.thumb_url = tempImageArray.thumb_url || undefined;
                socialObject.native_url = tempImageArray.native_url || undefined;
            }

            if (_item.embed && _item.embed.html) {
                socialObject.source = _item.embed.html;
            }

            if (!socialObject.text) {
                socialObject.text = socialObject.caption;
                socialObject.caption = "";
            }

            if (_item.metadata && _item.metadata.connections) {
                socialObject.likes = this.getActionCounter(_item.metadata.connections, "likes");
                socialObject.comments = this.getActionCounter(_item.metadata.connections, "comments");
            }

            return socialObject;
        };

        this.getVideoItemByJsonData = function (_item) {
            var videoObject = apingModels.getNew("video", this.getThisPlattformString());

            angular.extend(videoObject, {
                blog_name: _item.user.name,
                blog_id: this.getIdFromUri(_item.user.uri),
                blog_link: _item.user.link,
                intern_id: this.getIdFromUri(_item.uri),
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600 * 1000),
                post_url: _item.link,
                caption: _item.name,
                text: _item.description,
                duration: _item.duration, // in seconds
                width: _item.width,
                height: _item.height,
            });

            if (_item.pictures && _item.pictures.sizes.length > 0) {
                var tempImageArray = this.getImagesFromImageArray(_item.pictures.sizes);
                videoObject.img_url = tempImageArray.img_url || undefined;
                videoObject.thumb_url = tempImageArray.thumb_url || undefined;
                videoObject.native_url = tempImageArray.native_url || undefined;
            }

            videoObject.date_time = new Date(videoObject.timestamp);

            if (_item.embed && _item.embed.html) {
                videoObject.markup = _item.embed.html;
            } else {
                return false;
            }

            if (!videoObject.text) {
                videoObject.text = videoObject.caption;
                videoObject.caption = "";
            }

            if (_item.metadata && _item.metadata.connections) {
                videoObject.likes = this.getActionCounter(_item.metadata.connections, "likes");
                videoObject.comments = this.getActionCounter(_item.metadata.connections, "comments");
            }

            return videoObject;
        };

    }]);