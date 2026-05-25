const usuarios = [
  { user: "admin", pass: "1234", nombre: "Administrador" },
  { user: "operador", pass: "1234", nombre: "Operador" }
];

function mostrarApp(usuario) {
  document.getElementById("loginView").hidden = true;
  document.getElementById("appView").hidden = false;
  document.getElementById("usuarioActivo").textContent = usuario.nombre || usuario.user;
}

function mostrarLogin() {
  document.getElementById("loginView").hidden = false;
  document.getElementById("appView").hidden = true;
}

function login(event) {
  event.preventDefault();

  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("password").value.trim();
  const valido = usuarios.find(x => x.user === user && x.pass === pass);

  if (!valido) {
    document.getElementById("loginError").textContent = "Usuario o contrasena incorrecta.";
    return;
  }

  localStorage.setItem("asignacion_usuario", JSON.stringify({
    user: valido.user,
    nombre: valido.nombre
  }));

  mostrarApp(valido);
  iniciarAplicacion();
}

function logout() {
  localStorage.removeItem("asignacion_usuario");
  mostrarLogin();
}

function cargarSesion() {
  const guardado = localStorage.getItem("asignacion_usuario");

  if (!guardado) {
    mostrarLogin();
    return;
  }

  try {
    const usuario = JSON.parse(guardado);
    mostrarApp(usuario);
    iniciarAplicacion();
  } catch (error) {
    localStorage.removeItem("asignacion_usuario");
    mostrarLogin();
  }
}

cargarSesion();
