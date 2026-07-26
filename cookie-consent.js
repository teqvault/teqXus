/**
 * TeqXus Cookie Consent
 * Lightweight banner + AdSense gate for GDPR / Google EU User Consent Policy
 */
(function () {
  var CONSENT_KEY = 'teqxus_cookie_consent';
  var PUB_ID = 'ca-pub-7932735753046865';

  function hasConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === 'accepted';
    } catch (e) {
      return false;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function loadAdSense() {
    if (window.__teqxusAdsLoaded) return;
    window.__teqxusAdsLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + PUB_ID;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function hideBanner() {
    var el = document.getElementById('teqxus-cookie-banner');
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 280);
    }
  }

  function accept() {
    setConsent('accepted');
    hideBanner();
    loadAdSense();
  }

  function reject() {
    setConsent('rejected');
    hideBanner();
    // Essential cookies / localStorage still work; no AdSense
  }

  function showBanner() {
    if (document.getElementById('teqxus-cookie-banner')) return;

    var css = document.createElement('style');
    css.textContent = [
      '#teqxus-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:99999;',
      'background:#111F35;border-top:1px solid rgba(62,207,160,0.25);',
      'padding:16px 18px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'color:#EEF2F7;box-shadow:0 -8px 32px rgba(0,0,0,0.35);',
      'transition:opacity 0.28s ease,transform 0.28s ease;opacity:1;transform:translateY(0);}',
      '#teqxus-cookie-banner .cc-inner{max-width:720px;margin:0 auto;display:flex;',
      'flex-wrap:wrap;align-items:center;gap:14px;}',
      '#teqxus-cookie-banner .cc-text{flex:1;min-width:220px;font-size:13px;line-height:1.55;color:#7A9BBF;}',
      '#teqxus-cookie-banner .cc-text a{color:#3ECFA0;text-decoration:none;}',
      '#teqxus-cookie-banner .cc-text a:hover{text-decoration:underline;}',
      '#teqxus-cookie-banner .cc-actions{display:flex;gap:10px;flex-shrink:0;}',
      '#teqxus-cookie-banner .cc-btn{border:none;border-radius:10px;padding:10px 18px;',
      'font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity 0.15s;}',
      '#teqxus-cookie-banner .cc-btn:active{transform:scale(0.97);}',
      '#teqxus-cookie-banner .cc-accept{background:#3ECFA0;color:#0A1628;}',
      '#teqxus-cookie-banner .cc-accept:hover{opacity:0.92;}',
      '#teqxus-cookie-banner .cc-reject{background:transparent;color:#7A9BBF;',
      'border:1px solid rgba(255,255,255,0.12);}',
      '#teqxus-cookie-banner .cc-reject:hover{border-color:rgba(255,255,255,0.25);color:#EEF2F7;}',
      '@media(max-width:480px){#teqxus-cookie-banner .cc-inner{flex-direction:column;align-items:stretch;}',
      '#teqxus-cookie-banner .cc-actions{width:100%;}#teqxus-cookie-banner .cc-btn{flex:1;text-align:center;}}'
    ].join('');
    document.head.appendChild(css);

    var banner = document.createElement('div');
    banner.id = 'teqxus-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cc-inner">' +
        '<div class="cc-text">' +
          'We use cookies and similar technologies for essential site features and, with your consent, for advertising (Google AdSense). ' +
          'See our <a href="/privacy.html">Privacy Policy</a> and the ' +
          '<a href="https://teqvault.online/pages/privacy.html" target="_blank" rel="noopener">master policy</a>.' +
        '</div>' +
        '<div class="cc-actions">' +
          '<button type="button" class="cc-btn cc-reject" id="cc-reject">Reject</button>' +
          '<button type="button" class="cc-btn cc-accept" id="cc-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cc-accept').addEventListener('click', accept);
    document.getElementById('cc-reject').addEventListener('click', reject);
  }

  function init() {
    if (hasConsent()) {
      loadAdSense();
      return;
    }
    // Previously rejected — don't show again this session, but allow re-prompt later if desired
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'rejected') {
        return;
      }
    } catch (e) {}
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  init();
})();
