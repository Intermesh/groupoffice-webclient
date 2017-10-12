var gulp = require('gulp');
var inject = require('gulp-inject');

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
var file = require('gulp-file');

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

gulp.task('template-cache', ['clean', 'sass-build'], function () {
	return gulp.src(['app/**/*.html'])
					.pipe(templateCache())
					.pipe(gulp.dest('app/core/'));
});

gulp.task('usemin', ['clean', 'template-cache', 'index', 'copy-index', 'sass-build'], function () {
	return gulp.src('app/index.html')
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

gulp.task('clean', function () {
  del([
    'build/**/*'    
  ]);
});

gulp.task('sass-build', ['clean'], function() {
	return gulp.src('./app/scss/app.scss')
					.pipe(sassGlob())
					.pipe(sass().on('error', sass.logError))
					.pipe(gulp.dest('./app/css'));
});


gulp.task('copy-resources', ['clean', 'sass-build', "template-cache", 'index', "usemin", 'copy-index'], function () {

	gulp.src(['app/**/resources/**/*.*', 'app/config.js.example', 'app/config.php'], {
		base: 'app',
		follow: true
	}).pipe(gulp.dest('build/'));

});

//gulp.task('index', ['template-cache'], shell.task([
//  'php app/index.php build'
//]));


 
gulp.task('index', ['template-cache'], function () {
	
	gulp.src("./app/index.tpl.html")
					.pipe(rename('index.html'))
					.pipe(gulp.dest("./app"));
	
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
		'!./app/app.js',
		'!./app/config.js',
		'!./app/core/go.js',
		'./app/**/*.js'
	], {read: false});
 
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app'));
});


gulp.task('removetemplates',  ['clean', 'sass-build', "template-cache", 'index','copy-index', "usemin", "copy-resources"], function (cb) {
//  del([
//    'app/core/templates.js'		
//  ], cb);

	file('templates.js', "//Used at build to cache html templates in js", { src: true }).pipe(gulp.dest('app/core/'));
});

gulp.task('copy-index', ['index'], function () {
	gulp.src("./app/index.html")
					.pipe(gulp.dest("./build"));
});


var gls = require('gulp-live-server');
  gulp.task('serve', function() {
    //1. serve with default settings 
    var server = gls.static('.'); //equals to gls.static('public', 3000); 
    server.start();
		
		
		gulp.watch('./app/**/*.scss', function (file) {
			
			
			gulp.src('./app/scss/app.scss')
					.pipe(sassGlob())
					.pipe(sass().on('error', sass.logError))
					.pipe(gulp.dest('./app/css'))
					.on('end', function(){
						server.notify.apply(server, [file]);
					});
			
			
		});
		
  
    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['app/**/*.js'], function (file) {
      server.notify.apply(server, [file]);
    });
  });


gulp.task("build", ['clean', 'sass-build', "template-cache", 'index', "usemin", "copy-resources", 'removetemplates']);

//scp -r build/* root@amadeiro.intermesh.nl:/home/govhosts/go7.group-office.com/groupoffice/
