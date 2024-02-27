// import <
const octokit = require('@octokit/rest');

// >


class supervisor {

   constructor(pToken) {

      this.depth = 100; // process.env.messageDepth;

   }


   async getRepositories({
      
      pData,
      objClient
   
   }) {

      var rData = {};
      // let users = (await objDatabase.loadData())['users'];

   }


   async getChannels({
      
      pData,
      pConfig,
      objClient
   
   }) {

      pConfig['channels'].map(async c => {

         let channel = await objClient.channels.fetch(c);
         let messages = await channel.messages.fetch({limit : this.depth});
         for (const m of messages.values()) {

            console.log('=====');
            console.log(c);
            console.log(JSON.stringify(m.content));

            pData['channels'][c][JSON.stringify(m.content)] = 1;

         }
         
      });

      // console.log('data', pData); // remove

   }

}


// exports <
module.exports = supervisor;

// >


// < 'jordyn says hi!' > //