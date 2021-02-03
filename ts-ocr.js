// //index.js file
// const Tesseract = require('tesseract.js');
// Tesseract.recognize(
//     // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
//     'image.jpg',
//     // this second argument is for the laguage 
//     'eng+ind',
//     { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//     console.log(text);
// })
const { createWorker } = require('tesseract.js');

const worker = createWorker({
    logger: m => console.log(m), // Add logger here
});

(async () => {
    await worker.load();
    await worker.loadLanguage('eng+ind');
    await worker.initialize('eng+ind');
    const { data: { text } } = await worker.recognize('Scan_20210203.jpg');
    console.log(text);
    await worker.terminate();
})();