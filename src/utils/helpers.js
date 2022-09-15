
let screenHeight = 1024, screenWidth = 1024;

export function getScreenSize() {
    return { height: screenHeight, width: screenWidth }
}


export function setScreenSize(height, width) {
    screenHeight = height;
    screenWidth = width;
}


export function uriEncode(url) {
    return encodeURI(url);
}

/**
 * Parsing error data to get the proper error message 
 * @param error tryCatch or Promise errors
 * @returns ```message``` string message
 */
export function parseErrorMessage(error) {
    let retValue = "";
    if (error.response) {
        if (error.response.data.detail) {
            if (typeof error.response.data.detail === "string") {
                retValue = error.response.data.detail;
            } else if (Array.isArray(error.response.data.detail)) {
                retValue = error.response.data.detail[0].msg;
            } else if (typeof error.response.data.detail === "object") {
                retValue = error.response.data.detail[0].msg;
            } else {
                retValue = error.response.data.detail.toString();
            }
        } else if (error.response.data.error) {
            retValue = error.response.data.error.toString();
        } else {
            retValue = error.response.data.toString();
        }
    } else if (error.message) {
        retValue = error.message.toString();
    } else if (error.request) {
        retValue = error.request.toString();
    } else {
        retValue = error.toString();
    }
    return retValue;
}

export function storeToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
    sessionStorage.clear();
}

export function storeToLocalStorage(key, value, encode = false) {
    let data = value;
    /* s */
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key, decode = false) {
    let data = JSON.parse(localStorage.getItem(key));
    /* if (decode && isValid(data)) {
        data = decodeBase64(data);
    } */
    return data;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function isValid(data) {
    let retValue = false;
    if (data !== undefined && data != null && data.toString().trim() !== "") {
        retValue = true;
    }
    return retValue;
}

export function parseDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

export function encodeBase64(data) {
    return window.btoa(data);
}

export function decodeBase64(data) {
    return window.atob(data);
}

export function bytesToSize(bytes, decimals = 2) {
    //Ref : https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function numberToMillionSystem(value) {
    let retValue = Math.abs(Number(value));
    if (Math.abs(Number(value)) >= 1.0e+12) {
        // Twelve Zeroes for Trillion
        retValue = (Math.abs(Number(value)) / 1.0e+12).toFixed(2) + "T";
    } else if (Math.abs(Number(value)) >= 1.0e+9) {
        // Nine Zeroes for Billions
        retValue = (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B";
    } else if (Math.abs(Number(value)) >= 1.0e+6) {
        // Six Zeroes for Millions
        retValue = (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M";
    } else if (Math.abs(Number(value)) >= 1.0e+3) {
        // Three Zeroes for Thousands
        retValue = (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K";
    }
    return retValue;
}

/**
 * This function checks the given value and returns 
 * the int value if it's type is int, if it is 
 * float value then the decimal point will be set to given 
 * decimal point(default 1) and returns the value
 */
export function fixedDecimal(value, decimals = 1) {
    let retValue = value;
    if (typeof value == 'number' && !isNaN(value)) {
        if (Number.isInteger(value)) {
            retValue = value
        } else {
            retValue = parseFloat(value.toFixed(decimals));
        }
    } else {
        retValue = 0;
    }
    return retValue;
}


export function timeSince(date) {
    if (!isValid(date)) {
        return "";
    }
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 86400;
    if (interval > 7) {
        return new Date(date).toLocaleDateString();
    }
    if (interval > 1) {
        return Math.floor(interval) + " day(s)";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hour(s)";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute(s)";
    }
    if (seconds < 119) {
        return "Just now";
    }
    return Math.floor(seconds) + " second(s)";
}