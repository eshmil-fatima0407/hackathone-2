/* ================= SUPABASE SETUP ================= */
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const SUPABASE_URL = "https://keptmcyuwzudkswsotiu.supabase.co";
const SUPABASE_KEY = "sb_publishable_9DJWsiviCXqFbUAskA2LRg_smRZ9FZx";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ================= SIGNUP ================= */

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful");
      window.location.href = "login.html";
    }
  });
}

/* ================= LOGIN ================= */

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful");
      window.location.href = "index.html";
    }
  });
}

/* ================= LOGOUT ================= */

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.href = "login.html";
  });
}

/* ================= LOAD BLOGS ================= */

const blogsContainer = document.getElementById("blogs-container");

async function loadBlogs() {
  const { data, error } = await client
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  blogsContainer.innerHTML = data
    .map(
      (blog) => `
    <div class="blog-card">
      <div class="blog-meta">
        ${new Date(blog.created_at).toDateString()}
      </div>
      <h2>${blog.title}</h2>
      <p>${blog.content}</p>
    </div>
  `
    )
    .join("");
}

if (blogsContainer) loadBlogs();

function editCard() {
    alert("Edit button clicked! You can add your edit functionality here.");
}

function deleteCard(button) {
    // Remove the card from DOM
    const card = button.closest('.blog-card');
    card.remove();
    console.log("Card deleted!");
}

