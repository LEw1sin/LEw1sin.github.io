// Main JavaScript file for BorisGuo6.github.io
// Keep index.html HTML-only: all interactions live here.

(function () {
    'use strict';
  
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    function $(id) {
      return document.getElementById(id);
    }
  
    function show(el) {
      if (!el) return;
      el.style.display = 'block';
    }
  
    function hide(el) {
      if (!el) return;
      el.style.display = 'none';
    }
  
    function isShown(el) {
      return !!el && el.style.display === 'block';
    }
  
    // ---------------------------------------------------------------------------
    // Academic Links modal
    // ---------------------------------------------------------------------------
    function openAcademicLinks() {
      show($('AcademicLinksModal'));
    }
  
    function closeAcademicLinks() {
      hide($('AcademicLinksModal'));
    }
  
    // ---------------------------------------------------------------------------
    // WeChat modal
    // ---------------------------------------------------------------------------
    function openWeChatModal() {
      show($('WeChatModal'));
    }
  
    function closeWeChatModal() {
      hide($('WeChatModal'));
    }
  
    // ---------------------------------------------------------------------------
    // Generic image modal (publications figures, etc.)
    // ---------------------------------------------------------------------------
    function openImageModal(src, alt) {
      const modal = $('ImageModal');
      const img = $('ImageModalImg');
      if (!modal || !img) return;
      img.src = src || '';
      img.alt = alt || '';
      show(modal);
    }
  
    function closeImageModal() {
      const modal = $('ImageModal');
      const img = $('ImageModalImg');
      if (!modal || !img) return;
      hide(modal);
      img.src = '';
      img.alt = '';
    }
  
    // ---------------------------------------------------------------------------
    // Publications toggle
    // ---------------------------------------------------------------------------
    let papersExpanded = false;
  
    function setPapersExpanded(expanded) {
      papersExpanded = expanded;
      document.querySelectorAll('.hidden-paper').forEach((row) => {
        row.style.display = expanded ? '' : 'none';
      });
  
      const text = $('togglePapersText');
      if (text) text.textContent = expanded ? 'Show Selected Publications' : 'Show All Publications';
  
      const icon = $('togglePapersIcon');
      if (icon) icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  
    function togglePapers() {
      setPapersExpanded(!papersExpanded);
    }
  
    // ---------------------------------------------------------------------------
    // Awards toggle (if Award section exists)
    // ---------------------------------------------------------------------------
    let awardsExpanded = false;
  
    function setAwardsExpanded(expanded) {
      const hiddenAwards = document.querySelectorAll('.hidden-award');
      if (!hiddenAwards.length) return;
  
      awardsExpanded = expanded;
      hiddenAwards.forEach((li) => {
        li.style.display = expanded ? '' : 'none';
      });
  
      const text = $('toggleText');
      if (text) text.textContent = expanded ? 'Show Less Awards' : 'Show More Awards';
  
      const icon = $('toggleIcon');
      if (icon) icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  
    function toggleAwards() {
      setAwardsExpanded(!awardsExpanded);
    }
  
    // ---------------------------------------------------------------------------
    // Miscellanea toggles
    // ---------------------------------------------------------------------------
    let miscAwardsExpanded = false;
    let miscStoriesExpanded = false;
  
    function setMiscAwardsExpanded(expanded) {
      const hidden = document.querySelectorAll('.hidden-misc-award');
      if (!hidden.length) return;
  
      miscAwardsExpanded = expanded;
      hidden.forEach((li) => {
        li.style.display = expanded ? '' : 'none';
      });
  
      const text = $('toggleMiscAwardsText');
      if (text) text.textContent = expanded ? 'Show Less Awards' : 'Show More Awards';
  
      const icon = $('toggleMiscAwardsIcon');
      if (icon) icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  
    function toggleMiscAwards() {
      setMiscAwardsExpanded(!miscAwardsExpanded);
    }
  
    function setMiscStoriesExpanded(expanded) {
      const hidden = document.querySelectorAll('.hidden-misc-story');
      if (!hidden.length) return;
  
      miscStoriesExpanded = expanded;
      hidden.forEach((li) => {
        li.style.display = expanded ? '' : 'none';
      });
  
      const text = $('toggleMiscStoriesText');
      if (text) text.textContent = expanded ? 'Show Less Stories' : 'Show More Stories';
  
      const icon = $('toggleMiscStoriesIcon');
      if (icon) icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  
    function toggleMiscStories() {
      setMiscStoriesExpanded(!miscStoriesExpanded);
    }
  
    // ---------------------------------------------------------------------------
    // Other utilities
    // ---------------------------------------------------------------------------
    function updateLastUpdateDate() {
      const el = $('lastUpdateDate');
      if (!el) return;
      const lastModified = new Date(document.lastModified);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      el.textContent = lastModified.toLocaleDateString('en-US', options);
    }
  
    function openCalendly(url) {
      if (!url) return;
      // Calendly widget is loaded async; fallback to opening new tab.
      if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
        window.Calendly.initPopupWidget({ url });
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  
    // ---------------------------------------------------------------------------
    // Event wiring
    // ---------------------------------------------------------------------------
    function bindButton(id, handler) {
      const el = $(id);
      if (!el) return;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
    }
  
    function init() {
      // Ensure default hidden states
      closeAcademicLinks();
      closeWeChatModal();
      closeImageModal();
      setPapersExpanded(false);
      setAwardsExpanded(false);
      setMiscAwardsExpanded(false);
      setMiscStoriesExpanded(false);
      updateLastUpdateDate();
  
      // Bind explicit buttons (no inline onclick in HTML)
      bindButton('togglePapers', togglePapers);
      bindButton('toggleAwards', toggleAwards);
      bindButton('toggleMiscAwards', toggleMiscAwards);
      bindButton('toggleMiscStories', toggleMiscStories);
  
      // Data-action click delegation (for links / close buttons / calendly)
      document.addEventListener('click', function (e) {
        const target = e.target instanceof Element ? e.target.closest('[data-action]') : null;
        if (!target) return;
        const action = target.getAttribute('data-action');
        if (!action) return;
  
        e.preventDefault();
        switch (action) {
          case 'open-academic-links':
            openAcademicLinks();
            break;
          case 'close-academic-links':
            closeAcademicLinks();
            break;
          case 'open-wechat-modal':
            openWeChatModal();
            break;
          case 'close-wechat-modal':
            closeWeChatModal();
            break;
          case 'close-image-modal':
            closeImageModal();
            break;
          case 'open-calendly':
            openCalendly(target.getAttribute('data-calendly-url'));
            break;
          default:
            break;
        }
      });
  
      // Publications: click figure to open full image
      const pubTable = $('publicationsList');
      if (pubTable) {
        pubTable.addEventListener('click', function (e) {
          const img = e.target instanceof Element ? e.target.closest('img') : null;
          if (!img) return;
          openImageModal(img.getAttribute('src') || img.src, img.getAttribute('alt') || '');
        });
      }
  
      // Close modals when clicking outside content (overlay)
      document.addEventListener('click', function (e) {
        const modal = e.target instanceof Element ? e.target.closest('.modal') : null;
        if (!modal) return;
        // Only close when clicking the overlay itself (not the content)
        if (e.target !== modal) return;
  
        if (modal.id === 'WeChatModal') closeWeChatModal();
        if (modal.id === 'ImageModal') closeImageModal();
      });
  
      // Close modals on ESC
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        closeAcademicLinks();
        closeWeChatModal();
        closeImageModal();
      });
    }
  
    document.addEventListener('DOMContentLoaded', init);
  
    // Export for backwards compatibility (e.g. old cached HTML or commented blocks)
    window.openAcademicLinks = openAcademicLinks;
    window.closeAcademicLinks = closeAcademicLinks;
    window.openWeChatModal = openWeChatModal;
    window.closeWeChatModal = closeWeChatModal;
    window.openImageModal = openImageModal;
    window.closeImageModal = closeImageModal;
    window.togglePapers = togglePapers;
    window.toggleAwards = toggleAwards;
    window.toggleMiscAwards = toggleMiscAwards;
    window.toggleMiscStories = toggleMiscStories;
  })();
  