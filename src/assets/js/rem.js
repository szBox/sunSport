/* 
* @Author: xcw
* @Date:   2017-05-05 12:20:47
* @Last Modified by:   xcw
* @Last Modified time: 2017-05-05 12:20:52
*/

(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize =20* (clientWidth / 375) + 'px';
         
         
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);