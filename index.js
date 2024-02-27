// < Project Kinma by Alex Arbuckle > //


/// import <
const Client = require('./source/client.js');
const Database = require('./source/database.js');
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
      objDatabase : new Database(),
      objSupervisor : new Supervisor(token.octokit)

   }).run();

})();


// export <
module.exports = token;

// >