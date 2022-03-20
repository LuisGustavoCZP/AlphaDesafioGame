const fs = require('fs');
const path = __dirname.replace("scripts", "");
const stages = JSON.parse(fs.readFileSync(path + "data2/stages.json"));

function addStage(user)
{
    const stage = {stage:user.stages.length, highscore:0, finished:false};
    user.stages.push(stage);
    return stage;
}
function getStages (user)
{
    const last = user.stages.length - 1;
    const lastStage = user.stages[last];
    const currentStage = lastStage && !lastStage.finished || (last+1 >= stages.length) ? lastStage : addStage(user);
    //const userStage = stages[lastStage.stage];
    //console.log(lastStage, currentStage);
    const s = [];
    user.stages.forEach(userStage => 
    {
        const stage = stages[userStage.stage];
        const stageD = {stage:stage.stage, potions:[], highscore:user.stages[stage.stage].highscore};
        stage.potions.forEach(recipeID => 
        {
            const recipe = getItem(recipeID);
            const potion = getItem(recipe.item);
            stageD.potions.push({"name":potion.name, "icon":potion.icon})
        });
        s.push(stageD);
    });
    return s;
} 
function nextStage(user, timePass)
{
    const currentStageID = user.currentStage.stage;
    const userStage = user.stages[currentStageID];
    const gstage = stages[currentStageID];
    userStage.finished = true;
    const nscore = timePass * (gstage.time / gstage.points);
    console.log(`O score de ${user.name} foi ${nscore} na fase ${currentStageID+1}`);
    if(nscore > userStage.highscore)
    {
        user.points += nscore - userStage.highscore;
        userStage.highscore = nscore;
        if(nscore > user.highscore)
        {
            user.highscore = nscore;
            player.addRank(user);
        }
    }

    console.log(userStage);
    player.save(user.id);
    
    return {score:nscore, time:timePass};
}
function userstages (req, res)
{
    const user = users[req.session.userid];
    res.json(getStages(user));
}

