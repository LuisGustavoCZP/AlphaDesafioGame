$(document).ready(function() {
  
    $("#myRange").attr("value", parent.audiosys.volume * 100);
    $("#sound").html(`VOLUME: ${parent.audiosys.volume * 100}`);
    function close () 
    {
        parent.modal.src = "";
        parent.audiosys.play("close");

    }
    $(".menu-background").on("click", (e) => {e.preventDefault(); e.stopPropagation();});
    $("body").on("click", close);
    $(".close").on("click", close);
    $("#myRange").mousemove( function(){
        //volume.value = this.
        parent.audiosys.volume = this.value/100;
        $("#sound").html(`VOLUME: ${this.value}`);
    })
    $("#myRange").change( function(){
        parent.audiosys.volume = this.value/100;
        $("#sound").html(`VOLUME: ${this.value}`);
    });


    $("#btn-home").on("click", function(){
        //console.log("tela 1");
        //parent.gameuser.goTo("modules/main", "windows/main"); //window Game 1
        parent.document.location = parent.document.location;
        //parent.audiosys.play("close");
    });

    /*$("#btn-restart").on("click", function(){
        console.log("tela 2");
        window.gameuser.goTo("modules/mode-ranked", "");
        //parent.modal.src = "windows/main"; //Window Game 2
        //parent.audiosys.play("close");
    });*/

});
