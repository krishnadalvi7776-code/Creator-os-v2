// ===============================
// Creator OS AI Image - FIXED VERSION
// ===============================

// Elements
const prompt = document.getElementById("prompt");
const style = document.getElementById("style");
const aspectRatio = document.getElementById("aspectRatio");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const imageResult = document.getElementById("imageResult");
const status = document.getElementById("status");

// Generate Image
function generateImage() {

    const text = prompt.value.trim();
    const selectedStyle = style.value;
    const selectedRatio = aspectRatio.value;

    if (!text) {
        alert("Please enter a prompt!");
        return;
    }

    const finalPrompt = `${text}, ${selectedStyle} style`;

    // Sizes
    let width = 1024;
    let height = 1024;

    if (selectedRatio === "16:9") {
        width = 1280;
        height = 720;
    } else if (selectedRatio === "9:16") {
        width = 720;
        height = 1280;
    }

    status.innerText = "Generating image... ⏳";
    generateBtn.disabled = true;
    imageResult.style.display = "none";

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?model=flux&width=${width}&height=${height}&seed=${Date.now()}`;
    imageResult.onload = () => {
        status.innerText = "Done ✅";
        generateBtn.disabled = false;
        imageResult.style.display = "block";
    };

    imageResult.onerror = () => {
    status.innerText = "Failed ❌ Try again or change prompt";
    generateBtn.disabled = false;
    imageResult.style.display = "none";
};

    imageResult.src = imageUrl;
}

// Download Image
async function downloadImage() {

    if (!imageResult.src || imageResult.style.display === "none") {
        alert("Generate image first!");
        return;
    }

    try {

        status.innerText = "Preparing download... ⏳";

        const response = await fetch(imageResult.src);
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `creator-os-${Date.now()}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        status.innerText = "Downloaded ✅";

    } catch(error) {
        console.log(error);
        status.innerText = "Download failed ❌";
    }
}

// Events
generateBtn.addEventListener("click", generateImage);
downloadBtn.addEventListener("click", downloadImage);