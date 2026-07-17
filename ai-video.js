const generateBtn = document.getElementById("generateVideoBtn");

const promptInput = document.getElementById("videoPrompt");
const styleInput = document.getElementById("videoStyle");
const durationInput = document.getElementById("videoDuration");
const aspectInput = document.getElementById("videoAspect");

const status = document.getElementById("videoStatus");
const result = document.getElementById("videoResult");

generateBtn.addEventListener("click", async () => {

  const prompt = promptInput.value.trim();
  const style = styleInput.value;
  const duration = durationInput.value;
  const aspect = aspectInput.value;

  if (!prompt) {
    alert("Please enter a video prompt");
    return;
  }

  status.innerHTML = "⏳ Creating your AI video...";
  result.innerHTML = "";

  try {

    const response = await fetch("https://creator-os-in7s.onrender.com/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        style,
        duration,
        aspect
      })
    });

    const data = await response.json();

    console.log(data);

    if (!data.success) {
      throw new Error(data.error || "Video generation failed");
    }

    status.innerHTML = "✅ Video Ready!";

    result.innerHTML = `
      <video controls width="100%" style="border-radius:12px;">
        <source src="${data.videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <br><br>

      <a href="${data.videoUrl}" target="_blank">
        📥 Download Video
      </a>
    `;

  } catch (error) {

    console.error(error);

    status.innerHTML = `❌ ${error.message}`;

  }

});
