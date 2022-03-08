$(document).ready(function() {
  

    $(".close").on("click", function() {
        $(`#Modal`).css("display","none");
    });


    $("#myRange").mousemove( function(){
        //volume.value = this.value
        $("#sound").html(`VOLUME: ${this.value}`);
    })
    $("#myRange").change( function(){

        $("#sound").html(`VOLUME: ${this.value}`);
    });

});
