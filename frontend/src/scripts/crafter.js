class Crafter extends HTMLElement
{
    constructor()
    {
        super();
        this.classList.add("ui-droppable");
        if(this.hasAttribute('img')) {
            this.img = new Image();
            this.img.src = this.getAttribute('img');
            this.append(this.img);
        } else {
            this.img = null;
        }
        this.style["border-radius"] = "15%";

        const div = document.createElement("div");
        div.classList.add("timer");
        this.timer = document.createElement("h2");
        div.append(this.timer);
        this.append(div);
        //this.classList.add("book");
    }

    createRecipes (data)
    {
        console.log(data, this);
        
    }

    start ()
    {
        $(this).droppable({
            accept: ".item",
            /* tolerance: "fit", */
            activate: function( event, ui ) { this.classList.add("highlight"); },
            deactivate: function( event, ui ) { this.classList.remove("highlight"); },
            over: function( event, ui ) 
            { 
                this.classList.add("placing"); 
                ui.helper[0].classList.add("ui-draggable-dropping");
                if(parent.audiosys) parent.audiosys.play("select");
            },
            out: function( event, ui ) 
            { 
                this.classList.remove("placing"); 
                ui.helper[0].classList.remove("ui-draggable-dropping"); 
            },
            drop: function( event, ui ) 
            { 
                const container = this;
                container.classList.remove("highlight");
                container.classList.remove("placing");
                if(!container.ingredients) container.ingredients = [];
                const itemid = ui.draggable[0].id;
                container.ingredients.push(itemid);
                console.log("Dropou objeto", container.ingredients); 
                if(parent.audiosys) parent.audiosys.play("sucess");
                parent.gameuser.sendItems(container.ingredients);
            }
        });

        const thisClass = this;
        function timerLoop (){
            const timePass = parent.gameuser.currentStage.limitTime - (new Date().getTime());
            //console.log(timePass);
            let ms = timePass;
            let aux = ms % 1000;
            let s = (ms - aux) / 1000;
            ms = aux;
            aux = s % 60;
            let mn = (s - aux) / 60;
            s = aux;
            aux = mn % 60;
            let hr = (mn - aux) / 60;
            mn = aux;
            aux = hr % 60;
            
            thisClass.timer.innerText = (hr > 0?`${hr}:`:"")+(mn > 0?`${mn}:`:"")+(s > 0?`${s}`:"")+(ms > 0?`.${ms}`.slice(0, 2):"");
            if(timePass > 0) setTimeout(timerLoop, 100);
            else parent.gameuser.stageTimeout();
        }
        timerLoop();
    }

    static define ()
    {
        console.log("Iniciou Crafter");
        /* customElements.define('modal', Modal); */
        customElements.define('game-crafter', Crafter);
    }
}

Crafter.define();

export {Crafter};