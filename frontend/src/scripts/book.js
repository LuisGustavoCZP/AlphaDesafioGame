class Book extends HTMLElement
{
    constructor()
    {
        super();
        this.classList.add("book");
        parent.gameuser.requestBook ((data) => this.createItens(data));
    }

    createRecipes (data)
    {
        console.log(data, this);
    }

    static define ()
    {
        console.log("Iniciou Book");
        /* customElements.define('modal', Modal); */
        customElements.define('game-book', Book);
    }
}

Book.define();

export {Book};