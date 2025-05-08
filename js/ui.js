// UI Module
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update scoreboard if that section is selected
    if (sectionId === 'scoreboard') {
        updateScoreboard();
    }
}

function updateScoreboard() {
    const teams = JSON.parse(localStorage.getItem('cybersentinal_teams'));
    if (!teams) return;

    // Sort teams by score (descending)
    teams.sort((a, b) => b.score - a.score);

    const scoreboardList = document.getElementById('scoreboardList');
    scoreboardList.innerHTML = '';

    teams.forEach((team, index) => {
        const teamElement = document.createElement('div');
        teamElement.className = 'flex justify-between items-center p-4 bg-gray-800 rounded-lg';
        teamElement.innerHTML = `
            <div class="flex items-center">
                <span class="text-2xl font-bold mr-4">#${index + 1}</span>
                <span class="text-xl">${team.name}</span>
            </div>
            <span class="text-xl font-bold">${team.score} pts</span>
        `;
        scoreboardList.appendChild(teamElement);
    });
}

// Add glitch effect to challenge titles
function addGlitchEffect() {
    document.querySelectorAll('.challenge-card h3').forEach(title => {
        title.classList.add('glitch-text');
    });
}

// Initialize UI elements
document.addEventListener('DOMContentLoaded', () => {
    // Add glitch effect to challenge titles
    addGlitchEffect();

    // Update scoreboard if on scoreboard page
    if (document.getElementById('scoreboard') && 
        !document.getElementById('scoreboard').classList.contains('hidden')) {
        updateScoreboard();
    }
}); 