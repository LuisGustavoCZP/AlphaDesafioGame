import { RequestSys } from "/scripts/request.js";

class User
{
    #hasUser;
    #userData;
    data;

    constructor ()
    {
        this.#hasUser = false;
        this.#userData = this.#recoverCookie ();
        this.data = null;
    }

    #createCookie (userData) 
    {
        const date = new Date();
        date.setTime(date.getTime() + 1000*60*5); //31536000000
        return `userData=${userData}; expires=${date.toGMTString()}; SameSite=None; Secure;path=/`; //;domain=localhost:8080
    }

    #recoverCookie () {
        const cookie = document.cookie;
        const cookieValues = cookie.split(";");
        //console.log(cookieValues);
        return cookieValues[0].replace("userData=", "");
    }

    login (user)
    {
        if(this.#hasUser) return;

        fetch(`${RequestSys.URL()}login`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"user":user}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(data => 
        {
            const status = data;
            //console.log(data)
            if(status == 1 || status == 2 ){
                alert("Login ou Senha invalidos!");
            } 
            else/*  if(status == 0) */
            {
                this.#hasUser = true;
                document.cookie = this.#createCookie(data.userData);
                this.#userData = this.#recoverCookie ();
                this.update();
                parent.modal.src = "";
            }
        })
        .catch(resp => { console.log(resp); });
    }

    newuser (user)
    {
        if(this.#hasUser) return;

        fetch(`${RequestSys.URL()}login`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"user":user}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(data => 
        {
            const status = data;
            //console.log(data)
            if(status == 1 || status == 2 ){
                alert("Login ou Senha invalidos!");
            } 
            else/*  if(status == 0) */
            {
                const status = data;
                console.log(data);
                if(status == 1 ){//already exists 
                    this.login(username);
                } else if(status == 0){ //New user created
                    this.login(username);  
                }
            }
        })
        .catch(resp => { console.log(resp); });
    }

    userError = (data, unable) =>
    {
        this.#hasUser = false;
        if(unable)
        {
            window.game.src="modules/error/index.html";
        } else {
            window.game.src="modules/main/index.html";
            window.modal.src="modules/windows/login/";
        }
    }

    update (callback) 
    {
        RequestSys.get("user", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.#hasUser = true;
            thisuser.data = data;
            //window.modal.src="";
            if(callback){
                callback(data);
            } else {
                if(false && !data.tutorial)
                {
                    window.game.src="modules/tutorial/index.html";
                }
                else 
                {
                    window.game.src="modules/main/index.html";
                }
            }

            thisuser.requestRanking();
            thisuser.requestStages();
            thisuser.requestBook();
            thisuser.requestStock();
        }
    }

    requestStages (callback)
    {
        RequestSys.get("stages", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stages = data;
            if(callback){
                callback(data);
            }
        }
    }

    requestBook (callback)
    {
        RequestSys.get("book", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.book = data;
            if(callback){
                callback(data);
            }
        }
    }

    requestStock (callback)
    {
        RequestSys.get("stock", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stock = data;
            if(callback){
                callback(data);
            }
        }
    }

    requestRanking (callback)
    {
        RequestSys.get("ranking/5", {}, userSucess, this.userError); //params:{"userData":this.#userData}
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.ranking = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
    }
}

export { User };