/**
 * @LuisGustavoCZP
 */
function loadSys ()
{ 
    /**
    * @param {String} text
    * @param {String} type
    */
    function parse(text , type){
        let domParser = new DOMParser();
        return domParser.parseFromString(text, type);
    }

    /**
     * @param {String} path
     * @param {Function} callback
     */
    function toJSON(path, callback)
    {
        fetch(path)
        .then((data) => data.json())
        .then(callback)
        .catch((error) => {console.log(error)});
    }

    /**
     * @param {String} path
     * @param {Function} callback
     */
    function toHTML(path, callback)
    {
        toText (path, (data) => { callback(parse(data, "text/html")) });
    }

    /**
     * @param {String} path
     * @param {Function} callback
     */
    function toXML(path, callback)
    {
        toText (path, (data) => { callback(parse(data, "text/xml")) });
    }

    /**
     * @param {String} path
     * @param {Function} callback
     */
    function toText(path, callback)
    {
        fetch(path)
        .then((data) => data.text())
        .then(callback)
        .catch((error) => {console.log(error)});
    }

    return { toXML, toJSON, toHTML, toText, parse };
}

const LoadSys = loadSys ();

export {LoadSys};