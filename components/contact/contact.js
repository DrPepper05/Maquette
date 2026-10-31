/* ===== Contact Component JavaScript ===== */
(function() {
  var form = document.getElementById('f');
  if (!form) return;
  var btn = document.getElementById('submitBtn') || form.querySelector('button[type="submit"]');
  var ok = document.getElementById('ok');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var originalBtnText = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending request...';
    }
    if (ok) {
      ok.style.display = 'none';
      ok.className = '';
    }

    var formData = new FormData(form);
    var object = Object.fromEntries(formData);
    var json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async function(response) {
      var result = await response.json();
      if (response.status === 200 && result.success) {
        if (ok) {
          ok.textContent = "Thank you! Your brand demo request has been sent to our team. We'll be in touch within one working day.";
          ok.className = 'status-success';
          ok.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    })
    .catch(function(error) {
      if (ok) {
        ok.innerHTML = 'Something went wrong. Please email us directly at <a href="mailto:contact@maquette.ro" style="color: inherit; text-decoration: underline;">contact@maquette.ro</a>.';
        ok.className = 'status-error';
        ok.style.display = 'block';
      }
    })
    .finally(function() {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalBtnText;
      }
    });
  });
})();

