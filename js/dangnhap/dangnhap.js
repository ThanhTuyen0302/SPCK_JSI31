import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { addUser, getUserByEmail } from "./user.entity.js";
import { auth } from "../firebase.js";

// ===============
// Toggle SignIn / SignUp
const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");

document.querySelector('#showSignup').addEventListener("click", (e) => {
  e.preventDefault();
  signInForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
});

document.querySelector('#showSignin').addEventListener("click", (e) => {
  e.preventDefault();
  signUpForm.classList.add("hidden");
  signInForm.classList.remove("hidden");
});

// ===============
// LOGIN
document.getElementById("signin").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const userData = await getUserByEmail(email);
    if (!userData) {
      alert("Tài khoản không tồn tại trong hệ thống người dùng.");
      return;
    }

    localStorage.setItem("currentUser", email);
    alert("Đăng nhập thành công!");
    location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert("Sai tài khoản hoặc mật khẩu!");
  }
});

// ===============
// SIGNUP
document.getElementById("signup").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!email || !username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (password.length < 6) {
    alert("Vui lòng nhập mật khẩu từ 6 kí tự trở lên!");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addUser(email, username);

    alert("Đăng ký thành công!");
    // Switch to sign-in form
    signUpForm.classList.add("hidden");
    signInForm.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Email đã được sử dụng hoặc có lỗi xảy ra!");
  }
});
