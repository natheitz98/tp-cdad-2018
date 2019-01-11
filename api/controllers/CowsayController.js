/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');
var email = require('emailjs');
var aws_module = require('aws-sdk');
var server 	= email.server.connect({
   host:    "smtp://postmaster@mailgun.l3o.eu:fedbe91ae5e3529f94528dd311bea4c9-060550c6-d42c872f@smtp.mailgun.org:587",
});

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function (req, res) {
    let count = await Sentences.count();
    console.debug('Got '+count+' sentences in database');
    let s = await Sentences.find().limit(1).
      skip(Math.floor(Math.random() * Math.floor(count)));
    let sentence = s[0].sentence;
    return res.view('cowsay', { cow: cowsay.say({
      f: process.env.COW || 'stegausorus',
      text : sentence,
      e : 'oO',
      T : 'U '
    })});
  },

  addimage: async function (req, res){
    return res.view('addimage');
  },

  add: async function (req, res) {
    return res.view('add');
  },

  create: async function(req, res) {
    await Sentences.create({ sentence: req.param('sentence') }); //Code non fonctionnel pour envoyer un mail ( pas génant pour l'exécution du code)
		server.send({
					 text:    "Merci pour la phrase",
					 from:    "cdad@l3o.eu",
					 to:      "natheitz@orange.fr",
					 subject: "testing emailjs"})
				return res.redirect('/say');
  },


 

  upload: async function (req, res) {
      console.log('test');
    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: '../../assets/images'
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      //await Sentences.create({ sentence: req.param('sentence'), file: uploadedFiles[0].filename });

      console.log(uploadedFiles[0].filename);
      // send ok response
/*
      let data = {
			accessKeyId: "AKIAJOCSBD4KTGNIE2YQ", 
			secretAccessKey: "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", 
			region: "eu-west-3",
      Bucket:'lp-cdad-2018',
      Key: 
      ContentType: 'image/png'
    	};

		  s3Bucket.upload(data, function (err, data) {
		    if (err) {
		      console.log('Error uploading Image!');
		      res.json({error: err})
		    } else {
		      console.log('Image upload successfully!', data);
		      res.json({message: 'Image upload successfully!'})
		    }
		  } )
*/

return res.ok();
    });




    },
		/* code pour envoyer l'image sur le serveur, non fonctionnel....
		req.file('avatar').upload({
				  adapter: require('skipper-s3'),
					region: 'eu-west-3',
				  key: 'AKIAJOCSBD4KTGNIE2YQ',
				  secret: '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',
				  bucket: 'lp-cdad-2018'
				}, function (err, filesUploaded) {
				  if (err) return res.serverError(err);
				  return res.ok({
				    files: filesUploaded,
				    textParams: req.allParams()
				  });
			});
    },
*/
};

