/* Justify text only where it looks good.
   For each justified block, measure how much extra space justification would add
   between words on each line (except the last). If any line would be stretched
   too much, fall back to normal left-aligned text for that block. */
(function () {
  var SEL = '.body-text';
  var MAX_EXTRA_EM = 1.1;    // max extra space per word gap, in em (only extreme cases fall back to left)

  function measure(el) {
    el.classList.remove('ragged');
    var cs = getComputedStyle(el);
    if (cs.textAlign !== 'justify') return;
    el.style.textAlign = 'left';            // measure the natural (ragged) line ends
    try { if (tooLoose(el, cs)) el.classList.add('ragged'); }
    finally { el.style.textAlign = ''; }
  }

  function tooLoose(el, cs) {
    var fs = parseFloat(cs.fontSize) || 16;
    var box = el.getBoundingClientRect();
    var right = box.right - parseFloat(cs.paddingRight || 0) - parseFloat(cs.borderRightWidth || 0);
    var lines = {};
    var range = document.createRange();
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var node, m, re;
    while ((node = walker.nextNode())) {
      re = /\S+/g;
      while ((m = re.exec(node.data))) {
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        var rects = range.getClientRects();
        for (var i = 0; i < rects.length; i++) {
          var r = rects[i];
          if (!r.width) continue;
          var k = Math.round(r.top / 4);
          var L = lines[k] || (lines[k] = { right: 0, words: 0, top: r.top });
          L.right = Math.max(L.right, r.right);
          L.words++;
        }
      }
    }
    var keys = Object.keys(lines).map(Number).sort(function (a, b) { return a - b; });
    for (var j = 0; j < keys.length - 1; j++) {           // skip the last line
      var line = lines[keys[j]];
      var slack = right - line.right;
      var gaps = Math.max(line.words - 1, 0);
      if (slack <= 1) continue;
      if (gaps === 0 || slack / gaps > MAX_EXTRA_EM * fs) return true;
    }
    return false;
  }

  function run() {
    var els = document.querySelectorAll(SEL);
    for (var j = 0; j < els.length; j++) {
      try { measure(els[j]); } catch (e) { /* leave as is */ }
    }
  }

  var t;
  function schedule() { clearTimeout(t); t = setTimeout(run, 120); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  window.addEventListener('load', run);
  window.addEventListener('resize', schedule);
})();
