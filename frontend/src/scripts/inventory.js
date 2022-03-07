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
            console.log(ttxt, this.title.innerText);
            this.title.innerText = ttxt;
            this.content.prepend(this.title);
        }
        
        this.style.listStyle = "none";
        this.createRows ();
    }

    start ()
    {
        if(window.gameuser && window.gameuser.stock) this.createItens(window.gameuser.stock);
        else this.createItens(pseudoStock);
        //window.gameuser.requestStock ((data) => this.createItens(data));
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
                    if(window.audiosys) window.audiosys.play("tick");
                });
                const h = function(event) {console.log(event.target);};
                const c = {
                    "ui-draggable": "dragging"
                }
                const dragstart = function( event, ui ) {
                    //console.log(this);
                    this.classList.add("dragging");
                    if(window.audiosys) window.audiosys.play("select");
                    //alert("hi..");
                }
                const dragstop = function( event, ui ) {
                    //console.log(this);
                    this.classList.remove("dragging");
                    if(window.audiosys) window.audiosys.play("drop");
                    //alert("hi..");
                }
                d.draggable ({opacity: 0.7, zIndex: 1001,appendTo: "body", helper: "clone", cursor: "move", start: dragstart, stop:dragstop});
                
            });
            /* .ondragstart = this.dragStart;
            el.children[0].ondragend = this.dragEnd;
            el.children[0].ondrag = this.drag; */
            if(i % maxColumns == 0) row++;
            //console.log(i % maxColumns, maxColumns, i, row, this.container.children);
            this.container.children[row].append(el);
        });
    }

/*     dragStart (ev) 
    {
        ev.dataTransfer.setData("text/plain", null);
        ev.dataTransfer.effectAllowed = "all";
        console.log(ev.target.id);
        ev.target.classList.add("dragging");
        ev.dataTransfer.mozCursor = "default";
        const targetClone = ev.target.cloneNode();
        targetClone.remove();

        targetClone.width = ev.target.width*5;
        targetClone.height = ev.target.height*5;
        console.log(targetClone, ev.target);
        ev.dataTransfer.setDragImage(targetClone, 0, 0);
    }

    drag (ev)
    {
        console.log(ev.target.id);
        ev.stopPropagation();
        ev.preventDefault();
        
        ev.dataTransfer.dropEffect = 'move';
    }

    dragEnd (ev) {
        console.log(ev.target.id);
        this.classList.remove("dragging");
    }

    dragOver (ev)
    {
        ev.stopPropagation();
        ev.preventDefault();
    } */

    static define ()
    {
        console.log("Iniciou Inventory");
        customElements.define('game-inventory', Inventory);
    }
}

Inventory.define();

export {Inventory};