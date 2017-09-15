var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sh = require('shelljs');
var fs = require('fs');

gulp.task('release',function(){
    sh.rm('-rf','dist');
    sh.exec('tsc');
    pack('dist/canvas-sprite.js','dist/canvas-sprite.js');
    min('dist/canvas-sprite.js','dist/canvas-sprite-min.js');
});
gulp.task('publish',function(){

});

gulp.task('test',function(){
    sh.rm('-rf','dist');
    sh.exec('tsc');
    pack('dist/canvas-sprite.js','dist/canvas-sprite.js');
    sh.mv('dist/canvas-sprite.js','demo/canvas-sprite.js')
});

function min(path,dist){
    gulp.src(path)
    .pipe(uglify())
    .pipe(rename(dist))
    .pipe(gulp.dest('./'))
}
function pack(path,dist){
    var data = fs.readFileSync(path,'utf-8').toString();
    var umd = fs.readFileSync('umd.js','utf-8').toString();
    umd = umd.replace('//stub:',data);
    fs.writeFileSync(dist,umd);
}