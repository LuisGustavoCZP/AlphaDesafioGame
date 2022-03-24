function close () 
{
    parent.modal.src = "";
    parent.audiosys.play("close");
}
const modalBG = window.document.querySelector(".modal-background");
modalBG.addEventListener("click", (e) => {e.preventDefault(); e.stopPropagation();});
modalBG.parentElement.addEventListener("click", close);