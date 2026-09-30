/* ==========================================================================
   JANA PRINT — INTERACTIVE APPLICATION LOGIC & LANGUAGE SYSTEM
   ========================================================================== */

// Real Project Images Dataset (1 to 20 from 'jana real work')
const projectImages = [
  { id: 1, file: 'project-01.jpg', cat: 'banner', titleEn: 'Highway Outdoor Billboard', titleAr: 'لوحة إعلانية خارجية على الطريق' },
  { id: 2, file: 'project-02.jpg', cat: 'flex', titleEn: 'Backlit Signage Display', titleAr: 'واجهة مضاءة من الفليكس' },
  { id: 3, file: 'project-03.jpg', cat: 'vinyl', titleEn: 'Corporate Storefront Vinyl', titleAr: 'تغليف واجهة متجر بالبولي فينيل' },
  { id: 4, file: 'project-04.jpg', cat: 'vehicle', titleEn: 'Commercial Vehicle Wrap', titleAr: 'تغليف مركبـة تجارية بالكامل' },
  { id: 5, file: 'project-05.jpg', cat: 'reflective', titleEn: 'Night Reflective Road Sign', titleAr: 'لوحة طرق عاكسة للرؤية الليلية' },
  { id: 6, file: 'project-06.jpg', cat: 'banner', titleEn: 'Large Scale Mega Billboard', titleAr: 'تغطية إعلانية على مساحة ضخمة' },
  { id: 7, file: 'project-07.jpg', cat: 'flex', titleEn: 'Coated Flex Illuminated Sign', titleAr: 'لوحة فليكس كوتد مضاءة' },
  { id: 8, file: 'project-08.jpg', cat: 'vinyl', titleEn: 'Glass Facade Graphics', titleAr: 'طباعة فينيل على الواجهات الزجاجية' },
  { id: 9, file: 'project-09.jpg', cat: 'vehicle', titleEn: 'Fleet Advertising Wrap', titleAr: 'تغليف أسطول سيارات إعلاني' },
  { id: 10, file: 'project-10.jpg', cat: 'banner', titleEn: 'Heavy Duty Coated Banner', titleAr: 'بانر كوتد شديد التحمل' },
  { id: 11, file: 'project-11.jpg', cat: 'reflective', titleEn: 'Safety & Directional Signage', titleAr: 'لافتة إرشادية خامة عاكسة' },
  { id: 12, file: 'project-12.jpg', cat: 'flex', titleEn: 'High Translucency Lightbox', titleAr: 'صندوق إضاءة عالي النفاذية' },
  { id: 13, file: 'project-13.jpg', cat: 'vinyl', titleEn: 'Store Front Branding', titleAr: 'هوية تجارية لواجهة محلات' },
  { id: 14, file: 'project-14.jpg', cat: 'vehicle', titleEn: 'Van Side Panel Branding', titleAr: 'طباعة إعلانية على شاحنة' },
  { id: 15, file: 'project-15.jpg', cat: 'banner', titleEn: 'Event Outdoor Banner', titleAr: 'بانر إعلاني للفعاليات' },
  { id: 16, file: 'project-16.jpg', cat: 'flex', titleEn: 'Commercial Lightbox Facade', titleAr: 'واجهة لافتة مضاءة' },
  { id: 17, file: 'project-17.jpg', cat: 'vinyl', titleEn: 'Window Graphics Wrap', titleAr: 'فينيل عالي الجودة للنوافذ' },
  { id: 18, file: 'project-18.jpg', cat: 'reflective', titleEn: 'Highway Reflective Billboard', titleAr: 'إعلان عاكس للضوء على الطرق' },
  { id: 19, file: 'project-19.jpg', cat: 'banner', titleEn: 'Coated Outdoor Display', titleAr: 'تغطية إعلانية خامة كوتد' },
  { id: 20, file: 'project-20.jpg', cat: 'vehicle', titleEn: 'Full Fleet Branding', titleAr: 'تغليف متكامل لمركبات الشركة' }
];

// Current State
let currentLang = 'en';

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initHeroMarquee();
  initPortfolioGrid();
  initLanguageToggle();
  initMobileNav();
  initLightbox();
  initScrollHeader();
});

/* ==========================================================================
   1. HERO CONTINUOUS MOVING PORTFOLIO ASSEMBLY
   ========================================================================== */
function initHeroMarquee() {
  const track = document.getElementById('heroMarqueeTrack');
  if (!track) return;

  // Duplicate dataset 2 times to ensure seamless zero-gap infinite marquee loop
  const fullSequence = [...projectImages, ...projectImages];
  
  track.innerHTML = fullSequence.map((item, idx) => `
    <div class="marquee-item">
      <img src="assets/images/${item.file}" alt="Jana Print Real Project ${item.id}" class="marquee-img" loading="lazy">
    </div>
  `).join('');
}

/* ==========================================================================
   2. LANGUAGE SWITCHER SYSTEM (EN | AR)
   ========================================================================== */
function initLanguageToggle() {
  const optEn = document.getElementById('langOptEn');
  const optAr = document.getElementById('langOptAr');

  optEn?.addEventListener('click', () => {
    if (currentLang !== 'en') {
      currentLang = 'en';
      applyLanguage('en');
    }
  });

  optAr?.addEventListener('click', () => {
    if (currentLang !== 'ar') {
      currentLang = 'ar';
      applyLanguage('ar');
    }
  });
}

function applyLanguage(lang) {
  const htmlEl = document.documentElement;
  const optEn = document.getElementById('langOptEn');
  const optAr = document.getElementById('langOptAr');

  htmlEl.setAttribute('lang', lang);
  htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  if (lang === 'en') {
    optEn?.classList.add('active');
    optAr?.classList.remove('active');
  } else {
    optAr?.classList.add('active');
    optEn?.classList.remove('active');
  }

  // Update text for all elements with data-en and data-ar attributes
  const translatableEls = document.querySelectorAll('[data-en][data-ar]');
  translatableEls.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Re-render portfolio captions in lightbox if open
  renderPortfolioGrid();
}

/* ==========================================================================
   3. PORTFOLIO GRID ENGINE (Clean Pure Images - No Text Overlays)
   ========================================================================== */
function initPortfolioGrid() {
  renderPortfolioGrid();
}

function renderPortfolioGrid() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  grid.innerHTML = projectImages.map(item => `
    <article class="portfolio-item" onclick="openLightbox('assets/images/${item.file}')">
      <img src="assets/images/${item.file}" alt="Jana Print Real Project" class="portfolio-item-img" loading="lazy">
    </article>
  `).join('');
}

/* ==========================================================================
   4. LIGHTBOX MODAL PREVIEW
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

function openLightbox(imgSrc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');

  if (modal && img) {
    img.src = imgSrc;
    modal.classList.add('active');
  }
}

/* ==========================================================================
   5. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileNav() {
    drawer?.classList.remove('active');
    backdrop?.classList.remove('active');
  }

  toggle?.addEventListener('click', () => {
    drawer?.classList.toggle('active');
    backdrop?.classList.toggle('active');
  });

  backdrop?.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));
}

/* ==========================================================================
   6. SCROLL HEADER STYLING
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}
