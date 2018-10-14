
export function retrieveItem(name) {
    try { 
        //Try to use localStorage first
        if(typeof localStorage.getItem == 'function') {};
        return localStorage.getItem(name) || "";
    } catch(e) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var keyvalue = cookies[i].split("=");
            if (keyvalue[0].trim() === name) return keyvalue[1];
        }
        return "";
    }
}

export function storeItem(name, value) {
    try { 
        //Try to use localStorage first
        if(typeof localStorage.getItem == 'function') {};
        localStorage.setItem(name, value);
    } catch(e) {
        var expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        document.cookie = name + "=" + value.trim() + "; expires=" + expiry.toUTCString();
    }
}
