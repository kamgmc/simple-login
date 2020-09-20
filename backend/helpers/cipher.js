CryptoJS = require('crypto-js')

module.exports = {
    encrypt: function(message, key) {
        if (message === null) {
            return null;
        }
        const cipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key.trim()));
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), cipherKey, {
            keySize: 16,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    },
    decrypt: function (message, key) {
        if (message === null) {
            return null;
        }
        const cipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key.trim()));
        return CryptoJS.AES.decrypt(message, cipherKey, {
            keySize: 16,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }
}
