var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify-es").default;
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');

// ------------------------------------------------------------------------------------------

// HTML Task
gulp.task("html", () => {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

// Sass task
gulp.task("sass", function() {
    return gulp
        .src("./src/scss/**/*.scss")    // takes all scss files in /scss
        .pipe(concat("style.css"))     // concatenate them into one file -> styles.css
        .pipe(sass())                   // convert scss to css
        .pipe(cssnano())                // minimizes the code
        .pipe(gulp.dest("dist/css"))    // send it to dist/css
        .pipe(connect.reload());        // reload the browser server
    });

// JS task
    gulp.task("js", function() {
    return gulp
        .src("./src/js/**/*.js")        // takes all js files in /js 
        //.pipe(uglify())                 // minimize it
        .pipe(gulp.dest("./dist/js"))   // send it to dist/js
        .pipe(connect.reload());        // reload the browser server
    });

// Live reload task
    gulp.task('connect', function() {   // Creates a server on port 1234 from /dist folder with livereload
      connect.server({
        port: 1234,
        root: 'dist',
        livereload: true
      });
    });

// Task assets
    gulp.task("assets", function() {
        return gulp
            .src(["./src/assets/**/*","!./src/assets/images"])               // takes all assets excepts images
        .pipe(gulp.dest("dist/assets"))             // send it to dist/assets
            .pipe(connect.reload());                // reload the browser server
    });

// Images task
    gulp.task('image', () =>
        gulp.src('src/assets/images/*')             // takes all images
            .pipe(imagemin())                       // minify it 
            .pipe(gulp.dest('dist/assets/images'))  // send it to dist/assets/images
            .pipe(connect.reload())                // reload the browser server
    );

// Watch task
    gulp.task("watch", function() {                 // Call all tasks on a change on the file
        gulp.watch("./src/scss/**/*.scss", gulp.series("sass") );
        gulp.watch("./src/js/**/*.js", gulp.series("js"));
        gulp.watch("./src/assets/**/*", gulp.series("assets"));
        gulp.watch("./src/assets/**/*", gulp.series("image"));
        gulp.watch("./src/**/*.html", gulp.series("html"));
    });

    // Default task
    gulp.task("default", gulp.parallel("connect","sass", "js", "watch", "assets", "image", "html"));

    // Build task
    gulp.task("build", gulp.parallel("html", "js", "sass", "image", "assets"))