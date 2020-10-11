const gulp = require("gulp"),
      sass = require("gulp-sass"),
      prefix = require("gulp-autoprefixer"),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream');

gulp.task("gulp-sass", () => {
    return gulp.src("src/sass/**/*.sass")
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest("src/css/"))
});

gulp.task("bundle-js", () => {
    return browserify({entries: "src/index.js", extensions: ['.js'], debug: true})
        .transform('babelify', {
            presets: ['@babel/preset-env', '@babel/preset-react']
        })
        .bundle()
        .pipe(source("index.js"))
        .pipe(gulp.dest("src/dist"));
});

/*__________ BUILD _____________________________*/

gulp.task("build-public", function () {
    return gulp.src("public/*")
        .pipe(gulp.dest("build/public"));
});

gulp.task("build-js", function () {
    return gulp.src("src/dist/index.js")
        .pipe(gulp.dest("build/src/dist/"));
});

gulp.task("build-css", function () {
    return gulp.src("src/css/*.css")
        .pipe(gulp.dest("build/src/css/"));
});

gulp.task("build-fonts", () => {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("build/src/fonts"))
})

gulp.task('build', gulp.series(
    ["gulp-sass",
        "bundle-js",
        "build-js",
        "build-css",
        "build-fonts",
        "build-public"]
));

//__________________________________________________

gulp.task("watch", () => {
    gulp.watch(["src/sass/**/*.sass", "src/scripts/**/*.js", "src/index.js"], gulp.series("gulp-sass", "bundle-js"));
});

gulp.task("default", gulp.series("bundle-js", "gulp-sass", "watch"));

