import { CharacterPart, Character } from "../../scripts/animationsystem/character.js";
import {DragNDrop} from "../../scripts/animationsystem/dragging.js";
var id = null;
/* var xmlns = "http://www.w3.org/2000/svg";
var view = document.getElementById("space");
var nave = document.getElementById("nave-jogador");
var prefabs = document.getElementsByTagName("template"); */
var p1 = {
    "canvas":"characters",
    "transform":
    {
        "x":0,
        "y":0,
        "r":0,
        "s":1,
        "cx":0,
        "cy":0
    },
    "parts":
    [
        {
            "src":"images/blueShirt1.png", 
            "contraints":{"min": 0, "max":360},
            "transform":
            {
                "x":0,
                "y":0,
                "r":0,
                "s":1,
                "cx":0,
                "cy":0
            }
        },
        {
            "src":"images/blueArm_long.png", 
            "contraints":{"min": 0, "max":360},
            "transform":
            {
                "x":130,
                "y":-15,
                "r":0,
                "s":1,
                "cx":-60,
                "cy":-30
            }
        }
    ]
};

var obj = Character.Load(p1, "characters");

const characters = document.getElementById("characters");
const charactersCtx = characters.getContext("2d");
function gameloop ()
{
    window.requestAnimationFrame(gameloop, characters);
    charactersCtx.clearRect(0,0, characters.width, characters.height);
    obj.draw();
    if(obj.parts[1]){
        const p = obj.parts[1];
        const or = -360;
        p.transform.r = or+(((p.transform.r-or) + .5) % 30); 
    }
    
}
gameloop();

const dragndrop = DragNDrop(characters, (x,y) => 
{ 
    //obj.transform.cx = x - (obj.transform.x + (characters.width/2)); 
    //obj.transform.cy = y - (obj.transform.y + (characters.height/2)); 
    
}); //