import { gameTimer, WaitFor } from "../../static/scripts/timer.js";

$(document).ready(async function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];
    const btnbook = $("#btn-book")[0];
    const btnmenu = $("#btn-menu")[0];
    btnbook.onclick = () => {window.modal.src="/windows/book";};
    btnmenu.onclick = () => {window.modal.src="/windows/menu";};
    await bookcase.start();
    //if(window.modal) window.modal.src="/windows/stage";
    parent.audiosys.play("open");
    cauldron.play((ingredients) =>
    {
        if(ingredients && ingredients.length == 2)
        {
            const itens = ingredients;
            cauldron.reset();
            console.log(itens, window.gameuser);
            cauldron.classList.remove("ui-droppable");
            window.gameuser.sendItems(itens, (response) => 
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
                    bookcase.update();
                    
                }
            }); //const response = await 
            
            
            
            //return true;
        }
        //console.log("Dropou objeto", ingredients); 
    });

    await WaitFor(async () => 
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
            text:"VAMOS LÁ!",
            click: true
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

