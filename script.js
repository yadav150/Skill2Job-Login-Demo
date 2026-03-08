/* script.js — frontend behavior (demo)
   - client-side validation
   - demo signup/login using sessionStorage
   - swap in real Firebase or backend later
*/

(() => {
  // set footer years in all pages
  const years = ['year','year2','year3','year4'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });
})();

function showToast(msg){
  // small simple toast (native alert for now)
  // you can replace with custom toast UI if you want
  alert(msg);
}

/* ------- Signup (frontend demo) ------- */
function signupFrontend(){
  const name = document.getElementById('signupName')?.value?.trim();
  const email = document.getElementById('signupEmail')?.value?.trim();
  const pass = document.getElementById('signupPassword')?.value || '';

  if(!name || !email){
    showToast('Please enter name and email.');
    return;
  }
  if(pass.length < 6){
    showToast('Password must be at least 6 characters.');
    return;
  }

  // Save demo user locally (only for frontend demo)
  // NOTE: do NOT use this for production — use secure backend or Firebase
  const demoUsers = JSON.parse(localStorage.getItem('skill2job_demo_users') || '[]');
  if(demoUsers.some(u => u.email === email)){
    showToast('This email is already registered (demo). Try logging in.');
    return;
  }
  demoUsers.push({name, email, pass});
  localStorage.setItem('skill2job_demo_users', JSON.stringify(demoUsers));

  showToast('Account created (frontend demo). Redirecting to login...');
  window.location.href = 'login.html';
}

/* ------- Login (frontend demo) ------- */
function loginFrontend(){
  const email = document.getElementById('loginEmail')?.value?.trim();
  const pass = document.getElementById('loginPassword')?.value || '';

  if(!email || !pass){
    showToast('Enter email and password.');
    return;
  }
  if(pass.length < 6){
    showToast('Password must be at least 6 characters.');
    return;
  }

  const demoUsers = JSON.parse(localStorage.getItem('skill2job_demo_users') || '[]');
  const found = demoUsers.find(u => u.email === email && u.pass === pass);

  if(!found){
    showToast('Invalid credentials (demo). If you have not registered, create account first.');
    return;
  }

  sessionStorage.setItem('skill2job_demo_user', JSON.stringify({email: found.email, name: found.name}));
  showToast('Login successful (frontend demo). Redirecting to dashboard...');
  window.location.href = 'dashboard.html';
}

/* ------- Forgot password (frontend demo) ------- */
function forgotPasswordFrontend(){
  const email = document.getElementById('loginEmail')?.value?.trim();
  if(!email){
    showToast('Enter your email in the email field, then click Forgot password.');
    return;
  }

  // demo: check if user exists
  const demoUsers = JSON.parse(localStorage.getItem('skill2job_demo_users') || '[]');
  const exists = demoUsers.some(u => u.email === email);

  if(!exists){
    showToast('Email not found (demo). Create account first.');
    return;
  }

  // In a real app you would call password reset API or Firebase sendPasswordResetEmail
  showToast('Password reset link simulated (demo). In a real app this sends an email.');
}

/* ------- Google login placeholder ------- */
function googleLoginFrontend(){
  showToast('Google login placeholder. Integrate Firebase Google sign-in to enable this.');
}

/* ------- Logout ------- */
function logoutFrontend(){
  sessionStorage.removeItem('skill2job_demo_user');
  showToast('Logged out (frontend demo).');
  window.location.href = 'login.html';
}

/* ------- On dashboard show user if demo session exists ------- */
(function setDashboardUser(){
  const path = window.location.pathname.split('/').pop();
  if(path === 'dashboard.html'){
    const raw = sessionStorage.getItem('skill2job_demo_user');
    try{
      const user = raw ? JSON.parse(raw) : null;
      if(user && user.name){
        document.getElementById('welcomeUser').textContent = `Welcome, ${user.name}`;
      } else if (user && user.email){
        document.getElementById('welcomeUser').textContent = `Welcome, ${user.email}`;
      }
    }catch(e){}
  }
})();
