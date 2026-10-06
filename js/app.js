// Ensure client-side browser execution safety
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Initialize Lucide Icons & DOM setup
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
      lucide.createIcons();
    }
    initTypewriter();
    initParticles();
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });

  // Typewriter Effect
  const roles = [
    'Full-Stack Developer',
    'C++ & Algorithmic Problem Solver',
    'B.Tech CSE @ Lovely Professional University',
    '200+ LeetCode & Codeforces Solutions',
    'MERN & Next.js Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(initTypewriter, typingSpeed);
  }

  // Particle Canvas Animation
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 45);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(6, 182, 212, 0.3)';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }
  });

  // Skill Filter
  window.filterSkills = function (category) {
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-category') === category) {
        tab.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        tab.classList.remove('bg-slate-900', 'border-slate-800', 'text-slate-400');
      } else {
        tab.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        tab.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-400');
      }
    });

    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  };

  // Toast Helper
  window.showToast = function (message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Copy Email
  window.copyEmail = function () {
    const email = 'rajguptarohit361@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      window.showToast('Copied rajguptarohit361@gmail.com to clipboard!');
    }).catch(() => {
      window.showToast('Email: rajguptarohit361@gmail.com');
    });
  };

  // Resume Modal
  window.openResumeModal = function () {
    const modal = document.getElementById('resume-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  };

  window.closeResumeModal = function () {
    const modal = document.getElementById('resume-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  // Project Details Data
  const projectDetails = {
    student: {
      title: 'Student Management System',
      date: 'Jun 26 – Jul 26',
      status: 'GitHub Repository & C++ Architecture',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      description: 'A robust, high-performance console application built with modern C++11 and STL containers enabling efficient record creation, multi-criteria sorting, and fast lookups across large datasets.',
      highlights: [
        'Developed a console-based Student System using C++11 STL containers, enabling efficient record creation, updates, deletions, and analytics.',
        'Implemented Merge Sort (O(n log n)) for multi-criteria sorting and Binary Search (O(log n)) for fast lookups across large datasets.',
        'Optimized memory management with dynamic allocation and defensive stream programming, reducing crashes, buffer overflows, and memory leaks.'
      ],
      tech: ['C++11', 'STL (Vectors, Maps, Lists)', 'Merge Sort O(n log n)', 'Binary Search O(log n)', 'Memory Management'],
      github: 'https://github.com/Rohit9065/SummerIntershipDsa'
    },
    paranormal: {
      title: 'AI Paranormal Activity Detector',
      date: 'Apr 26 – May 26',
      status: 'Live Demo & Deployed on Vercel',
      badgeClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      description: 'An AI-powered conversational investigation assistant that guides users through structured paranormal investigations, evidence collection, and hypothesis generation.',
      highlights: [
        'Engineered an AI-powered chatbot that guides users through structured paranormal investigations by collecting case details, observations, and evidence notes.',
        'Designed conversational workflows to examine reported anomalies, organize findings, and suggest possible explanations or next investigative steps.',
        'Integrated an interactive web interface and deployed the application on Vercel for accessible case-based investigation.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'AI API', 'Vercel Deployment'],
      liveDemo: 'https://ai-paranormal-activity-detector.vercel.app',
      github: 'https://github.com/Rohit9065/AiParanormalActivity_detector'
    },
    medipulse: {
      title: 'Medipulse - Smart Hospital Management Platform',
      date: 'Mar 26 – Apr 26',
      status: 'Live Demo & Full-Stack Platform',
      badgeClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      description: 'A unified healthcare management solution developed to streamline clinical workflows, patient tracking, smart queues, and automated hospital logistics.',
      highlights: [
        'Architected a unified hospital platform for patient registration, smart queues, appointments, consultations, and medical records.',
        'Enabled real-time dashboards, bed/ward tracking, pharmacy operations, and automated inventory management.',
        'Enhanced productivity and gained hands-on experience in full-stack development, REST APIs, and application deployment.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Express', 'Node.js', 'MongoDB', 'REST APIs'],
      liveDemo: 'https://smartcare-hms-avk9.onrender.com',
      github: 'https://github.com/Rohit9065/medipulse'
    }
  };

  // Project Modal Handler
  window.openProjectModal = function (key) {
    const p = projectDetails[key];
    if (!p) return;

    const modalBody = document.getElementById('project-modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono ${p.badgeClass}">${p.status}</span>
          <h3 class="text-xl font-bold text-white mt-1.5">${p.title}</h3>
          <p class="text-xs text-slate-400 font-mono mt-0.5">${p.date}</p>
        </div>
        <button onclick="closeProjectModal()" class="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="py-5 space-y-4 text-sm text-slate-300">
        <p class="leading-relaxed">${p.description}</p>
        
        <div>
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">Key Technical Implementations</h4>
          <ul class="space-y-2 text-xs">
            ${p.highlights.map(h => `
              <li class="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">Tech Stack</h4>
          <div class="flex flex-wrap gap-1.5">
            ${p.tech.map(t => `<span class="tech-badge px-2.5 py-1 rounded-md text-[11px] font-mono">${t}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
        <button onclick="closeProjectModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">
          Close
        </button>
        ${p.liveDemo ? `
          <a href="${p.liveDemo}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
            <i data-lucide="external-link" class="w-4 h-4"></i>
            <span>Open Live Demo</span>
          </a>
        ` : ''}
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>View on GitHub</span>
        </a>
      </div>
    `;

    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  };

  window.closeProjectModal = function () {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  // Contact Form Submit Handler
  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value || 'Portfolio Contact';
    const message = document.getElementById('contact-message').value;

    const btn = document.getElementById('submit-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span class="inline-block animate-spin mr-2">&#9696;</span> Sending...`;
    btn.disabled = true;

    setTimeout(() => {
      const mailtoUrl = `mailto:rajguptarohit361@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Rohit,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      window.showToast(`Thanks ${name}! Your email client has been prepared.`);
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      const form = document.getElementById('contact-form');
      if (form) form.reset();
    }, 800);
  };

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeResumeModal();
      window.closeProjectModal();
    }
  });
})();
