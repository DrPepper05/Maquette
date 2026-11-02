/**
 * Mobila Universal WebAR Launcher Script
 * Version: 1.1.0
 * Description: Client-side script to embed 3D/AR viewers on any platform.
 * Supports inline embedding and floating/modal triggers.
 * Automatically generates a QR Code on desktop for seamless mobile AR handoff.
 */

(function () {
  // Prevent double loading
  if (window.MobilaWebAR) return;

  // Configuration from the script tag itself
  const currentScript = document.currentScript || (() => {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const apiKey = currentScript ? currentScript.getAttribute('data-api-key') : '';
  const apiUrl = currentScript ? currentScript.getAttribute('data-api-url') : 'https://api.mobila.com';
  const viewerUrl = currentScript ? currentScript.getAttribute('data-viewer-url') : 'https://viewer.mobila.com';

  const Mobila = {
    apiKey: apiKey,
    apiUrl: apiUrl,
    viewerUrl: viewerUrl,

    init: function () {
      this.injectStyles();
      this.initializeInlineEmbeds();
      this.initializeTriggers();
      this.setupPostMessageBridge();
    },

    // Inject necessary CSS for the modal overlay, responsive two-column layout, and QR panel
    injectStyles: function () {
      const css = `
        .mobila-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(13, 12, 14, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .mobila-modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .mobila-modal-container {
          position: relative;
          width: 92%;
          max-width: 960px;
          height: 85%;
          max-height: 640px;
          background: #181614;
          border: 1px solid rgba(245, 241, 233, 0.12);
          border-radius: 28px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 1px rgba(245, 241, 233, 0.2);
          overflow: hidden;
          transform: scale(0.94) translateY(20px);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          flex-direction: row;
        }
        .mobila-modal-overlay.active .mobila-modal-container {
          transform: scale(1) translateY(0);
        }
        .mobila-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(245, 241, 233, 0.08);
          border: 1px solid rgba(245, 241, 233, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #f5f1e9;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .mobila-modal-close:hover {
          background: #f88847;
          color: #161005;
          border-color: #f88847;
          box-shadow: 0 0 20px rgba(248, 136, 71, 0.4);
          transform: scale(1.06);
        }
        
        /* Two-Column Layout Elements */
        .mobila-viewer-column {
          flex: 1;
          height: 100%;
          position: relative;
          background: radial-gradient(ellipse at 50% 50%, #201c18 0%, #12100e 100%);
        }
        .mobila-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
        }
        
        /* Desktop QR Code Panel */
        .mobila-qr-column {
          width: 330px;
          height: 100%;
          background: #141210;
          border-left: 1px solid rgba(245, 241, 233, 0.1);
          padding: 40px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
        }
        .mobila-qr-kicker {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: #d47860;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .mobila-qr-title {
          font-family: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #f5f1e9;
          letter-spacing: -0.025em;
          margin: 0 0 10px 0;
          line-height: 1.15;
        }
        .mobila-qr-desc {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          font-size: 0.88rem;
          color: rgba(245, 241, 233, 0.65);
          margin-bottom: 22px;
          line-height: 1.5;
        }
        .mobila-qr-box {
          background: #ffffff;
          padding: 14px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(245, 241, 233, 0.15);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobila-qr-image {
          width: 160px;
          height: 160px;
          display: block;
        }
        .mobila-qr-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(248, 136, 71, 0.12);
          color: #f88847;
          border: 1px solid rgba(248, 136, 71, 0.25);
          padding: 8px 16px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        
        .mobila-inline-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 420px;
          border-radius: 22px;
          overflow: hidden;
          background: #141210;
          border: 1px solid rgba(245, 241, 233, 0.12);
          box-shadow: 0 18px 40px rgba(0,0,0,0.4);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .mobila-modal-container {
            flex-direction: column;
            max-height: 90%;
            width: 95%;
          }
          .mobila-qr-column {
            display: none;
          }
        }
      `;
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    },

    // 1. Handle Inline Embeds (replaces <div class="mobila-webar-viewer" ...> with iframe)
    initializeInlineEmbeds: function () {
      const embeds = document.querySelectorAll('.mobila-webar-viewer');
      embeds.forEach(el => {
        const modelId = el.getAttribute('data-model-id');
        if (!modelId) return;

        // Wrap in our styled container
        const container = document.createElement('div');
        container.className = 'mobila-inline-container';

        const iframe = document.createElement('iframe');
        iframe.className = 'mobila-iframe';
        iframe.src = `${this.viewerUrl}?modelId=${modelId}&apiKey=${this.apiKey}&embedMode=inline`;
        iframe.setAttribute('allow', 'xr-spatial-tracking; fullscreen; camera');
        iframe.setAttribute('scrolling', 'no');

        container.appendChild(iframe);
        el.innerHTML = '';
        el.appendChild(container);
      });
    },

    // 2. Handle Trigger Buttons (clicks on buttons with class .mobila-webar-trigger)
    initializeTriggers: function () {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.mobila-webar-trigger');
        if (!trigger) return;

        e.preventDefault();
        const modelId = trigger.getAttribute('data-model-id');
        if (!modelId) return;

        this.openModal(modelId);
      });
    },

    // Open Modal Overlay. Dynamically generates a QR Code if the user is on a Desktop computer.
    openModal: function (modelId) {
      // Check if client is on a mobile device
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      let overlay = document.querySelector('.mobila-modal-overlay');
      
      if (overlay) {
        // Remove old overlay to reconstruct based on device context/model
        overlay.remove();
      }

      overlay = document.createElement('div');
      overlay.className = 'mobila-modal-overlay';
      
      const container = document.createElement('div');
      container.className = 'mobila-modal-container';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'mobila-modal-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Close viewer');
      closeBtn.addEventListener('click', () => this.closeModal());
      
      // Column 1: The 3D Viewer Iframe
      const viewerColumn = document.createElement('div');
      viewerColumn.className = 'mobila-viewer-column';
      
      const iframe = document.createElement('iframe');
      iframe.className = 'mobila-iframe';
      iframe.setAttribute('allow', 'xr-spatial-tracking; fullscreen; camera');
      iframe.setAttribute('scrolling', 'no');
      
      viewerColumn.appendChild(iframe);
      container.appendChild(closeBtn);
      container.appendChild(viewerColumn);

      // Column 2: The QR Code Panel (Only appended on Desktop)
      if (!isMobileDevice) {
        const qrColumn = document.createElement('div');
        qrColumn.className = 'mobila-qr-column';
        
        // Resolve absolute URL of the viewer page to encode in the QR Code
        // In production, this points to your hosted mobile web page (e.g., https://viewer.mobila.com?modelId=...)
        const mobileTargetUrl = `${this.viewerUrl}?modelId=${modelId}&apiKey=${this.apiKey}&embedMode=mobile`;
        
        // Generate QR code image via standard secure public API
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0f172a&margin=10&data=${encodeURIComponent(mobileTargetUrl)}`;
        
        qrColumn.innerHTML = `
          <span class="mobila-qr-kicker">1:1 WebAR Handoff</span>
          <h3 class="mobila-qr-title">View in Your Space</h3>
          <p class="mobila-qr-desc">Scan with your phone camera to place this piece at genuine 1:1 scale in your living room.</p>
          <div class="mobila-qr-box">
            <img class="mobila-qr-image" src="${qrImageUrl}" alt="Scan to view in AR" />
          </div>
          <div class="mobila-qr-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            Native Camera AR
          </div>
        `;
        container.appendChild(qrColumn);
      }
      
      overlay.appendChild(container);
      document.body.appendChild(overlay);

      // Close on overlay background click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
          this.closeModal();
        }
      });

      // Set iframe source (passes embedMode parameter)
      const embedModeParam = isMobileDevice ? 'modal-mobile' : 'modal-desktop';
      iframe.src = `${this.viewerUrl}?modelId=${modelId}&apiKey=${this.apiKey}&embedMode=${embedModeParam}`;

      // Trigger transition
      setTimeout(() => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }, 50);
    },

    closeModal: function () {
      const overlay = document.querySelector('.mobila-modal-overlay');
      if (!overlay) return;

      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll

      // Clean up iframe src after animation completes to free memory/WebGL context
      setTimeout(() => {
        const iframe = overlay.querySelector('.mobila-iframe');
        if (iframe) iframe.src = 'about:blank';
      }, 300);
    },

    // 3. Setup postMessage bridge to listen to commands from the cross-origin iframe
    setupPostMessageBridge: function () {
      window.addEventListener('message', (event) => {
        const data = event.data;
        if (!data || typeof data !== 'object') return;

        // Check if message is for Mobila Quick Look launch
        if (data.type === 'MOBILA_LAUNCH_QUICK_LOOK' && data.usdzUrl) {
          this.launchIOSQuickLook(data.usdzUrl);
        }
      });
    },

    // Bypasses iOS iframe block by launching USDZ natively in the top-level parent window context
    launchIOSQuickLook: function (usdzUrl) {
      console.log('[Mobila WebAR] Launching iOS Quick Look via Parent Bridge:', usdzUrl);
      
      const anchor = document.createElement('a');
      anchor.setAttribute('rel', 'ar');
      anchor.setAttribute('href', usdzUrl);
      
      // iOS Quick Look requires a child element (usually an image) inside the anchor to click and trigger
      const img = document.createElement('img');
      img.setAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"/>'); // Blank SVG
      img.setAttribute('alt', 'Quick Look AR');
      img.style.width = '0px';
      img.style.height = '0px';
      
      anchor.appendChild(img);
      document.body.appendChild(anchor);
      
      // Trigger click programmatically
      anchor.click();
      
      // Clean up DOM immediately
      setTimeout(() => {
        document.body.removeChild(anchor);
      }, 100);
    }
  };

  // Assign to global namespace
  window.MobilaWebAR = Mobila;

  // Auto-initialize when script is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Mobila.init());
  } else {
    Mobila.init();
  }
})();
