$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];

    if(window.modal) window.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        let recipe;
        if(window.modal){
            window.modal.src="";
            window.audiosys.play("open");
            recipe = window.gameuser.currentStage.potion;
        }

        const firstdialog = 
        {
            text:`OLÁ ${window.gameuser.data.name.toUpperCase()}, VAMOS A NOSSA PRIMEIRA LIÇÃO!{e20}{f0}`,
            time:1000,
            speed: 0.75,
            functions:
            [
                (parag, dialog) => 
                {
                    bookcase.start();
                },
            ]
        };

        dialogMage.createText(firstdialog, `ARRASTE OS ITENS ATÉ O CALDEIRÃO!{e4}`, 
        recipeDialog (recipe));

    }, 5000);

    function recipeDialog (recipe) 
    {
        const newdialog = 
        {
            text:/* `{i0} + {i1} = {i2}{f0}` */"{f0}",
            time:1000,
            speed:.25,
            icons: //{i0}
            [
                /* "/images/assets/ingredients/1",
                "/images/assets/ingredients/2",
                "/images/assets/potions/1" */
            ],
            functions:
            [
                (parag, dialog) => 
                {
                    cauldron.classList.add("highlight");
                },
                (parag, dialog) => 
                {
                    cauldron.classList.remove("highlight");
                    cauldron.start();
                }
            ]
            /* functions://{f0}
            [
                (parag, dialog) => 
                {
                    //dialogMage.createText();
                }
            ] */
        };

        recipe.ingredients.forEach(item => 
        {
            newdialog.text += `{i${newdialog.icons.length}} `; //${item.name}
            newdialog.icons.push(item.icon);
            if(recipe.ingredients.length > newdialog.icons.length) newdialog.text += "+ ";
        });

        newdialog.text += "= ";
        newdialog.text += `{i${newdialog.icons.length}} {f1}`; //${recipe.item.name}
        newdialog.icons.push(recipe.item.icon);

        //console.log(newdialog);
        //recipe.

        return newdialog;
    }
});

