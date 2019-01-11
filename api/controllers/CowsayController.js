/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');
/*var email = require("./path/to/emailjs/email");*/

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
    await Sentences.create({ sentence: req.param('sentence') });
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
      return res.ok();

    });
    },
};

