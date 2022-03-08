class DialogSys extends HTMLElement
{
    static emojis = 
    [
        "emojis/anjel.png",         //00
        "emojis/away.png",          //01
        "emojis/bad.png",           //02
        "emojis/big-smile.png",     //03
        "emojis/blink.png",         //04
        "emojis/bored.png",         //05
        "emojis/cold.png",          //06
        "emojis/confused.png",      //07
        "emojis/contempt.png",      //08
        "emojis/decepted.png",      //09
        "emojis/excuse.png",        //10
        "emojis/hahaha.png",        //11
        "emojis/happy.png",         //12
        "emojis/hide.png",          //13
        "emojis/hot.png",           //14
        "emojis/hugging.png",       //15
        "emojis/injured.png",       //16
        "emojis/inlove.png",        //17
        "emojis/inverse.png",       //18
        "emojis/joking.png",        //19
        "emojis/liked.png",         //20
        "emojis/lol.png",           //21
        "emojis/loved.png",         //22
        "emojis/mid-smile.png",     //23
        "emojis/muted.png",         //24
        "emojis/normal.png",        //25
        "emojis/provoke.png",       //26
        "emojis/psiu.png",          //27
        "emojis/sleep.png",         //28
        "emojis/smile.png",         //29
        "emojis/sorry.png",         //30
        "emojis/think.png",         //31
        "emojis/trapping.png",      //32
        "emojis/ufff.png",          //33
        "emojis/wtf.png"            //34
    ];
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
                    parag.innerHTML += `<img class="item" src="images/${dialog.icons[i]}" />`;
                } 
                else if(code[0] == "f")
                {
                    const f = parseInt(code.slice(1));
                    dialog.functions[f](parag, dialog);
                } 
                else if(code[0] == "e")
                {
                    const e = parseInt(code.slice(1));
                    parag.innerHTML += `<img class="emoji" src="images/${DialogSys.emojis[e]}" />`;
                    
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