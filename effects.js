// 1. MÀN HÌNH CHÀO MỪNG GSAP
document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".splash-title", { y: 60, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from(".splash-subtitle", { y: 40, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.fromTo(".btn-glow", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.6, ease: "back.out(1.5)" });
    
    elements.btnStartApp.addEventListener("click", () => {
        gsap.to(elements.splashScreen, {
            y: "-100%", opacity: 0, duration: 1, ease: "power3.inOut",
            onComplete: () => {
                elements.splashScreen.style.display = "none";
                elements.mainApp.style.display = "block";
                gsap.from(".dashboard-wrapper", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.2)" });
                gsap.from(".sidebar-left", { x: -50, opacity: 0, duration: 0.8, delay: 0.2 });
                gsap.from(".sidebar-right", { x: 50, opacity: 0, duration: 0.8, delay: 0.2 });
                gsap.from(".main-panel", { y: 30, opacity: 0, duration: 0.8, delay: 0.4 });
            }
        });
    });
});

// 2. ROBOT VẪY TAY
if (elements.robotContainer && elements.rightArm) {
    elements.robotContainer.addEventListener('click', () => {
        if (!elements.rightArm.classList.contains('waving')) {
            elements.rightArm.classList.add('waving');
            setTimeout(() => elements.rightArm.classList.remove('waving'), 1800);
        }
    });
}

// 3. HIỆU ỨNG NGHIÊNG 3D KHUNG KÍNH
const glassPanels = document.querySelectorAll('.sidebar-left, .sidebar-right, .transcript-box');
glassPanels.forEach(panel => {
    let rect;
    panel.addEventListener('mouseenter', () => rect = panel.getBoundingClientRect());
    panel.addEventListener('mousemove', (e) => {
        if(!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tiltX = (y - rect.height / 2) / 40; 
        const tiltY = (rect.width / 2 - x) / 40;
        panel.style.transition = 'transform 0.1s ease-out';
        panel.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    panel.addEventListener('mouseleave', () => {
        rect = null;
        panel.style.transition = 'transform 0.5s ease-in-out';
        panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 4. VŨ TRỤ GALAXY 3D TRÊN CANVAS
if (elements.canvas) {
    const ctx = elements.canvas.getContext('2d');
    let w = elements.canvas.width = window.innerWidth;
    let h = elements.canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = elements.canvas.width = window.innerWidth;
        h = elements.canvas.height = window.innerHeight;
    });

    const stars = [];
    const numStars = 800; 
    let mouseX = w / 2;
    let mouseY = h / 2;

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = (Math.random() - 0.5) * 3000;
            this.y = (Math.random() - 0.5) * 3000;
            this.z = Math.random() * 2000 + 100;
            this.pz = this.z;
            const colors = ['#ffffff', '#3b82f6', '#10b981', '#8b5cf6'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.z -= 4; 
            if (this.z < 10) { this.reset(); this.pz = this.z; }
        }
        draw() {
            const cx = w / 2, cy = h / 2;
            const offsetX = (mouseX - cx) * 0.05;
            const offsetY = (mouseY - cy) * 0.05;

            const sx = ((this.x - offsetX) / this.z) * cx + cx;
            const sy = ((this.y - offsetY) / this.z) * cx + cy;
            const r = Math.max(0.1, 2 - this.z / 1000); 

            const px = ((this.x - offsetX) / this.pz) * cx + cx;
            const py = ((this.y - offsetY) / this.pz) * cx + cy;
            this.pz = this.z;

            if (sx < 0 || sx > w || sy < 0 || sy > h) return;

            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy);
            ctx.lineWidth = r * 1.5; ctx.strokeStyle = this.color; ctx.stroke();

            ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff'; ctx.fill();
        }
    }
    for (let i = 0; i < numStars; i++) stars.push(new Star());

    function animateGalaxy() {
        ctx.fillStyle = 'rgba(11, 17, 32, 0.2)'; ctx.fillRect(0, 0, w, h);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateGalaxy);
    }
    animateGalaxy();
}