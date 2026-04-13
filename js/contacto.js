/**
 * contacto.js — Validación del formulario de contacto
 * Campos obligatorios, validación de email, contador de caracteres
 */

function updateCharCount() {
  const textarea = document.getElementById("mensaje");
  const counter = document.getElementById("charCount");
  if (textarea && counter)
    counter.textContent = `${textarea.value.length} / 500`;
}

function setError(groupId, show) {
  const grp = document.getElementById(groupId);
  if (grp) show ? grp.classList.add("error") : grp.classList.remove("error");
}

function submitContactForm() {
  const nombre = document.getElementById("nombre")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const tema = document.getElementById("tema")?.value;
  const mensaje = document.getElementById("mensaje")?.value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validaciones
  let valid = true;

  setError("grpNombre", !nombre);
  if (!nombre) valid = false;

  setError("grpEmail", !email || !emailRx.test(email));
  if (!email || !emailRx.test(email)) valid = false;

  setError("grpTema", !tema);
  if (!tema) valid = false;

  setError("grpMensaje", !mensaje || mensaje.length < 10);
  if (!mensaje || mensaje.length < 10) valid = false;

  if (!valid) {
    showToast("⚠️ Revisa los campos con errores");
    return;
  }

  // Guardar en localStorage (simula envío)
  const mensajes = JSON.parse(
    localStorage.getItem("mensajes_contacto") || "[]",
  );
  mensajes.push({
    nombre,
    email,
    tema,
    mensaje,
    fecha: new Date().toISOString(),
  });
  localStorage.setItem("mensajes_contacto", JSON.stringify(mensajes));

  // Mostrar éxito
  document.getElementById("formContainer").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
  showToast("✅ Mensaje enviado correctamente");
}

function resetForm() {
  ["nombre", "email", "mensaje"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const tema = document.getElementById("tema");
  if (tema) tema.value = "";
  ["grpNombre", "grpEmail", "grpTema", "grpMensaje"].forEach((id) =>
    setError(id, false),
  );
  updateCharCount();
  document.getElementById("formContainer").style.display = "block";
  document.getElementById("formSuccess").style.display = "none";
}
