const URL = require("../models/url");
var opn = require('opn');

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

exports.addPost = (req, res, next) => {
    URL.find({ original_url: req.body.url })
        .then((result) => {
            if(validURL(req.body.url)){
            if (result.length == 0) {
                URL.estimatedDocumentCount()
                 .then((result) => {
                const url = new URL({
                    original_url: req.body.url,
                    short_url: result+1
                });

                url.save()
                    .then(() => res.send(url))
                    .catch((e) => res.status(400).send("Error occured " + e))
                })
                .catch(err => console.log(err))
            } else {
                res.send(result)
            }
            }
            else{
                res.json({
                    error: "invalid URL"
                })
            }
        })
        .catch((err) => console.log(err))
}

exports.showPost = (req,res,next) => {
  URL.find({ short_url: req.params.number })
        .then((result) => opn(result[0].original_url))
        .catch(err => console.log(err))
}