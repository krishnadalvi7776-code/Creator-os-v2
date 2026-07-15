const generateBtn = document.getElementById("generateVideoBtn");

const prompt = document.getElementById("videoPrompt");
const style = document.getElementById("videoStyle");

const status = document.getElementById("videoStatus");
const result = document.getElementById("videoResult");


generateBtn.addEventListener("click", () => {

    if(prompt.value.trim() === ""){
        alert("Please enter a video prompt");
        return;
    }

    status.innerHTML = "⏳ Creating your AI video...";


    setTimeout(() => {

        status.innerHTML = "✅ Video generated successfully!";

        result.innerHTML = `
        <h3>Your AI Video Preview</h3>

        <video width="100%" controls>
            <source src="demo-video.mp4" type="video/mp4">
        </video>
        `;

    },3000);

});