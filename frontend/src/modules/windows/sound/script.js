$(document).ready(function() {
  
    $("#myRange").attr("value", parent.audiosys.volume * 100);
    $("#sound").html(`VOLUME: ${parent.audiosys.volume * 100}`);
    $(".close").on("click", function() {
        //$(`#Modal`).css("display","none");
        parent.modal.src = "modules/windows/main";
        parent.audiosys.play("close");
    });


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
