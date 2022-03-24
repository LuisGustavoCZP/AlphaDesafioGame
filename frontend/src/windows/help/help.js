$(document).ready(function() 
{
    /* $(".close").on("click", function() 
    {
        //console.log("Close");
        parent.modal.src = "windows/main";
        parent.audiosys.play("close");
        //$(`#Modal`).css("display","none");
    }); */
    function close () 
    {
        parent.modal.src = "windows/main";
        parent.audiosys.play("close");

    }
    $(".menu-background").on("click", (e) => {e.preventDefault(); e.stopPropagation();});
    $("body").on("click", close);
    $(".close").on("click", close);
});