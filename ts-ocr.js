//index.js file
const Tesseract = require('tesseract.js');
Tesseract.recognize(
    // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
    'image.jpg',
    // this second argument is for the laguage 
    'eng+ind',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    console.log(text);
})