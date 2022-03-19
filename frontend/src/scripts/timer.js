function gameTimer (ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function WaitFor(condition, interval = 100) {
    while(!condition()){
        await gameTimer(interval);
    }
    return;
}

export {gameTimer, WaitFor};