/* script.js - frontend behavior and small client-side validation
   Replace or extend these functions when you connect Firebase or your backend.
   For Firebase integration you can reuse the functions names: signupFrontend, loginFrontend, etc.
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
  // very small inline toast using alert for now; you can improve later
  alert(msg);
}

/* ------- Signup (frontend-only) ------- */
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

  // Frontend-only placeholder:
  // TODO: connect to backend / Firebase to create the account.
  // For now we simulate success and redirect to login page.
  showToast('Account created (frontend demo). You will be redirected to Login.');
  window.location.href = 'login.html';
}

/* ------- Login (frontend-only) ------- */
function loginFrontend(){
  const email = document.getElementById('loginEmail')?.value?.trim();
  const pass = document.getElementById('loginPassword')?.value || '';

  if(!email || !pass){
    showToast('Enter email and password.');
    return;
  }

  // Frontend-only placeholder for login:
  // Replace this with actual authentication (Firebase or your server)
  // Example: call signInWithEmailAndPassword(auth, email, pass) then redirect on success

  // For demo: accept any password >=6
  if(pass.length < 6){
    showToast('Password must be at least 6 characters.');
    return;
  }

  // Save demo "logged in" flag in sessionStorage (only for frontend demo)
  sessionStorage.setItem('skill2job_demo_user', JSON.stringify({email: email}));
  showToast('Login successful (frontend demo). Redirecting to dashboard...');
  window.location.href = 'dashboard.html';
}

/* ------- Forgot password (frontend-only) ------- */
function forgotPasswordFrontend(){
  const email = document.getElementById('loginEmail')?.value?.trim();
  if(!email){
    showToast('Enter your email in the email field, then click Forgot password.');
    return;
  }

  // In real app: call sendPasswordResetEmail(auth, email)
  showToast('Password reset link sent (frontend demo). In real app this sends an email.');
}

/* ------- Google login placeholder ------- */
function googleLoginFrontend(){
  showToast('Google login placeholder. Integrate Firebase Google sign-in to enable this.');
}

/* ------- Logout ------- */
function logoutFrontend(){
  // clear demo session
  sessionStorage.removeItem('skill2job_demo_user');
  showToast('Logged out (frontend demo).');
  window.location.href = 'login.html';
}

/* ------- Optional: show user name on dashboard if available -------- */
(function setDashboardUser(){
  if(window.location.pathname.endsWith('dashboard.html')){
    const raw = sessionStorage.getItem('skill2job_demo_user');
    try{
      const user = raw ? JSON.parse(raw) : null;
      if(user && user.email){
        document.getElementById('welcomeUser').textContent = `Welcome, ${user.email}`;
      }
    }catch(e){}
  }
})();
