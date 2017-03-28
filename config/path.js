const basePath = './',
	devPath = 'src/',
	distPath = 'dist/',
	revPath = 'rev/';

module.exports = {
	src: {
		styles: devPath + 'styles',
		styleFiles: devPath + 'styles/**/*.css',
		scripts: devPath + 'scripts',
		scriptFiles: devPath + 'scripts/**/*.js',
		html: devPath + '*.html'
	},
	dist: {
		styles: distPath + 'styles',
		styleFiles: distPath + 'styles/**/*.css',
		scripts: distPath + 'scripts',
		scriptFiles: distPath + 'scripts/**/*.js',
		html: distPath,
		htmlFile: distPath + '*.html'
	},
	rev: {
		styles: revPath + 'styles',
		scripts: revPath + 'scripts',
		json: revPath + '**/*.json'
	},
	watchFile: [
    	devPath + '*.html',
		devPath + 'styles/**/*.css',
		devPath + 'scripts/**/*.js'
    ],
	browserConfig: {
		server: {
			baseDir: devPath
		},
		// open: false,
		open: 'external',
		logPrefix: 'biolerplate',
		reloadOnRestart: true
	},
	htmlMinConfig: {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	}
};
