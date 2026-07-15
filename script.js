// ── Data & Live Telemetry ──
// We target standard web services to pull mock dynamic industry metrics
const STATIC_CORP_DATA = 'https://api.open-meteo.com/v1/forecast?latitude=21.54&longitude=39.17&current_weather=true';

const CREATURES = [
  {
    name: 'Petromin Lube', sci: 'Premium Lubricants', emoji: '🛢️', color: '#009639',
    model: 'models/lube_drum.glb', // Add your own model files here
    tags: ['Synthetics', 'Global Exports', 'API Certified'],
    habitat: 'Engine Protection & Efficiency', diet: 'Premium Base Oils',
    depth: '40+ Countries', status: 'Active Production',
    fact: 'Petromin Lubricants are engineered to withstand extreme desert heat, keeping engine friction levels near zero even under immense workloads.'
  },
  {
    name: 'Express Care', sci: 'Rapid Auto Service', emoji: '🚗', color: '#ffcc00',
    model: 'models/car_engine.glb',
    tags: ['10-Min Oil Change', '700+ Outlets', 'Premium Care'],
    habitat: 'Quick Passenger Vehicle Care', diet: 'Full Synthetic Lubes',
    depth: 'Saudi Arabia & Gulf', status: 'Market Leader',
    fact: 'Petromin Express Care is the largest fast-service network in the Middle East, servicing millions of passenger cars annually.'
  },
  {
    name: 'Electromin', sci: 'EV Charging Network', emoji: '⚡', color: '#00ff66',
    model: 'models/ev_charger.glb',
    tags: ['Eco-Friendly', 'DC Fast Chargers', 'Smart Grid'],
    habitat: 'Zero-Emission EV Corridors', diet: 'Clean Electric Power',
    depth: 'Nationwide Network', status: 'Pioneering State',
    fact: 'Electromin is building Saudi Arabia’s primary public EV charging network, reducing transit emissions for a sustainable Future.'
  },
  {
    name: 'Fuel Stations', sci: 'Modern Retail Canopy', emoji: '⛽', color: '#ffffff',
    model: 'models/fuel_pump.glb',
    tags: ['Primo Retail Store', 'High-Flow Dispenser', 'Saudi Vision 2030'],
    habitat: 'Corporate Fuel Distribution', diet: 'Octane 91 / 95',
    depth: 'Major Transit Highways', status: 'Rapid Expansion',
    fact: 'Petromin Fuel stations combine secure, smart pump technology with Primo retail convenience nodes for an optimal highway stop.'
  }
];

// ── Build Cards ──
const cards = document.getElementById('cards');
CREATURES.forEach(c => {
  const el = document.createElement('article');
  el.innerHTML = `
    <div class="card-stripe" style="background:${c.color}"></div>
    <div class="card-body">
      <span class="card-emoji">${c.emoji}</span>
      <div class="card-info">
        <h3>${c.name}</h3>
        <small>${c.sci}</small>
        <div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <span>→</span>
    </div>`;
  el.addEventListener('click', () => openViewer(c));
  cards.appendChild(el);
});

// ── Screen Navigation ──
const screens = document.querySelectorAll('.screen');
function show(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  closeInfo();
}
window.show = show; 

// ── Viewer ──
const mv = document.getElementById('mv');
let infoOpen = false;

function openViewer(c) {
  show('viewer');
  mv.src = c.model;
  mv.alt = c.name;

  // Fill info card
  document.getElementById('iName').textContent    = c.name;
  document.getElementById('iSci').textContent     = c.sci;
  document.getElementById('iEmoji').textContent   = c.emoji;
  document.getElementById('iHabitat').textContent = c.habitat;
  document.getElementById('iDiet').textContent    = c.diet;
  document.getElementById('iDepth').textContent   = c.depth;
  document.getElementById('iStatus').textContent  = c.status;
  document.getElementById('iFact').textContent    = c.fact;
  fetchCorporateLiveStats();
}

// Fetch dummy live environmental context metrics for Petromin HQ
async function fetchCorporateLiveStats() {
  document.getElementById('obisLoading').style.display = 'block';
  document.getElementById('obisDl').style.display      = 'none';
  document.getElementById('obisError').style.display   = 'none';

  try {
    const statsRes = await fetch(STATIC_CORP_DATA);
    const data = await statsRes.json();
    
    // Convert real environmental status to corporate performance signals
    const activeOutlets = 700 + Math.floor(Math.random() * 25);
    const serviceRate = (98.4 + Math.random() * 1.5).toFixed(1) + "%";
    const updateTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    document.getElementById('obisCount').textContent    = activeOutlets + ' Units';
    document.getElementById('obisDate').textContent     = updateTime;
    document.getElementById('obisLocation').textContent = "Jeddah Headquarters — " + serviceRate + " Quality Index";

    document.getElementById('obisLoading').style.display = 'none';
    document.getElementById('obisDl').style.display      = 'grid';

  } catch (err) {
    document.getElementById('obisLoading').style.display = 'none';
    document.getElementById('obisError').style.display   = 'block';
  }
}

// Play animation when model loads
mv.addEventListener('load', () => {
  const anim = mv.availableAnimations;
  if (anim?.length) { mv.animationName = anim[0]; mv.play(); }
  document.getElementById('arBtn').style.display = mv.canActivateAR ? 'block' : 'none';
});

// AR button
document.getElementById('arBtn').addEventListener('click', () => mv.activateAR());

// Tap model in 3D preview
mv.addEventListener('click', e => {
  if (e.target.closest('#arBtn')) return;
  ripple(e.clientX, e.clientY);
  infoOpen ? closeInfo() : openInfo();
});

function openInfo()  {
  document.getElementById('infoCard').classList.add('open');
  infoOpen = true;
}

function closeInfo() {
  document.getElementById('infoCard').classList.remove('open');
  infoOpen = false;
}
window.closeInfo = closeInfo;

// ── Ripple ──
function ripple(x, y) {
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.cssText = `left:${x}px;top:${y}px`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 650);
}