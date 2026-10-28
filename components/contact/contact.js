/* ===== Contact Component JavaScript ===== */
(function() {
  var form = document.getElementById('f');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var ok = document.getElementById('ok');
    if (ok) ok.style.display = 'block';
  });
})();
