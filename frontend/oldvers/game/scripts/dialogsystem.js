class Dialog {
    constructor (parent = document.body, posX = 0, posY = 0, _class = "dialog")
    {
        DialogSystem.instance.Add(this);
        this.parent = parent;
        this.posX = posX;
        this.posY = posY;
    }
}

class DialogSystem {
    constructor ()
    {
        this.dialogs = [];
    }

    Add(dialog)
    {
        this.dialogs.push(dialog);
    }

    static instance = new DialogSystem();
}

export { Dialog, DialogSystem };
//import { Dialog, DialogSystem } from './dialogsystem.js';