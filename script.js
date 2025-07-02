
function signup() {
  const email = document.getElementById("signupEmail").value;
  const phone = document.getElementById("signupPhone").value;
  const password = document.getElementById("signupPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (email && phone && password) {
    users.push({ email, phone, password, details: {} });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    window.location.href = "index.html";
  } else {
    alert("All fields are required.");
  }
}

function login() {
  const loginId = document.getElementById("loginId").value;
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => (u.email === loginId || u.phone === loginId) && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "welcome.html";
  } else {
    alert("Invalid credentials.");
  }
}

function saveDetails() {
  const name = document.getElementById("name").value;
  const empId = document.getElementById("empId").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users"));

  currentUser.details = { name, empId, phone, email, role };

  users = users.map(u => u.email === currentUser.email ? currentUser : u);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert("Details saved!");
}

function loadUserDetails() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser?.details) {
    document.getElementById("name").value = currentUser.details.name || "";
    document.getElementById("empId").value = currentUser.details.empId || "";
    document.getElementById("phone").value = currentUser.details.phone || "";
    document.getElementById("email").value = currentUser.details.email || "";
    document.getElementById("role").value = currentUser.details.role || "";
  }
}

function gotoAdmin() {
  window.location.href = "admin.html";
}

function loadDashboard() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const container = document.getElementById("userList");

  users.forEach((u, i) => {
    const d = u.details || {};
    const div = document.createElement("div");
    div.innerHTML = `<b>${i + 1}.</b> ${d.name || "N/A"} (${d.empId || "ID"}) - ${d.role || "Role"} <br>Email: ${d.email || u.email}, Phone: ${d.phone || u.phone}<hr>`;
    container.appendChild(div);
  });
}
