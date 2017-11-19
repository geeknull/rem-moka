// 通过字体大小比对修复，可能有些不准确
var rem = width / designWidth * oneRem2Px;
docEl.style.fontSize = rem + 'px';
if ( resetScaleFontSizeToDefault ) { // 修复Android字体放大带来的副作用
    var realitySize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    if (rem !== realitySize) {
        rem = rem * rem / realitySize;
        docEl.style.fontSize = rem + 'px';
    }
}
