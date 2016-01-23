[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![npm version](https://badge.fury.io/js/aping-plugin-vimeo.png)](https://badge.fury.io/js/aping-plugin-vimeo)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-vimeo.png)](https://badge.fury.io/bo/apiNG-plugin-vimeo)

# apiNG-plugin-vimeo
[Vimeo API](https://developer.vimeo.com/api) Plugin for [apiNG](https://github.com/JohnnyTheTank/apiNG)

# Information
* **Supported apiNG models: `social`, `video`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* This plugin needs an [access token](#2-access-token) :warning:
* Used promise library: [angular-vimeo-api-factory](https://github.com/JohnnyTheTank/angular-vimeo-api-factory) _(included in distribution files)_

# Documentation

1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [ACCESS TOKEN](#2-access-token)
    1. Generate your `access_token`
    2. Insert your `access_token` into `aping-config.js`
3. [USAGE](#3-usage)
    1. Models
    2. Requests
    3. Rate limit

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-vimeo --save`
* `npm install aping-plugin-vimeo --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-vimeo)
* download [apiNG-plugin-vimeo.zip](https://github.com/JohnnyTheTank/apiNG-plugin-vimeo/zipball/master)

### II. Include file
Include `aping-plugin-vimeo.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-vimeo/dist/aping-plugin-vimeo.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-vimeo/dist/aping-plugin-vimeo.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-vimeo/latest/aping-plugin-vimeo.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-vimeo.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_vimeo` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_vimeo']);
```

### IV. Add the plugin
Add the plugin's directive `aping-vimeo="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-vimeo="[{'tag':'fcbayern'}, {'category':'sports', 'search':'soccer', items':50}]">
</aping>
```

## 2. ACCESS TOKEN

### I. Generate your `access_token`
1. Login on [developer.vimeo.com/apps](https://developer.vimeo.com/apps)
2. Create an new app
3. Press `Authentication`
4. Scroll to `Generate a new Access Token`
5. Choose Scopes: only [x] Public and [x] Private
6. Press `Generate Token`
7. Copy generated `access_token`

### II. Insert your `access_token` into `aping-config.js`
Create and open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
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
```

:warning: Replace `<YOUR_VIMEO_ACCESS_TOKEN>` with your vimeo `access_token`

## 3. USAGE

### I. Models
Supported apiNG models

|  model   | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|
| `social` | full    | `50`   | `25`   |
| `video`  | full    | `50`   | `25`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by User
|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`user`** | `guiltyofficial` | user name | no |
| **`search`** | `eminem` | search query | yes |
| **`items`**  | `0`-`50` | items per request |  yes  |

Samples:
* `[{'user':'guiltyofficial'}, {'user':'thisisus'}, {'user':'user37039550'}]`
* `[{'user':'krismerc', 'search':'slomins', items':10}]`

#### Requests by Tag
|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`tag`** | `fcbayern` | tag name | no |
| **`search`** | `neuer` | search query | yes |
| **`items`**  | `0`-`50` | items per request |  yes  |

Samples:
* `[{'tag':'munich'}, {'tag':'letsplay'}, {'tag':'comedy'}]`
* `[{'tag':'comedy', 'search':'prank', items':50}]`

#### Requests by Channel
|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`channel`** | `animade` | channel name | no |
| **`search`** | `CalArts` | search query | yes |
| **`items`**  | `0`-`50` | items per request |  yes  |

Visit the list of [vimeo channels](https://vimeo.com/channels/)

Samples:
* `[{'channel':'musicbed'}, {'channel':'nowness'}, {'channel':'worldhd'}]`
* `[{'channel':'worldhd', 'search':'thailand', items':50}]`

#### Requests by Category
|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`category`** | `fashion` | category name | no |
| **`search`** | `highheels` | search query | yes |
| **`items`**  | `0`-`50` | items per request |  yes  |

Visit the list of [vimeo categories](https://vimeo.com/categories/)

Samples:
* `[{'category':'animation'}, {'category':'fashion'}, {'category':'travel'}]`
* `[{'category':'sports', 'search':'soccer', items':50}]`

### III. Rate limit
Visit the [official API rate limit documentation](https://developer.vimeo.com/guidelines/rate-limiting)

# Licence
MIT
