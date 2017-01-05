var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	imgMin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	autofixer = require('gulp-autoprefixer'),
	gulpSequence = require('gulp-sequence');

//开发task
//开启本地服务器实时预览
gulp.task('serve', function(file){
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
	gulp.watch('app/less/**/*.less', ['less-dev']);
	gulp.watch('app/js/**/*', ['concat-js-dev','concat-js-dev-plugins']);
	gulp.watch('app/css/**/*', ['concat-css-dev']);
	gulp.watch('app/images/**/*', ['img-dev']);
	//监听文件变化刷新浏览器
	gulp.watch(['app/*','app/js/**/*.js','app/css/**/*.css','app/images/**/*.*'], browserSync.reload);
});

//编译less
gulp.task('less-dev', ['concat-css-dev'], function(){
	return gulp.src('app/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/css'));
});

//合并压缩js
gulp.task('concat-js-dev', function(){
	return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js'));
});

gulp.task('concat-js-dev-plugins', function(){
	return gulp.src(['app/js/plugins/**/*.js', '!app/js/plugins/**/*.tmp.js'])
		.pipe(concat('plugin.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js/'));
});

//合并压缩css
gulp.task('concat-css-dev', function(){
	return gulp.src('app/css/**/*.css')
		.pipe(concat('main.css'))
		.pipe(minify())
		.pipe(gulp.dest('app/assets/css'));
});

//复制图片到开发库
gulp.task('img-dev', function(){
	return gulp.src('app/images/**/*.*')
		.pipe(gulp.dest('app/assets/images'));
});

//默认命令开启本地服务器
gulp.task('default', gulpSequence('less-dev','concat-js-dev','concat-js-dev-plugins','concat-css-dev','img-dev','serve'));




//发布task
//清理上次的文件
gulp.task('clean', function(){
	return gulp.src('dist').pipe(clean());
});

//复制图片到发布库,压缩
gulp.task('img', function(){
	return gulp.src('app/assets/images/**/*.*', {base: 'app'})
		.pipe(imgMin())
		.pipe(gulp.dest('dist'));
});

//复制html
gulp.task('html', function(){
	return gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

//复制js
gulp.task('js', function(){
	return gulp.src('app/assets/js/**/*.js', {base: 'app'})
		.pipe(gulp.dest('dist'));
});

//复制,处理css
gulp.task('css', function(){
	return gulp.src('app/assets/css/**/*.css', {base: 'app'})
		.pipe(autofixer({
			browsers: ['last 2 versions','Android >= 4.0']
		}))
		.pipe(gulp.dest('dist'));
});

//打包发布版本
gulp.task('build', gulpSequence('clean','html','js','css','img'));