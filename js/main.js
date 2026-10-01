/**
 * Main Interactive Application Script
 * Philopater Ashraf William - Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTerminalTabs();
  renderProjects('all');
  initProjectFilters();
  initContactForm();
  initClipboardButtons();
  initModals();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('philopater-theme');

  // Check saved theme or system preference (defaults to dark)
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('philopater-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
}

/* --------------------------------------------------------------------------
   2. Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside or clicking any link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // Navbar shadow on scroll & Active link spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Terminal Code Tabs in Hero Section
   -------------------------------------------------------------------------- */
const terminalSnippets = {
  profile: [
    { line: 1, content: '<span class="com">// Philopater Ashraf William - .NET Profile</span>' },
    { line: 2, content: '<span class="kwd">namespace</span> Portfolio.<span class="typ">Core</span>;' },
    { line: 3, content: '' },
    { line: 4, content: '<span class="kwd">public record</span> <span class="typ">BackendDeveloper</span>' },
    { line: 5, content: '{' },
    { line: 6, content: '    <span class="kwd">public string</span> <span class="prop">Name</span> { <span class="kwd">get</span>; } = <span class="str">"Philopater Ashraf William"</span>;' },
    { line: 7, content: '    <span class="kwd">public string</span> <span class="prop">Title</span> { <span class="kwd">get</span>; } = <span class="str">"Back-End .NET Developer"</span>;' },
    { line: 8, content: '    <span class="kwd">public string</span> <span class="prop">Degree</span> { <span class="kwd">get</span>; } = <span class="str">"B.Sc. in Business Information Systems (BIS)"</span>;' },
    { line: 9, content: '    <span class="kwd">public string</span> <span class="prop">Location</span> { <span class="kwd">get</span>; } = <span class="str">"Cairo, Egypt"</span>;' },
    { line: 10, content: '    <span class="kwd">public string[]</span> <span class="prop">CoreStack</span> { <span class="kwd">get</span>; } = [' },
    { line: 11, content: '        <span class="str">"C#"</span>, <span class="str">".NET 8/9"</span>, <span class="str">"ASP.NET Core"</span>, <span class="str">"EF Core"</span>, <span class="str">"SQL Server"</span>' },
    { line: 12, content: '    ];' },
    { line: 13, content: '    <span class="kwd">public string[]</span> <span class="prop">Architectures</span> { <span class="kwd">get</span>; } = [' },
    { line: 14, content: '        <span class="str">"Onion Architecture"</span>, <span class="str">"Clean Code"</span>, <span class="str">"SOLID"</span>, <span class="str">"Unit of Work"</span>' },
    { line: 15, content: '    ];' },
    { line: 16, content: '}' }
  ],
  architecture: [
    { line: 1, content: '<span class="com">// Onion Architecture Layer Configuration</span>' },
    { line: 2, content: '<span class="kwd">public static class</span> <span class="typ">DependencyInjectionExtensions</span>' },
    { line: 3, content: '{' },
    { line: 4, content: '    <span class="kwd">public static</span> <span class="typ">IServiceCollection</span> <span class="func">AddCoreServices</span>(<span class="kwd">this</span> <span class="typ">IServiceCollection</span> services)' },
    { line: 5, content: '    {' },
    { line: 6, content: '        <span class="com">// Core domain & business rule registrations</span>' },
    { line: 7, content: '        services.<span class="func">AddScoped</span>&lt;<span class="typ">IUnitOfWork</span>, <span class="typ">UnitOfWork</span>&gt;();' },
    { line: 8, content: '        services.<span class="func">AddScoped</span>(<span class="kwd">typeof</span>(<span class="typ">IGenericRepository</span>&lt;&gt;), <span class="kwd">typeof</span>(<span class="typ">GenericRepository</span>&lt;&gt;));' },
    { line: 9, content: '        services.<span class="func">AddAutoMapper</span>(<span class="kwd">typeof</span>(<span class="typ">MappingProfiles</span>));' },
    { line: 10, content: '        <span class="kwd">return</span> services;' },
    { line: 11, content: '    }' },
    { line: 12, content: '}' }
  ],
  bis: [
    { line: 1, content: '<span class="com">// Business Information Systems: Blending Business Logic & .NET</span>' },
    { line: 2, content: '<span class="kwd">public class</span> <span class="typ">BusinessValueWorkflow</span>' },
    { line: 3, content: '{' },
    { line: 4, content: '    <span class="kwd">public void</span> <span class="func">TranslateEnterpriseRequirements</span>()' },
    { line: 5, content: '    {' },
    { line: 6, content: '        <span class="com">// Step 1: Analyze business domain processes & entity relationships</span>' },
    { line: 7, content: '        <span class="kwd">var</span> requirements = <span class="typ">BISAnalysis</span>.<span class="func">EvaluateBusinessRules</span>();' },
    { line: 8, content: '        <span class="com">// Step 2: Model normalized 3NF relational SQL Server database</span>' },
    { line: 9, content: '        <span class="kwd">var</span> schema = <span class="typ">DatabaseArchitect</span>.<span class="func">DesignNormalizedTables</span>(requirements);' },
    { line: 10, content: '        <span class="com">// Step 3: Implement high-performance, resilient ASP.NET Web APIs</span>' },
    { line: 11, content: '        <span class="typ">APIBuilder</span>.<span class="func">DeliverRobustEndpoints</span>(schema);' },
    { line: 12, content: '    }' },
    { line: 13, content: '}' }
  ]
};

function initTerminalTabs() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codeBody = document.getElementById('terminal-code-body');

  function renderSnippet(tabKey) {
    if (!codeBody || !terminalSnippets[tabKey]) return;
    const lines = terminalSnippets[tabKey];
    codeBody.innerHTML = lines.map(item => `
      <div class="code-line">
        <span class="line-num">${item.line}</span>
        <span class="code-content">${item.content}</span>
      </div>
    `).join('');
  }

  // Initial render
  renderSnippet('profile');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      renderSnippet(tabKey);
    });
  });
}

/* --------------------------------------------------------------------------
   4. Projects Rendering & Category Filtering
   -------------------------------------------------------------------------- */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(project => `
    <article class="project-card" data-category="${project.category}">
      <div class="project-banner">
        <span class="project-badge-top ${project.featured ? 'project-badge-featured' : ''}">
          ${project.architectureBadge}
        </span>
        <div class="project-banner-visual">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">${project.bannerIcon}</div>
          <div class="project-architecture-diagram-mini">
            <span class="arch-node">Domain</span>
            <span class="arch-arrow">→</span>
            <span class="arch-node">Application</span>
            <span class="arch-arrow">→</span>
            <span class="arch-node">Data</span>
            <span class="arch-arrow">→</span>
            <span class="arch-node">API/MVC</span>
          </div>
        </div>
      </div>

      <div class="project-content">
        <h3 class="project-title">
          ${project.title}
        </h3>
        <p class="project-description">
          ${project.shortDescription}
        </p>

        <div class="project-features-list">
          ${project.keyFeatures.slice(0, 2).map(feature => `
            <div class="project-feature-item">
              <i class="fas fa-check-circle"></i>
              <span>${feature}</span>
            </div>
          `).join('')}
        </div>

        <div class="project-tech-tags">
          ${project.techStack.slice(0, 5).map(tag => `
            <span class="tech-tag">${tag}</span>
          `).join('')}
          ${project.techStack.length > 5 ? `<span class="tech-tag">+${project.techStack.length - 5} more</span>` : ''}
        </div>

        <div class="project-actions">
          <button class="btn btn-primary btn-sm view-project-btn" data-id="${project.id}">
            <i class="fas fa-layer-group"></i> Architecture & Code
          </button>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fab fa-github"></i> Repository
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-bind click event for dynamic view buttons
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-id');
      openProjectModal(projectId);
    });
  });
}

function initProjectFilters() {
  const container = document.getElementById('projects-container');
  if (container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-project-btn');
      if (btn) {
        const projectId = btn.getAttribute('data-id');
        openProjectModal(projectId);
      }
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Details Modal
   -------------------------------------------------------------------------- */
function openProjectModal(projectId) {
  const project = portfolioProjects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-project-title');
  const body = document.getElementById('modal-project-body');

  title.innerText = project.title;

  body.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
        <span class="section-tag" style="margin: 0;">${project.architectureBadge}</span>
        ${project.featured ? '<span style="font-size: 0.8rem; background: #f59e0b; color: #fff; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700;">FEATURED</span>' : ''}
      </div>
      <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${project.tagline}</p>
    </div>

    <!-- Architecture Layers Breakdown -->
    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.75rem;">
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-sitemap"></i> Architectural Layers & Boundaries
      </h4>
      <div style="display: flex; flex-direction: column; gap: 0.65rem;">
        <div class="arch-layer-item layer-core">
          <span><strong>1. Domain / Core:</strong> ${project.architecture.domain}</span>
        </div>
        <div class="arch-layer-item layer-app">
          <span><strong>2. Application / Services:</strong> ${project.architecture.application}</span>
        </div>
        <div class="arch-layer-item layer-infra">
          <span><strong>3. Infrastructure / Persistence:</strong> ${project.architecture.infrastructure}</span>
        </div>
        <div class="arch-layer-item layer-pres">
          <span><strong>4. Presentation / API:</strong> ${project.architecture.presentation}</span>
        </div>
      </div>
    </div>

    <!-- Key Implementations -->
    <div style="margin-bottom: 1.75rem;">
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-list-check"></i> Key Engineering Highlights
      </h4>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${project.keyFeatures.map(item => `
          <li style="display: flex; gap: 0.6rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
            <i class="fas fa-check" style="color: var(--accent-emerald); margin-top: 0.25rem;"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- C# Code Sample Preview -->
    <div style="margin-bottom: 1.75rem;">
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-code"></i> C# Source Code Excerpt
      </h4>
      <pre style="background: var(--code-bg); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; font-family: var(--font-mono); font-size: 0.825rem; color: #e2e8f0; overflow-x: auto; line-height: 1.6;"><code>${escapeHtml(project.sampleSnippet)}</code></pre>
    </div>

    <!-- Technologies -->
    <div style="margin-bottom: 2rem;">
      <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
        Technologies & Patterns Used
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${project.techStack.map(tech => `<span class="tech-tag" style="font-size: 0.825rem; padding: 0.35rem 0.75rem;">${tech}</span>`).join('')}
      </div>
    </div>

    <!-- Modal Actions -->
    <div style="display: flex; gap: 1rem; justify-content: flex-end; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
      <button class="btn btn-secondary btn-sm" onclick="closeAllModals()">
        Close
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* --------------------------------------------------------------------------
   6. Resume & Modals General Handlers
   -------------------------------------------------------------------------- */
function initModals() {
  const resumeBtn = document.getElementById('view-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Print CV button
  const printCvBtn = document.getElementById('print-cv-btn');
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   7. Contact Form Validation & Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const subjectInput = document.getElementById('sender-subject');
  const messageInput = document.getElementById('sender-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(field, hasError, msg = '') {
    const group = field.closest('.form-group');
    if (!group) return;
    if (hasError) {
      group.classList.add('has-error');
      const errEl = group.querySelector('.form-error-msg');
      if (errEl && msg) errEl.innerText = msg;
    } else {
      group.classList.remove('has-error');
    }
  }

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => setFieldError(field, false));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, true, 'Please enter your full name.');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      setFieldError(emailInput, true, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      setFieldError(subjectInput, true, 'Please enter a subject.');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFieldError(messageInput, true, 'Please enter a message of at least 10 characters.');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please fix the errors in the form.', 'error');
      return;
    }

    // Prepare mailto link or simulate immediate response
    const nameVal = encodeURIComponent(nameInput.value.trim());
    const subjectVal = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
    const bodyVal = encodeURIComponent(`Hi Philopater,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);

    showToast('Message validated! Opening your email client...', 'success');

    // Trigger user mail client with pre-filled content
    setTimeout(() => {
      window.location.href = `mailto:Philowilliam336@gmail.com?subject=${subjectVal}&body=${bodyVal}`;
    }, 600);

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   8. One-Click Copy to Clipboard
   -------------------------------------------------------------------------- */
function initClipboardButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}"`, 'success');
        }).catch(() => {
          showToast('Failed to copy to clipboard', 'error');
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Scroll Effects (Back to Top & Scroll Progress)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   10. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  
  const icon = type === 'success' 
    ? '<i class="fas fa-check-circle toast-icon"></i>' 
    : (type === 'error' ? '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>' : '<i class="fas fa-info-circle" style="color: #38bdf8;"></i>');

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
