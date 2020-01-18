const gulp = require("gulp");
const rename = require("gulp-rename");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concatCSS = require("gulp-concat-css");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

gulp.task("styles", () => {
  return gulp
    .src("app/less/*.less")
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 version"],
      }),
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("dest/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("styles-libs", () => {
  return gulp
    .src("app/less/libs/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concatCSS("libs.css"))
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("dest/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts", () => {
  return gulp
    .src("app/js/src/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("dest/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts-libs", () => {
  return gulp
    .src(["app/js/libs/jquery-3.4.1.min.js", "app/js/libs/bootstrap.bundle.min.js"])
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("dest/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("html", () => {
  return gulp
    .src("app/*.html")
    .pipe(gulp.dest("dest/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("copy", () => {
  return gulp.src(["app/fonts/*.eot", "app/fonts/*.ttf", "app/fonts/*.woff", "app/fonts/*.svg"]).pipe(gulp.dest("dest/fonts/"));
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "dest/",
    },
  });
});

gulp.task("watch", () => {
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/less/*.less", gulp.parallel("styles"));
  gulp.watch("app/less/libs/*.css", gulp.parallel("styles-libs"));
  gulp.watch("app/js/src/*.js", gulp.parallel("scripts"));
  gulp.watch("app/js/libs/*.js", gulp.parallel("scripts-libs"));
  gulp.watch("app/fonts/**", gulp.parallel("copy"));
});

gulp.task("default", gulp.parallel("html", "styles", "styles-libs", "scripts", "scripts-libs", "copy", "browser-sync", "watch"));
