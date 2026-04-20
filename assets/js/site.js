/* MINDSET 2.0 — site interactions
   - Publications filter checkboxes
   - Abstract / Cite inline expanders
   - Copy-to-clipboard for citations
*/
(function () {
  'use strict';

  // ---------- Expand/collapse panels (Abstract, Cite) ----------
  document.querySelectorAll('.js-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-target');
      var panel = document.getElementById(id);
      if (!panel) return;
      var open = panel.hasAttribute('hidden');
      if (open) {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('is-active');
      } else {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('is-active');
      }
    });
  });

  // ---------- Copy-to-clipboard ----------
  document.querySelectorAll('.js-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-copy');
      var node = document.getElementById(id);
      if (!node) return;
      var text = node.innerText || node.textContent || '';
      var done = function () {
        var original = btn.dataset.orig || btn.textContent;
        btn.dataset.orig = original;
        btn.textContent = 'Copied!';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text);
          done();
        });
      } else {
        fallbackCopy(text);
        done();
      }
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  // ---------- Publications type filter ----------
  var filter = document.querySelector('.pub-filter');
  var list   = document.getElementById('publications');
  var empty  = document.querySelector('.pub-empty');
  if (filter && list) {
    var checkboxes = filter.querySelectorAll('input[type="checkbox"][data-type]');
    var apply = function () {
      var allowed = {};
      var anyChecked = false;
      checkboxes.forEach(function (cb) {
        allowed[cb.getAttribute('data-type')] = cb.checked;
        if (cb.checked) anyChecked = true;
      });
      var visible = 0;
      list.querySelectorAll('.pub-card').forEach(function (card) {
        var t = card.getAttribute('data-type');
        var show = anyChecked ? !!allowed[t] : false;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    };
    checkboxes.forEach(function (cb) { cb.addEventListener('change', apply); });
    apply();
  }
})();
