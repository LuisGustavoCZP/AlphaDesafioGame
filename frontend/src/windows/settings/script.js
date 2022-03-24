$(document).ready(function() {
  
    $("#myRange").attr("value", parent.audiosys.volume * 100);
    $("#sound").html(`VOLUME: ${parent.audiosys.volume * 100}`);
    function close () 
    {
        parent.modal.src = "windows/main";
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

});
