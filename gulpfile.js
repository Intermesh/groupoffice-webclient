var gulp = require('gulp');


//gulp.task('index', function () {
//  var target = gulp.src('./app/index.html');
//  // It's not necessary to read the files (will speed up things), we're only after their paths:
//  var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});
//
//  return target.pipe(inject(sources, {relative: true}))
//    .pipe(gulp.dest('./app'));
//});


//var angularFilesort = require('gulp-angular-filesort'),
//				inject = require('gulp-inject');
//
//gulp.task('index', function () {
//	gulp.src('./app/index.html')
//					.pipe(inject(
//									gulp.src(['./app/**/*.js']).pipe(angularFilesort())
//									))
//					.pipe(gulp.dest('./app'));
//});


var shell = require('gulp-shell');
gulp.task('docs', shell.task([
	'node_modules/jsdoc/jsdoc.js ' +
					'-c node_modules/angular-jsdoc/conf.json ' + // config file
					'-t node_modules/angular-jsdoc/template ' + // template file
					'-d build/docs ' + // output directory
					'./docs/index.md ' + // to include README.md as index contents
					'-r app/core'                              // source code directory
]));


var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
	gulp.src('./app/scss/app.scss')
					.pipe(sourcemaps.init())
					.pipe(sassGlob())
					.pipe(sass().on('error', sass.logError))
					.pipe(sourcemaps.write())
						
					.pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./app/**/*.scss', function () {
		gulp.src('./app/scss/app.scss')
						.pipe(sourcemaps.init())
						.pipe(sassGlob())
						.pipe(sass().on('error', sass.logError))
						.pipe(sourcemaps.write())
						.pipe(gulp.dest('./app/css'));
	});
});

gulp.task('template-cache', ['clean', 'sass'], function () {
	return gulp.src(['app/**/*.html'])
					.pipe(templateCache())
					.pipe(gulp.dest('app/core/'));
});

gulp.task('usemin', ['clean', 'template-cache', 'index', 'sass'], function () {
	return gulp.src('app/build.html')
					.pipe(usemin({
						css: [minifyCss(), autoprefixer(), 'concat'],
						html: [minifyHtml({empty: true})],
						js: [uglify().on('error', function(e){console.log(e);}), rev(), 'concat'],
						//						js: ['concat'],//for debugging
						inlinejs: [uglify()],
						inlinecss: [minifyCss(), 'concat']
					}))
					.pipe(gulp.dest('build/'));
});

//gulp.task('clean', function (cb) {
//	rimraf('./build/', cb);
//});

gulp.task('clean', function (cb) {
  del([
    'build/**/*'    
  ], cb);
});


gulp.task('copy-resources', ['clean', 'sass', "template-cache", 'index', "usemin", 'rename-index'], function () {

	gulp.src(['app/**/resources/**/*.*', 'app/api.php'], {
		base: 'app',
		follow: true
	}).pipe(gulp.dest('build/'));

});

gulp.task('index', ['template-cache'], shell.task([
  'php app/index.php build'
]));


gulp.task('removetemplates',  ['clean', 'sass', "template-cache", 'index', "usemin", 'rename-index', "copy-resources"], function (cb) {
  del([
		'app/build.html',
    'app/core/templates.js'
		
  ], cb);
});

gulp.task('rename-index', ['usemin'], function () {
	gulp.src("./build/build.html")
					.pipe(rename("index.html"))
					.pipe(gulp.dest("./build"));
});


gulp.task("build", ['clean', 'sass', "template-cache", 'index', "usemin", 'rename-index', "copy-resources", 'removetemplates']);

//scp -r build/* root@amadeiro.intermesh.nl:/home/govhosts/go7.group-office.com/groupoffice/
