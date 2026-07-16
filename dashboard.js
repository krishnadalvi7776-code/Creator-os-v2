document.getElementById("openChat").addEventListener("click", () => {
  window.location.href = "ai-chat.html";
}); 
document.getElementById("openImage").addEventListener("click", () => {
  window.location.href = "ai-image.html";
});
const openChat = document.getElementById("openChat");

if(openChat){
  openChat.onclick = () => {
    window.location.href = "ai-chat.html";
  };
}


const openImage = document.getElementById("openImage");

if(openImage){
  openImage.onclick = () => {
    window.location.href = "ai-image.html";
  };
}


const openVideo = document.getElementById("openVideo");

if(openVideo){
  openVideo.onclick = () => {
    window.location.href = "ai-video.html";
  };
}
