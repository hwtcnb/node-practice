const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const Raw = require('../model/schema')



function uploadAndSave(req) {
    const form = new formidable.IncomingForm();
        form.uploadDir = path.join(process.cwd(), 'uploads')
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err);
            }
            const file = files.myFile
            const oldPath = file.filepath
            // const newPath = path.join(process.cwd(), 'uploads', file.originalFilename)

            await Raw.create({picture: fs.readFileSync(oldPath)}, (err, item) => {
                if (err) {
                    console.log(err);
                }
                item.save()
            })
        })
}

async function renderPage(req, res) {
    const raws = await Raw.find({}).lean()
    fs.readFile(path.join(process.cwd(), 'public', req.url === '/' || req.url === '/upload' ? '/index.html' : req.url), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // const mime = req.url === '/' ? 'text/html' : 'text/' + path.extname(req.url).substring(1)
            // res.writeHead(200, {'Content-Type': `${mime}`})
            res.write(data)
            for (raw of raws) {
                res.write(`<img src="data:image/png;base64,${raw.picture.toString('base64')}" weigth="200" height="200"><br>`)
            }
            res.end()
        }
    })
}

module.exports = {
    uploadAndSave,
    renderPage
}