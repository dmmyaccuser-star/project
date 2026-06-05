/* ============================================
   PORTFOLIO INTERACTIVE FEATURES
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1800);

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .achievement-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
  }

  // Typewriter Effect
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = ['IT Student', 'Aspiring Software Developer', 'Tech Innovator'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();
  }

  // Navbar scroll behavior
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });

  // Scroll animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) : target;
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
              requestAnimationFrame(updateCounter);
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.querySelector('.about');
  if (aboutSection) counterObserver.observe(aboutSection);

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  // Form submission is now handled natively by HTML action attribute

  // Flip Cards
  document.querySelectorAll('.flip-btn, .flip-btn-back').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = e.target.closest('.project-card.flip-card');
      if (card) {
        card.classList.toggle('flipped');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll indicator hide on scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '0.6';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    });
  }

  // ============================================
  // CERTIFICATE VIEWER, LIGHTBOX & FILTER ENGINE
  // ============================================

  const certificatesData = [
    {
      id: 'cisco-ethical-hacker',
      title: 'Ethical Hacker',
      issuer: 'Cisco Networking Academy',
      brandClass: 'ibm',
      icon: 'fas fa-shield-alt',
      skills: ['Cybersecurity', 'Threat Analysis', 'Penetration Testing', 'Security'],
      verifyUrl: '404.html',
      date: '2025',
      image: 'ceritificates/Ethical_Hacker_certificate_gomez-kenneathkim-dnsc-edu-ph_145ee48b-8421-4de0-9383-ba94a30bcbde.pdf.png',
      category: 'security'
    },
    {
      id: 'cisco-js-essentials',
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco Networking Academy',
      brandClass: 'google',
      icon: 'fab fa-js',
      skills: ['JavaScript Basics', 'Programming', 'DOM Manipulation', 'JS', 'Web Development'],
      verifyUrl: '404.html',
      date: '2026',
      image: 'ceritificates/JavaScriptEssentials1Update20260604-31-q1ixld_page-0001.jpg',
      category: 'development'
    },
    {
      id: 'advanced-seminar-day-1',
      title: 'Advanced Seminar Series Day 1: Journey from Science Practitioner to IT Specialist',
      issuer: 'Davao del Norte State College',
      brandClass: 'google',
      icon: 'fas fa-network-wired',
      skills: ['IT Specialist', 'Seminar', 'Professional Development'],
      verifyUrl: '404.html',
      date: '2025',
      image: 'ceritificates/12b21ba6-7b7d-4e55-b10e-c458bca9837e.png',
      category: 'workshop'
    },
    {
      id: 'level-app-2',
      title: 'Level App 2.0 Participation (Team ARETE)',
      issuer: 'Davao del Norte State College',
      brandClass: 'ibm',
      icon: 'fas fa-lock',
      skills: ['Startup', 'Innovation', 'Level App', 'Hackathon'],
      verifyUrl: '404.html',
      date: '2025',
      image: 'ceritificates/50f2e57c-53b3-4666-9aa2-936b29f62cfd.png',
      category: 'workshop'
    },
    {
      id: 'ux-questionnaire-instruments',
      title: 'International Course Session: User Experience Questionnaire Instruments',
      issuer: 'Universitas Trilogi',
      brandClass: 'aws',
      icon: 'fas fa-graduation-cap',
      skills: ['UX', 'User Experience', 'Research Instruments', 'Design'],
      verifyUrl: '#',
      date: '2026',
      image: 'ceritificates/Kenneath Kim Gomezs_page-0001.jpg',
      category: 'academic'
    },
    {
      id: 'ripple-workshop-template',
      title: 'BUGSAI TBI RiPPLE: Ocean Tech Innovation Conference (Template)',
      issuer: 'BUGSAI TBI & Davao del Norte State College',
      brandClass: 'meta',
      icon: 'fas fa-laptop-code',
      skills: ['Ocean Tech', 'Conference', 'Innovation'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/RiPPLE_Certificate of Participation 1_page-0001.jpg',
      category: 'workshop'
    },
    {
      id: 'ripple-conference-participation',
      title: 'BUGSAI TBI RiPPLE: Ocean Tech Innovation Conference (Participation)',
      issuer: 'BUGSAI TBI & Davao del Norte State College',
      brandClass: 'meta',
      icon: 'fas fa-handshake',
      skills: ['Ocean Tech', 'Conference', 'Innovation'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/RiPPLE_Certificate of Participation 1.pdf.png',
      category: 'workshop'
    },
    {
      id: 'tech-customer-validation',
      title: "BUGSAI TBI's LAWIG Cohort 1 Learning Lab: Customer Validation",
      issuer: 'BUGSAI TBI & Davao del Norte State College',
      brandClass: 'aws',
      icon: 'fas fa-chart-line',
      skills: ['Customer Validation', 'Market Research', 'Startup', 'Lean Startup'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/Customer Validation.png',
      category: 'workshop'
    },
    {
      id: 'customer-validation-lab',
      title: "BUGSAI TBI's LAWIG Cohort 1 Learning Lab: Customer Validation (Copy)",
      issuer: 'BUGSAI TBI & Davao del Norte State College',
      brandClass: 'aws',
      icon: 'fas fa-check-double',
      skills: ['Customer Validation', 'Market Research', 'Startup', 'Lean Startup'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/Gomez-Customer Validation_page-0001.jpg',
      category: 'workshop'
    },
    {
      id: 'ojt-internship-etiquette',
      title: 'Internship Etiquette & Test Interpretation for OJT Students',
      issuer: 'Davao del Norte State College',
      brandClass: 'google',
      icon: 'fas fa-building',
      skills: ['OJT', 'Internship Etiquette', 'Professionalism', 'Test Interpretation'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/CERTIFICATE IC OJT DAY 5.png',
      category: 'workshop'
    },
    {
      id: 'advanced-seminar-day-2',
      title: 'Advanced Seminar Series Day 2: The Power of Color in Graphic Design',
      issuer: 'Davao del Norte State College',
      brandClass: 'ibm',
      icon: 'fas fa-chalkboard-teacher',
      skills: ['Graphic Design', 'Color Theory', 'Design Psychology'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/Advanced Seminar Series 1.png',
      category: 'workshop'
    },
    {
      id: 'capstone-crayfish-iot',
      title: 'Capstone Project: IoT Based Water Monitoring & Automated Crayfish Feeding System',
      issuer: 'Mindanao Crayfish Supplier',
      brandClass: 'google',
      icon: 'fas fa-cogs',
      skills: ['IoT', 'Internet of Things', 'Capstone', 'Crayfish Monitoring', 'Embedded Systems'],
      verifyUrl: '#',
      date: '2026',
      image: 'ceritificates/2.png',
      category: 'development'
    },
    {
      id: 'lean-canvas-development',
      title: "BUGSAI TBI's LAWIG Cohort 1 Learning Lab: Lean Canvas Development",
      issuer: 'BUGSAI TBI & Davao del Norte State College',
      brandClass: 'meta',
      icon: 'fas fa-network-wired',
      skills: ['Lean Canvas', 'Business Design', 'Startup', 'Lean Startup'],
      verifyUrl: '#',
      date: '2025',
      image: 'ceritificates/3.1.png',
      category: 'workshop'
    },
    {
      id: 'suicide-prevention-webinar',
      title: '"Hope, Support and Strength" Suicide Prevention Webinar',
      issuer: 'Davao Del Norte State College',
      brandClass: 'google',
      icon: 'fas fa-database',
      skills: ['Webinar', 'Suicide Prevention', 'Mental Health'],
      verifyUrl: '#',
      date: '2022',
      image: 'ceritificates/4.png',
      category: 'academic'
    },
    {
      id: 'capstone-exhibit-2026',
      title: 'BSIT and BSIS Capstone Project Exhibit 2026',
      issuer: 'Davao del Norte State College',
      brandClass: 'google',
      icon: 'fas fa-project-diagram',
      skills: ['Capstone Exhibit', 'Project Presentation', 'IoT Crayfish System', 'Technical Communication'],
      verifyUrl: '#',
      date: '2026',
      image: 'ceritificates/6d219cb4-17ad-4754-8b11-4516b7a859a7.png',
      category: 'academic'
    },
    {
      id: 'gcash-forest-planting',
      title: 'GCash Forest: Tree Planting Certificate (Binunga)',
      issuer: 'GCash',
      brandClass: 'aws',
      icon: 'fas fa-seedling',
      skills: ['Environmental Advocacy', 'Community Contribution', 'GCash Forest'],
      verifyUrl: '#',
      date: '2026',
      image: 'ceritificates/7ff9c4fe-847f-4008-9bc8-2fb3a2487436.png',
      category: 'workshop'
    }
  ];

  // DOM Elements
  const certTrigger = document.getElementById('certifications-trigger');
  const certModal = document.getElementById('certificates-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = certModal ? certModal.querySelector('.modal-backdrop') : null;
  const certGrid = document.getElementById('cert-grid');

  const searchInput = document.getElementById('cert-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterPillsContainer = document.getElementById('filter-pills');

  const lightbox = document.getElementById('certificate-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxTitle = document.getElementById('lightbox-title-text');
  const lightboxIssuer = document.getElementById('lightbox-issuer-text');

  let searchQuery = '';
  let selectedCategory = 'all';

  // Synchronize Achievements List Card
  const updateAchievementsCertList = () => {
    const listEl = document.getElementById('achievements-cert-list');
    if (!listEl) return;
    
    // Choose 3 major certifications to display on the home card
    const featured = certificatesData.filter(c => ['cisco-ethical-hacker', 'cisco-js-essentials', 'capstone-crayfish-iot'].includes(c.id));
    const displayCerts = featured.length > 0 ? featured : certificatesData.slice(0, 3);
    
    listEl.innerHTML = displayCerts.map(cert => `
      <li>
        <i class="fas fa-check-circle" style="color: var(--accent-blue);"></i>
        <span>${cert.title} (${cert.issuer})</span>
      </li>
    `).join('');
    
    if (certificatesData.length > displayCerts.length) {
      listEl.innerHTML += `
        <li style="color: var(--accent-violet); font-weight: 600; display: flex; align-items: center; gap: 0.6rem; margin-top: 0.5rem; cursor: pointer;">
          <i class="fas fa-plus-circle"></i>
          <span>+ ${certificatesData.length - displayCerts.length} more certificates</span>
        </li>
      `;
    }
  };

  // Update Summary Stats inside Modal
  const updateModalStats = () => {
    const totalEl = document.getElementById('stat-total-count');
    const techEl = document.getElementById('stat-tech-count');
    const acadEl = document.getElementById('stat-acad-count');
    
    if (totalEl) totalEl.textContent = certificatesData.length.toString();
    
    if (techEl) {
      const techCount = certificatesData.filter(c => ['security', 'development', 'cisco'].includes(c.category)).length;
      techEl.textContent = techCount.toString();
    }
    
    if (acadEl) {
      const acadCount = certificatesData.filter(c => ['workshop', 'academic'].includes(c.category)).length;
      acadEl.textContent = acadCount.toString();
    }
  };

  // Render Grid Function
  const renderCertificates = () => {
    if (!certGrid) return;
    certGrid.innerHTML = '';

    certificatesData.forEach(cert => {
      const card = document.createElement('div');
      card.className = `cert-card ${cert.brandClass}`;
      card.dataset.id = cert.id;
      card.style.position = 'relative';

      const mediaHtml = `
        <div class="cert-card-media view-cert-btn" data-id="${cert.id}">
          <img src="${cert.image}" alt="${cert.title}">
        </div>
      `;

      let verifyLinkHtml = '';
      if (cert.verifyUrl && cert.verifyUrl !== '404.html' && cert.verifyUrl !== '#') {
        verifyLinkHtml = `
          <a href="${cert.verifyUrl}" class="btn btn-secondary btn-sm" target="_blank" style="padding: 6px 12px; font-size: 0.75rem;">
            <i class="fas fa-external-link-alt"></i> Verify
          </a>
        `;
      }

      card.innerHTML = `
        ${mediaHtml}
        <div class="cert-content">
          <div class="cert-header">
            <h3>${cert.title}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
          </div>
        </div>
        <div class="cert-footer">
          <span class="cert-date">Issued: ${cert.date || '2024'}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            ${verifyLinkHtml}
            <button class="btn btn-outline btn-sm view-cert-btn" data-id="${cert.id}">
              <i class="fas fa-search-plus"></i> View Image
            </button>
          </div>
        </div>
      `;

      certGrid.appendChild(card);
    });

    // Custom cursor bindings for dynamic elements
    if (window.matchMedia('(pointer: fine)').matches && cursorOutline) {
      const interactive = certGrid.querySelectorAll('.cert-card, .view-cert-btn, .btn');
      interactive.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
      });
    }
  };

  // Search and Filter Engine
  const filterCertificates = () => {
    const cards = certGrid.querySelectorAll('.cert-card');
    cards.forEach(card => {
      const certId = card.dataset.id;
      const cert = certificatesData.find(c => c.id === certId);
      if (!cert) return;

      // Category matching
      let categoryMatch = false;
      if (selectedCategory === 'all') {
        categoryMatch = true;
      } else if (selectedCategory === 'cisco') {
        categoryMatch = cert.issuer.toLowerCase().includes('cisco') || cert.category === 'cisco';
      } else {
        categoryMatch = cert.category === selectedCategory;
      }

      // Search matching
      let searchMatch = false;
      if (!searchQuery) {
        searchMatch = true;
      } else {
        const query = searchQuery.toLowerCase();
        const titleMatch = cert.title.toLowerCase().includes(query);
        const issuerMatch = cert.issuer.toLowerCase().includes(query);
        const skillsMatch = cert.skills.some(skill => skill.toLowerCase().includes(query));
        searchMatch = titleMatch || issuerMatch || skillsMatch;
      }

      if (categoryMatch && searchMatch) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  };

  // Lightbox triggers
  const openLightbox = (id) => {
    if (!lightbox) return;
    const cert = certificatesData.find(c => c.id === id);
    if (!cert) return;

    lightboxTitle.textContent = cert.title;
    lightboxIssuer.textContent = cert.issuer;
    lightboxContent.innerHTML = `<img src="${cert.image}" alt="${cert.title}">`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    if (!certModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  // Event Delegation for Certifications Grid (Viewing Image)
  if (certGrid) {
    certGrid.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('.view-cert-btn');
      if (viewBtn) {
        e.stopPropagation();
        const certId = viewBtn.dataset.id;
        openLightbox(certId);
      }
    });
  }

  // Lightbox Close Events
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchQuery) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
      filterCertificates();
    });
  }

  // Clear Search Handler
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterCertificates();
      searchInput.focus();
    });
  }

  // Filter Pills Click Handler
  if (filterPillsContainer) {
    filterPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      filterPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      selectedCategory = pill.dataset.category;
      filterCertificates();
    });
  }

  // Modal Triggers Setup
  if (certTrigger && certModal) {
    const openModal = () => {
      renderCertificates();
      updateModalStats();
      filterCertificates();
      certModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (modalClose) modalClose.focus();
    };

    const closeModal = () => {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
      certTrigger.focus();
    };

    certTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    certTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Global Key Listener for Escape Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lightbox && lightbox.classList.contains('active')) {
          closeLightbox();
        } else if (certModal.classList.contains('active')) {
          closeModal();
        }
      }
    });
  }

  // Initial rendering and setups on page load
  renderCertificates();
  updateModalStats();
  updateAchievementsCertList();
});


