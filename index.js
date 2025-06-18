function toggleSubmenu() {
    const submenu = document.getElementById("has-submenu");
    submenu.classList.toggle("active");
  }
  
fetch("Navbar/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;
    // Aguarda um pequeno delay para garantir que os elementos estejam no DOM
    setTimeout(() => {
      atualizarNavbar(); // Chama a função após inserir o HTML
    }, 100);
  });

  