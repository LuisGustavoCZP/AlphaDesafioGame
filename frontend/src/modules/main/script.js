//import { Request } from "../scripts/request.js";
$(document).ready(function() {
    $("button").on("click", (e) => {
    
        const btn = e.target.id; //btn-XXXX
        const idBtn = btn.split("-")[1]; //Only XXXX
    
        console.log(btn + " - " + idBtn);
        $(`#Modal`).css("display","block");
    
    });

    $(".close").on("click", function() {
        $(`#Modal`).css("display","none");
    });

});

