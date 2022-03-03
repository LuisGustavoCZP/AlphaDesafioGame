class Modal extends HTMLIFrameElement
{
    constructor()
    {
        super();
        this.classList.add("modal");
        this.hidden = true;
    }

    static define ()
    {
        console.log("Iniciou Modal");
        /* customElements.define('modal', Modal); */
        customElements.define('modal-window', Modal, { extends: "iframe" });
    }

    /**
     * @param {boolean} valor
     */
    set hidden (valor)
    {
        if(valor) this.classList.add("hidden");
        else this.classList.remove("hidden");
    }
    /**
     * @param {boolean} valor
     */
    get hidden ()
    {
        return this.classList.contains("hidden");
    }
}

Modal.define();

export {Modal};