const gulp = require("gulp"),
      sass = require("gulp-sass"),
      prefix = require("gulp-autoprefixer");

gulp.task("gulp-sass", () => {
    return gulp.src("src/sass/**/*.sass")
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest("src/css/"))
})



