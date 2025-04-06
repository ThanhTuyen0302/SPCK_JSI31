// Switch between Sign In and Sign Up
function showSignUp() {
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
  }
  
  function showSignIn() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('signin-form').classList.remove('hidden');
  }
  
  // Handle Sign Up
  document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    // Save user data to LocalStorage
    const user = { username, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert('Sign Up successful! Please Sign In.');
    showSignIn();
  });
  
  // Handle Sign In
  document.getElementById('signin').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    // Check user data in LocalStorage
    const user = JSON.parse(localStorage.getItem(email));
    // Chuyển hướng đến trang khác sau khi đăng nhập thành công
  if (user && user.password === password) {
    window.location.href = "../index.html"; // Đường dẫn tới trang chính
  }
    else {
      alert('Invalid email or password. Please try again.');
    }
   });
  
  // Xử lý Sign In (cập nhật thêm phần hiển thị hồ sơ)
  document.getElementById('signin').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  // Kiểm tra thông tin trong LocalStorage
  const user = JSON.parse(localStorage.getItem(email));
  if (user && user.password === password) {
    alert(`Welcome back, ${user.username}!`);
    showUserProfile(user);
  } else {
    alert('Invalid email or password. Please try again.');
  }
  });
  
  // Xử lý Sign Out
  function signOut() {
  document.getElementById('user-profile').classList.add('hidden');
  document.getElementById('signin-form').classList.remove('hidden');
  alert('You have signed out successfully.');
  }