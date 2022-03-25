import { gameTimer, waitFor } from "../../static/scripts/timer.js";

$(document).ready(async function() 
{
    const bookcase = document.getElementById("bookcase");
    const cauldron = document.getElementById("cauldron");
    const dialogMage = document.getElementById("dialog-mage");
    window.gameuser.requestBook();
    const btnbook = $("#btn-book")[0];
    const btnmenu = $("#btn-menu")[0];
    const btnTips = $("#btn-tips")[0];
    btnbook.onclick = () => {btnbook.classList.remove("glow"); window.modal.src="/windows/book";};
    btnmenu.onclick = () => {window.modal.src="/windows/menu";};
    btnTips.onclick = () => {
        $("#btn-tips")[0].disabled = true;
        window.gameuser.requestTip((data)=>{
        data = [data];
        data.push({ text:"{f0}", functions:[ () => {$("#btn-tips")[0].disabled = false; } ] })
        dialogMage.createText(...data)
    })};
    await bookcase.start();
    //if(window.modal) window.modal.src="/windows/stage";
    parent.audiosys.play("open");
    cauldron.play(async(ingredients) =>
    {
        if(Math.random > 0.5) 
        {
            const resp = await window.gameuser.requestDialog();
            await dialogMage.createText(resp);
        }
        if(ingredients && ingredients.length == 2)
        {
            const itens = ingredients;
            cauldron.reset();
            console.log(itens, window.gameuser);
            cauldron.classList.remove("ui-droppable");
            window.gameuser.sendItems(itens, async (response) => 
            {
                console.log(response);
                if(response.result)
                {
                    window.modal.src = "";
                    window.gameuser.lastCreation = response.result;
                    window.modal.src = "/windows/newrecipe";
                }
                if(response.status == 1)
                {
                    //cauldron.draw(response.result.icon);
                    btnbook.classList.add("glow");
                    bookcase.update();
                    window.gameuser.requestBook();
                }
            }); //const response = await 
            
            
            
            //return true;
        }
        //console.log("Dropou objeto", ingredients); 
    });

    //await 
    waitFor(async () => 
    {
        /* console.log(cauldron.ingredients); */
        
        return false;
    });
    //await gameTimer(5000);

    let recipe;
    if(parent.modal){
        //parent.modal.src="";
        
        //recipe = parent.gameuser.currentStage.potion;
    }

    const dialogs = [
        {
            text:"VAMOS LÁ {$u}!",
            click: false,
            /* time: 1 */
        },
        /*{
            text:"FAÇA \n\t{i0}", 
            icons:
            [
                recipe.item.icon
            ],
            time:-1
        }, */
    ]
    await dialogMage.createText(...dialogs);
    //await parent.gameuser.requestStageStart();
    
    /**/
    /*if(data.status == 0) 
    {
        if(data.result) {
            console.log(`Criou a poção ${data.result}`)
        }
        return;
    }
        else if (data.status == 1) thisuser.stageTimeout();
    else {
        thisuser.stageWin();
    } */
    //cauldron.stop();
    console.log("Coisa coisada!");
});

