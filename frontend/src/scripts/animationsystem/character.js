import { Math2D } from "./math2d.js";
import { CanvasSpriteFrame, CanvasSprite } from "./canvassprite.js";

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

class Transform extends Objeto
{
    constructor (transform, childs){
        super(transform);
        this.childs = childs;
    }

    draw(context, parentTransform = {"x":0, "y":0, "r":0, "s":1, "cx":0, "cy":0}) 
    {
        const s = parentTransform.s * this.transform.s;
        const x = s * this.transform.x;
        const y = s * this.transform.y;
        const cx = s * this.transform.cx;
        const cy = s * this.transform.cy;
        const fx = x+cx, fy = y+cy;
        //console.log("Drawing GO");
        context.translate(fx, fy);
        context.rotate((Math.PI / 180) * this.transform.r);
        context.translate(-fx, -fy);

        if(this.sprite) this.sprite.draw(context, x, y, s);
        context.translate(x, y);
        if(this.childs)
        {
            this.childs.forEach(child => 
            {
                child.draw(context, {"x":x, "y":y, "r":this.transform.r, "s":s, "cx":cx, "cy":cy});
            });
        }
        context.translate(-x, -y);
        
        context.translate(fx, fy);
        context.rotate((Math.PI / 180) * -this.transform.r);
        context.translate(-fx, -fy);
    }

}

class DrawObjeto extends Transform
{
    constructor (sprite, transform, childs)
    {
        super(transform, childs);
        this.sprite = sprite;
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
    constructor (parent, spriteSource, transform = {x:0, y:0, r:0, s:0}, childs) 
    {
        super(new CanvasSprite(new CanvasSpriteFrame(153, 76), spriteSource), transform, childs);
        this.parent = parent;
        //this.contraints = contraints;
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
        const ps = obj.childs ? obj.childs.map(function(part) 
        {
            return CharacterPart.Load(this, part);
        }) : [];
        return new CharacterPart(parent, obj.src, obj.transform, ps);
    }
}

//Classe que representa o tronco do corpo do boneco
class Character extends Transform
{
    //parent => SVG element: SVG na qual está grudada
    //childs => 
    constructor (canvas, transform, parts) 
    {
        super(transform, parts);
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
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
        
        super.draw(this.context)
        
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