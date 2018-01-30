var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	imgMin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	autofixer = require('gulp-autoprefixer'),
	gulpSequence = require('gulp-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	htmlmin = require('gulp-htmlmin'),
	revAppend = require('gulp-rev-append'),
	babel = require('gulp-babel'),
	postcss = require('gulp-postcss'),
	px2rem = require('postcss-px2rem');


//开发task
//编译sass
gulp.task('sass-dev', function(){
	return gulp.src('app/sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass())
		.pipe(autofixer({
			browsers: ['last 4 versions','Android >= 4.0']
		}))
		.pipe(postcss([px2rem({remUnit: 100})]))
		.pipe(gulp.dest('app/css'));
});

//合并压缩css
gulp.task('concat-css-dev', function(){
	return gulp.src(['app/css/reset.css', 'app/css/animate.css', 'app/css/**/*.css'])
		.pipe(concat('main.css'))
		//.pipe(minify())
		.pipe(gulp.dest('app/assets/css'));
});

gulp.task('concat-css-plugin', function(){
	return gulp.src('app/css/plugins/**/*.css')
		.pipe(concat('plugin.css'))
		.pipe(minify())
		.pipe(gulp.dest('app/assets/css'));
});

gulp.task('css-dev-clean', function(){
	return gulp.src('app/assets/css')
		.pipe(clean());
});

//合并压缩js
gulp.task('concat-js-dev', function(){
	return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(concat('main.js'))
		.pipe(babel({presets: ['es2015']}))
		//.pipe(uglify())
		.pipe(gulp.dest('app/assets/js'));
});

gulp.task('concat-js-dev-clean', function(){
	return gulp.src('app/assets/js/*.js')
		.pipe(clean());
});

gulp.task('concat-js-dev-plugins', function(){
	return gulp.src(['app/js/plugins/*.js', '!app/js/plugins/**/*.tmp.js'])
		.pipe(concat('plugin.js'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js'));
});

gulp.task('concat-js-vendor', function(){
	return gulp.src(['app/js/vendor/**/*.js','!app/js/vendor/*/*.tmp.js'])
		.pipe(concat('vendor.js'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js'));
});

//复制图片到开发库
gulp.task('img-dev', function(){
	return gulp.src('app/images/**/*.*')
		.pipe(gulp.dest('app/assets/images'));
});

//清除图片缓存
gulp.task('img-dev-clean', function(){
	return gulp.src('app/assets/images')
		.pipe(clean());
});


//默认命令开启本地服务器
gulp.task('default', gulpSequence(
	'concat-js-dev-clean',
	'css-dev-clean',
	'img-dev-clean',
	'sass-dev',
	'concat-css-dev',
	'concat-css-plugin',
	'concat-js-dev',
	'concat-js-dev-plugins',
	'concat-js-vendor',
	'img-dev',
	'serve'
));

//开启本地服务器实时预览
gulp.task('serve', function(file){
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
		port: 8000
	});
	//监听文件变化重新编译
	gulp.watch('app/sass/**/*.scss', ['sass-dev']);
	gulp.watch('app/css/**/*', function(){
		return gulpSequence('css-dev-clean', 'concat-css-dev', browserSync.reload);
	});
	gulp.watch('app/js/*.js', function(){
		return gulpSequence('concat-js-dev', browserSync.reload);
	});
	gulp.watch('app/js/plugins/*.js', function(){
		return gulpSequence('concat-js-dev-plugins', browserSync.reload);
	});
	gulp.watch('app/js/vendor/*.js', function(){
		return gulpSequence('concat-js-vendor', browserSync.reload);
	});
	gulp.watch('app/images/**/*', function(){
		return gulpSequence('img-dev-clean', 'img-dev', browserSync.reload)
	});
	//监听文件变化刷新浏览器
	gulp.watch(['app/*.*'], browserSync.reload);
});



//发布task
//清理上次的文件
gulp.task('clean', function(){
	return gulp.src(['dist', 'app/rev']).pipe(clean());
});

//复制图片到发布库,压缩
gulp.task('img', function(){
	return gulp.src('app/assets/images/**/*.*', {base: 'app'})
		.pipe(imgMin())
		.pipe(gulp.dest('dist'));
});

//复制html
gulp.task('html', function(){
	var options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML清除空格
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	}
	return gulp.src('app/*.html')
		//压缩html,可选
		//.pipe(htmlmin(options))
		//不修改文件名的版本控制插件,需要在文件后面手动加上版本号?rev=@@hash,可选
		//.pipe(revAppend())
		.pipe(gulp.dest('dist'));
});

//复制js
gulp.task('js', function(){
	return gulp.src('app/assets/js/**/*.js', {base: 'app'})	
		.pipe(uglify())	
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('app/rev/js'));
});

//复制,处理css
gulp.task('css', function(){
	return gulp.src('app/assets/css/**/*.css', {base: 'app'})
		.pipe(autofixer({
			browsers: ['last 2 versions','Android >= 4.0']
		}))
		.pipe(minify({}))
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('app/rev/css'));
});

//修改html里面的文件名
gulp.task('rev', function(){
	gulp.src(['app/rev/**/*.json', 'dist/*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist'));
});

//打包发布版本
gulp.task('build', gulpSequence(
	'concat-js-dev-clean',
	'css-dev-clean',
	'img-dev-clean',
	'sass-dev',
	'concat-css-dev',
	'concat-css-plugin',
	'concat-js-dev',
	'concat-js-dev-plugins',
	'concat-js-vendor',
	'img-dev',
	'clean',
	'html',
	'js',
	'css',
	'img',
	'rev'
));