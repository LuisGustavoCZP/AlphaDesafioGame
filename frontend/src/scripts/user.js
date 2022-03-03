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
        console.log(cookieValues);
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
            console.log(data)
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
            console.log(data)
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

    update () 
    {
        console.log(this.#userData);
        
        RequestSys.get("user", {params:{"userData":this.#userData}}, UserSucess, UserError);
        const thisuser = this;
        function UserSucess (data)
        {
            thisuser.#hasUser = true;
            thisuser.data = data;
            if(!data.tutorial)
            {
                window.game.src="modules/tutorial/index.html";
            }
            else window.game.src="modules/game/index.html";
        }

        function UserError (data, unable)
        {
            thisuser.#hasUser = false;
            if(unable)
            {
                window.game.src="modules/error/index.html";
            } else {
                window.game.src="modules/main/index.html";
            }
        }
    }
}

export { User };