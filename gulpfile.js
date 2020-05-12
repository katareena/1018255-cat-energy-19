"use strict";

const { task, src, dest, series, parallel, watch } = require("gulp");
const server = require("browser-sync").create();
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const gulpIf = require("gulp-if");
const newer = require("gulp-newer");
const del = require("del");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

//-------------- очистка папки build --------------
task("clean", () => {
  return del(["build"]);
});

//-------------- собираем html ----------------------
task("html", () => {
  return src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("build"));
})

//-------------- копируем картинки ----------------------
task("copy:img", () => {
  return  src("source/img/**/*.{jpg,png,svg,webp}")
    .pipe(newer("build/img"))
    .pipe(dest("build/img"))
    .pipe(server.stream());
});

task("copy:ico", () => {
  return  src("source/img/**/*.ico")
    .pipe(newer("build"))
    .pipe(dest("build"))
    .pipe(server.stream());
});

//-------------- копируем шрифты ----------------------
task("copy:fonts", () => {
  return  src("source/fonts/*.{woff,woff2}")
    .pipe(newer("build/fonts"))
    .pipe(dest("build/fonts"));
});

//-------------- создание webP изображений ----------
task("webp", () => {
  return src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(dest("source/img"));
});

//--------------оптимизация изображений------------
task("img-min", () => {
  return src(["build/img/*.{png,jpg,svg}", "!build/img/sprite.svg"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(dest("build/img"));
});

//--------------создание svg-спрайта---------------
task("sprite", () => {
  return src("source/sprite-icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(dest("build/img"));
})

//-------------- собираем css (без сорсмап, без минификации) ----------------------
task("csscopy", () => {
  return src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(dest("build/css"));
})

//-------------- собираем css ----------------------
task("css", () => {
  return src("source/less/style.less")
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemap.init()))
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpIf(!isDev, cssnano()))
    .pipe(rename("style.min.css"))
    .pipe(gulpIf(isDev, sourcemap.write(".")))
    .pipe(dest("build/css"))
    .pipe(server.stream());
});

//-------------- собираем js ----------------------
task("js", () => {
  return src([
    "./node_modules/svg4everybody/dist/svg4everybody.js",
    "./node_modules/picturefill/dist/picturefill.js",
    "source/js/*.js"
  ])
    .pipe(gulpIf(isDev, sourcemap.init()))
    .pipe(concat("bundle.min.js"))
    .pipe(gulpIf(isDev, sourcemap.write(".")))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(dest("build/js"));
});

task("server", () => {
  server.init({
    server: "build/",
    reloadOnRestart: true,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

task("refresh", (done) => {
  server.reload();
  done();
});

task("watch", () => {
  watch("source/less/**/*.less", series("css"));
  watch("source/*.html", series("html", "refresh"));
  watch("source/js/**/*.js", series("js"));
  watch("source/img/**/*.{jpg,svg,png}", series("copy:img"));
  watch("source/img/**/*.ico", series("copy:ico"));
  watch("source/sprite-icons/*.svg", series("sprite", "refresh"));
  watch("source/fonts/*.{woff,woff2}", series("copy:fonts"));
});

const buildTasks = ["clean", parallel(["html","csscopy", "css", "js", "copy:fonts", "copy:img", "copy:ico", "sprite"])];

if (!isDev) {
  buildTasks.push("img-min");
}

task("build", series(buildTasks));
task("development", series("build", parallel("server", "watch")));
task("default", series("development"));
