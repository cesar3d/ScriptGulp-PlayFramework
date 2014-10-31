/*!
 * instalar las dependencias gulp
 * npm install --save-dev gulp gulp-ruby-sass gulp-sass gulp-minify-css gulp-uglify gulp-imagemin gulp-notify gulp-rename browser-sync gulp-cache
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');

// Tarea para compilar y minificar los archivos .scss a .min.css
gulp.task('sass', function(){
    return gulp.src('./public/stylesheets/estructura-uach.scss')
            .pipe(sass())
            .pipe(gulp.dest('./public/stylesheets'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./public/stylesheets'))
            .pipe(notify({message: 'Tarea de compilacion de ASSETS Completada'}));
});

// Tarea para observar los cambios en los archivos scss y compilar automaticamente
gulp.task('watch', function(){
    // Watch archivos .scss
    gulp.watch(['./public/stylesheets/estructura-uach/*.scss'],['sass']);
});

// Tarea para actualizar el navegador cada que se detecte cambios en los archivos
gulp.task('server', function (){
    browserSync({
        // Por default, Play escucha en el puerto 9000
        proxy: 'localhost:9000',
        // Vamos a establecer BrowserSync en el puerto 9001
        port: 9001,
        // Actualizar todos los assets
        // Importante: es necesario especificar la ruta de acceso de los archivos no la ruta de los url
        files: ['app/views/**/*.html', 'public/stylesheets/estructura-uach/*.scss', 'public/stylesheets/*.css'],
        open: false
    });
});

// Tarea para crear una tarea gulp por default
gulp.task('default', ['sass', 'watch', 'server']);


