class Item 
{
    constructor(_name, _category, _icon, _desc)
    {
        this.name = _name;
        this.category = _category;
        this.icon = _icon;
        this.desc = _desc;
    }
}

class Inventory 
{
    constructor (_parent, _width, _height, _items)
    {
        this.parent = _parent;
        this.content = document.createElement("ul");
        this.width = _width;
        this.height = _height;
        this.slots = [];
        this.free = [];
        const t = _width * _height;

        for(let i = 0; i < t; i++)
        {
            if(_items.length > i)
            {
                const item = _items[i];
                const slot = {id: i++, item:item};
                slots.push(slot);
                Build(slot);
            } else {
                const slot = {id: i++, item:null};
                slots.push(slot);
                free.push(slot.id);
            }
        }

        this.parent.append(this.content);
    }

    Add (_item) 
    {
        const id = free.pop();
        const slot = {id: id, item:_item};
        slots.push(slot);
    }

    Remove (_id) 
    {
        const slot = slots[_id];
        slot.item = null;
        free.push(slot.id);
    }
    
    RandomSort ()
    {
        slots.sort((a,b)=>{return (Math.random()*2)-1;})
    }

    Build (_slot) {
        parent.append(`<li>${_slot.item.name}</li>`);
    }

    BuildAll () {
        
    }
}