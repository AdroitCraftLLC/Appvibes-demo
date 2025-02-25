// Added missing openModal function
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  /* ---------------------------
     Side Menu Functionality
  --------------------------- */
  const sideMenu = document.getElementById('sideMenu');
  const hamburger = document.querySelector('.hamburger');
  const closeMenu = document.querySelector('.close-menu');

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    sideMenu.classList.add('open');
  });

  closeMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    sideMenu.classList.remove('open');
  });

  document.addEventListener('click', function(event) {
    if (!sideMenu.contains(event.target) && !hamburger.contains(event.target)) {
      sideMenu.classList.remove('open');
    }
  });

  /* ---------------------------
     Modal Functionality
  --------------------------- */
  const featureModal = document.getElementById('featureModal');
  const modalHeader = document.getElementById('modalHeader');
  const modalDesc = document.getElementById('modalDesc');
  const modalImage = document.getElementById('modalImage');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');

  document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const image = btn.getAttribute('data-image');
      const color = btn.getAttribute('data-color');

      modalHeader.textContent = title;
      modalDesc.textContent = desc;
      modalImage.src = image;
      modalContent.style.backgroundColor = color;

      featureModal.classList.add('open');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    featureModal.classList.remove('open');
  });

  featureModal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
      featureModal.classList.remove('open');
    }
  });

  /* ---------------------------
     Reasons Highlights Tabs
  --------------------------- */
  const tabs = document.querySelectorAll('.feature-highlights .tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      tabPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === targetTab);
      });
    });
  });

  /* ---------------------------
     Benefits Carousel Functionality
  --------------------------- */
  const benefitContainer = document.querySelector('.benefit-container');
  const benefitBanners = document.querySelectorAll('.benefit-banner');
  const benefitButtons = document.querySelectorAll('.benefit-btn');
  const benefitIndicator = document.querySelector('.benefit-indicator');
  const benefitPrevBtn = document.querySelector('.benefits .nav-btn.prev');
  const benefitNextBtn = document.querySelector('.benefits .nav-btn.next');
  let benefitIndex = 0;
  let isBenefitScrolling = false;

  function getBannerWidth(banner) {
    const style = window.getComputedStyle(banner);
    const marginRight = parseFloat(style.marginRight) || 0;
    return banner.offsetWidth + marginRight;
  }

  const updateBenefits = () => {
    benefitButtons.forEach((btn, i) => btn.classList.toggle('active', i === benefitIndex));
    benefitIndicator.textContent = `${benefitIndex + 1}/${benefitBanners.length}`;
  };

  const scrollBenefitsTo = (index) => {
    const banner = benefitBanners[index];
    if (banner) {
      isBenefitScrolling = true;
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      benefitIndex = index;
      updateBenefits();
      setTimeout(() => {
        isBenefitScrolling = false;
      }, 600);
    }
  };

  benefitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(btn.getAttribute('data-index'), 10);
      scrollBenefitsTo(index);
    });
  });

  benefitNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newIndex = (benefitIndex + 1) % benefitBanners.length;
    scrollBenefitsTo(newIndex);
  });

  benefitPrevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newIndex = (benefitIndex - 1 + benefitBanners.length) % benefitBanners.length;
    scrollBenefitsTo(newIndex);
  });

  benefitContainer.addEventListener('scroll', () => {
    if (isBenefitScrolling) return;
    const bannerWidth = getBannerWidth(benefitBanners[0]);
    const index = Math.round(benefitContainer.scrollLeft / bannerWidth);
    if (index !== benefitIndex && index < benefitBanners.length) {
      benefitIndex = index;
      updateBenefits();
    }
  });

  updateBenefits();

  /* ---------------------------
     Testimonials Carousel Functionality
  --------------------------- */
  const testimonialContainer = document.querySelector('.testimonial-container');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialIndicator = document.querySelector('.testimonial-indicator');
  const testimonialPrevBtn = document.querySelector('.testimonials .nav-btn.prev');
  const testimonialNextBtn = document.querySelector('.testimonials .nav-btn.next');
  let testimonialIndex = 0;
  let isTestimonialScrolling = false;

  const updateTestimonials = () => {
    testimonialIndicator.textContent = `${testimonialIndex + 1}/${testimonialCards.length}`;
  };

  const scrollTestimonialTo = (index) => {
    const card = testimonialCards[index];
    if (card) {
      isTestimonialScrolling = true;
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      testimonialIndex = index;
      updateTestimonials();
      setTimeout(() => {
        isTestimonialScrolling = false;
      }, 600);
    }
  };

  testimonialNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newIndex = (testimonialIndex + 1) % testimonialCards.length;
    scrollTestimonialTo(newIndex);
  });

  testimonialPrevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    scrollTestimonialTo(newIndex);
  });

  testimonialContainer.addEventListener('scroll', () => {
    if (isTestimonialScrolling) return;
    const cardWidth = testimonialCards[0].offsetWidth + 10;
    const index = Math.round(testimonialContainer.scrollLeft / cardWidth);
    if (index !== testimonialIndex && index < testimonialCards.length) {
      testimonialIndex = index;
      updateTestimonials();
    }
  });

  updateTestimonials();

  /* ---------------------------
     FAQ Toggle Functionality (Updated)
  --------------------------- */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      question.classList.toggle('active');
      const answer = question.nextElementSibling;
      if (window.getComputedStyle(answer).display === 'none') {
        answer.style.display = 'block';
        setTimeout(() => {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }, 10);
      } else {
        answer.style.maxHeight = '0px';
        setTimeout(() => {
          answer.style.display = 'none';
        }, 300);
      }
    });
  });
});

/* ---------------------------
   Signup/Login Modal Trigger (Sticky Button)
--------------------------- */
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    openModal("authModal");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    if (signupForm) signupForm.classList.add("active");
    if (loginForm) loginForm.classList.remove("active");
    document.querySelectorAll(".modal-tabs button").forEach(btn => btn.classList.remove("active"));
    const signupTab = document.querySelector('.modal-tabs button[data-target="signupForm"]');
    if (signupTab) signupTab.classList.add("active");
  });
}

/* ---------------------------
   Modal Tabs for Signup/Login
--------------------------- */
document.querySelectorAll(".modal-tabs button").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-target");
    document.querySelectorAll(".modal-tabs button").forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");
    if (target === "signupForm") {
      document.getElementById("signupForm").classList.add("active");
      document.getElementById("loginForm").classList.remove("active");
    } else {
      document.getElementById("loginForm").classList.add("active");
      document.getElementById("signupForm").classList.remove("active");
    }
  });
});

/* ---------------------------
   Promotions Modal Trigger (Demo: open after 10 seconds)
--------------------------- */
setTimeout(() => {
  openModal("promoModal");
}, 10000);

// Attach event listeners for elements with class "modal-close"
document.querySelectorAll('.modal-close').forEach(closeEl => {
  closeEl.addEventListener('click', () => {
    const modalId = closeEl.getAttribute('data-modal');
    const modalToClose = document.getElementById(modalId);
    if (modalToClose) {
      modalToClose.classList.remove('open');
    }
  });
});
