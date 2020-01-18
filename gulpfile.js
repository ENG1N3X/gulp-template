const gulp = require("gulp");
const rename = require("gulp-rename");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

gulp.task("styles", () => {
  return gulp
    .src("src/less/*.less")
    .pipe(less())
    .pipe(concat("style.css"))
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
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("styles-libs", () => {
  return gulp
    .src("src/less/libs/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("libs.css"))
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts", () => {
  return gulp
    .src("src/js/src/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("src/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts-libs", () => {
  return gulp
    .src(["src/js/libs/jquery-3.4.1.min.js", "src/js/libs/bootstrap.bundle.min.js"])
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("src/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("html", () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("src/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
});

gulp.task("watch", () => {
  gulp.watch("src/*.html", gulp.parallel("html"));
  gulp.watch("src/less/*.less", gulp.parallel("styles"));
  gulp.watch("src/less/libs/*.css", gulp.parallel("styles-libs"));
  gulp.watch("src/js/src/*.js", gulp.parallel("scripts"));
  gulp.watch("src/js/libs/*.js", gulp.parallel("scripts-libs"));
});

gulp.task("build", async () => {
  gulp.src("src/*.html").pipe(gulp.dest("dest/"));
  gulp.src("src/css/*.css").pipe(gulp.dest("dest/css/"));
  gulp.src("src/js/*.js").pipe(gulp.dest("dest/js/"));
  gulp.src("src/img/*.*").pipe(gulp.dest("dest/img/"));
  gulp.src("src/fonts/*.*").pipe(gulp.dest("dest/fonts/"));
});

gulp.task("default", gulp.parallel("html", "styles", "styles-libs", "scripts", "scripts-libs", "browser-sync", "watch"));
