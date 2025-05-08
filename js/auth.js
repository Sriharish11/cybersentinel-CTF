// Authentication Module
const AUTH_KEY = 'cybersentinal_auth';
const TEAMS_KEY = 'cybersentinal_teams';

// Initialize teams in localStorage if not exists
if (!localStorage.getItem(TEAMS_KEY)) {
    localStorage.setItem(TEAMS_KEY, JSON.stringify([]));
}

// Authentication Functions
function handleRegister(event) {
    event.preventDefault();
    const teamName = document.getElementById('registerTeamName').value.trim();
    
    if (!teamName) {
        alert('Please enter a team name');
        return;
    }

    const teams = JSON.parse(localStorage.getItem(TEAMS_KEY));
    
    if (teams.some(team => team.name.toLowerCase() === teamName.toLowerCase())) {
        alert('Team name already exists');
        return;
    }

    const newTeam = {
        name: teamName,
        score: 0,
        solvedChallenges: []
    };

    teams.push(newTeam);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
    
    // Auto login after registration
    handleLogin(event, teamName);
}

function handleLogin(event, teamName = null) {
    event.preventDefault();
    const inputTeamName = teamName || document.getElementById('loginTeamName').value.trim();
    
    if (!inputTeamName) {
        alert('Please enter a team name');
        return;
    }

    const teams = JSON.parse(localStorage.getItem(TEAMS_KEY));
    const team = teams.find(t => t.name.toLowerCase() === inputTeamName.toLowerCase());

    if (!team) {
        alert('Team not found');
        return;
    }

    // Store current team in localStorage
    localStorage.setItem(AUTH_KEY, JSON.stringify(team));
    
    // Update UI
    document.getElementById('teamName').textContent = `Team: ${team.name}`;
    document.getElementById('teamScore').textContent = team.score;
    
    // Show dashboard
    showDashboard();
}

function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    showStartPage();
}

// UI Navigation Functions
function showStartPage() {
    document.getElementById('startPage').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showLoginForm() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Show home section by default
    showSection('home');
}

// Check if user is already logged in
function checkAuth() {
    const currentTeam = localStorage.getItem(AUTH_KEY);
    if (currentTeam) {
        const team = JSON.parse(currentTeam);
        document.getElementById('teamName').textContent = `Team: ${team.name}`;
        document.getElementById('teamScore').textContent = team.score;
        showDashboard();
    }
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', checkAuth); 