$(document).ready(() => 
{
    const stage = parent.gameuser.stage;
    console.log(parent.gameuser.currentStage.potion);
    const points = parseInt(parent.gameuser.stages[stage].highscore);
    const item = parent.gameuser.currentStage.potion.item;
    $("#title").html(`Aula ${stage+1}`);
    $("#potion").html(`
        <img src="../../../images/${item.icon}" alt="${item.name}"/>
        <h3>${item.name}</h3>
    `);
});