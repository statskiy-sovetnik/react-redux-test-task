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
        .transform('babelify', {presets: ['@babel/preset-env', '@babel/preset-react']})
        .bundle()
        .pipe(source("index.js"))
        .pipe(gulp.dest("src/dist"));
});

gulp.task("watch-sass", () => {
    gulp.watch(["src/sass/**/*.sass"], gulp.series("gulp-sass"));
});

gulp.task("default", gulp.series("bundle-js", "gulp-sass", "watch-sass"));

