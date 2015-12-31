[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

# apiNG-plugin-vimeo
[Vimeo API](https://developer.vimeo.com/api) Plugin for [apiNG](https://github.com/JohnnyTheTank/apiNG)

# Information
* **Supported apiNG models: `social`, `video`**
* Used promise library: [angular-vimeo-api-factory](https://github.com/JohnnyTheTank/angular-vimeo-api-factory) _(included in minified distribution file)_

# Documentation
    I.   INSTALLATION
    II.  ACCESS TOKEN
    III. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies
    d) Add the plugin

### a) Get files
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-vimeo --save`
* Download from github: [apiNG-plugin-vimeo.zip](https://github.com/JohnnyTheTank/apiNG-plugin-vimeo/zipball/master)

### b) Include files
Include `apiNG-plugin-vimeo.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-vimeo/dist/apiNG-plugin-vimeo.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_vimeo` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_vimeo']);
```

### d) Add the plugin
Add the plugin's directive `aping-vimeo="[]"` to your apiNG directive and configure your requests (_**III. USAGE**_)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-vimeo="[{'tag':'fcbayern'}, {'category':'sports', 'search':'soccer', items':50}]">
</aping>
```

## II. ACCESS TOKEN
    a) Generate your `access_token`
    b) Insert your `access_token` into `aping-config.js`

### a) Generate your `access_token`
1. Login on [developer.vimeo.com/apps](https://developer.vimeo.com/apps)
2. Create an new app
3. Press `Authentication`
4. Scroll to `Generate a new Access Token`
5. Choose Scopes: only [x] Public and [x] Private
6. Press `Generate Token`
7. Copy generated `access_token`

### b) Insert your `access_token` into `aping-config.js`
Open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
apingApp.config(['$provide', function ($provide) {
    $provide.constant("apingApiKeys", {
        //...
        vimeo: [
            {'access_token':'<YOUR_VIMEO_ACCESS_TOKEN>'}
        ],
        //...
    });

    $provide.constant("apingDefaultSettings", {
        //...
    });
}]);
```

:warning: Replace `<YOUR_VIMEO_ACCESS_TOKEN>` with your vimeo `access_token`

## III. USAGE
    a) Models
    b) Requests
    c) Rate limit

### a) Models
Supported apiNG models

|  model   | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|
| `social` | full    | `50`   | `25`   |
| `video`  | full    | `50`   | `25`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### b) Requests
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

### c) Rate limit
Visit the [official API rate limit documentation](https://developer.vimeo.com/guidelines/rate-limiting)

# Licence
MIT
