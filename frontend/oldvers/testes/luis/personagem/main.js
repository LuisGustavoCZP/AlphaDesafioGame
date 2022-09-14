import { CharacterPart, Character } from "../../../../src/static/scripts/animationsystem/character.js";
import { DragNDrop } from "../../../../src/static/scripts/animationsystem/dragging.js";
import { LoadSys, OrtoPath } from "../../../../src/static/scripts/loadsys.js";

var scripts = self.src;
console.log(scripts);
//const originPath = OrtoPath();


let p1, charMage, ready;
LoadSys.toJSON("../../../../src/database/person1.json", (data) => 
{
    p1 = data;
    charMage = Character.Load(p1, "characters");
    ready = true;
});

const characters = document.getElementById("characters");
const charactersCtx = characters.getContext("2d");
function gameloop ()
{
    window.requestAnimationFrame(gameloop, characters);
    charactersCtx.clearRect(0,0, characters.width, characters.height);
    if(ready)charMage.draw();
}
gameloop();

const dragndrop = DragNDrop(characters, (x,y) => 
{ 
    //obj.transform.cx = x - (obj.transform.x + (characters.width/2)); 
    //obj.transform.cy = y - (obj.transform.y + (characters.height/2)); 
    if(charMage.childs[1]){
        const p = charMage.childs[1];
        const cx = x - (p.transform.x + (characters.width/2)); 
        const cy = y - (p.transform.y + (characters.height/2)); 
        p.RotateTo(x, y, 0);
    }
}); //

console.log("Fui");
