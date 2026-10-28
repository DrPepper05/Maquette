(function () {
  'use strict';
  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('mobileDrawer');
  if (!header || !toggle || !drawer) return;

  function setOpen(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = header.classList.contains('menu-open');
    setOpen(!isOpen);
  });

  // Close when clicking any link inside drawer
  drawer.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link) {
      setOpen(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
