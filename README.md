# pv-wp2018
General WP Theme Development | WP Files Misc Testing

## WP Setup
* WP version 4.9.8 with classic editor enabled

### Active plugins
* Theme Check <https://wordpress.org/plugins/theme-check/>

### Include in wp-config

* define('WP_DEBUG', true);
* define( 'TC_PRE', 'Theme Review:[[br]]');   // For Theme Check plugin
* define( 'TC_POST', 'Post Theme Review:[[br]]' ); // For Theme Check plugin

## Environment Dependencies
* Homebrew 1.7.2 (https://brew.sh/) | check version: brew -v | update: brew update
* NPM 6.4.1 (https://docs.npmjs.com/cli/update) | check version: npm -v | update: npm update -g
* Node 8.11.4 (https://nodejs.org/) | node -v
* Yarn 1.5.1 (https://yarnpkg.com/lang/en/docs/install/) | yarn --version
* Browser Sync 2.24.7 (https://browsersync.io/) | browser-sync -v | npm install -g browser-sync
* Gulp 4.0.0 npm install -g gulp-cli | gulp -v

### Starter theme
Credit to Underscores or _s <https://github.com/Automattic/_s >

## Gulp Setup and Workflow - NPM -
Reference: 
<https://www.sitepoint.com/wordpress-theme-automation-with-gulp/>

<https://whizbangapps.com/blog/setting-up-wordpress-with-underscores-and-gulp>

<https://www.sitepoint.com/simple-gulpy-workflow-sass/>

#### Global - Steps (run on command line):
* Remove older versions:
npm rm -g gulp 
npm uninstall --global gulp gulp-cli
rm /usr/local/share/man/man1/gulp.1

* Install globally: npm install -g gulp-cli 
* check version: gulp -v

#### Inside directory, SASS dev
* go to theme directory to create a package.json file, run: npm init
* install Gulp as a development dependency, node_modules is created, run: 

remove older versions if you need to: npm uninstall gulp --save-dev

npm install 'gulpjs/gulp.git#4.0' --save-dev

* add es6-promise polyfill, run:  npm install es6-promise --save-dev
* create an empty gulpfile.js configuration file, test it: gulp

* install gulp-sass and gulp-autoprefixer plugins, run: npm install gulp-sass gulp-autoprefixer --save-dev
* create a sass task in gulpfile.js, test it: gulp sass
* add watch task, use it: gulp
* add error handling plugins: npm install gulp-plumber gulp-util --save-dev
* add rename and rtl: npm install gulp-rtlcss gulp-rename --save-dev

* fix for old version dependencies: 
npm i -g npm
npm i --save-dev lodash
npm audit fix
npm install --save-dev gulp@4.0.0

#### For JS dev
* to concatenate files: npm install gulp-concat --save-dev
* to validate js: npm install jshint gulp-jshint --save-dev
* to minify code: npm install gulp-uglify --save-dev
* add js task to gulpfile.js to read/conc js files in src/js/
* create a .jshintrc configuration file in the theme root for js hint options

Reference for issues with gulp v4 new syntax:
https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpseriestasks

https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/

#### Browser Sync
* npm install browser-sync --save-dev

#### Add Bootstrap & Font Awesome
* npm install jquery --save-dev
* npm install bootstrap --save-dev
* npm install @fortawesome/fontawesome-free --save-dev
* npm install popper.js --save-dev

#### Enhancements
* Gulp copy assets task: to move needed libraries from node_modules to project root src directory: <https://understrap.github.io/>
* gulp copy-assets

### Install dependencies after initial setup/cloning
* npm install
* change path for browser sync in gulpconfig.json
* gulp copy-assets

### Commands to run gulp to compile sass/js
* gulp
