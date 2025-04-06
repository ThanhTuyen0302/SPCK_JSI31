function validateContactForm(email, name, message) {
    if (!(email && name && message)) {
      // chua dien day du cac truong
      alert("PLease fill full this form!");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // email khong dung dinh dang
      alert("Email is bad format!");
      return false;
    } else {
      // form khong co loi
      return true;
    }
  }
  
  function submitContact() {
    // get data from html
    const email = document.getElementById("email");
    const name = document.getElementById("name");
    const message = document.getElementById("message");
    // kiem tra du lieu dau vao
    if (
      validateContactForm(
        email.value.trim(),
        name.value.trim(),
        message.value.trim()
      )
    ) {
      // thong tin khong bi loi
      // nhan thong tin
      const confirmText = `Confirm your feedback:
          - Name: ${name.value.trim()}
          - Email: ${email.value.trim()}
          - Feedback: ${message.value.trim()}`;
      // hien thong bao xac nhan co gui hay ko
      if (confirm(confirmText) == true) {
        // da xac nhan se gui feedback
        alert("Thank for your feedback!");
        return;
      } else {
        // xoa thong tin vua nhap
        email.value = "";
        name.value = "";
        message.value = "";
        return;
      }
    }
  }
  
  // bat su kien cho button submit
  document.getElementById("contact-btn").onclick = function (e) {
    e.preventDefault(); // chan luong xu ly mac dinh cua form
    submitContact();
  };