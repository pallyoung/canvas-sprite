var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sh = require('shelljs');

gulp.task('release',function(){

});
gulp.task('publish',function(){

});

gulp.task('test',function(){
    sh.rm('-rf','dist');
    sh.exec('tsc');
    sh.mv('dist/canvas-sprite.js','demo/canvas-sprite.js')
});