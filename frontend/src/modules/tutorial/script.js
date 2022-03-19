$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];
    const btnbook = $("#btn-book")[0];
    btnbook.onclick = () => {parent.modal.src="modules/windows/book";};

    if(parent.modal) parent.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        let recipe;
        if(parent.modal){
            parent.modal.src="";
            parent.audiosys.play("open");
            recipe = parent.gameuser.currentStage.potion;
        }

        const firstdialog = 
        {
            text:`OLÁ ${parent.gameuser.data.name.toUpperCase()}, VAMOS A NOSSA PRIMEIRA LIÇÃO!{e20}{f1}{f0}`,
            time:1000,
            speed: 0.75,
            click: true,
            functions:
            [
                (parag, dialog) => 
                {
                    cauldron.classList.add("highlight");
                },
                (parag, dialog) => 
                {
                    bookcase.start();
                },
            ]
        };

        const txts = [];
        txts.push(recipeDialog (recipe));

        dialogMage.createText(firstdialog, `ARRASTE OS ITENS ATÉ O CALDEIRÃO!{e4}`, ...txts);

    }, 5000);

    function recipeDialog (recipe) 
    {
        const newdialog = 
        {
            text:/* `{i0} + {i1} = {i2}{f0}` */"",
            time:5000,
            speed:.1,
            
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
        newdialog.text += `{i${newdialog.icons.length}} {f0}`; //${recipe.item.name}
        newdialog.icons.push(recipe.item.icon);

        //console.log(newdialog);
        //recipe.

        return newdialog;
    }
});

