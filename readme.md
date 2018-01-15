# gulp-hugo-gallery [![Build Status](https://travis-ci.org/ianteda/gulp-hugo-gallery.svg?branch=master)](https://travis-ci.org/ianteda/gulp-hugo-gallery)

> My rad gulp plugin


## Install

```
$ npm install --save-dev gulp-hugo-gallery
```


## Usage

```js
const gulp = require('gulp');
const hugoGallery = require('gulp-hugo-gallery');

gulp.task('default', () =>
	gulp.src('src/file.ext')
		.pipe(hugoGallery())
		.pipe(gulp.dest('dist'))
);
```


## API

### hugoGallery([options])

#### options

Type: `Object`

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [Ian Teda](http://ianteda.com)
