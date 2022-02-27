import { Math2D } from "./math2d.js";
import { CanvasSpriteFrame, CanvasSprite } from "./canvassprite.js";

class Transform 
{
    constructor (x, y, r, s){
        this.x = x;
        this.y = y;
        this.r = r;
        this.s = s;
        this.cx = 0;
        this.cy = 0;
    }
}

class Objeto 
{
    constructor (transform)
    {
        this.transform = transform;
    }

    RotateTo (dirX, dirY, rot = 0)
    {
        this.transform.r = Math2D.RotateTo(dirX, dirY, 0) + rot;
    }
}

class DrawObjeto extends Objeto
{
    constructor (sprite, transform)
    {
        super(transform);
        this.sprite = sprite;
    }

    draw(context, parentTransform) 
    {
        const s = parentTransform.s * this.transform.s;
        const x = s * this.transform.x;
        const y = s * this.transform.y;
        const cx = s * this.transform.cx;
        const cy = s * this.transform.cy;
        const fx = x+cx, fy = y+cy;
        //console.log(cx, cy)
        //console.log("Drawing GO");
        //context.translate(cx, cy);
        context.translate(fx, fy);
        context.rotate((Math.PI / 180) * this.transform.r);
        context.translate(-fx, -fy);

        this.sprite.draw(context, x, y, s);
        
        context.translate(fx, fy);
        context.rotate((Math.PI / 180) * -this.transform.r);
        context.translate(-fx, -fy);
        //context.translate(-cx, -cy);
    }
}

//Classe que representa as partes do corpo do boneco
class CharacterPart extends DrawObjeto
{
    //parent => CharacterPart: parte na qual está grudada
    //contraints => {min, max}: constrição angular
    //position => {x, y}: posição relativa
    //rotation => r: graus de rotação
    //src => "...png": destino que contem a imagem
    //img => elemento Image do DOM
    constructor (parent, spriteSource, transform = {x:0, y:0, r:0, s:0}, contraints = {min:0, max:360}) 
    {
        super(new CanvasSprite(new CanvasSpriteFrame(153, 76), spriteSource), transform);
        this.parent = parent;
        this.contraints = contraints;
        this.spriteSource = spriteSource;
    }

    /**
     * @param {String} src
     */
    set src (src){
        this.canvasSprite.src = src;
    }

    static Load (parent, obj)
    {
        
        return new CharacterPart(parent, obj.src, obj.transform, obj.contraints);
    }
}

//Classe que representa o tronco do corpo do boneco
class Character extends Objeto
{
    //parent => SVG element: SVG na qual está grudada
    //childs => 
    constructor (canvas, transform, parts) 
    {
        super(transform);
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.parts = parts;
        console.log(this);
    }

    draw ()
    {
        const h = (this.canvas.height/2), w = (this.canvas.width/2);
        const x = (this.transform.s * this.transform.x);
        const y = (this.transform.s * this.transform.y);
        const cx = (this.transform.s * this.transform.cx);
        const cy = (this.transform.s * this.transform.cy);
        const fx = x+cx, fy = y+cy;

        this.context.translate(w, h);
        
        this.context.translate(fx, fy);
        this.context.rotate((Math.PI / 180) * this.transform.r);     
        this.context.translate(-fx, -fy);
        
        this.context.translate(x, y);
        this.parts.forEach(part => 
        {
            part.draw(this.context, {"x":x, "y":y, "r":this.transform.r, "s":this.transform.s, "cx":cx, "cy":cy});
        });
        this.context.translate(-x, -y);

        this.context.translate(fx, fy);
        this.context.rotate((Math.PI / 180) * -this.transform.r);
        this.context.translate(-fx, -fy);
        
        this.context.translate(-w, -h);
    }

    static Load (obj, canvas)
    {
        console.log(obj);
        const ps = obj.parts.map(function(part) 
        {
            return CharacterPart.Load(this, part);
        });
        return new Character(canvas ? document.getElementById(canvas) : document.getElementById(obj.canvas), obj.transform, ps);
    }
}

export { CharacterPart, Character };