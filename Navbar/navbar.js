// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
  // Carrega o HTML do navbar dinamicamente
  fetch("Navbar/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // Aplica o CSS da navbar
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Navbar/navbar.css";
      document.head.appendChild(link);

      // Atualiza a navbar com base no login
      atualizarNavbar();
    })
    .catch(error => {
      console.error("Erro ao carregar o navbar:", error);
    });
});

// Função que atualiza a navbar conforme login
function atualizarNavbar() {
  const nomeUsuario = localStorage.getItem("usuarioLogado");

  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const userDropdown = document.getElementById("user-dropdown");
  const usuarioLogadoSpan = document.getElementById("usuario-logado");

  if (nomeUsuario) {
    // Se estiver logado, exibe o nome e oculta "Entrar/Registrar"
    usuarioLogadoSpan.textContent = `Olá, ${nomeUsuario}`;
    userDropdown.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  } else {
    // Se não estiver logado, exibe "Entrar/Registrar"
    userDropdown.style.display = "none";
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
  }

  // Evento para botão de dropdown do usuário
  const toggleBtn = document.getElementById("user-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que o clique feche o menu
      const dropdown = document.getElementById("dropdown-menu");
      dropdown.classList.toggle("hidden");
    });
  }

  // Fecha o dropdown se clicar fora
  document.addEventListener("click", (e) => {
    const toggle = document.getElementById("user-toggle");
    const menu = document.getElementById("dropdown-menu");
    if (toggle && menu && !toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  // Evento de logout
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }
}

// Função para realizar logout
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "../index.html";
}
