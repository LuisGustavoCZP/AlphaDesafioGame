$(document).ready(() => 
{
    const stageData = parent.gameuser.currentStage;
    console.log(stageData);
    const userData = parent.gameuser.data;
    $("#title").html(`VITORIA`);
    $("#content-main").html(`
    <div>
        <div class="content-title">
            <strong>VOCÊ FEZ ${stageData.result.points} PONTOS!</strong>
        </div>
        <div class="content-subtitle">
            <strong>${userData.highscore} PONTOS</strong>
        </div>
    </div>
    <span class="icon trophy r"></span>
    `);
    $("#btn-replay").on("click", () => 
    {
        parent.game.src = "";
        const stage = parent.gameuser.stage;
        parent.gameuser.start(stage);
    });
    $("#btn-next").on("click", () => 
    {
        parent.gameuser.goTo("modules/main/", "");
    });
    /*
    console.log(parent.gameuser.currentStage.potion);
    const points = parseInt(parent.gameuser.stages[stage].highscore);
    const item = parent.gameuser.currentStage.potion.item;
    
    $("#potion").html(`
        <img src="../../../images/${item.icon}" alt="${item.name}"/>
        <h3>${item.name}</h3>
    `); */
});