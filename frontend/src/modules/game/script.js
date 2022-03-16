$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];
    const btnbook = $("#btn-book")[0];
    btnbook.onclick = () => {parent.modal.src="modules/windows/book";};
    bookcase.start();
    if(parent.modal) parent.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        let recipe;
        if(parent.modal){
            parent.modal.src="";
            parent.audiosys.play("open");
            recipe = parent.gameuser.currentStage.potion;
        }
        dialogMage.createText("Vamos lá!");
        cauldron.start();

    }, 5000);
});

