// ---------------- TEXT LIVE UPDATE ----------------
document.getElementById("headerInput").addEventListener("input", e => {
  document.getElementById("headerText").innerText = e.target.value;
});

document.getElementById("bodyInput").addEventListener("input", e => {
  document.getElementById("bodyText").innerText = e.target.value;
});

document.getElementById("footerInput").addEventListener("input", e => {
  document.getElementById("footerText").innerText = e.target.value;
});

// ---------------- FONT ----------------
document.getElementById("fontSelector").addEventListener("change", function () {
  const f = this.value;
  document.querySelectorAll(".card *").forEach(el => {
    el.style.fontFamily = f;
  });
});

// ---------------- LOGO UPLOAD ----------------
document.getElementById("logoInput").addEventListener("change", e => {
  const url = URL.createObjectURL(e.target.files[0]);
  document.getElementById("logoPreview").src = url;
});

// ---------------- IMAGE UPLOAD ----------------
document.getElementById("imageInput").addEventListener("change", e => {
  const url = URL.createObjectURL(e.target.files[0]);
  document.getElementById("mainImage").src = url;
});

// ---------------- FESTIVAL THEMES ----------------
function setFestival(type) {
  const card = document.getElementById("card");

  if (type === "diwali") {
    card.style.background = "#fff3cd";
  }

  if (type === "holi") {
    card.style.background = "linear-gradient(45deg, #ff9a9e, #fad0c4)";
  }

  if (type === "birthday") {
    card.style.background = "#d0f0ff";
  }
}

// ---------------- DRAG SYSTEM ----------------
let active = null;

document.addEventListener("mousedown", e => {
  if (e.target.classList.contains("draggable")) {
    active = e.target;
  }
});

document.addEventListener("mousemove", e => {
  if (active) {
    active.style.left = e.clientX + "px";
    active.style.top = e.clientY + "px";
  }
});

document.addEventListener("mouseup", () => {
  active = null;
});

// ---------------- DOWNLOAD ----------------
function downloadCard() {
  html2canvas(document.getElementById("card"), {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// ---------------- AI (OPTIONAL PLACEHOLDER) ----------------
async function handleAI() {
  const prompt = document.getElementById("aiInput").value;

  alert("AI feature coming next step! Prompt: " + prompt);
}