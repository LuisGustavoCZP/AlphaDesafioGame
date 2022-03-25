const pseudoStock = 
[
    {"name": "Maracujá", "icon": "ingredients/1.png", "id": "i0"},
    {"name": "Abóbora", "icon": "ingredients/2.png", "id": "i1"},
    {"name": "Alface", "icon": "ingredients/3.png", "id": "i2"},
    {"name": "Tomate", "icon": "ingredients/4.png", "id": "i3"},
    {"name": "Teia de Aranha", "icon": "ingredients/5.png", "id": "i4"},
    {"name": "Teia de Aranha", "icon": "ingredients/6.png", "id": "i5"},
    {"name": "Teia de Aranha", "icon": "ingredients/7.png", "id": "i6"},
    {"name": "Teia de Aranha", "icon": "ingredients/8.png", "id": "i7"},
    {"name": "Teia de Aranha", "icon": "ingredients/9.png", "id": "i8"},
    {"name": "Maracujá", "icon": "ingredients/1.png", "id": "i0"},
    {"name": "Abóbora", "icon": "ingredients/2.png", "id": "i1"},
    {"name": "Alface", "icon": "ingredients/3.png", "id": "i2"},
    {"name": "Tomate", "icon": "ingredients/4.png", "id": "i3"},
    {"name": "Teia de Aranha", "icon": "ingredients/5.png", "id": "i4"},
    {"name": "Teia de Aranha", "icon": "ingredients/6.png", "id": "i5"},
    {"name": "Teia de Aranha", "icon": "ingredients/7.png", "id": "i6"},
    {"name": "Teia de Aranha", "icon": "ingredients/8.png", "id": "i7"},
    {"name": "Teia de Aranha", "icon": "ingredients/9.png", "id": "i8"},
    {"name": "Maracujá", "icon": "ingredients/1.png", "id": "i0"},
    {"name": "Abóbora", "icon": "ingredients/2.png", "id": "i1"},
    {"name": "Alface", "icon": "ingredients/3.png", "id": "i2"},
    {"name": "Tomate", "icon": "ingredients/4.png", "id": "i3"},
    {"name": "Teia de Aranha", "icon": "ingredients/5.png", "id": "i4"},
    {"name": "Teia de Aranha", "icon": "ingredients/6.png", "id": "i5"},
    {"name": "Teia de Aranha", "icon": "ingredients/7.png", "id": "i6"},
    {"name": "Teia de Aranha", "icon": "ingredients/8.png", "id": "i7"},
    {"name": "Teia de Aranha", "icon": "ingredients/9.png", "id": "i8"},
    {"name": "Maracujá", "icon": "ingredients/1.png", "id": "i0"},
    {"name": "Abóbora", "icon": "ingredients/2.png", "id": "i1"},
    {"name": "Alface", "icon": "ingredients/3.png", "id": "i2"},
    {"name": "Tomate", "icon": "ingredients/4.png", "id": "i3"},
    {"name": "Teia de Aranha", "icon": "ingredients/5.png", "id": "i4"},
    {"name": "Teia de Aranha", "icon": "ingredients/6.png", "id": "i5"},
    {"name": "Teia de Aranha", "icon": "ingredients/7.png", "id": "i6"},
    {"name": "Teia de Aranha", "icon": "ingredients/8.png", "id": "i7"},
    {"name": "Teia de Aranha", "icon": "ingredients/9.png", "id": "i8"},
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
        linkcss.href = "/static/styles/inventory.css";
        this.before(linkcss);
        
        this.classList.add("inventory");
        this.innerHTML = `<aside class="deep-top">
                            <div class="deep-top right"></div>
                            <div class="deep-top mid"></div>
                            <div class="deep-top left"></div>
                        </aside>
                        <aside class="deep-right">
                            <div class="deep-right top"></div>
                            <div class="deep-right mid"></div>
                            <div class="deep-right bottom"></div>
                        </aside>`;
        this.content = document.createElement("div");
        /* this.viewPort = document.createElement("div");
        this.viewPort.classList.add("view"); */
        this.container = document.createElement("table");
        /* this.viewPort.append(this.container); */
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
            this.rows = 4;
        }

/*         if(this.hasAttribute('title')) {
            const ttxt = this.getAttribute('title');
            
            this.title = document.createElement("span");
            //console.log(ttxt, this.title.innerText);
            this.title.innerText = ttxt;
            this.content.prepend(this.title);
        } */
        
        this.style.listStyle = "none";
        this.createRows ();
    }

    start ()
    {
        
        if(window.gameuser) {
            const req = window.gameuser.requestStock((data) => {this.createItens(data);});
            //console.log(req);
            
        } 
        else return this.createItens(pseudoStock);
        //parent.gameuser.requestStock ((data) => this.createItens(data));
    }

    async update ()
    {
        const resp = await window.gameuser.requestStock(); 
        console.log(resp);
        this.container.innerHTML = "";
        this.createRows ();
        window.gameuser.requestStock((data) => {this.createItens(data);});
        return resp;
        //(data) => {this.createItens(data);}
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
        console.log(data);
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
            let rowEl = this.container.children[row];
            if(!rowEl)
            {
                rowEl = this.createRow ();
                this.tableRows.push(rowEl);
                this.container.append(rowEl);
            }
            rowEl.append(el);
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