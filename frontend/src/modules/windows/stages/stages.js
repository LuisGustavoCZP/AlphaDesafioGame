$(document).ready(() => 
{
    $(".menu-background > *").remove();
    
    //const cookie = document.cookie;
   
    const stages = parent.gameuser.stages;

    let result = `<div id="menu-header">
                    <div id="title"><strong>FASES</strong></div>
                    <span class="close">&times;</span>
                </div>
                <div id="content">`;
    stages.forEach((element,index) => {
        result += `<div id="stage-${index + 1}" class="stages">
                        <button id="btn-stage${index+1}" class="stageButton">FASE ${element.stage + 1}</button>
                        <p> ${element.highscore} PONTOS</p>
                        <div class="potions">
                    `;
        const potions = element.potions;

        potions.forEach((e) => {
            result += `<img src="../../../images/${e.icon}" alt="${e.name}">`
        });
        result += `</div> 
                </div>`

    });
    result += `</div>`;
    
    $(".menu-background").html(result);


    //Clica na fase e faz algo
    $("button").on("click", (e) =>{
        console.log(e.target);
    });
    //console.log(parent.gameuser.stages);
    /*parent.game.src = "modules/game/";
    parent.modal.src = "";*/
    $(".close").on("click", function() 
    {
        console.log("Close");
        parent.modal.src = "";
        //$(`#Modal`).css("display","none");
    });

});