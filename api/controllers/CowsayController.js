/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function (req, res) {
    let s = await Sentences.find().limit(1);
    let sentence = s[0].sentence;
    return res.view('cowsay', { cow: cowsay.say({
      f: process.env.COW || 'stegausorus',
      text : sentence,
      e : 'oO',
      T : 'U '
    })});
  }
};

