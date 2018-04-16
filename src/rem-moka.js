;(function(params) {
  var designWidth = params.designWidth;
  var oneRem2Px = params.oneRem2Px;
  var fixDefaultFontSize = params.fixDefaultFontSize;
  var fix1px = params.fix1px;
  var pcMaxPx = params.pcMaxPx;
  var mobileMaxPx = params.mobileMaxPx;
  var resetPcDpr = params.resetPcDpr;
  var resetPcWidth = params.resetPcWidth;

  var win = window;
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var dpr = 0;
  var scale = 0;
  var tid;

  var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
  var isIPad = win.navigator.appVersion.match(/ipad/gi);
  var isPC = !(isAndroid || isIPhone || isIPad);

  function get1remWidth () {
    var headEle = document.querySelector('head');
    var divEle = document.createElement('div');
    divEle.style.width = '1rem';
    divEle.style.display = 'none';
    headEle.appendChild(divEle);
    var remWidth = parseFloat(window.getComputedStyle(divEle, null).width);
    headEle.removeChild(divEle);

    return remWidth;
  }

  var systemDefault1rem2px = get1remWidth();

  var exportObj = {};

  if (metaEl) {
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      console.warn('将根据已有的meta标签来设置缩放比例');
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  }

  if (!dpr && !scale) {
    var devicePixelRatio = win.devicePixelRatio;

    if ( fix1px ) {
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
      } else {
        dpr = 1;
      }
      scale = 1 / dpr;
    } else {
      dpr = 1;
      scale = 1 / dpr;
    }

    // PC端重置DPR
    if (isPC && resetPcDpr) {
      dpr = resetPcDpr; // 大多数情况建议重置为1
    }
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (isPC && resetPcWidth) {
      width = resetPcWidth;
    }

    var max = isPC ? pcMaxPx : mobileMaxPx;

    if (width / dpr > max) {
      width = max * dpr;
    }

    var rem = width / designWidth * oneRem2Px;

    // 通过16px缩放比修复
    if ( fixDefaultFontSize ) {
      var scaleRate = systemDefault1rem2px / 16;
      rem = rem / scaleRate;
    }

    docEl.style.fontSize = rem + 'px';

    exportObj.rem = rem;
  }

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  refreshRem();

  exportObj.dpr = dpr;
  exportObj.refreshRem = refreshRem;
  exportObj.rem2px = function(d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  };
  exportObj.px2rem = function(d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  };

  exportObj.version = '0.3.0';
  window.remmoka = exportObj;
})({
  designWidth: 750,
  oneRem2Px: 100,
  mobileMaxPx: 414,

  fixDefaultFontSize: true,
  fix1px: true,

  resetPcDpr: 1,
  resetPcWidth: 375,
  pcMaxPx: 1120
});
/*
 * https://github.com/geeknull/rem-moka
 *
 * @param designWidth 设计稿宽度 一般来说iPhone6是750 如果缩小就变成了375px
 * @param oneRem2Px 1rem对应多少px
 * @param mobileMaxPx 移动端最大像素数
 *
 * @param fixDefaultFontSize 是否重置Android因为系统放大或者缩小字体带来的影响
 * @param fix1px 是否通过meta标签的scale处理1px过于粗的问题
 *
 * @param resetPcDpr 重置PC端DPR
 * @param resetPcWidth 重置PC端计算所用的视口宽度
 * @param pxMaxPx PC端最大像素数
 * */
