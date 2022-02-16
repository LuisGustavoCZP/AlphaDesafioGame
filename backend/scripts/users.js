const fs = require('fs');
const crypto = require('crypto');

const users = JSON.parse(fs.readFileSync("./backend/data/users.json"));
class User 
{
    constructor(_name, _stage, _slot, _points, _key)
    {
        this.name = _name;
        this.stage = _stage;
        this.slot = _slot;
        this.points = _points;
        this.key = _key;//crypto.randomUUID();
    }

    static Load (data)
    {
        return new User(data.name, data.stage, data.slot, data.points, data.key);
    }
}

function NewUser (_name)
{
    const user = new User();
    user.name = _name;
    user.stage = 0;
    user.slot = 0;
    user.points = 0;
    user.key = crypto.randomUUID();

    users.push(user);
    return user;
}

function CreateCookie (_data, _key)
{
    const header = JSON.stringify({
        'alg': 'HS256',
        'typ': 'JWT'
    });

    const payload = JSON.stringify(_data); /* {
        'email': 'aylan@boscarino.com',
        'password': 'ya0gsqhy4wzvuvb4'
    } */

    const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
    const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
    /* const secret = 'my-custom-secret'; */

    const data = base64Header + '.' + base64Payload;

    const signature = crypto
        .createHmac('sha256', _key)
        .update(data)
        .digest('base64');

    const signatureUrl = signature
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')

    console.log(signatureUrl);
    return signatureUrl;
}

module.exports = 
{
    users,
    User,
    NewUser,
    CreateCookie
};