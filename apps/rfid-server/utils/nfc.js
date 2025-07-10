import { NFC } from 'nfc-pcsc';

export const initNFC = (callback) => {
    const nfc = new NFC();
    console.log('nfc', nfc);
    callback(nfc, null, null);
    // nfc.on('reader', (reader) => {
    //     console.log('reader', reader);
    //     reader.on('card', (card) => {
    //         console.log('card', card);
    //         callback(card, reader, null);
    //     })

    //     reader.on('card.off', card => {
    //         console.log(`${reader.reader.name}  card removed`, card);
    //         callback(null, null, null);
    //     });

    //     reader.on('error', err => {
    //         console.log(`${reader.reader.name}  an error occurred`, err);
    //         callback(null, null, err);
    //     });

    //     reader.on('end', () => {
    //         console.log(`${reader.reader.name}  device removed`);
    //         callback(null, null, null);
    //     });
    // })


}
