let datosVuelo = {};
let historial = [];

document.getElementById("vuelo-form").addEventListener("submit", function(e) {
  e.preventDefault();
  datosVuelo.vuelo = document.getElementById("vuelo").value.trim().toUpperCase();
  datosVuelo.ruta = document.getElementById("ruta").value.trim().toUpperCase();
  datosVuelo.fecha = document.getElementById("fecha").value;
  alert("Datos del vuelo guardados.");
});

function simularEscaneo() {
  const datosEscaneados = {
    nombre: "RAMIREZ BRENES / CARLOS LUIS",
    vuelo: "AV 656",
    ruta: "CTG-SJO",
    fecha: "2025-07-03",
    asiento: "1K"
  };

  const coincide = datosEscaneados.vuelo === datosVuelo.vuelo &&
                   datosEscaneados.ruta === datosVuelo.ruta &&
                   datosEscaneados.fecha === datosVuelo.fecha;

  const resultado = document.getElementById("resultado");
  const mensaje = coincide ? "✅ Pasajero correcto" : "❌ Pasajero incorrecto";
  resultado.innerHTML = mensaje + "<br>" + JSON.stringify(datosEscaneados, null, 2);
  resultado.className = coincide ? "ok" : "error";

  historial.push({ ...datosEscaneados, estado: coincide ? "OK" : "ERROR" });
  actualizarHistorial();
}

function actualizarHistorial() {
  const lista = document.getElementById("lista-historial");
  lista.innerHTML = "";
  historial.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - ${item.vuelo} - ${item.estado}`;
    lista.appendChild(li);
  });
}

function exportarHistorial() {
  const filas = ["Nombre,Vuelo,Ruta,Fecha,Asiento,Estado"];
  historial.forEach(item => {
    filas.push(`${item.nombre},${item.vuelo},${item.ruta},${item.fecha},${item.asiento},${item.estado}`);
  });
  const blob = new Blob([filas.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "historial.csv";
  a.click();
}
