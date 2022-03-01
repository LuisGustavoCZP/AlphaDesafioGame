class CanvasSpriteFrame 
{
    constructor (width, height, space = 0){
        this.width = width;
        this.height = height;
        this.space = space;
    }
}

class CanvasSprite 
{ 
    constructor (spriteFrame, source){
        this.spriteFrame = spriteFrame;
       
        this.readyDraw = false;
        this.spriteSheet = new Image();
        this.spriteSheet.onload = () => 
        {
            this.readyDraw = true;
        }
        this.spriteSheet.onloadstart = () => 
        {
            this.readyDraw = false;
        }
        this.spriteSheet.src = source;
    }

    draw(context, posX, posY, size) {
        const sX = size * this.spriteSheet.width;
        const sY = size * this.spriteSheet.height;
        //console.log(posX, posY);
        posX = posX - (sX/2);
        posY = posY - (sY/2);
        
        if(this.readyDraw)
        {
            context.drawImage(this.spriteSheet, 0, 0, this.spriteSheet.width, this.spriteSheet.height, posX, posY, sX, sY);
        }
    }
    
}

export { CanvasSpriteFrame, CanvasSprite };