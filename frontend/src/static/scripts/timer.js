function gameTimer (ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function WaitFor(condition, interval = 100) {
    while(!await condition()){
        await gameTimer(interval);
    }
    return;
}

async function Loop(){
    
}

export {gameTimer, WaitFor};