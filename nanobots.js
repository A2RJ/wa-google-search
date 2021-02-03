var request = require('request');   // install request module by - 'npm install request'
var fs = require('fs')

const form_data = {
  file: fs.createReadStream('nanobots.jpg'),
}

const options = {
    url : "https://app.nanonets.com/api/v2/OCR/Model/c19f4431-7c29-40f8-b02e-ae05e1999705/LabelFile/",
    formData: form_data,
    headers: {
        'Authorization' : 'Basic ' + Buffer.from('XD7gCz7HtKXAOFpAn7ZNqPHHitiAggIH' + ':').toString('base64')
    }
}
request.post(options, function(err, httpResponse, body) {
    // console.log(body);
    if (err) {
        console.error(err);
    }
    fs.writeFile('nanobots.json', body, httpResponse, function (err) {
        if (err) {
            console.error(err);
        }
    })
});