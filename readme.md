gulp-page-tool

author: zickcode@foxmail.com
github: https://github.com/ZickCode/gulp-page-tool


安装软件
nodejs v5.0+  https://nodejs.org/en/  下载安装即可

Tips:
建议安装淘宝镜像,在命令行运行
npm install -g cnpm --registry=https://registry.npm.taobao.org

绑定cnpm命令 npm -> cnpm

使用脚手架
1.cnpm install命令安装node依赖，然后cnpm link
2.cnpm run dev开启本地服务器
3.cnpm run build打包发布

目录结构
├── gulpfile.js                     # gulp任务配置 
├── package.json                    # 项目配置
├── README.md                       # 项目说明
├──	.gitignore                      # git忽略提交文件
├── node_modules                    # node依赖文件
├── app                             # 源码目录
│    ├── index.html                 # 页面入口
│    ├── assets/                    # 本地服务器预览资源
│    ├── css/                       # css资源
│ 	 │	 ├── plugin/                # 插件样式
│    │   ├── main.css               # 页面样式
│    │   └── **.css                 # 其他样式
│    ├── images/                    # 图片资源
│ 	 │	 ├── plugin.xxx.png         # 插件图
│    │   ├── sprit.png         	    # 雪碧图
│    │   └── **.**  				# 其他图
│    ├── js/                        # js资源
│    │   ├── plugins/               # 第三方插件
│    │   ├── vender/                # 如jQuery、Zepto、React等
│    │   └── main.js                # 页面逻辑
│    ├── less/                      # less资源
│	 │	  ├── plugin.**.less        # 插件样式
│    │    ├── main.less             # 页面样式
│    │    └── **.less               # 其他样式
│    └── rev/                       # 版本控制插件
│		  ├── css/                  # css版本控制插件
│         └── js/                   # js版本控制插件
└── dist/                           # 打包完的源码目录
