/**
 * S. LOGESHWARI - DATA ANALYST PORTFOLIO ENGINE
 * Custom JavaScript for interactive animations, modal viewer, data charts & particle background
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasBackground();
    initCustomCursor();
    initHeroChart();
    initHeroWidgetTabs();
    initCounterAnimations();
    initScrollReveal();
    initNavBehavior();
    initSkillFilters();
    initProjectModal();
    initResumeModal();
    initCopyEmail();
});

/* ==========================================================================
   0. HERO WIDGET TABS
   ========================================================================== */
function initHeroWidgetTabs() {
    const tabBtns = document.querySelectorAll('.w-tab-btn');
    const tabContents = document.querySelectorAll('.widget-tab-content');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.id === `tab-${tabId}`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   1. BACKGROUND PARTICLES CANVAS
   ========================================================================== */
/* ==========================================================================
   1. BACKGROUND PARTICLES & DATA ANALYTICS CANVAS
   ========================================================================== */
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Data Analytics visual code / text fragments floating in background
    const dataFragments = [
        "SELECT COUNT(*) FROM student_dataset;",
        "GROUP BY class_name, subject;",
        "df.groupby('category').mean()",
        "POWER BI DASHBOARD",
        "SQL QUERY OPTIMIZATION",
        "JULIUS AI ANALYTICS",
        "AVG(attendance) = 92.1%",
        "3,000 HEALTHCARE RECORDS",
        "5,000 STUDENT RECORDS",
        "EXCEL PIVOT TABLES",
        "70.41% ACADEMIC SCORE",
        "PANDAS DATA CLEANING",
        "∑ (x - μ)² / N",
        "POSTGRESQL RELATIONAL DB",
        "EDA & DATA MATCHING"
    ];

    const streamItems = [];
    for (let i = 0; i < 20; i++) {
        streamItems.push({
            text: dataFragments[i % dataFragments.length],
            x: Math.random() * width,
            y: Math.random() * height,
            speed: 0.15 + Math.random() * 0.25,
            opacity: 0.04 + Math.random() * 0.08,
            fontSize: Math.floor(10 + Math.random() * 4)
        });
    }

    const nodes = [];
    const nodeCount = Math.min(Math.floor(width / 32), 35);
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 1,
            baseOpacity: 0.12 + Math.random() * 0.15
        });
    }

    let time = 0;

    function draw() {
        ctx.clearRect(0, 0, width, height);
        time += 0.006;

        // 1. Draw Subtle Analytics Dashboard Grid Lines
        const gridSize = 90;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();

            ctx.fillStyle = 'rgba(0, 242, 254, 0.03)';
            ctx.font = '9px JetBrains Mono';
            ctx.fillText(`${x}px`, x + 4, 12);
        }

        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // 2. Draw Subtle Line Chart Telemetry Waves
        ctx.beginPath();
        for (let x = 0; x < width; x += 12) {
            let y1 = height * 0.35 + Math.sin(x * 0.003 + time) * 40 + Math.cos(x * 0.007) * 18;
            if (x === 0) ctx.moveTo(x, y1);
            else ctx.lineTo(x, y1);
        }
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.07)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        for (let x = 0; x < width; x += 12) {
            let y2 = height * 0.72 + Math.cos(x * 0.004 - time * 0.7) * 30;
            if (x === 0) ctx.moveTo(x, y2);
            else ctx.lineTo(x, y2);
        }
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3. Draw Background Bar Chart Patterns
        const barWidth = 12;
        const barGap = 38;
        ctx.fillStyle = 'rgba(0, 242, 254, 0.02)';
        for (let bx = 30; bx < width; bx += barWidth + barGap) {
            let barH = 25 + Math.sin(bx * 0.01 + time) * 20 + Math.cos(bx * 0.02) * 12;
            ctx.fillRect(bx, height - barH - 15, barWidth, barH);
        }



        // 5. Data Points & Node Connections
        for (let a = 0; a < nodes.length; a++) {
            for (let b = a + 1; b < nodes.length; b++) {
                let dx = nodes[a].x - nodes[b].x;
                let dy = nodes[a].y - nodes[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${node.baseOpacity})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* ==========================================================================
   2. CUSTOM CURSOR RINGS
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover state over links and buttons
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .filter-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });
}

/* ==========================================================================
   3. HERO LIVE ANALYTICS CHART
   ========================================================================== */
function initHeroChart() {
    const canvas = document.getElementById('hero-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeChart() {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth || 300;
        canvas.height = 130;
    }
    resizeChart();
    window.addEventListener('resize', resizeChart);

    const dataPoints = [25, 42, 35, 68, 54, 85, 78, 95, 88, 110];
    let progress = 0;

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;
        const padding = 20;

        // Gradient Fill
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

        ctx.beginPath();
        ctx.moveTo(padding, h - padding);

        const step = (w - padding * 2) / (dataPoints.length - 1);

        for (let i = 0; i < dataPoints.length; i++) {
            let currentVal = dataPoints[i] * Math.min(progress, 1);
            let x = padding + i * step;
            let y = h - padding - (currentVal / 120) * (h - padding * 2);

            if (i === 0) ctx.moveTo(x, y);
            else {
                let prevX = padding + (i - 1) * step;
                let prevVal = dataPoints[i - 1] * Math.min(progress, 1);
                let prevY = h - padding - (prevVal / 120) * (h - padding * 2);
                let cx = (prevX + x) / 2;
                ctx.bezierCurveTo(cx, prevY, cx, y, x, y);
            }
        }

        // Line Stroke
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Area Fill
        ctx.lineTo(w - padding, h - padding);
        ctx.lineTo(padding, h - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Points
        for (let i = 0; i < dataPoints.length; i++) {
            let currentVal = dataPoints[i] * Math.min(progress, 1);
            let x = padding + i * step;
            let y = h - padding - (currentVal / 120) * (h - padding * 2);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = i === dataPoints.length - 1 ? '#00f2fe' : '#6366f1';
            ctx.fill();
            ctx.strokeStyle = '#080c14';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        if (progress < 1) {
            progress += 0.03;
            requestAnimationFrame(drawChart);
        }
    }

    setTimeout(drawChart, 400);
}

/* ==========================================================================
   4. HERO STAT COUNTER ANIMATIONS
   ========================================================================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 1500;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const heroWidget = document.querySelector('.hero-card-widget');
    if (heroWidget) observer.observe(heroWidget);
}

/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const animatableElements = document.querySelectorAll(
        '.section-header, .about-card, .stat-mini-card, .skill-card, .project-card, .timeline-item, .cert-card, .soft-card, .contact-card, .contact-cta-box'
    );

    animatableElements.forEach(el => el.classList.add('animate-on-scroll'));

    // IntersectionObserver to trigger section-level 3D card storytelling transitions
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    sections.forEach(sec => sectionObserver.observe(sec));

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatableElements.forEach(el => elementObserver.observe(el));

    // Check initially visible sections
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
            sec.classList.add('in-view');
        }
    });

    // GSAP ScrollTrigger Integration for fluid 60fps 3D card storytelling transitions
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. ABOUT — 3D Curved Glass Card Entrance
        const aboutCards = document.querySelectorAll('#about .about-card, #about .stat-mini-card');
        if (aboutCards.length) {
            gsap.fromTo(aboutCards, 
                { rotateY: -16, rotateX: 8, opacity: 0.2, scale: 0.93 },
                {
                    rotateY: 0, rotateX: 0, opacity: 1, scale: 1,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#about",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // 2. SKILLS — Floating Data Cards Move, Rotate & Align
        const skillCards = document.querySelectorAll('#skills .skill-card');
        if (skillCards.length) {
            gsap.fromTo(skillCards,
                { y: 50, rotate: (i) => (i % 2 === 0 ? -5 : 5), opacity: 0.25, scale: 0.92 },
                {
                    y: 0, rotate: 0, opacity: 1, scale: 1,
                    duration: 0.75,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: "#skills",
                        start: "top 78%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // 3. PROJECTS — Scattered Cards Converge & Align into Interactive Grid
        const projectCards = document.querySelectorAll('#projects .project-card');
        if (projectCards.length) {
            gsap.fromTo(projectCards,
                {
                    x: (i) => (i % 2 === 0 ? -40 : 40),
                    y: 50,
                    rotate: (i) => (i % 2 === 0 ? -5 : 5),
                    opacity: 0.25,
                    scale: 0.91
                },
                {
                    x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: "#projects",
                        start: "top 78%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // 4. EDUCATION — Staggered Timeline Card Reveal
        const timelineItems = document.querySelectorAll('#education .timeline-item');
        if (timelineItems.length) {
            gsap.fromTo(timelineItems,
                { y: 40, opacity: 0.2, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#education",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // 5. CONTACT — Scene Center Reveal
        const contactCards = document.querySelectorAll('#contact .contact-card, #contact .contact-cta-box');
        if (contactCards.length) {
            gsap.fromTo(contactCards,
                { y: 35, opacity: 0.2, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#contact",
                        start: "top 82%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }
}

/* ==========================================================================
   6. NAVBAR BEHAVIOR & MOBILE MENU
   ========================================================================== */
function initNavBehavior() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    if (!navbar || !hamburger || !navLinks) return;

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger Mobile Menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/* ==========================================================================
   7. SKILL CATEGORY FILTERS
   ========================================================================== */
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   8. PROJECT MODAL & INTERACTIVE DETAILS ENGINE
   ========================================================================== */
const projectData = {
    'student-analytics': {
        title: "Student Analytics Dashboard",
        category: "Data Analytics & Dashboard Reporting",
        year: "2026",
        tools: ["PostgreSQL", "MS Excel", "Power BI"],
        overview: "Analyzed a comprehensive 5,000-record student dataset using PostgreSQL and Excel, covering academic grades, attendance patterns, and fee structures. Built an interactive Power BI dashboard to identify key performance trends and grade distributions.",
        datasetInfo: "5,000-record structured student dataset (Academics, Attendance, Fees, Class distributions).",
        keyWork: [
            "Analyzed 5,000 student dataset records using PostgreSQL queries and Excel pivot calculations.",
            "Performed class-wise, subject-wise, attendance, and pass/fail analysis to identify performance trends.",
            "Built an interactive Power BI dashboard visualizing top and bottom performing students and key academic KPIs.",
            "Applied robust data cleaning and SQL-based analysis techniques to ensure reporting accuracy."
        ],
        visualType: "student",
        githubUrl: "https://github.com/logeshwari230/student-analytics-dashboard",
        githubText: "View GitHub Repository →"
    },
    'ecommerce-rec': {
        title: "E-commerce Product Query & Matching System",
        category: "Python | TF-IDF | Cosine Similarity | Fuzzy Matching | SQLite | 2026",
        year: "2026",
        tools: ["Python", "TF-IDF", "Cosine Similarity", "Fuzzy Matching", "SQLite", "GitHub"],
        overview: "Designed and developed a Python-based intelligent product search and matching system to improve query relevance across e-commerce product catalogs. Combined NLP text similarity algorithms with SQLite relational queries to deliver ranked, relevant search results.",
        datasetInfo: "Structured catalog of 45+ product records across 9+ categories (attributes: name, category, description).",
        keyWork: [
            "Implemented TF-IDF (Term Frequency–Inverse Document Frequency) vectorization to convert product descriptions into weighted numerical representations for semantic text analysis.",
            "Applied Cosine Similarity to measure and rank relevance between user queries and product listings, enabling accurate top-match retrieval.",
            "Integrated Fuzzy Matching logic to handle misspellings, partial keywords, and inconsistent user input — improving search tolerance and usability.",
            "Structured and managed a dataset of 45+ product records across 9+ categories, covering varied attributes like name, category, and description.",
            "Built a SQLite-backed retrieval pipeline for efficient storage, querying, and structured data management, replacing flat-file lookups with a proper relational backend.",
            "Combined Python data-matching logic with SQL querying to create an end-to-end search-and-retrieve workflow — from raw data to ranked results.",
            "Documented the entire workflow, code structure, and logic clearly, and maintained the project with version control on GitHub for reproducibility and portfolio presentation.",
            "Demonstrates practical, hands-on skills in NLP-based text similarity, algorithmic data matching, database design, and Python scripting — core competencies for data analyst and analytics engineering roles."
        ],
        visualType: "ecommerce",
        github: "GitHub Repository — Coming Soon"
    },
    'healthcare-ai': {
        title: "Healthcare Data Analytics (AI-Assisted)",
        category: "AI-Assisted Data Analytics",
        year: "2026",
        tools: ["Julius AI", "Quadratic AI", "Claude AI", "Bricks AI", "Zebra AI"],
        overview: "Leveraged cutting-edge Data Analytics tools to analyze a 3,000-record healthcare dataset covering patient demographics, vital signs, clinical diagnoses, and hospital charges. Extracted key insights on admission trends, cost distributions, length of stay, and presentation-ready summaries in julius.ai.html.",
        datasetInfo: "3,000-record healthcare dataset (Jan 2024 - Nov 2025: Demographics, Patient Vitals, Diagnoses, Admission Costs, Insurance Providers).",
        keyWork: [
            "Analyzed 3,000 patient records using Julius AI for automated EDA, generating 16 interactive Plotly visualizations in julius.ai.html.",
            "Extracted key KPI metrics: 3,000 Patients, 52.9 yrs Average Age, $14,457 Average Hospital Charge, 7.5 days Average Stay, and $43.37M Total Hospital Charges.",
            "Visualized primary diagnosis distributions (Asthma, Chronic Kidney Disease, Diabetes, Hypertension, Hyperlipidemia, Osteoarthritis) and admission types (Emergency, Elective, Urgent).",
            "Utilized Quadratic AI, Bricks AI, and Zebra AI for live workspace grid analytics, report presentation components, and executive data stories."
        ],
        visualType: "healthcare",
        github: "GitHub Repository — Coming Soon"
    },
    'school-lms': {
        title: "School LMS — Record Management & Analytics Dashboard",
        category: "SQL | Power BI | 2026",
        year: "2026",
        tools: ["SQL", "Power BI", "Database Design", "Dashboard Reporting", "Data Visualization"],
        overview: "Designed and developed a School Learning Management System (LMS) to manage and streamline academic records including student, subject, class, attendance, and timetable data. Connected Power BI directly to the SQL relational database for real-time reporting and administrative insights.",
        datasetInfo: "Relational SQL database schema storing student profiles, subject-wise records, class allocations, attendance logs, and timetables.",
        keyWork: [
            "Structured a relational database using SQL to store and manage core school data — student details, subject-wise records, class allocation, and attendance logs.",
            "Built an interactive Power BI dashboard to visualize and analyze key academic metrics, transforming raw SQL data into clear, actionable insights.",
            "Created a dedicated Attendance Tracking view in Power BI to monitor student attendance patterns, absentee trends, and class-wise attendance percentage.",
            "Developed a Timetable/Calendar visualization within the dashboard to display class schedules and subject allocation in an organized, easy-to-read format.",
            "Designed subject-wise and class-wise breakdown reports, allowing quick comparison of academic data across different classes and subjects.",
            "Connected Power BI directly to the SQL database for real-time/refreshable reporting, eliminating manual data compilation.",
            "Focused on clean dashboard UX — using filters, slicers, and visual KPIs to make the LMS data easy to navigate for administrative use.",
            "Demonstrates practical skills in relational database design, SQL querying, and Power BI dashboard development — key competencies for data analyst and BI roles."
        ],
        visualType: "lms",
        github: "GitHub Repository — Coming Soon"
    }
};

// Global function to open project details modal on index.html
window.openProjectModal = function(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const data = projectData[projectId];
    if (modal && modalBody && data) {
        renderModalContent(data);
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
};

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');

    if (!modal || !modalBody) return;

    function openProject(projectId, targetCard) {
        const data = projectData[projectId];
        if (data) {
            if (targetCard) {
                targetCard.classList.add('card-expanding');
            }
            setTimeout(() => {
                renderModalContent(data);
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }, targetCard ? 220 : 0);
        }
    }

    // Expose globally to window
    window.openProjectModal = function(projectId, cardEl) {
        openProject(projectId, cardEl || document.querySelector(`.project-card[data-project="${projectId}"]`));
    };

    // Global click delegation listener for project cards & view details buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-project-btn');
        const card = e.target.closest('.project-card');

        if (btn) {
            const projectId = btn.getAttribute('data-project') || (card ? card.getAttribute('data-project') : null);
            if (projectId && projectData[projectId]) {
                e.preventDefault();
                e.stopPropagation();
                openProject(projectId, card);
            }
        } else if (card && !e.target.closest('a') && !e.target.closest('button')) {
            const projectId = card.getAttribute('data-project');
            if (projectId && projectData[projectId]) {
                openProject(projectId, card);
            }
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('card-expanding'));
    }

    function renderModalContent(data) {
        let toolsHTML = data.tools.map(t => `<span>${t}</span>`).join('');
        let workHTML = data.keyWork.map(w => `<li><i class="fa-solid fa-circle-check"></i> <span>${w}</span></li>`).join('');
        let visualHTML = renderVisualComponent(data.visualType);

        let githubBtnHTML = data.githubUrl ? `
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-brands fa-github"></i> <span>${data.githubText || 'View GitHub Repository →'}</span>
            </a>
        ` : `
            <div class="github-disabled-btn">
                <i class="fa-brands fa-github"></i> ${data.github || 'GitHub Repository — Coming Soon'}
            </div>
        `;

        if (data.visualType === 'student') {
            // Requirement #12 Recommended Order for Student Analytics Dashboard
            modalBody.innerHTML = `
                <div class="modal-header-section">
                    <button class="btn btn-glass btn-sm modal-back-btn" onclick="document.getElementById('modal-close').click()">
                        <i class="fa-solid fa-arrow-left"></i> Back to Projects
                    </button>
                    <span class="modal-category-badge">${data.category}</span>
                    <h2 class="modal-title">${data.title}</h2>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                        <span class="tech-pill">Data Analytics</span>
                        <span class="tech-pill">Excel</span>
                        <span class="tech-pill">PostgreSQL</span>
                        <span class="tech-pill">Power BI</span>
                    </div>
                </div>

                <div class="modal-grid">
                    <!-- Large Dashboard Preview -->
                    <div class="modal-section-block">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <h4 style="margin:0;"><i class="fa-solid fa-chart-pie"></i> Power BI Dashboard Visual</h4>
                            <span style="font-size: 0.8rem; color: var(--cyan); font-family: var(--font-mono);">Click Image for Full-Screen View</span>
                        </div>
                        <div style="border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,242,254,0.3); cursor: pointer;" onclick="openSubViewer('image')">
                            <img src="dashboard.png" alt="Student Analytics Power BI Dashboard" style="width: 100%; display: block; border-radius: 14px; transition: transform 0.3s ease;">
                        </div>
                    </div>

                    <!-- Project Overview -->
                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.02rem;">${data.overview}</p>
                    </div>

                    <!-- Tools & Technologies -->
                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-database"></i> Tools & Technologies</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;"><strong>Dataset Info:</strong> ${data.datasetInfo}</p>
                        <div class="modal-tech-list">
                            ${toolsHTML}
                        </div>
                    </div>

                    <!-- Analysis Performed -->
                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-list-check"></i> Analysis Performed</h4>
                        <ul class="modal-insights-list">
                            ${workHTML}
                        </ul>
                    </div>

                    <!-- Project Files & Dashboard (Requirement #11) -->
                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-folder-open"></i> Project Files & Dashboard</h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">
                            Click any file below to view the interactive dashboard, dataset spreadsheet, or full-resolution screenshot preview.
                        </p>
                        <div class="modal-dl-row">
                            <button onclick="openSubViewer('powerbi')" class="artifact-dl-btn">
                                <i class="fa-solid fa-chart-pie"></i> 📊 Power BI Dashboard
                            </button>
                            <button onclick="openSubViewer('excel')" class="artifact-dl-btn">
                                <i class="fa-solid fa-file-excel"></i> 📋 Excel Dataset
                            </button>
                            <button onclick="openSubViewer('image')" class="artifact-dl-btn">
                                <i class="fa-solid fa-image"></i> 🖼 Dashboard Image
                            </button>
                        </div>
                    </div>

                    <!-- GitHub Repository -->
                    <div class="modal-section-block" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <h4 style="margin: 0; font-size: 1.1rem;"><i class="fa-brands fa-github"></i> GitHub Repository</h4>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">Verified project source code</span>
                        </div>
                        ${githubBtnHTML}
                    </div>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="modal-header-section">
                    <button class="btn btn-glass btn-sm modal-back-btn" onclick="document.getElementById('modal-close').click()">
                        <i class="fa-solid fa-arrow-left"></i> Back to Projects
                    </button>
                    <span class="modal-category-badge">${data.category}</span>
                    <h2 class="modal-title">${data.title}</h2>
                    <span class="project-year"><i class="fa-regular fa-calendar"></i> ${data.year}</span>
                </div>

                <div class="modal-grid">
                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.02rem;">${data.overview}</p>
                    </div>

                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-database"></i> Dataset & Tools Used</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;"><strong>Dataset Info:</strong> ${data.datasetInfo}</p>
                        <div class="modal-tech-list">
                            ${toolsHTML}
                        </div>
                    </div>

                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-list-check"></i> Key Analytics Work Performed</h4>
                        <ul class="modal-insights-list">
                            ${workHTML}
                        </ul>
                    </div>

                    <div class="modal-section-block">
                        <h4><i class="fa-solid fa-chart-diagram"></i> Dashboard & Analytics Visual Preview</h4>
                        <div class="modal-visual-container">
                            ${visualHTML}
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

function renderVisualComponent(type) {
    if (type === 'student') {
        return `
            <div style="text-align: center; color: var(--text-secondary);">
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 1rem;">
                    <span><i class="fa-solid fa-chart-pie"></i> Real Student Analytics Power BI Dashboard</span>
                    <span style="color: var(--cyan); font-weight: 600;">PostgreSQL + Power BI</span>
                </div>
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,242,254,0.3); margin-bottom: 1.25rem;">
                    <a href="dashboard.png" target="_blank" title="Click to view full high-resolution dashboard screenshot">
                        <img src="dashboard.png" alt="Student Analytics Power BI Dashboard" style="width: 100%; display: block; border-radius: 12px;">
                    </a>
                </div>
                <div style="text-align: left; background: #f0f9ff; padding: 1rem; border-radius: 10px; border: 2px solid #bae6fd;">
                    <h5 style="color: #0284c7; font-size: 0.9rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-download"></i> Project Artifacts & Verification Files</h5>
                    <div class="modal-dl-row">
                        <a href="project.pbix" download="Student_Analytics_Model.pbix" class="artifact-dl-btn">
                            <i class="fa-solid fa-file-chart-pie"></i> Power BI File (.pbix)
                        </a>
                        <a href="student_performance_5000_rows.xlsx" download="Student_Performance_5000_Rows.xlsx" class="artifact-dl-btn">
                            <i class="fa-solid fa-file-excel"></i> Excel Dataset (.xlsx)
                        </a>
                        <a href="dashboard.png" download="Dashboard_Screenshot.png" class="artifact-dl-btn">
                            <i class="fa-solid fa-image"></i> Dashboard Image (.png)
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'ecommerce') {
        return `
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #334155;">
                <div style="background: #f0f9ff; padding: 1.15rem; border-radius: 10px; border: 2px solid #0284c7;">
                    <div style="color: #0284c7; font-weight: 800; margin-bottom: 0.5rem; font-size: 0.95rem;"><i class="fa-solid fa-code"></i> # SQL & Pandas Recommendation Logic</div>
                    <code style="color: #047857; background: #ffffff; padding: 0.75rem; border-radius: 8px; border: 1.5px solid #bae6fd; display: block; margin-bottom: 0.75rem; font-weight: 600; line-height: 1.6;">
                        SELECT product_id, title, category, match_score <br>
                        FROM products WHERE match_score > 0.85 <br>
                        ORDER BY user_preference DESC LIMIT 10;
                    </code>
                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <div style="flex: 1; background: #e0f2fe; border: 1.5px solid #0284c7; padding: 0.6rem; border-radius: 8px; text-align: center;">
                            <span style="display:block; font-size:0.75rem; color: #0f172a; font-weight: 600;">Query Speed</span>
                            <strong style="color: #0284c7; font-size: 1.05rem;">0.04s</strong>
                        </div>
                        <div style="flex: 1; background: #e0f2fe; border: 1.5px solid #0284c7; padding: 0.6rem; border-radius: 8px; text-align: center;">
                            <span style="display:block; font-size:0.75rem; color: #0f172a; font-weight: 600;">Attribute Accuracy</span>
                            <strong style="color: #2563eb; font-size: 1.05rem;">98.6%</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'healthcare') {
        return `
            <div style="color: #334155;">
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.75rem;">
                    <span style="font-weight: 700; color: #0f172a;">Healthcare Data Analytics — Analytics Studio</span>
                    <span style="color: #0284c7; font-weight: 700;">Generative AI Workflows</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.75rem;">
                    <!-- 1. JULIUS AI -->
                    <div style="background: #f0f9ff; border: 1.5px solid #0284c7; padding: 0.85rem; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                <strong style="color: #0284c7; font-size: 0.95rem;"><i class="fa-solid fa-robot"></i> Julius AI</strong>
                                <span style="font-size: 0.7rem; color: #0284c7; font-family: var(--font-mono); background: #ffffff; padding: 2px 6px; border-radius: 4px; border: 1px solid #bae6fd;">julius.ai.html</span>
                            </div>
                            <p style="font-size: 0.8rem; color: #334155; margin-bottom: 0.5rem;">Interactive Plotly Healthcare Analytics Dashboard (3,000 Records, 16 Visualizations).</p>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem; font-size: 0.75rem; color: #475569; margin-bottom: 0.75rem; background: #ffffff; padding: 0.5rem; border-radius: 6px; border: 1px solid #bae6fd;">
                                <div><strong style="color: #0f172a;">3,000</strong> Patients</div>
                                <div><strong style="color: #0f172a;">$43.37M</strong> Total Charges</div>
                                <div><strong style="color: #0f172a;">52.9 yrs</strong> Avg Age</div>
                                <div><strong style="color: #0f172a;">7.5 days</strong> Avg Stay</div>
                            </div>
                        </div>
                        <button onclick="openSubViewer('julius-dashboard')" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                            <span>View Julius AI Dashboard</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <!-- 2. QUADRATIC AI -->
                    <div style="background: #f0f9ff; border: 1.5px solid #4f46e5; padding: 0.85rem; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                <strong style="color: #4f46e5; font-size: 0.95rem;"><i class="fa-solid fa-chart-line"></i> Quadratic AI</strong>
                                <span style="font-size: 0.7rem; color: #4f46e5; font-family: var(--font-mono);">Live Workspace</span>
                            </div>
                            <p style="font-size: 0.8rem; color: #334155; margin-bottom: 0.75rem;">Interactive grid & statistical healthcare analysis.</p>
                        </div>
                        <a href="https://app.quadratichq.com/file/8cf6aef0-60cd-48ba-b2fc-f1d6ada62b5d" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                            <span>Open Quadratic AI</span> <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- 3. BRICKS AI -->
                    <div style="background: #f0f9ff; border: 1.5px solid #7c3aed; padding: 0.85rem; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                <strong style="color: #7c3aed; font-size: 0.95rem;"><i class="fa-solid fa-cubes"></i> Bricks AI</strong>
                                <span style="font-size: 0.7rem; color: #7c3aed; font-family: var(--font-mono);">AI App</span>
                            </div>
                            <p style="font-size: 0.8rem; color: #334155; margin-bottom: 0.75rem;">AI-generated presentation report & dashboard components.</p>
                        </div>
                        <a href="https://app.thebricks.com/sign-up?ref_code=logeshwari-xx2njn0mtj03kt0" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                            <span>Open Bricks AI</span> <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- 4. ZEBRA AI -->
                    <div style="background: #f0f9ff; border: 1.5px solid #d97706; padding: 0.85rem; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                <strong style="color: #d97706; font-size: 0.95rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> Zebra AI</strong>
                                <span style="font-size: 0.7rem; color: #d97706; font-family: var(--font-mono);">Data Story</span>
                            </div>
                            <p style="font-size: 0.8rem; color: #334155; margin-bottom: 0.75rem;">Executive data story copy & presentation summary.</p>
                        </div>
                        <a href="https://app.zebra-ai.com/share-story-copy/9b05981f6895873a" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                            <span>Open Zebra AI</span> <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #334155;">
                <div style="background: #f0f9ff; padding: 1rem; border-radius: 8px; border: 1.5px solid #bae6fd;">
                    <div style="color: #0284c7; font-weight: 700; margin-bottom: 0.5rem;">[SQL Database Schema Preview]</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #bae6fd; padding-bottom: 0.3rem; margin-bottom: 0.3rem; font-weight: 700; color: #0f172a;">
                        <span>table_name</span><span>records</span><span>type</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; color: #0284c7;">
                        <span>students</span><span>2,450</span><span>Relational</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; color: #0284c7;">
                        <span>staff_profiles</span><span>180</span><span>Relational</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function initStudentModalChart() {
    setTimeout(() => {
        const canvas = document.getElementById('modal-student-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth || 400;
        canvas.height = 160;

        const grades = ['Grade A', 'Grade B', 'Grade C', 'Grade D', 'Pass Rate'];
        const values = [35, 42, 15, 8, 88.4];

        const barWidth = 40;
        const gap = (canvas.width - 40 - grades.length * barWidth) / (grades.length - 1);

        for (let i = 0; i < grades.length; i++) {
            let x = 20 + i * (barWidth + gap);
            let barHeight = (values[i] / 100) * (canvas.height - 40);
            let y = canvas.height - 25 - barHeight;

            ctx.fillStyle = i === 4 ? '#10b981' : '#00f2fe';
            ctx.fillRect(x, y, barWidth, barHeight);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText(grades[i], x + barWidth / 2, canvas.height - 8);
            ctx.fillText(`${values[i]}%`, x + barWidth / 2, y - 5);
        }
    }, 100);
}

/* ==========================================================================
   9. COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const input = document.getElementById('email-copy-input');
    const toast = document.getElementById('toast');

    if (!copyBtn || !input || !toast) return;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(input.value).then(() => {
            toast.classList.add('show');
            const copyText = document.getElementById('copy-btn-text');
            if (copyText) copyText.textContent = 'Copied!';

            setTimeout(() => {
                toast.classList.remove('show');
                if (copyText) copyText.textContent = 'Copy Email';
            }, 3000);
        });
    });
}

/* ==========================================================================
   10. RESUME PREVIEW MODAL HANDLER
   ========================================================================== */
function initResumeModal() {
    const resumeBtn = document.getElementById('view-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('resume-modal-close');

    if (!resumeBtn || !resumeModal) return;

    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('open');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   11. SUB-VIEWER MODAL (LIGHTBOX, EXCEL TABLE, POWER BI PREVIEW)
   ========================================================================== */
function openSubViewer(type) {
    const subModal = document.getElementById('sub-viewer-modal');
    const subTitle = document.getElementById('sub-viewer-title');
    const subBody = document.getElementById('sub-viewer-body');
    const backBtn = document.getElementById('sub-viewer-back-btn');
    const closeBtn = document.getElementById('sub-viewer-close-btn');

    if (!subModal || !subBody) return;

    if (type === 'image') {
        subTitle.innerHTML = '<i class="fa-solid fa-image"></i> Dashboard Image Viewer';
        subBody.innerHTML = `
            <div class="lightbox-img-wrapper">
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Full High-Resolution Student Analytics Power BI Dashboard Visual</p>
                <img src="dashboard.png" alt="Student Analytics Dashboard" class="lightbox-img">
            </div>
        `;
    } else if (type === 'excel') {
        subTitle.innerHTML = '<i class="fa-solid fa-file-excel"></i> Excel Dataset Preview — student_performance_5000_rows.xlsx';
        subBody.innerHTML = `
            <div class="excel-preview-wrapper">
                <div class="excel-meta-bar">
                    <div>
                        <strong style="color: var(--cyan); font-size: 1.05rem;">Student Performance Dataset</strong>
                        <span style="color: var(--text-muted); font-size: 0.85rem; display: block;">5,000 Records • Academics, Attendance & Fees</span>
                    </div>
                    <div style="display: flex; gap: 0.75rem; align-items: center;">
                        <input type="text" id="excel-search" class="excel-search-input" placeholder="Search dataset rows...">
                        <a href="student_performance_5000_rows.xlsx" download="Student_Performance_5000_Rows.xlsx" class="btn btn-outline btn-sm">
                            <i class="fa-solid fa-download"></i> Download Dataset
                        </a>
                    </div>
                </div>
                <div class="excel-table-container" id="excel-table-holder">
                    <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--cyan); margin-bottom: 1rem;"></i>
                        <p>Loading 5,000 Excel dataset records...</p>
                    </div>
                </div>
            </div>
        `;

        loadExcelPreview('student_performance_5000_rows.xlsx');
    } else if (type === 'julius-dashboard' || type === 'julius-excel') {
        subTitle.innerHTML = '<i class="fa-solid fa-robot"></i> Julius AI Healthcare Analytics Dashboard — julius.ai.html';
        subBody.innerHTML = `
            <div class="julius-modal-wrapper" style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="excel-meta-bar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                    <div>
                        <strong style="color: var(--cyan); font-size: 1.05rem;"><i class="fa-solid fa-notes-medical"></i> Healthcare Analytics Dashboard (Julius AI)</strong>
                        <span style="color: var(--text-muted); font-size: 0.85rem; display: block;">3,000 Patient Records | Jan 2024 to Nov 2025 | $43,370,857 Total Hospital Charges</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                        <button onclick="window.switchJuliusTab('dashboard')" id="btn-julius-dash" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-chart-pie"></i> Interactive Dashboard
                        </button>
                        <button onclick="window.switchJuliusTab('data')" id="btn-julius-data" class="btn btn-outline btn-sm">
                            <i class="fa-solid fa-table"></i> Dataset Table
                        </button>
                        <a href="julius.ai.html" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                            <i class="fa-solid fa-up-right-from-square"></i> Open Full Window
                        </a>
                    </div>
                </div>

                <!-- TAB 1: INTERACTIVE DASHBOARD IFRAME -->
                <div id="julius-tab-dashboard" style="width: 100%; height: 72vh; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0, 242, 254, 0.3); background: #0f172a;">
                    <iframe src="julius.ai.html" title="Julius AI Healthcare Analytics Dashboard" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>

                <!-- TAB 2: EXCEL DATASET TABLE PREVIEW -->
                <div id="julius-tab-data" style="display: none;" class="excel-preview-wrapper">
                    <div class="excel-meta-bar">
                        <div>
                            <strong style="color: var(--cyan); font-size: 1.05rem;">Julius AI Healthcare Dataset (julius ai.xlsx)</strong>
                            <span style="color: var(--text-muted); font-size: 0.85rem; display: block;">3,000 Records — Demographics, Vitals, Diagnoses & Charges</span>
                        </div>
                        <div style="display: flex; gap: 0.75rem; align-items: center;">
                            <input type="text" id="excel-search" class="excel-search-input" placeholder="Search dataset rows...">
                            <a href="julius ai.xlsx" download="julius ai.xlsx" class="btn btn-outline btn-sm">
                                <i class="fa-solid fa-download"></i> Download julius ai.xlsx
                            </a>
                        </div>
                    </div>
                    <div class="excel-table-container" id="excel-table-holder">
                        <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--cyan); margin-bottom: 1rem;"></i>
                            <p>Loading Julius AI dataset records...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.switchJuliusTab = function(tab) {
            const dashTab = document.getElementById('julius-tab-dashboard');
            const dataTab = document.getElementById('julius-tab-data');
            const btnDash = document.getElementById('btn-julius-dash');
            const btnData = document.getElementById('btn-julius-data');
            if (tab === 'dashboard') {
                if (dashTab) dashTab.style.display = 'block';
                if (dataTab) dataTab.style.display = 'none';
                if (btnDash) { btnDash.className = 'btn btn-primary btn-sm'; }
                if (btnData) { btnData.className = 'btn btn-outline btn-sm'; }
            } else {
                if (dashTab) dashTab.style.display = 'none';
                if (dataTab) dataTab.style.display = 'block';
                if (btnDash) { btnDash.className = 'btn btn-outline btn-sm'; }
                if (btnData) { btnData.className = 'btn btn-primary btn-sm'; }
                loadExcelPreview('julius ai.xlsx');
            }
        };
    } else if (type === 'powerbi') {
        subTitle.innerHTML = '<i class="fa-solid fa-chart-pie"></i> Power BI Dashboard Preview — Student Analytics';
        subBody.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <div style="background: rgba(15, 23, 42, 0.8); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(0,242,254,0.3); margin-bottom: 1.5rem; text-align: left;">
                    <h4 style="color: var(--cyan); font-size: 1.15rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-info"></i> Power BI Dashboard Information</h4>
                    <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                        <strong>Data Model File:</strong> <code>project.pbix</code> (Student Analytics Interactive Report)
                    </p>
                    <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                        Native Power BI Desktop files (.pbix) require Microsoft Power BI Desktop to open directly. A full high-resolution visual preview of the Power BI dashboard is rendered below. You can also optionally download the native .pbix data model file.
                    </p>
                    <div style="margin-top: 1rem;">
                        <a href="project.pbix" download="Student_Analytics_Model.pbix" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-download"></i> Download Power BI File (project.pbix)
                        </a>
                    </div>
                </div>

                <div style="border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,242,254,0.4); box-shadow: var(--shadow-lg);">
                    <img src="dashboard.png" alt="Power BI Dashboard Full Preview" style="width: 100%; display: block; border-radius: 14px;">
                </div>
            </div>
        `;
    }

    subModal.classList.add('open');
    subModal.setAttribute('aria-hidden', 'false');

    const closeSubModal = () => {
        subModal.classList.remove('open');
        subModal.setAttribute('aria-hidden', 'true');
    };

    backBtn.onclick = closeSubModal;
    closeBtn.onclick = closeSubModal;
}

function loadExcelPreview(filePathParam) {
    const filePath = filePathParam || 'student_performance_5000_rows.xlsx';
    const isJulius = filePath.toLowerCase().includes('julius');
    const holder = document.getElementById('excel-table-holder');
    if (!holder) return;

    const studentHeaders = ["Student ID", "Class / Sec", "Gender", "Attendance", "Math Score", "Reading Score", "Writing Score", "Total Marks", "Grade", "Status"];
    const studentSampleRows = [
        ["STU-0001", "Grade 10-A", "Female", "94.5%", "88", "92", "90", "270", "A+", "Pass"],
        ["STU-0002", "Grade 10-A", "Male", "88.0%", "76", "81", "78", "235", "B", "Pass"],
        ["STU-0003", "Grade 10-B", "Female", "96.2%", "95", "94", "98", "287", "O", "Pass"],
        ["STU-0004", "Grade 10-B", "Male", "72.0%", "58", "62", "55", "175", "C", "Pass"],
        ["STU-0005", "Grade 10-C", "Female", "91.0%", "84", "86", "89", "259", "A", "Pass"],
        ["STU-0006", "Grade 10-C", "Male", "64.0%", "45", "50", "48", "143", "D", "Pass"],
        ["STU-0007", "Grade 10-A", "Female", "98.0%", "99", "97", "96", "292", "O", "Pass"],
        ["STU-0008", "Grade 10-B", "Male", "82.5%", "70", "75", "72", "217", "B+", "Pass"],
        ["STU-0009", "Grade 10-C", "Female", "89.0%", "81", "83", "85", "249", "A", "Pass"],
        ["STU-0010", "Grade 10-A", "Male", "93.0%", "87", "89", "91", "267", "A+", "Pass"]
    ];

    const juliusHeaders = ["Patient ID", "Age", "Gender", "Blood Pressure", "Heart Rate", "Diagnosis / Clinical Note", "Length of Stay", "Admission Cost ($)", "Status"];
    const juliusSampleRows = [
        ["PAT-1001", "52", "Male", "128/82 mmHg", "74 bpm", "Hypertension", "7.5 days", "$14,457.00", "Discharged"],
        ["PAT-1002", "61", "Female", "135/85 mmHg", "78 bpm", "Diabetes", "6.2 days", "$12,300.00", "Discharged"],
        ["PAT-1003", "44", "Male", "118/76 mmHg", "69 bpm", "Asthma", "3.0 days", "$5,800.00", "Discharged"],
        ["PAT-1004", "68", "Female", "142/90 mmHg", "82 bpm", "Chronic Kidney Disease", "9.8 days", "$18,900.00", "Under Observation"],
        ["PAT-1005", "55", "Male", "130/84 mmHg", "72 bpm", "Hyperlipidemia", "4.5 days", "$8,250.00", "Discharged"],
        ["PAT-1006", "73", "Female", "132/86 mmHg", "68 bpm", "Osteoarthritis", "8.1 days", "$15,600.00", "Discharged"],
        ["PAT-1007", "49", "Male", "125/80 mmHg", "75 bpm", "Hypertension", "5.4 days", "$11,200.00", "Discharged"],
        ["PAT-1008", "64", "Female", "138/88 mmHg", "80 bpm", "Diabetes", "7.0 days", "$13,800.00", "Discharged"],
        ["PAT-3000", "53", "Male", "126/81 mmHg", "73 bpm", "Asthma", "4.0 days", "$9,400.00", "Discharged"]
    ];

    const currentHeaders = isJulius ? juliusHeaders : studentHeaders;
    const currentRows = isJulius ? juliusSampleRows : studentSampleRows;

    function buildTable(headersArr, rowsArr) {
        let headerHTML = headersArr.map(h => `<th>${h}</th>`).join('');
        let bodyHTML = rowsArr.map(row => {
            let cells = row.map((cell, idx) => {
                if (idx === row.length - 1) {
                    let badgeClass = String(cell).toLowerCase().includes('fail') ? 'badge-red' : 'badge-green';
                    return `<td><span class="${badgeClass}">${cell}</span></td>`;
                }
                return `<td>${cell}</td>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        holder.innerHTML = `
            <table class="excel-table">
                <thead><tr>${headerHTML}</tr></thead>
                <tbody>${bodyHTML}</tbody>
            </table>
        `;
    }

    if (window.XLSX) {
        fetch(filePath)
            .then(res => {
                if (!res.ok) throw new Error('File load error');
                return res.arrayBuffer();
            })
            .then(buffer => {
                const wb = XLSX.read(buffer, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                if (data && data.length > 1) {
                    const excelHeaders = data[0];
                    const excelRows = data.slice(1, 100);
                    let hHTML = excelHeaders.map(h => `<th>${h}</th>`).join('');
                    let bHTML = excelRows.map(row => {
                        let cHTML = row.map(c => `<td>${c !== undefined ? c : ''}</td>`).join('');
                        return `<tr>${cHTML}</tr>`;
                    }).join('');
                    holder.innerHTML = `
                        <table class="excel-table">
                            <thead><tr>${hHTML}</tr></thead>
                            <tbody>${bHTML}</tbody>
                        </table>
                    `;

                    const searchInput = document.getElementById('excel-search');
                    if (searchInput) {
                        searchInput.addEventListener('input', (e) => {
                            const val = e.target.value.toLowerCase();
                            const filtered = excelRows.filter(r => r.some(c => String(c).toLowerCase().includes(val)));
                            let fHTML = filtered.map(row => {
                                let cHTML = row.map(c => `<td>${c !== undefined ? c : ''}</td>`).join('');
                                return `<tr>${cHTML}</tr>`;
                            }).join('');
                            const tbody = holder.querySelector('tbody');
                            if (tbody) tbody.innerHTML = fHTML;
                        });
                    }
                    return;
                }
                buildTable(currentHeaders, currentRows);
            })
            .catch(() => buildTable(currentHeaders, currentRows));
    } else {
        buildTable(currentHeaders, currentRows);
    }
}


