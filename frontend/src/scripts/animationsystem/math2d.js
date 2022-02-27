function math2D ()
{
    function RotateTo (dirX, dirY, rotation) 
    {
        let maxDist = Math.sqrt(Math.pow(dirX, 2) + Math.pow(dirY, 2));

        dirX = maxDist > 0 ? dirX / maxDist : 0;
        dirY = maxDist > 0 ? dirY / maxDist : 0;
        let rad = ((360-rotation-90)*Math.PI)/180;
        let sin = Math.sin(rad), cos = Math.cos(rad);

        let odirX = (sin != 0? (sin)*dirX : 0) + (cos != 0? (cos)*dirY : 0);
        let odirY = (cos != 0? (cos)*dirX : 0) + (sin != 0? (sin)*dirY : 0);

        var angleDeg = Math.atan2(-odirX, odirY) * 180 / Math.PI;
        //console.log(angleDeg);
        return angleDeg;
    }

    return { RotateTo };
}
const Math2D = math2D();
export { Math2D };