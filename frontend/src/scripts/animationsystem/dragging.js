function DragNDrop (_target = window, _onmove=()=>{}, _onstart=()=>{}, _onstop=()=>{})
{
    let target = _target;
    const onmove =_onmove;
    const onstart =_onstart;
    const onstop =_onstop;
    let startX = 0;
    let startY = 0; 

    setTarget(_target);

    function width () {
        if(!target || !target.width) return 300;
        return target.width;
    }

    function height () {
        if(!target || !target.height) return 150;
        return target.height;
    }
    
    function mouseDragging (e)
    {
        e.stopPropagation();
        e.preventDefault();
        const px = event.clientX - (width()/2);
        const py = event.clientY - (height()/2);
        
        onmove(px - startX, py - startY);
    }
    
    function mouseStartDrag (e)
    {
        e.stopPropagation();
        e.preventDefault();
        startX = event.clientX - (width()/2);
        startY = event.clientY - (height()/2);
        //console.log(target);
        if(target) 
        {
            target.isDragging = true;
            target.addEventListener("pointermove", mouseDragging);
        }
       
        onstart(startX, startY);
    }
    
    function mouseEndDrag (e)
    {
        e.stopPropagation();
        e.preventDefault();
        const px = event.clientX - (width()/2);
        const py = event.clientY - (height()/2);
        if(target) 
        {
            target.isDragging = false;
            target.removeEventListener("pointermove", mouseDragging);
        }
        onstop(px, py);
    }

    function remove ()
    {
        if(!target) return;
        target.isDragging = false;
        target.removeEventListener("pointermove", mouseDragging);
        target.removeEventListener("pointerdown", mouseStartDrag);
        target.removeEventListener("pointerup", mouseEndDrag);
        target.removeEventListener("pointerleave", mouseEndDrag);
        target = null;
    }

    function setTarget (_target = null)
    {
        if(!_target) { remove (); return;}
        target = _target;
        target.addEventListener("pointerdown", mouseStartDrag);
        target.addEventListener("pointerup", mouseEndDrag);
        target.addEventListener("pointerleave", mouseEndDrag);
        console.log(_target);
    }

    return {mouseDragging, mouseStartDrag, mouseEndDrag, setTarget, remove, setTarget};
}

export { DragNDrop };