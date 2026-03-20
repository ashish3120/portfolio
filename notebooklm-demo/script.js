const state = {
    currentStep: 'research',
    sources: [
        { id: 1, type: 'pdf', title: 'Product Specification v2.1.pdf', status: 'Analyzing...' },
        { id: 2, type: 'doc', title: 'Market Research Summary.docx', status: 'Ready' },
        { id: 3, type: 'web', title: 'Competitive Analysis.url', status: 'Ready' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const startResearchBtn = document.getElementById('start-research-btn');
    const startBuildBtn = document.getElementById('start-build-btn');
    const sourcesList = document.getElementById('sources-list');

    // Initial render of sources
    renderSources();

    startResearchBtn.addEventListener('click', () => {
        simulateResearch();
    });

    startBuildBtn.addEventListener('click', () => {
        simulateBuild();
    });
});

function renderSources() {
    const list = document.getElementById('sources-list');
    list.innerHTML = '';
    
    state.sources.forEach(source => {
        const item = document.createElement('div');
        item.className = 'source-item';
        item.innerHTML = `
            <div class="source-icon">${getIcon(source.type)}</div>
            <div class="source-info">
                <div class="source-title" style="font-weight: 600; font-size: 0.9rem;">${source.title}</div>
                <div class="source-status" style="font-size: 0.75rem; color: #94a3b8;">${source.status}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function getIcon(type) {
    switch(type) {
        case 'pdf': return '📄';
        case 'doc': return '📝';
        case 'web': return '🔗';
        default: return '📁';
    }
}

async function simulateResearch() {
    const btn = document.getElementById('start-research-btn');
    btn.disabled = true;
    btn.textContent = 'Analyzing Sources...';

    // Fake progress on sources
    const statuses = document.querySelectorAll('.source-status');
    for (let status of statuses) {
        if (status.textContent === 'Analyzing...') {
            await sleep(1500);
            status.textContent = 'Verified ✔️';
            status.style.color = '#10b981';
        }
    }

    await sleep(800);
    
    // Transition to Plan
    updateStepUI('plan');
    document.getElementById('discovery-card').classList.add('hidden');
    document.getElementById('plan-card').classList.remove('hidden');

    const planPreview = document.getElementById('plan-preview');
    const steps = [
        'Extracting design tokens from Product Spec...',
        'Mapping user flows from Research summary...',
        'Generating responsive container structure...',
        'Applying glassmorphism theme...'
    ];

    for (const step of steps) {
        const p = document.createElement('p');
        p.className = 'plan-step';
        p.style.textAlign = 'left';
        p.style.fontSize = '0.9rem';
        p.style.marginBottom = '0.5rem';
        p.innerHTML = `→ ${step}`;
        planPreview.appendChild(p);
        await sleep(600);
    }
}

async function simulateBuild() {
    const btn = document.getElementById('start-build-btn');
    btn.disabled = true;
    btn.textContent = 'Building...';

    updateStepUI('build');
    document.getElementById('plan-card').classList.add('hidden');
    document.getElementById('build-card').classList.remove('hidden');

    await sleep(2000);

    const buildPreview = document.getElementById('build-preview');
    buildPreview.innerHTML = `
        <div class="app-mock" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin-top: 1rem;">
            <div style="height: 10px; width: 40%; background: #6366f1; border-radius: 5px; margin-bottom: 10px;"></div>
            <div style="height: 10px; width: 100%; background: rgba(255,255,255,0.1); border-radius: 5px; margin-bottom: 5px;"></div>
            <div style="height: 10px; width: 90%; background: rgba(255,255,255,0.1); border-radius: 5px; margin-bottom: 5px;"></div>
            <div style="display: flex; gap: 5px; margin-top: 15px;">
                <div style="height: 20px; width: 40px; background: rgba(255,255,255,0.2); border-radius: 4px;"></div>
                <div style="height: 20px; width: 40px; background: rgba(255,255,255,0.2); border-radius: 4px;"></div>
            </div>
        </div>
    `;

    document.getElementById('success-msg').classList.remove('hidden');
}

function updateStepUI(step) {
    document.getElementById('step-research').classList.remove('active');
    document.getElementById('step-plan').classList.remove('active');
    document.getElementById('step-build').classList.remove('active');
    
    if (step === 'plan') {
        document.getElementById('step-research').classList.add('completed');
        document.getElementById('step-plan').classList.add('active');
    } else if (step === 'build') {
        document.getElementById('step-research').classList.add('completed');
        document.getElementById('step-plan').classList.add('completed');
        document.getElementById('step-build').classList.add('active');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
