class DialogSys extends HTMLElement
{
    speed;
    constructor()
    {
        super();
        const linkcss = document.createElement("link");
        linkcss.rel = "stylesheet";
        linkcss.href = "/styles/dialog.css";
        this.before(linkcss);
        this.classList.add("dialog");
        this.speed = 1;
        //window.gameuser.requestBook ((data) => this.createItens(data));
        //
    }

    createText (...dialogs)
    {

        if(!dialogs || dialogs.length == 0) return;

        const dialog = dialogs.shift();
        if(!dialog || !(dialog.length || dialog.text)) 
        {
            this.createText(...dialogs);
            return;
        }

        let text;
        if(dialog.length > 0) {
            text = dialog;
        } else {
            text = dialog.text;
        }

        console.log(dialog, dialogs);
        const thisdialog = this;
        const globalSpeed = this.speed;
        const parag = document.createElement("p");
        this.append(parag);
        let letter = 0;
        console.log(parag, text.length);
        async function createLetter ()
        {
            const l = text.charAt(letter);
            
            if(l == "{")
            {
                const findex = text.indexOf("}", letter);
                const code = text.slice(letter+1, findex);
                console.log(code, letter, findex);
                if(code[0] == "i")
                {
                    const i = parseInt(code.slice(1));
                    parag.innerHTML += `<img src="images/${dialog.icons[i]}" />`;
                } else if(code[0] == "f"){
                    const f = parseInt(code.slice(1));
                    dialog.functions[f](parag, dialog);
                }
                
                letter = findex;
            } else {
                parag.innerHTML += l;
            }
         
            if(text.length > letter) 
            {
                letter++;
                setTimeout(createLetter, 100*globalSpeed*(dialog.speed?dialog.speed:1));
                //console.log(thisdialog.innerText, text, letter);
            } else {
                setTimeout(()=>
                {
                    parag.remove();
                    thisdialog.createText(...dialogs);
                    //if(dialog.next) thisdialog.createText(dialog.next);
                }, (dialog.time?dialog.time:1000)*globalSpeed);
            }
        }
        createLetter ();
    }

    static define ()
    {
        console.log("Iniciou Dialog");
        /* customElements.define('modal', Modal); */
        customElements.define('game-dialog', DialogSys);
    }
}

DialogSys.define();

export {DialogSys};