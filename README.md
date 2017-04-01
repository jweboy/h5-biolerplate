# h5-biolerplate

## 目录

- [开发流程](#开发流程)
- [发布流程](#发布流程)
- [实时预览](#实时预览)
- [模块依赖](#模块依赖)
- [项目结构](#项目结构)

## 开发流程

###1.将项目clone到本地
在控制台中运行:
>git clone --depth=1 https://github.com/jweboy/h5-biolerplate.git <你的项目名称>

### 2.安装依赖包
在控制台中运行:
>cd <你的项目名称>
>npm i || cnpm i

### 3.开启开发模式
>npm run dev || cnpm run dev

### 如需删除node_modules目录
>npm run clean

## 发布流程

### 1.命令行运行
>npm run build || cnpm run build

### 命令行运行之后,图片文件未经过压缩处理,需要手动压缩
推荐使用[tinypng](https://tinypng.com/)这个图片压缩网站压缩图片。

### 2.发布项目
发布时需要将release文件夹的文件上传到服务器即可。

## 实时预览

**使用手机**访问以下地址或者扫描二维码

[https://jweboy.com/project/h5b](https://jweboy.com/project/h5b "h5-biolerplate")

![二维码](./src/QR_Code.png "扫一扫，看效果")

## 模块依赖

1. [jquery](https://github.com/jquery/jquery) —— dom操作
2. [fastclick](https://github.com/ftlabs/fastclick) —— 解决移动端点击事件300ms延迟
3. [swiper](https://github.com/nolimits4web/swiper) —— 页面轮播
4. [animate.css](https://github.com/daneden/animate.css) —— css动画

## 项目结构

**待完善**





