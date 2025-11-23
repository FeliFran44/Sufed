// Main JavaScript - SUFED

(function() {
  'use strict';

  // ========================================
  // NAVBAR FUNCTIONALITY
  // ========================================

  class Navbar {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.toggle = document.querySelector('.navbar__toggle');
      this.menu = document.querySelector('.navbar__menu');
      this.dropdownToggle = document.querySelector('.navbar__dropdown-toggle');
      this.submenu = document.querySelector('.navbar__submenu');
      this.menuLinks = document.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle)');
      this.submenuLinks = document.querySelectorAll('.navbar__submenu-link');
      
      this.isMenuOpen = false;
      this.isDropdownOpen = false;
      
      this.init();
    }

    init() {
      if (!this.navbar) return;

      // Create and add overlay for mobile menu
      this.createOverlay();
      
      // Bind event listeners
      this.bindEvents();
      
      // Set up active link highlighting
      this.highlightActiveSection();
    }

    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'navbar__overlay';
      this.overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(this.overlay);
      
      // Close menu when clicking overlay
      this.overlay.addEventListener('click', () => this.closeMenu());
    }

    bindEvents() {
      // Mobile menu toggle
      if (this.toggle) {
        this.toggle.addEventListener('click', () => this.toggleMenu());
      }

      // Dropdown toggle
      if (this.dropdownToggle) {
        this.dropdownToggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleDropdown();
        });
      }

      // Close menu when clicking on menu links
      this.menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 768) {
            this.closeMenu();
          }
        });
      });

      // Close menu when clicking on submenu links
      this.submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 768) {
            this.closeMenu();
          }
        });
      });

      // Close menu on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.isMenuOpen) {
            this.closeMenu();
          }
          if (this.isDropdownOpen) {
            this.closeDropdown();
          }
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && this.isMenuOpen) {
          this.closeMenu();
        }
      });

      // Keyboard navigation for dropdown
      if (this.dropdownToggle) {
        this.dropdownToggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown();
          }
        });
      }

      // Highlight active section on scroll
      window.addEventListener('scroll', () => {
        this.highlightActiveSection();
      });
    }

    toggleMenu() {
      if (this.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    openMenu() {
      this.isMenuOpen = true;
      this.menu.classList.add('is-open');
      this.overlay.classList.add('is-visible');
      this.toggle.setAttribute('aria-expanded', 'true');
      this.toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
      // Focus first menu item
      const firstLink = this.menu.querySelector('.navbar__link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }

    closeMenu() {
      this.isMenuOpen = false;
      this.menu.classList.remove('is-open');
      this.overlay.classList.remove('is-visible');
      this.toggle.setAttribute('aria-expanded', 'false');
      this.toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Close dropdown if open
      if (this.isDropdownOpen) {
        this.closeDropdown();
      }
    }

    toggleDropdown() {
      if (this.isDropdownOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }

    openDropdown() {
      this.isDropdownOpen = true;
      this.submenu.classList.add('is-open');
      this.dropdownToggle.setAttribute('aria-expanded', 'true');
      
      // Focus first submenu item
      const firstSubmenuLink = this.submenu.querySelector('.navbar__submenu-link');
      if (firstSubmenuLink && window.innerWidth >= 768) {
        setTimeout(() => firstSubmenuLink.focus(), 100);
      }
    }

    closeDropdown() {
      this.isDropdownOpen = false;
      this.submenu.classList.remove('is-open');
      this.dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    highlightActiveSection() {
      // Get all sections
      const sections = document.querySelectorAll('section[id], main[id]');
      
      if (sections.length === 0) return;

      let currentSection = '';
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      // Update active link
      this.menuLinks.forEach(link => {
        link.classList.remove('navbar__link--active');
        
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
          const targetId = href.split('#')[1];
          if (targetId === currentSection) {
            link.classList.add('navbar__link--active');
          }
        }
      });

      // Also check submenu links
      this.submenuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
          const targetId = href.split('#')[1];
          if (targetId === currentSection) {
            // Add active class to parent dropdown toggle
            if (this.dropdownToggle) {
              this.dropdownToggle.classList.add('navbar__link--active');
            }
          }
        }
      });
    }
  }

  // ========================================
  // SMOOTH SCROLLING
  // ========================================

  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without jumping
          history.pushState(null, '', href);
          
          // Focus the target element for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }

  // ========================================
  // EDUCATION TABS
  // ========================================

  class EducationTabs {
    constructor() {
      this.tabButtons = document.querySelectorAll('.education__tab');
      this.tabPanels = document.querySelectorAll('.education__panel');
      
      this.init();
    }

    init() {
      if (this.tabButtons.length === 0) return;

      this.bindEvents();
    }

    bindEvents() {
      this.tabButtons.forEach(button => {
        button.addEventListener('click', (e) => this.switchTab(e.currentTarget));
        
        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            this.navigateTabs(e.key, e.currentTarget);
          }
        });
      });
    }

    switchTab(clickedButton) {
      const targetTab = clickedButton.dataset.tab;
      
      // Update buttons
      this.tabButtons.forEach(button => {
        const isActive = button.dataset.tab === targetTab;
        button.classList.toggle('education__tab--active', isActive);
        button.setAttribute('aria-selected', isActive);
      });

      // Update panels
      this.tabPanels.forEach(panel => {
        const isActive = panel.dataset.panel === targetTab;
        panel.classList.toggle('education__panel--active', isActive);
        
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      // Focus the clicked button
      clickedButton.focus();
    }

    navigateTabs(key, currentButton) {
      const buttons = Array.from(this.tabButtons);
      const currentIndex = buttons.indexOf(currentButton);
      let nextIndex;

      if (key === 'ArrowRight') {
        nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
      } else {
        nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
      }

      this.switchTab(buttons[nextIndex]);
    }
  }

  // ========================================
  // PDF DOWNLOAD FUNCTIONALITY
  // ========================================

  class PDFDownloadManager {
    constructor() {
      this.downloadButtons = document.querySelectorAll('[data-download-pdf]');
      
      // Map of resource identifiers to PDF file paths
      this.pdfPaths = {
        // Guías
        'nice': 'assets/documents/guias/NICE-Guidelines-SUFED.pdf',
        'jospt': 'assets/documents/guias/JOSPT-Guidelines-SUFED.pdf',
        'iasp': 'assets/documents/guias/IASP-Guidelines-SUFED.pdf',
        'lancet': 'assets/documents/guias/Lancet-Series-SUFED.pdf',
        // Interpretación
        'como-leer-guia': 'assets/documents/interpretacion/Como-Leer-Guia-Clinica-SUFED.pdf',
        'jospt-resumen': 'assets/documents/interpretacion/Resumen-Guias-JOSPT-SUFED.pdf',
        // Conceptos
        'definicion-iasp-2020': 'assets/documents/conceptos/Definicion-IASP-2020-SUFED.pdf',
        'enfoque-biopsicosocial': 'assets/documents/conceptos/Enfoque-Biopsicosocial-SUFED.pdf',
        'mitos-dolor': 'assets/documents/conceptos/Mitos-Dolor-SUFED.pdf'
      };

      // Download tracking (optional)
      this.downloadStats = this.loadDownloadStats();
      
      this.init();
    }

    init() {
      if (this.downloadButtons.length === 0) return;

      this.bindEvents();
      this.addFileTypeIcons();
    }

    bindEvents() {
      this.downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => this.handleDownload(e));
      });
    }

    addFileTypeIcons() {
      // Add PDF icon to download buttons that don't have one
      this.downloadButtons.forEach(button => {
        const hasIcon = button.querySelector('svg');
        if (!hasIcon) {
          const icon = this.createPDFIcon();
          button.insertBefore(icon, button.firstChild);
        }
      });
    }

    createPDFIcon() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '16');
      svg.setAttribute('height', '16');
      svg.setAttribute('viewBox', '0 0 16 16');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('aria-hidden', 'true');
      svg.classList.add('download-icon');
      
      svg.innerHTML = `
        <path d="M8 1v8m0 0L5 6m3 3l3-3M2 13h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
      
      return svg;
    }

    handleDownload(event) {
      const button = event.currentTarget;
      const resourceId = button.dataset.downloadPdf || button.dataset.guide || button.dataset.resource;
      
      if (!resourceId) {
        console.error('Resource ID not found');
        this.showMessage('Error: Identificador de recurso no encontrado', 'error');
        return;
      }

      const filePath = this.pdfPaths[resourceId];
      
      if (!filePath) {
        console.warn('PDF path not configured for:', resourceId);
        this.showMessage('Este documento estará disponible próximamente', 'info');
        return;
      }

      // Show loading state
      this.setButtonLoading(button, true);

      // Check if file exists and download
      this.checkAndDownload(filePath, resourceId, button);
    }

    async checkAndDownload(filePath, resourceId, button) {
      try {
        // Try to fetch the file to check if it exists
        const response = await fetch(filePath, { method: 'HEAD' });
        
        if (response.ok) {
          // File exists, proceed with download
          this.downloadFile(filePath, this.getFileName(resourceId));
          this.trackDownload(resourceId);
          this.showMessage('Descarga iniciada', 'success');
        } else {
          // File doesn't exist
          this.showMessage('Este documento estará disponible próximamente', 'info');
        }
      } catch (error) {
        // Network error or file doesn't exist
        console.warn('File not available:', filePath);
        this.showMessage('Este documento estará disponible próximamente', 'info');
      } finally {
        this.setButtonLoading(button, false);
      }
    }

    downloadFile(filePath, fileName) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }

    getFileName(resourceId) {
      const fileNames = {
        // Guías
        'nice': 'Guias-NICE-SUFED.pdf',
        'jospt': 'Guias-JOSPT-SUFED.pdf',
        'iasp': 'Guias-IASP-SUFED.pdf',
        'lancet': 'Serie-Lancet-SUFED.pdf',
        // Interpretación
        'como-leer-guia': 'Como-Leer-Guia-Clinica-SUFED.pdf',
        'jospt-resumen': 'Resumen-Guias-JOSPT-SUFED.pdf',
        // Conceptos
        'definicion-iasp-2020': 'Definicion-IASP-2020-SUFED.pdf',
        'enfoque-biopsicosocial': 'Enfoque-Biopsicosocial-SUFED.pdf',
        'mitos-dolor': 'Mitos-Dolor-SUFED.pdf'
      };
      
      return fileNames[resourceId] || `${resourceId}-SUFED.pdf`;
    }

    setButtonLoading(button, isLoading) {
      if (isLoading) {
        button.classList.add('is-loading');
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
      } else {
        button.classList.remove('is-loading');
        button.disabled = false;
        button.setAttribute('aria-busy', 'false');
      }
    }

    // Optional: Track downloads
    trackDownload(resourceId) {
      if (!this.downloadStats[resourceId]) {
        this.downloadStats[resourceId] = {
          count: 0,
          lastDownload: null
        };
      }
      
      this.downloadStats[resourceId].count++;
      this.downloadStats[resourceId].lastDownload = new Date().toISOString();
      
      this.saveDownloadStats();
      
      // Log for analytics (could be sent to server)
      console.log('Download tracked:', resourceId, this.downloadStats[resourceId]);
    }

    loadDownloadStats() {
      try {
        const stats = localStorage.getItem('sufed_download_stats');
        return stats ? JSON.parse(stats) : {};
      } catch (error) {
        console.warn('Could not load download stats:', error);
        return {};
      }
    }

    saveDownloadStats() {
      try {
        localStorage.setItem('sufed_download_stats', JSON.stringify(this.downloadStats));
      } catch (error) {
        console.warn('Could not save download stats:', error);
      }
    }

    showMessage(message, type = 'info') {
      // Create message element
      const messageEl = document.createElement('div');
      messageEl.className = `download-message download-message--${type}`;
      messageEl.textContent = message;
      messageEl.setAttribute('role', 'status');
      messageEl.setAttribute('aria-live', 'polite');
      
      // Style the message
      const bgColors = {
        'success': '#4CAF50',
        'error': '#f44336',
        'info': '#2196F3',
        'warning': '#FF9800'
      };
      
      Object.assign(messageEl.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: bgColors[type] || bgColors.info,
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '300px',
        animation: 'slideInUp 0.3s ease-out'
      });
      
      // Add to document
      document.body.appendChild(messageEl);
      
      // Remove after 3 seconds
      setTimeout(() => {
        messageEl.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
          if (document.body.contains(messageEl)) {
            document.body.removeChild(messageEl);
          }
        }, 300);
      }, 3000);
    }
  }

  // Add CSS animations for messages and download buttons
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Download button loading state */
    [data-download-pdf].is-loading {
      opacity: 0.6;
      cursor: wait;
      pointer-events: none;
    }

    [data-download-pdf].is-loading .download-icon {
      animation: spin 1s linear infinite;
    }

    /* File type icon styling */
    .download-icon {
      transition: transform 0.2s ease;
    }

    [data-download-pdf]:hover .download-icon {
      transform: translateY(2px);
    }

    [data-download-pdf]:active .download-icon {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // INITIALIZATION
  // ========================================

  document.addEventListener('DOMContentLoaded', function() {
    console.log('SUFED website initialized');
    
    // Initialize navbar
    new Navbar();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize education tabs
    new EducationTabs();
    
    // Initialize PDF download manager
    new PDFDownloadManager();
    
    // Initialize interpretation section
    new InterpretationSection();
  });

})();


  // ========================================
  // INTERPRETATION SECTION
  // ========================================

  class InterpretationSection {
    constructor() {
      this.videoButtons = document.querySelectorAll('.interpretation-card__button--video');
      this.downloadButtons = document.querySelectorAll('.interpretation-card__button:not(.interpretation-card__button--video)');
      this.modal = null;
      
      // Map of resource identifiers to file paths
      this.resourcePaths = {
        'como-leer-guia': 'assets/documents/interpretacion/Como-Leer-Guia-Clinica-SUFED.pdf',
        'jospt-resumen': 'assets/documents/interpretacion/Resumen-Guias-JOSPT-SUFED.pdf'
      };
      
      this.init();
    }

    init() {
      if (this.videoButtons.length === 0 && this.downloadButtons.length === 0) return;

      this.createVideoModal();
      this.bindEvents();
    }

    createVideoModal() {
      // Create modal structure
      this.modal = document.createElement('div');
      this.modal.className = 'video-modal';
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');
      this.modal.setAttribute('aria-label', 'Reproductor de video');
      
      this.modal.innerHTML = `
        <div class="video-modal__content">
          <button class="video-modal__close" aria-label="Cerrar video">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="video-modal__video-wrapper">
            <iframe class="video-modal__iframe" 
                    src="" 
                    title="Video educativo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.modal);
      
      // Get modal elements
      this.modalCloseBtn = this.modal.querySelector('.video-modal__close');
      this.modalIframe = this.modal.querySelector('.video-modal__iframe');
    }

    bindEvents() {
      // Video button clicks
      this.videoButtons.forEach(button => {
        button.addEventListener('click', (e) => this.handleVideoClick(e));
      });

      // Download button clicks
      this.downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => this.handleDownloadClick(e));
      });

      // Modal close button
      if (this.modalCloseBtn) {
        this.modalCloseBtn.addEventListener('click', () => this.closeVideoModal());
      }

      // Close modal on overlay click
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) {
            this.closeVideoModal();
          }
        });
      }

      // Close modal on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('is-open')) {
          this.closeVideoModal();
        }
      });
    }

    handleVideoClick(event) {
      const button = event.currentTarget;
      const videoUrl = button.dataset.videoUrl;
      
      if (!videoUrl) {
        console.error('Video URL not found');
        this.showMessage('URL del video no encontrada', 'error');
        return;
      }

      this.openVideoModal(videoUrl);
    }

    openVideoModal(videoUrl) {
      if (!this.modal || !this.modalIframe) return;

      // Set video URL with autoplay
      const urlWithAutoplay = videoUrl.includes('?') 
        ? `${videoUrl}&autoplay=1` 
        : `${videoUrl}?autoplay=1`;
      
      this.modalIframe.src = urlWithAutoplay;
      
      // Open modal
      this.modal.classList.add('is-open');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus close button
      setTimeout(() => {
        if (this.modalCloseBtn) {
          this.modalCloseBtn.focus();
        }
      }, 100);
    }

    closeVideoModal() {
      if (!this.modal || !this.modalIframe) return;

      // Close modal
      this.modal.classList.remove('is-open');
      
      // Stop video by clearing src
      this.modalIframe.src = '';
      
      // Restore body scroll
      document.body.style.overflow = '';
    }

    handleDownloadClick(event) {
      const button = event.currentTarget;
      const resourceId = button.dataset.resource;
      
      if (!resourceId || !this.resourcePaths[resourceId]) {
        console.error('Resource ID not found:', resourceId);
        this.showMessage('Este material aún no está disponible', 'info');
        return;
      }

      const filePath = this.resourcePaths[resourceId];
      
      // Show message that file will be available soon
      this.showMessage('Próximamente disponible para descarga', 'info');
      
      // In production, this would trigger the actual download:
      // this.downloadFile(filePath, this.getFileName(resourceId));
    }

    downloadFile(filePath, fileName) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    getFileName(resourceId) {
      const fileNames = {
        'como-leer-guia': 'Como-Leer-Guia-Clinica-SUFED.pdf',
        'jospt-resumen': 'Resumen-Guias-JOSPT-SUFED.pdf'
      };
      
      return fileNames[resourceId] || 'material-sufed.pdf';
    }

    showMessage(message, type = 'info') {
      // Create message element
      const messageEl = document.createElement('div');
      messageEl.className = `download-message download-message--${type}`;
      messageEl.textContent = message;
      messageEl.setAttribute('role', 'status');
      messageEl.setAttribute('aria-live', 'polite');
      
      // Style the message
      Object.assign(messageEl.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '300px',
        animation: 'slideInUp 0.3s ease-out'
      });
      
      // Add to document
      document.body.appendChild(messageEl);
      
      // Remove after 3 seconds
      setTimeout(() => {
        messageEl.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
          if (document.body.contains(messageEl)) {
            document.body.removeChild(messageEl);
          }
        }, 300);
      }, 3000);
    }
  }




  // ========================================
  // RESOURCES SECTION
  // ========================================

  class ResourcesManager {
    constructor() {
      this.categoryButtons = document.querySelectorAll('.resources__category-btn');
      this.resourcesGrid = document.getElementById('resources-grid');
      this.currentCategory = 'all';
      
      // Resource data
      this.resources = [
        // Escalas y Cuestionarios
        {
          id: 'tampa',
          title: 'Escala Tampa de Kinesiofobia (TSK)',
          category: 'escalas',
          description: 'Cuestionario validado para evaluar el miedo al movimiento y la re-lesión en personas con dolor.',
          fileSize: '245 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/escalas/Tampa-TSK-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'pcs',
          title: 'Pain Catastrophizing Scale (PCS)',
          category: 'escalas',
          description: 'Escala para medir pensamientos catastrofistas relacionados con el dolor.',
          fileSize: '198 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/escalas/PCS-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'peg',
          title: 'Pain, Enjoyment, General Activity (PEG)',
          category: 'escalas',
          description: 'Herramienta breve para evaluar la intensidad del dolor y su interferencia funcional.',
          fileSize: '156 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/escalas/PEG-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'odi',
          title: 'Oswestry Disability Index (ODI)',
          category: 'escalas',
          description: 'Cuestionario para evaluar discapacidad relacionada con dolor lumbar.',
          fileSize: '312 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/escalas/ODI-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'bpi',
          title: 'Brief Pain Inventory (BPI)',
          category: 'escalas',
          description: 'Inventario breve del dolor para evaluar intensidad e interferencia en actividades diarias.',
          fileSize: '278 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/escalas/BPI-SUFED.pdf',
          previewAvailable: true
        },
        // Material de Referencia
        {
          id: 'algoritmo-dolor-agudo',
          title: 'Algoritmo de Manejo del Dolor Agudo',
          category: 'referencia',
          description: 'Guía rápida de decisión clínica para el abordaje inicial del dolor agudo.',
          fileSize: '420 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/referencia/Algoritmo-Dolor-Agudo-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'banderas-rojas',
          title: 'Banderas Rojas en Dolor Musculoesquelético',
          category: 'referencia',
          description: 'Checklist de signos de alarma que requieren derivación o investigación adicional.',
          fileSize: '189 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/referencia/Banderas-Rojas-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'educacion-dolor',
          title: 'Guía de Educación en Neurociencia del Dolor',
          category: 'referencia',
          description: 'Material de apoyo para explicar el dolor a pacientes desde una perspectiva contemporánea.',
          fileSize: '567 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/referencia/Educacion-Dolor-SUFED.pdf',
          previewAvailable: true
        },
        // Infografías
        {
          id: 'infografia-dolor-cronico',
          title: 'Infografía: Entendiendo el Dolor Crónico',
          category: 'infografias',
          description: 'Representación visual del modelo biopsicosocial del dolor crónico.',
          fileSize: '1.2 MB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/infografias/Dolor-Cronico-Infografia-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'infografia-ejercicio',
          title: 'Infografía: Ejercicio y Dolor',
          category: 'infografias',
          description: 'Beneficios del ejercicio terapéutico en el manejo del dolor persistente.',
          fileSize: '980 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/infografias/Ejercicio-Dolor-Infografia-SUFED.pdf',
          previewAvailable: true
        },
        {
          id: 'infografia-mitos',
          title: 'Infografía: Mitos sobre el Dolor',
          category: 'infografias',
          description: 'Desmitificando creencias comunes sobre el dolor y su tratamiento.',
          fileSize: '850 KB',
          fileType: 'PDF',
          filePath: 'assets/documents/recursos/infografias/Mitos-Dolor-Infografia-SUFED.pdf',
          previewAvailable: true
        }
      ];
      
      this.init();
    }

    init() {
      if (!this.resourcesGrid) return;

      this.bindEvents();
      this.renderResources();
    }

    bindEvents() {
      this.categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => this.handleCategoryChange(e.currentTarget));
      });
    }

    handleCategoryChange(button) {
      const category = button.dataset.category;
      
      // Update active button
      this.categoryButtons.forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle('resources__category-btn--active', isActive);
        btn.setAttribute('aria-pressed', isActive);
      });

      // Update current category and render
      this.currentCategory = category;
      this.renderResources();
    }

    renderResources() {
      // Filter resources by category
      const filteredResources = this.currentCategory === 'all' 
        ? this.resources 
        : this.resources.filter(r => r.category === this.currentCategory);

      // Clear grid
      this.resourcesGrid.innerHTML = '';

      // Render resources or empty state
      if (filteredResources.length === 0) {
        this.renderEmptyState();
      } else {
        filteredResources.forEach(resource => {
          const card = this.createResourceCard(resource);
          this.resourcesGrid.appendChild(card);
        });
      }
    }

    createResourceCard(resource) {
      const card = document.createElement('article');
      card.className = 'resource-card';
      card.setAttribute('data-resource-id', resource.id);
      card.setAttribute('data-category', resource.category);

      const categoryLabel = this.getCategoryLabel(resource.category);
      const categoryIcon = this.getCategoryIcon(resource.category);

      card.innerHTML = `
        <div class="resource-card__header">
          <div class="resource-card__icon-wrapper">
            ${categoryIcon}
          </div>
          <div class="resource-card__header-content">
            <span class="resource-card__category">${categoryLabel}</span>
            <h3 class="resource-card__title">${resource.title}</h3>
          </div>
        </div>
        
        <div class="resource-card__content">
          <p class="resource-card__description">${resource.description}</p>
          
          <div class="resource-card__meta">
            <div class="resource-card__meta-item">
              <svg class="resource-card__meta-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 2H4a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>${resource.fileType}</span>
            </div>
            <div class="resource-card__meta-item">
              <svg class="resource-card__meta-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6h4M6 9h4M6 12h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>${resource.fileSize}</span>
            </div>
          </div>
        </div>
        
        <div class="resource-card__footer">
          <button class="resource-card__button resource-card__button--primary" 
                  data-action="download" 
                  data-resource-id="${resource.id}"
                  aria-label="Descargar ${resource.title}">
            <svg class="resource-card__button-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 2v10m0 0l-3-3m3 3l3-3M3 14h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Descargar</span>
          </button>
          ${resource.previewAvailable ? `
            <button class="resource-card__button resource-card__button--secondary" 
                    data-action="preview" 
                    data-resource-id="${resource.id}"
                    aria-label="Vista previa de ${resource.title}">
              <svg class="resource-card__button-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Vista previa</span>
            </button>
          ` : ''}
        </div>
      `;

      // Bind button events
      const downloadBtn = card.querySelector('[data-action="download"]');
      const previewBtn = card.querySelector('[data-action="preview"]');

      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => this.handleDownload(resource));
      }

      if (previewBtn) {
        previewBtn.addEventListener('click', () => this.handlePreview(resource));
      }

      return card;
    }

    getCategoryLabel(category) {
      const labels = {
        'escalas': 'Escalas y Cuestionarios',
        'referencia': 'Material de Referencia',
        'infografias': 'Infografía'
      };
      return labels[category] || category;
    }

    getCategoryIcon(category) {
      const icons = {
        'escalas': `
          <svg class="resource-card__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 6H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2M10 6a2 2 0 002 2h4a2 2 0 002-2M10 6a2 2 0 012-2h4a2 2 0 012 2m-7 10l2 2 4-4" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `,
        'referencia': `
          <svg class="resource-card__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 7v14m0-14C12.5 6 10.5 5.5 8.5 5.5S4.5 6 3 7v14c1.5-1 3.5-1.5 5.5-1.5s4 .5 5.5 1.5m0-14c1.5-1 3.5-1.5 5.5-1.5s4 .5 5.5 1.5v14c-1.5-1-3.5-1.5-5.5-1.5s-4 .5-5.5 1.5" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `,
        'infografias': `
          <svg class="resource-card__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5 18l4-4 4 4 6-6M7 24h14a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2z" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `
      };
      return icons[category] || icons['escalas'];
    }

    renderEmptyState() {
      const emptyState = document.createElement('div');
      emptyState.className = 'resources__empty';
      emptyState.innerHTML = `
        <svg class="resources__empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="40" cy="40" r="38" stroke="#BDBDBD" stroke-width="2"/>
          <path d="M40 25v20M40 55h.01" stroke="#BDBDBD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 class="resources__empty-title">No hay recursos en esta categoría</h3>
        <p class="resources__empty-text">Estamos trabajando para agregar más recursos. Vuelve pronto.</p>
      `;
      this.resourcesGrid.appendChild(emptyState);
    }

    async handleDownload(resource) {
      try {
        // Check if file exists
        const response = await fetch(resource.filePath, { method: 'HEAD' });
        
        if (response.ok) {
          // File exists, proceed with download
          this.downloadFile(resource.filePath, this.getFileName(resource));
          this.showMessage('Descarga iniciada', 'success');
        } else {
          // File doesn't exist
          this.showMessage('Este recurso estará disponible próximamente', 'info');
        }
      } catch (error) {
        console.warn('Resource not available:', resource.filePath);
        this.showMessage('Este recurso estará disponible próximamente', 'info');
      }
    }

    handlePreview(resource) {
      // Create and show PDF preview modal
      this.showPDFPreview(resource);
    }

    showPDFPreview(resource) {
      // Create modal if it doesn't exist
      let modal = document.getElementById('pdf-preview-modal');
      
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdf-preview-modal';
        modal.className = 'pdf-preview-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Vista previa de PDF');
        
        modal.innerHTML = `
          <div class="pdf-preview-modal__content">
            <div class="pdf-preview-modal__header">
              <h3 class="pdf-preview-modal__title"></h3>
              <button class="pdf-preview-modal__close" aria-label="Cerrar vista previa">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="pdf-preview-modal__body">
              <iframe class="pdf-preview-modal__iframe" src="" title="Vista previa de PDF"></iframe>
            </div>
            <div class="pdf-preview-modal__footer">
              <button class="pdf-preview-modal__download" data-resource-id="">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 2v10m0 0l-3-3m3 3l3-3M3 14h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind close events
        const closeBtn = modal.querySelector('.pdf-preview-modal__close');
        closeBtn.addEventListener('click', () => this.closePDFPreview());
        
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closePDFPreview();
          }
        });
        
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            this.closePDFPreview();
          }
        });
      }

      // Update modal content
      const title = modal.querySelector('.pdf-preview-modal__title');
      const iframe = modal.querySelector('.pdf-preview-modal__iframe');
      const downloadBtn = modal.querySelector('.pdf-preview-modal__download');

      title.textContent = resource.title;
      iframe.src = resource.filePath;
      downloadBtn.dataset.resourceId = resource.id;
      
      // Bind download button
      downloadBtn.onclick = () => this.handleDownload(resource);

      // Show modal
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      
      // Focus close button
      setTimeout(() => {
        const closeBtn = modal.querySelector('.pdf-preview-modal__close');
        if (closeBtn) closeBtn.focus();
      }, 100);
    }

    closePDFPreview() {
      const modal = document.getElementById('pdf-preview-modal');
      if (!modal) return;

      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      
      // Clear iframe
      const iframe = modal.querySelector('.pdf-preview-modal__iframe');
      if (iframe) iframe.src = '';
    }

    downloadFile(filePath, fileName) {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }

    getFileName(resource) {
      return `${resource.id}-SUFED.pdf`;
    }

    showMessage(message, type = 'info') {
      const messageEl = document.createElement('div');
      messageEl.className = `download-message download-message--${type}`;
      messageEl.textContent = message;
      messageEl.setAttribute('role', 'status');
      messageEl.setAttribute('aria-live', 'polite');
      
      const bgColors = {
        'success': '#4CAF50',
        'error': '#f44336',
        'info': '#2196F3',
        'warning': '#FF9800'
      };
      
      Object.assign(messageEl.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: bgColors[type] || bgColors.info,
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '300px',
        animation: 'slideInUp 0.3s ease-out'
      });
      
      document.body.appendChild(messageEl);
      
      setTimeout(() => {
        messageEl.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
          if (document.body.contains(messageEl)) {
            document.body.removeChild(messageEl);
          }
        }, 300);
      }, 3000);
    }
  }

  // Update initialization to include ResourcesManager
  document.addEventListener('DOMContentLoaded', function() {
    console.log('SUFED website initialized');
    
    // Initialize navbar
    new Navbar();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize education tabs
    new EducationTabs();
    
    // Initialize PDF download manager
    new PDFDownloadManager();
    
    // Initialize interpretation section
    new InterpretationSection();
    
    // Initialize resources manager
    new ResourcesManager();
  });
