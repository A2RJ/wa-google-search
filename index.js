const { Client, MessageMedia } = require('whatsapp-web.js');
const googleIt = require('google-it')
const rp = require('request-promise');
const rs = require("randomstring");;
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}


const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
client.initialize();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});
client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});
client.on('ready', () => {
    console.log('READY');
});
client.on('message', async msg => {
    // console.log('MESSAGE RECEIVED', msg);
    let chat = await msg.getChat();
    if (!chat.isGroup) {
        if (msg.body != 'P') {
            const RS = rs.generate({
                length: 15,
                charset: 'alphabetic'
            });
            googleIt({ 'query': msg.body }).then(res => {
                fs.writeFile('data.json', JSON.stringify(res), function (err) {
                    if (err) {
                        console.error(err);
                    }
                    setTimeout(() => {
                        const pages = require('./data.json')

                        fs.mkdir("./" + RS, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("New directory successfully created.")
                                for (let index = 0; index < pages.length; index++) {
                                    const element = pages[index];
                                    rp(element.link)
                                        .then(function (html) {
                                            fs.writeFile('./' + RS + '/' + element.title + '.html', html, function (err) {
                                                if (err) {
                                                    console.error(err);
                                                }
                                                if (fs.existsSync('./' + RS + '/' + element.title + '.html')) {
                                                    const media = MessageMedia.fromFilePath('./' + RS + '/' + element.title + '.html');
                                                    chat.sendMessage(media);
                                                }
                                            });
                                        })
                                        .catch(function (err) {
                                            console.error(err);
                                        });
                                }
                            }
                        })
                    }, 2000);
                });
            }).catch(e => {
                console.error(e);
            })
        }
    }
});
client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});