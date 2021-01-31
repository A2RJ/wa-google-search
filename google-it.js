const googleIt = require('google-it')
const rp = require('request-promise');
const rs = require("randomstring");;
const fs = require('fs')

// const query = "belajar php"
// const RS = rs.generate({
//     length: 15,
//     charset: 'alphabetic'
// });
// const RS = "coba"
// module.exports.google = function (){
//     googleIt({ 'query': query }).then(res => {
//         fs.writeFile('data.json', JSON.stringify(res), function (err) {
//             if (err) {
//                 console.error(err);
//             }
//             setTimeout(() => {
//                 const pages = require('./data.json')

//                 fs.mkdir("./" + RS, function (err) {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         console.log("New directory successfully created.")
//                         for (let index = 0; index < pages.length; index++) {
//                             const element = pages[index];
//                             rp(element.link)
//                                 .then(function (html) {
//                                     fs.writeFile('./' + RS + '/' + element.title + ".html", html, function (err) {
//                                         if (err) {
//                                             console.error(err);
//                                         }
//                                     });
//                                 })
//                                 .catch(function (err) {
//                                     console.error(err);
//                                 });
//                         }
//                     }
//                 })
//             }, 2000);
//         });
//     }).catch(e => {
//         console.error(e);
//     })
// }

