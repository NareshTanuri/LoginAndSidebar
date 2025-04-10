document.addEventListener('DOMContentLoaded', () => {
    handleAuthentication();
    initializeEventListeners();
});


// ===========================
// Authentication Logic
// ===========================
function handleAuthentication() {
    const isLogin = localStorage.getItem('IsLogin');

    // Redirect to index.html if logged in
    if (isLogin === 'true') {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'index.html') {
            window.location.href = 'index.html';
        }
    } else {
        // Redirect to loginPage.html if not logged in
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'loginPage.html') {
            window.location.href = 'loginPage.html';
        }
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const loader = document.getElementById("loaderLogin");
    const loginButton = document.getElementById('handleLogin');
    loginButton.disabled = true;
    loader.classList.remove('d-none');

    try {
        if (username === 'test' && password === '123456') {
            localStorage.setItem('IsLogin', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        loader.classList.add('d-none');
        loginButton.disabled = false;
    }
}


function handleLogout() {
    localStorage.setItem('IsLogin', 'false');
    window.location.href = 'loginPage.html';
}

// ===========================
// Event Listeners
// ===========================
function initializeEventListeners() {
    const loginButton = document.getElementById('handleLogin');
    const logoutButton = document.getElementById('logoutButton');

    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

// ===========================
// Sidebar Menu
// ===========================
function initializeMenu() {
    const toggleId = "nav-toggle";
    const navbarId = "navbar";
    const bodyId = "body";

    const toggle = document.getElementById(toggleId);
    const navbar = document.getElementById(navbarId);
    const bodyPadding = document.getElementById(bodyId);

    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('show');
            toggle.classList.toggle('rotate');
            bodyPadding.classList.toggle('expander');
        });
    }

    const linkColor = document.querySelectorAll('.nav__link');
    linkColor.forEach(link => {
        link.addEventListener('click', function () {
            linkColor.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===========================
// Content Switching
// ===========================
function initializeContentSwitching() {
    const content = document.getElementById('content');
    const homeBtn = document.getElementById('home');
    const userBtn = document.getElementById('user');

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.ok ? response.text() : Promise.reject('Page not found'))
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => console.error('Error loading page:', error));
    }

    if (content) {
        loadPage('home'); // Default content
        homeBtn?.addEventListener('click', () => loadPage('home'));
        userBtn?.addEventListener('click', () => loadPage('user'));
    }
}
