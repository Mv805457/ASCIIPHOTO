const upload = document.getElementById("upload");
const output = document.getElementById("output");
const densitySlider = document.getElementById("density");
const customCharsInput = document.getElementById("customChars");
const themeToggle = document.getElementById("themeToggle");
const downloadPNG = document.getElementById("downloadPNG");
const terminalExport = document.getElementById("terminalExport");
const webcamBtn = document.getElementById("webcamBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("webcam");
const dropZone = document.getElementById("dropZone");
const fontSelect = document.getElementById("fontSelect");

let defaultChars = "@#S%?*+;:,. ";

function processImage(img) {
  const density = parseInt(densitySlider.value);
  const chars = customCharsInput.value || defaultChars;

  canvas.width = img.width / density;
  canvas.height = img.height / density;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  let ascii = "";

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {

      const index = (y * canvas.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const bright = brightness(r, g, b);
      const char = getChar(bright, chars);

      ascii += `<span style="color: rgb(${r},${g},${b})">${char}</span>`;
    }
    ascii += "\n";
  }

  output.style.fontFamily = fontSelect.value;
  output.innerHTML = ascii;
}

upload.addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => processImage(img);
    img.src = ev.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

dropZone.addEventListener("dragover", e => e.preventDefault());
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => processImage(img);
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

downloadPNG.addEventListener("click", () => {
  html2canvas(output).then(canvas => {
    const link = document.createElement("a");
    link.download = "ascii.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

terminalExport.addEventListener("click", () => {
  const text = output.innerText;
  const blob = new Blob([text], {type: "text/plain"});
  const link = document.createElement("a");
  link.download = "ascii.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
});

webcamBtn.addEventListener("click", async () => {
  video.hidden = false;
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  setInterval(() => {
    processImage(video);
  }, 100);
});
