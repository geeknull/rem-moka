# rem-moka


- @param designWidth 设计稿宽度 一般来说iPhone6是750 如果缩小就变成了375px
- @param oneRem2Px 1rem对应多少px
- @param mobileMaxPx 移动端最大像素数

- @param fixDefaultFontSize 是否重置Android因为系统放大或者缩小字体带来的影响
- @param fix1px 是否通过meta标签的scale处理1px过于粗的问题

- @param resetPcDpr 重置PC端DPR
- @param resetPcWidth 重置PC端计算所用的视口宽度
- @param pxMaxPx PC端最大像素数

 
# 启动方式

```bash
npm install
npm run dev
```

http://localhost:9998/demo/index.html

http://localhost:9998/demo/norem.html

可以查看使用了rem与没有使用rem的状态

# 查看效果

https://geeknull.github.io/rem-moka/demo/index.html

https://geeknull.github.io/rem-moka/demo/norem.html
