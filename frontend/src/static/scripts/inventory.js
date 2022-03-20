const pseudoStock = 
[
    {"name": "Maracujá", "icon": "assets/ingredients/1.png", "id": "i0"},
    {"name": "Abóbora", "icon": "assets/ingredients/2.png", "id": "i1"},
    {"name": "Alface", "icon": "assets/ingredients/3.png", "id": "i2"},
    {"name": "Tomate", "icon": "assets/ingredients/4.png", "id": "i3"},
    {"name": "Teia de Aranha", "icon": "assets/ingredients/5.png", "id": "i4"},
    {"name": "Teia de Aranha", "icon": "assets/ingredients/6.png", "id": "i5"},
    {"name": "Teia de Aranha", "icon": "assets/ingredients/7.png", "id": "i6"},
    {"name": "Teia de Aranha", "icon": "assets/ingredients/8.png", "id": "i7"},
    {"name": "Teia de Aranha", "icon": "assets/ingredients/9.png", "id": "i8"}
];

class Inventory extends HTMLElement
{
    container;
    columns;
    title;
    constructor()
    {
        super();
        const linkcss = document.createElement("link");
        linkcss.rel = "stylesheet";
        linkcss.href = "/styles/inventory.css";
        
        this.before(linkcss);
        this.classList.add("inventory");
        this.content = document.createElement("div");
        this.container = document.createElement("table");
        this.content.append(this.container);
        this.append(this.content);
        if(this.hasAttribute('columns')) {
            this.columns = this.getAttribute('columns');
        } else {
            this.columns = 5;
        }
        if(this.hasAttribute('rows')) {
            this.rows = this.getAttribute('rows');
        } else {
            this.rows = 6;
        }

        if(this.hasAttribute('title')) {
            const ttxt = this.getAttribute('title');
            
            this.title = document.createElement("span");
            //console.log(ttxt, this.title.innerText);
            this.title.innerText = ttxt;
            this.content.prepend(this.title);
        }
        
        this.style.listStyle = "none";
        this.createRows ();
    }

    start ()
    {
        console.log(parent.gameuser && parent.gameuser.stock)
        if(parent.gameuser && parent.gameuser.stock) this.createItens(parent.gameuser.stock);
        else this.createItens(pseudoStock);
        //parent.gameuser.requestStock ((data) => this.createItens(data));
    }

    createColumn ()
    {
        const tableColunm = document.createElement("td");
        return tableColunm;
    }

    createRow ()
    {
        const tableRow = document.createElement("tr");
        for (let i = 0; i < this.columns; i++) 
        {
            //tableRow.appendChild(this.createColumn ());
        }
        return tableRow;
    }

    createRows ()
    {
        this.tableRows = [];
        for (let i = 0; i < this.rows; i++) 
        {
            const table = this.createRow ();
            this.tableRows.push(table);
            this.container.append(table);
        }
    }

    createItens (data)
    {
        //const d = [data];
        //console.log(data);
        const maxColumns = this.columns; //this.tableRows.length;
        let row = -1;
        //this.container.ondragover = this.dragOver;
        data.forEach((item, i) => 
        {
            const el = document.createElement("td");

            el.innerHTML = (`<img class="item" title="${item.name}" id="${item.id}" src="/images/${item.icon}"></img>`);
            $(function ()
            {
                const d = $(`#${item.id}`);
                d.on("pointerenter", (e) => 
                {
                    if(parent.audiosys) parent.audiosys.play("tick");
                });
                const dragstart = function( event, ui ) {
                    this.classList.add("dragging");
                    if(parent.audiosys) parent.audiosys.play("select");
                }
                const dragstop = function( event, ui ) {
                    this.classList.remove("dragging");
                    if(parent.audiosys) parent.audiosys.play("drop");
                }
                d.draggable (
                {
                    opacity: 0.7, 
                    zIndex: 1001,
                    containment: "parent",
                    appendTo: "body", 
                    helper: "clone", 
                    cursor: "move", 
                    start: dragstart, 
                    stop:dragstop
                });
                
            });
            if(i % maxColumns == 0) row++;
            this.container.children[row].append(el);
        });
    }

    static define ()
    {
        console.log("Iniciou Inventory");
        customElements.define('game-inventory', Inventory);
    }
}

Inventory.define();

export {Inventory};