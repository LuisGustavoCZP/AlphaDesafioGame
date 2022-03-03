function Timer(callback, delay) {
    let timerId;
    let start;
    let remaining = delay;
  
    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };
  
    const resume = function () {
        start = new Date();
        timerId = window.setTimeout(function () {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    }

    this.resume = resume;
  
    this.reset = function () {
       remaining = delay;
    };
}


/* Exemplo de uso */
let countdown = 30;

let timer = new Timer(function () {
console.log(countdown);
countdown = countdown - 1;
if(countdown <= 0){
    invokePause();
}
}, 1000);

function invokePause(){
    timer.pause();
}

function invokeReset(){
		countdown = 30;
    timer.pause();
    timer.reset();
    timer.resume();
}

export { Timer };