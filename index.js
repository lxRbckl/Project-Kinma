// < Project Kinma by Alex Arbuckle > //


/// import <
const Client = require('./source/client.js');
const Supervisor = require('./source/supervisor.js');

// >


// setup <
const token = {

   octokit : process.env.tokenOctokit,
   discord : process.env.tokenDiscord
   
};

// >


(async () => {

   new Client({

      pToken : token.discord,
      objSupervisor : new Supervisor(token.octokit)

   }).run();

})();


// export <
module.exports = token;

// >