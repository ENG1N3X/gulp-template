const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const pug = require("gulp-pug");

gulp.task("styles", () => {
  return gulp
    .src("src/sass/*.sass")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions", "ie >= 9"],
      }),
    )
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
    .src("src/assets/libs/css/libs/*.css")
    .pipe(concat("libs.css"))
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("src/assets/libs/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts", () => {
  return gulp
    .src("src/js/src/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      }),
    )
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
    .src(["src/assets/libs/js/libs/jquery-3.4.1.min.js", "src/assets/libs/js/libs/bootstrap.bundle.min.js"])
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(gulp.dest("src/assets/libs/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("pug", () => {
  return gulp
    .src("src/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
      }),
    )
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
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/sass/**/*.sass", gulp.parallel("styles"));
  gulp.watch("src/assets/libs/css/libs/*.css", gulp.parallel("styles-libs"));
  gulp.watch("src/js/src/*.js", gulp.parallel("scripts"));
  gulp.watch("src/assets/libs/js/libs/*.js", gulp.parallel("scripts-libs"));
});

gulp.task("build", async () => {
  gulp.src("src/*.html").pipe(gulp.dest("dest/"));
  gulp.src("src/css/*.css").pipe(gulp.dest("dest/css/"));
  gulp.src("src/js/*.js").pipe(gulp.dest("dest/js/"));
  gulp.src("src/assets/img/*.*").pipe(gulp.dest("dest/assets/img/"));
  gulp.src("src/assets/fonts/*.*").pipe(gulp.dest("dest/assets/fonts/"));
  gulp.src("src/assets/libs/css/*.css").pipe(gulp.dest("dest/assets/libs/css"));
  gulp.src("src/assets/libs/js/*.js").pipe(gulp.dest("dest/assets/libs/js"));
});

gulp.task("default", gulp.parallel("pug", "styles", "styles-libs", "scripts", "scripts-libs", "browser-sync", "watch"));
