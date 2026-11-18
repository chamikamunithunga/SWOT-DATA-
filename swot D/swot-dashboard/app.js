const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
const streamToggle = document.getElementById('stream-toggle');

const metricTotal = document.getElementById('metric-total');
const metricMean = document.getElementById('metric-mean');
const metricMax = document.getElementById('metric-max');
const metricMin = document.getElementById('metric-min');
const statusText = document.getElementById('status-text');

let isStreaming = false;
let streamInterval = null;

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    renderDefaultSwath();
}
window.addEventListener('resize', resizeCanvas);

function renderSwathTracks(swaths) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid lines
    ctx.strokeStyle = '#1e293b44';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    let allPoints = [];

    swaths.forEach(swath => {
        swath.forEach(p => {
            allPoints.push(p);
            const cx = ((p.lon - 79.0) / (82.0 - 79.0)) * canvas.width;
            const cy = canvas.height - ((p.lat - 5.0) / (10.0 - 5.0)) * canvas.height;

            ctx.beginPath();
            ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = p.ssha > 0 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)';
            ctx.fill();
        });
    });

    updateMetrics(allPoints);
}

function updateMetrics(points) {
    if (points.length === 0) return;
    
    const sshaValues = points.map(p => p.ssha);
    const total = points.length;
    const max = Math.max(...sshaValues);
    const min = Math.min(...sshaValues);
    const mean = sshaValues.reduce((a, b) => a + b, 0) / total;

    metricTotal.innerText = total.toLocaleString();
    metricMean.innerText = `${mean.toFixed(3)} m`;
    metricMax.innerText = `${max.toFixed(3)} m`;
    metricMin.innerText = `${min.toFixed(3)} m`;
}

function generateSwathPass() {
    const swath = [];
    const startLat = 5.2 + Math.random() * 0.8;
    const startLon = 79.2 + Math.random() * 0.3;
    
    for (let i = 0; i < 120; i++) {
        const lat = startLat + (i * 0.035);
        const lon = startLon + (i * 0.015) + (Math.sin(i * 0.08) * 0.03);
        
        if (lat <= 9.8 && lon <= 81.8) {
            swath.push({
                lat: lat,
                lon: lon,
                ssha: (Math.sin(i * 0.15) * 0.4) + ((Math.random() - 0.5) * 0.1)
            });
        }
    }
    return swath;
}

function renderDefaultSwath() {
    const initialSwaths = [generateSwathPass(), generateSwathPass()];
    renderSwathTracks(initialSwaths);
}

resizeCanvas();

// Toggle live stream
streamToggle.addEventListener('click', () => {
    if (!isStreaming) {
        isStreaming = true;
        streamToggle.innerText = "ප්‍රවාහය නවත්වන්න";
        streamToggle.classList.replace('bg-cyan-600', 'bg-red-600');
        statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> සජීවී දත්ත ලැබෙමින් පවතී...`;

        let activeSwaths = [];
        streamInterval = setInterval(() => {
            activeSwaths.push(generateSwathPass());
            if (activeSwaths.length > 5) activeSwaths.shift();
            renderSwathTracks(activeSwaths);
        }, 1200);
    } else {
        isStreaming = false;
        streamToggle.innerText = "සජීවී ප්‍රවාහය (Stream) අරඹන්න";
        streamToggle.classList.replace('bg-red-600', 'bg-cyan-600');
        statusText.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> පද්ධතිය ක්‍රියාත්මකයි`;
        clearInterval(streamInterval);
        renderDefaultSwath();
    }
});