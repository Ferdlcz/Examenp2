const div = document.getElementById("div1");
const input = document.createElement("input");
input.type = "text";
input.name = "nombre";
input.setAttribute("class", "form-control");
input.setAttribute("required", "");
input.setAttribute("id", "nombre");
div.appendChild(input);

const checkboxes = document.querySelectorAll(".valida");

function validateCheckboxes() {
  let isChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });
  if (!isChecked) {
    alert("Debe seleccionar al menos un pasatiempo.");
    return false;
  }
  return true;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  if (!validateCheckboxes()) {
    event.preventDefault();
  }
});

let contador = parseInt(localStorage.getItem("contador")) || 0;

function cargarContador() {
  contador = parseInt(localStorage.getItem("contador")) || 0;
  const contadorInput = form.querySelector("#contador");
  const contadormax = document.querySelector("#contador2");
  contadorInput.value = contador;
  contadormax.value = contador;
}

function enviar() {
  
  const nombre = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;

  const carrera = form.querySelector(
    'input[type="radio"]:checked + label'
  ).textContent;
  const pasatiempos = form.querySelectorAll(
    'input[type="checkbox"]:checked + label'
  );
  const pasatiemposValues = Array.from(pasatiempos).map(
    (label) => label.textContent
  );

  contador++;
  const contadorInput = form.querySelector("#contador");
  contadorInput.value = contador;
  const contadormax = document.querySelector("#contador2");
  contadormax.value = contador;

  const campos = {
    nombre,
    email,
    carrera,
    pasatiempos: pasatiemposValues,
    contador,
  };

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.push(campos);
  localStorage.setItem("registros", JSON.stringify(registros));
  localStorage.setItem("contador", contador);

  //console.log(campos);

  event.preventDefault();

  mostrarDatos();
}

document.addEventListener("DOMContentLoaded", cargarContador);

function limpiar() {
  const formulario = document.getElementById("primer-formulario");
  formulario
    .querySelectorAll(
      "input[type=text], input[type=email], input[type=radio], input[type=checkbox]"
    )
    .forEach(function (del) {
      if (del.id !== "contador") {
        del.value = "";
        del.checked = false;
      }
    });
}

function mostrarDatos() {
  
  const datos = localStorage.getItem("registros");
  const registros = JSON.parse(datos);

  const paginaInput = document.getElementById("pagina");
  let pagina = parseInt(paginaInput.value);

  const nombre = registros[pagina].nombre;
  const email = registros[pagina].email;
  const carrera = registros[pagina].carrera;
  const pasatiempos = registros[pagina].pasatiempos;

  document.getElementById("nombre2").value = nombre;
  document.getElementById("email2").value = email;

  document.getElementById("idgs2").checked = false;
  document.getElementById("ievnd2").checked = false;
  document.getElementById("im2").checked = false;

  if (carrera.includes("IDGS")) {
    document.getElementById("idgs2").checked = true;
  }
  if (carrera.includes("IEVND")) {
    document.getElementById("ievnd2").checked = true;
  }
  if (carrera.includes("IM")) {
    document.getElementById("im2").checked = true;
  }

  document.getElementById("musica2").checked = false;
  document.getElementById("deportes2").checked = false;
  document.getElementById("series2").checked = false;
  document.getElementById("peliculas2").checked = false;

  if (pasatiempos.includes("Musica")) {
    document.getElementById("musica2").checked = true;
  }
  if (pasatiempos.includes("Deportes")) {
    document.getElementById("deportes2").checked = true;
  }
  if (pasatiempos.includes("Series")) {
    document.getElementById("series2").checked = true;
  }
  if (pasatiempos.includes("Peliculas")) {
    document.getElementById("peliculas2").checked = true;
  }

  const anteriorBtn = document.getElementById("anterior");
  const siguienteBtn = document.getElementById("siguiente");

  anteriorBtn.addEventListener("click", () => {
    pagina--;
    if (pagina < 0) {
      pagina = 0;
    }
    paginaInput.value = pagina;
    mostrarDatos();
    event.preventDefault();
  });

  siguienteBtn.addEventListener("click", () => {
    pagina++;
    if (pagina > registros.length - 1) {
      pagina = registros.length - 1;
    }
    paginaInput.value = pagina;
    mostrarDatos();
    event.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarDatos();
});


function correctCaptcha(){
  alert("CORRECTO");
}