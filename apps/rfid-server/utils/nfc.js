const { NFC } = require('nfc-pcsc');

export const initNFC = (callback) => {
    const nfc = new NFC();
    nfc.on('reader', (reader) => {
        console.log('reader', reader);
        reader.on('card', (card) => {
            console.log('card', card);
            callback(card);
        })
    })


}
