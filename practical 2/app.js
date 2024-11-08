// Switch between Login and Registration forms
function showLogin() {
    document.getElementById('registration').style.display = 'none';
    document.getElementById('login').style.display = 'block';
  }
  
  function showRegistration() {
    document.getElementById('registration').style.display = 'block';
    document.getElementById('login').style.display = 'none';
  }
  
  // Register User
  function registerUser() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
      alert("User already exists!");
      return;
    }
  
    // Save user to local storage
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Simulate AJAX POST request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert("User registered successfully!");
        showLogin();
      }
    };
    xhr.send(JSON.stringify(newUser));
  }
  
  // Login User
  function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      alert("Login successful!");
      displayUserList();
    } else {
      alert("Incorrect username or password");
    }
  }
  
  // Show user list without login (for demonstration)
  function showUserList() {
    displayUserList();
  }
  
  // Display registered users (new page)
  function displayUserList() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTable = users.map(user => `<tr><td>${user.username}</td></tr>`).join('');
    
    const userListPage = `
      <h2>Registered Users</h2>
      <table border="1" style="width: 50%; margin: auto;">
        <tr><th>Username</th></tr>
        ${userTable}
      </table>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(userListPage);
    newWindow.document.close();
  }
  