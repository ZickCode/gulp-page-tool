# gulp-page-tool  

author: zickcode@foxmail.com<br>
github: https://github.com/ZickCode/gulp-page-tool<br>
<br>
<br>
# 安装软件<br>
nodejs v5.0+  https://nodejs.org/en/  下载安装即可<br>
<br>
# Tips:<br>
建议安装淘宝镜像,在命令行运行<br>
npm install -g cnpm --registry=https://registry.npm.taobao.org<br>
<br>
绑定cnpm命令 npm -> cnpm<br>
<br>
# 使用脚手架<br>
1.cnpm install命令安装node依赖，然后cnpm link<br>
2.cnpm run dev开启本地服务器<br>
3.cnpm run build打包发布<br>
<br>
# 目录结构<br>
├── gulpfile.js                                      # gulp任务配置 <br>
├── package.json                              # 项目配置<br>
├── README.md                               # 项目说明<br>
├──	.gitignore                                      # git忽略提交文件<br>
├── node_modules                           # node依赖文件<br>
├── app                                                  # 源码目录<br>
│        ├── index.html                        # 页面入口<br>
│        ├── assets/                               # 本地服务器预览资源<br>
│        ├── css/                                      # css资源<br>
│        │        ├── plugin/                   # 插件样式<br>
│        │        ├── main.css                 # 页面样式<br>
│        │        └── \*.css                          # 其他样式<br>
│        ├── images/                             &nbsp;# 图片资源<br>
│        │        ├── plugin.xxx.png   # 插件图<br>
│        │        ├── sprit.png               # 雪碧图<br>
│        │        └── \*.\*                              # 其他图<br>
│        ├── js/                                          # js资源<br>
│        │        ├── plugins/                 # 第三方插件<br>
│        │        ├── vender/                  # 如jQuery、Zepto、React等<br>
│        │        └── main.js                   # 页面逻辑<br>
│        ├── less/                                      # less资源<br>
│        │        ├── plugin.**.less       # 插件样式<br>
│        │        ├── main.less               # 页面样式<br>
│        │        └── **.less                      # 其他样式<br>
│        ├── rev/                                      # 版本控制插件<br>
│        ├── css/                                      # css版本控制插件<br>
│        └── js/                                         # js版本控制插件<br>
└── dist/                                                # 打包完的源码目录<br>
