// 🔐 SUPABASE CONFIG
const supabaseUrl = "https://wiapawafqpmacvpxabvc.supabase.co";
const supabaseKey = "sb_publishable_BRBI55q9dCO0ixG4JKtUhQ_JoFqATSO";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// UI
const googleLogin = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logoutBtn");
const appDiv = document.getElementById("app");

const upload = document.getElementById("upload");
const output = document.getElementById("output");
const densitySlider = document.getElementById("density");
const customCharsInput = document.getElementById("customChars");
const fontSelect = document.getElementById("fontSelect");
const themeToggle = document.getElementById("themeToggle");
const downloadPNG = document.getElementById("downloadPNG");
const saveBtn = document.getElementById("saveBtn");
const historyBtn = document.getElementById("historyBtn");
const webcamBtn = document.getElementById("webcamBtn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("webcam");

let defaultChars = "@#S%?*+;:,. ";
let currentOriginalBlob = null;

// 🟢 GOOGLE LOGIN
googleLogin.onclick = async () => {
  await supabaseClient.auth.signInWithOAuth({
    provider: "google"
  });
};

logoutBtn.onclick = async () => {
  await supabaseClient.auth.signOut();
  location.reload();
};

// 🟢 CHECK SESSION
async function checkUser() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    document.getElementById("authSection").style.display = "none";
    appDiv.style.display = "block";
    logoutBtn.style.display = "inline-block";
  }
}
checkUser();

// 🟢 ASCII PROCESSING
function processImage(img) {

  const density = parseInt(densitySlider.value);
  const chars = customCharsInput.value || defaultChars;

  canvas.width = img.videoWidth ? img.videoWidth / density : img.width / density;
  canvas.height = img.videoHeight ? img.videoHeight / density : img.height / density;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  let ascii = "";

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {

      const index = (y * canvas.width + x) * 4;

      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const brightness = 0.299*r + 0.587*g + 0.114*b;
      const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
      const char = chars[charIndex];

      ascii += `<span style="color: rgb(${r},${g},${b})">${char}</span>`;
    }
    ascii += "\n";
  }

  output.style.fontFamily = fontSelect.value;
  output.innerHTML = ascii;

  canvas.toBlob(blob => {
    currentOriginalBlob = blob;
  }, "image/png");
}

// 🟢 IMAGE UPLOAD
upload.addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => processImage(img);
    img.src = ev.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

// 🟢 THEME
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

// 🟢 DOWNLOAD PNG
downloadPNG.onclick = async () => {
  const asciiCanvas = await html2canvas(output);
  const link = document.createElement("a");
  link.download = "ascii.png";
  link.href = asciiCanvas.toDataURL();
  link.click();
};

// 🟢 SAVE
saveBtn.onclick = async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return alert("Not logged in.");
  if (!currentOriginalBlob) return alert("No image.");

  const originalName = `${user.id}-orig-${Date.now()}.png`;
  const asciiName = `${user.id}-ascii-${Date.now()}.png`;

  // Upload original
  await supabaseClient.storage
    .from("original-images")
    .upload(originalName, currentOriginalBlob);

  // Upload ASCII
  const asciiCanvas = await html2canvas(output);
  const asciiBlob = await new Promise(resolve =>
    asciiCanvas.toBlob(resolve, "image/png")
  );

  await supabaseClient.storage
    .from("ascii-images")
    .upload(asciiName, asciiBlob);

  // Insert DB
  await supabaseClient.from("captures").insert([
    {
      user_id: user.id,
      original_path: originalName,
      ascii_path: asciiName,
      density: parseInt(densitySlider.value),
      character_set: customCharsInput.value || defaultChars
    }
  ]);

  alert("Saved!");
};

// 🟢 HISTORY
historyBtn.onclick = async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();

  const { data, error } = await supabaseClient
    .from("captures")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("DB error:", error);
    return;
  }

  output.innerHTML = "";

  for (const item of data) {

    const { data: originalData, error: originalError } =
      await supabaseClient.storage
        .from("original-images")
        .createSignedUrl(item.original_path, 60);

    const { data: asciiData, error: asciiError } =
      await supabaseClient.storage
        .from("ascii-images")
        .createSignedUrl(item.ascii_path, 60);

    if (originalError || asciiError) {
      console.error("Storage error:", originalError || asciiError);
      continue;
    }

    const container = document.createElement("div");

    container.innerHTML = `
      <img src="${originalData.signedUrl}" width="200">
      <img src="${asciiData.signedUrl}" width="200">
      <hr>
    `;

    output.appendChild(container);
  }
};


// 🟢 WEBCAM
webcamBtn.onclick = async () => {
  video.hidden = false;
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  setInterval(() => {
    processImage(video);
  }, 100);
};
