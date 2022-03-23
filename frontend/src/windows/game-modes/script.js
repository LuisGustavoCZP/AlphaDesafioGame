$(document).ready(() => 
{

    $("#btn-mode-one").on("click", function(){
        console.log("tela 1");
        parent.gameuser.goTo("modules/mode-free", ""); //window Game 1
        //parent.audiosys.play("close");
    });

    $("#btn-mode-two").on("click", function(){
        console.log("tela 2");
        parent.gameuser.goTo("modules/mode-ranked", "");
        //parent.modal.src = "windows/main"; //Window Game 2
        //parent.audiosys.play("close");
    });

    
    $(".close").on("click", function() 
    {
        //console.log("Close");
        parent.modal.src = "windows/main";
        parent.audiosys.play("close");
        //$(`#Modal`).css("display","none");
    });


});