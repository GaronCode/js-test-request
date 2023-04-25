// Pure JS
class XHRequest {
    #reqType;
    #url;
    #onLoad;
    #onError;
    constructor({url,reqType, onLoad, onError, data}) {
        this.#url = url
        this.#reqType = reqType?reqType:"POST"
        this.#onLoad = onLoad
        this.#onError = onError
        
        if (data) {
            this.send(data)
        }
    }
    send(data) {
        
        const xhr = new XMLHttpRequest()

        xhr.onload = ()=>{
            switch (xhr.status) {
                case 200:
                    this.#onLoad(xhr.response)
                    break;
            
                default:
                    if (this.#onError) 
                        this.#onError({
                            status: xhr.status,
                            statusText: xhr.statusText,
                            response: xhr.response
                        })
                    break;
            }
        }     
        
        switch (this.#reqType) {
            case "POST":
                xhr.open("POST", this.#url)
                xhr.send(data)
                break;
            case "GET":
                xhr.open("GET", this.#url + this.objToGet(data))
                xhr.send()
            default:
                return;
        }
        
 
    }
    objToGet(object){
        let req = "?"
        for (let key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                req += `${key}=${object[key]}&`
            }
        }
        return req;
    }
}

class UserService {
    #password;
    #username;
    #url = "https://reqres.in/api/users"

    constructor({username, password}) {
        this.#username = username;
        this.#password = password;
    }

    get username() {return this.#username }
    set username(v) {}

    authenticateUser({done, err}) {
        
        const req = new XHRequest({
            url: this.#url,
            reqType: "POST",
            onLoad: done,
            onError: err
        })

        req.send({
            username: this.#username,
            password: this.#password
        })

    }
}


document.querySelector('#login').addEventListener('click', auth);


function auth() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value
    
    const User = new UserService({username, password})
    User.authenticateUser({
        done: ()=>document.location.href = '/?',
        err: (errText)=> {
            alert('authentication error')
            console.log(errText);
        }
    })
}




