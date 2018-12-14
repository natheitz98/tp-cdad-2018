/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // Set up fake development data (or if we already have some, avast)
  if (await Sentences.count() > 0) {
    return;
  }
  await Sentences.createEach([
    { sentence: 'Test', },
    { sentence: 'Biniou', },
  ]);
};
