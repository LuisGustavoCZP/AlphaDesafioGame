$(document).ready(function() 
{
    $(".close").on("click", function() 
    {
        //console.log("Close");
        parent.modal.src = "windows/main";
        parent.audiosys.play("close");
        //$(`#Modal`).css("display","none");
    });

});