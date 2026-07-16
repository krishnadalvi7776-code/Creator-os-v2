const generateBtn = document.getElementById("generateVideoBtn");

const promptInput = document.getElementById("videoPrompt");
const styleInput = document.getElementById("videoStyle");

const status = document.getElementById("videoStatus");
const result = document.getElementById("videoResult");


generateBtn.addEventListener("click", async () => {

    const prompt = promptInput.value.trim();
    const style = styleInput.value;

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
                prompt: `${style} style: ${prompt}`
            })
        });


        const data = await response.json();

        console.log(data);

        status.innerHTML = "✅ Video request completed";

        result.innerHTML = `
        <h3>AI Video Result</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        `;


    } catch(error){

        console.error(error);

        status.innerHTML = "❌ Video generation failed";

    }

});
