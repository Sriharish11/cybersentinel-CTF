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
    const teams = JSON.parse(localStorage.getItem('cybersentinal_teams')) || [];
    if (!teams) return;

    // Sort teams by score (descending)
    teams.sort((a, b) => b.score - a.score);

    const scoreboardBody = document.getElementById('scoreboardBody');
    if (!scoreboardBody) return;

    scoreboardBody.innerHTML = '';

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-700';
        row.innerHTML = `
            <td class="p-4">${index + 1}</td>
            <td class="p-4">${team.name}</td>
            <td class="p-4">${team.score || 0}</td>
            <td class="p-4">${team.solvedChallenges ? team.solvedChallenges.length : 0}</td>
        `;
        scoreboardBody.appendChild(row);
    });

    // Also update the team score in the navigation if it exists
    const teamScore = document.getElementById('teamScore');
    if (teamScore) {
        const currentTeam = JSON.parse(localStorage.getItem('cybersentinal_auth'));
        if (currentTeam) {
            teamScore.textContent = currentTeam.score || 0;
        }
    }
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