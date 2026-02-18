// Initialize KaTeX
document.addEventListener('DOMContentLoaded', function() {
    renderMathInDocument();
    loadProgress();
    initializeInteractiveElements();
});

// Render all LaTeX equations
function renderMathInDocument() {
    document.querySelectorAll('.math-example').forEach(el => {
        const formula = el.getAttribute('data-formula');
        if (formula) {
            katex.render(formula, el, {
                throwOnError: false,
                displayMode: true
            });
        }
    });
}

// Progress tracking using localStorage
function updateProgress(lessonId) {
    let progress = JSON.parse(localStorage.getItem('manifolds-progress') || '{}');
    progress[lessonId] = true;
    localStorage.setItem('manifolds-progress', JSON.stringify(progress));
    loadProgress();
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('manifolds-progress') || '{}');
    const completed = Object.keys(progress).length;
    const total = 7; // Total number of lessons
    
    const progressBar = document.getElementById('progress-bar');
    const lessonsDone = document.getElementById('lessons-done');
    
    if (progressBar) {
        const percentage = (completed / total) * 100;
        progressBar.style.width = `${percentage}%`;
    }
    
    if (lessonsDone) {
        lessonsDone.textContent = completed;
    }
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress?')) {
        localStorage.removeItem('manifolds-progress');
        loadProgress();
    }
}

// Quiz functionality
function checkAnswer(selectedIndex, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    
    options.forEach(opt => {
        opt.disabled = true;
    });
    
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        feedback.innerHTML = '✅ Correct! The surface of a sphere is 2-dimensional.';
        feedback.style.color = 'var(--success)';
        
        // Award progress
        updateProgress('quiz-intro');
    } else {
        options[selectedIndex].classList.add('incorrect');
        feedback.innerHTML = '❌ Try again! Think about how many coordinates you need to specify a point on a sphere\'s surface.';
        feedback.style.color = 'var(--error)';
    }
}

// Interactive visualizations
function loadVisualization(type) {
    const container = document.getElementById(`${type}-preview`);
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    switch(type) {
        case 'sphere':
            createSphereVisualization(container);
            break;
        case 'torus':
            createTorusVisualization(container);
            break;
        case 'klein':
            createKleinVisualization(container);
            break;
    }
}

// Three.js sphere visualization
function createSphereVisualization(container) {
    const width = container.clientWidth;
    const height = 200;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    const light = new THREE.PointLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    camera.position.z = 3;
    
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();
}

// Torus visualization
function createTorusVisualization(container) {
    const width = container.clientWidth;
    const height = 200;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    
    const light = new THREE.PointLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    camera.position.z = 3;
    
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize all interactive elements
function initializeInteractiveElements() {
    // Load preview visualizations
    loadVisualization('sphere');
    loadVisualization('torus');
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    document.querySelectorAll('.card, .viz-card').forEach(el => {
        observer.observe(el);
    });
}

// GitHub Pages specific: Handle SPA-like navigation
window.addEventListener('load', function() {
    // Fix for GitHub Pages 404 on direct links
    if (window.location.hostname.includes('github.io')) {
        const base = window.location.pathname.split('/').slice(0, -1).join('/');
        document.querySelectorAll('a').forEach(a => {
            if (a.href.startsWith(window.location.origin + base)) {
                // Already correct
            } else if (a.href.startsWith('/')) {
                // Convert absolute paths to relative
                a.href = base + a.href;
            }
        });
    }
});
