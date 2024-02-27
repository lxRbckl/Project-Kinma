// import <
const octokit = require('@octokit/rest');

// >


class supervisor {

   constructor(objDatabase) {

      this.database = objDatabase;
      this.messageDepth = 100; // process.env.messageDepth;

   }


   async getRepositories() {

      var rData = {};
      let users = await this.database.loadData()['users'];

   }


   async getChannels(objClient) {

      var rData = {};
      let channels = await this.database.loadData()['channels'];

   }

}


// exports <
module.exports = supervisor;

// >


(async () => {

   let x = new supervisor();



})();


// 'jordyn says hi!'