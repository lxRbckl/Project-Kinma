// import <
const {exec} = require('child_process');
const {Octokit} = require('@octokit/rest');
const {dirDel, getProjectPath} = require('lxrbckl');

// >


class supervisor {

   constructor(pToken) {

      this.depth = process.env.messageDepth;
      this.octokit = new Octokit({auth : this.token});

   }


   async setRepos({
      
      pSetting,
      objDatabase
      
   }) {

      let day = new Date().getDay();
      let path = (getProjectPath() + objDatabase.reposFilePath + day);

      // remove outdated dir <
      // add repos/user to new dir <
      await dirDel({pPath : '', pDir : path});
      pSetting['users'].map(async u => {

         let query = `GET /users/${u}/repos`;
         let repos = await this.octokit.paginate(query);
         for (const r of repos) {
            
            await exec(`git clone ${r.clone_url} ${path}/${u}/${r.name}`);
            
         }

      });

      // >

   }


   async fetchChannel({
      
      objClient,
      pChannelId
      
   }) {

      let rData = {};
      let channel = await objClient.channels.fetch(pChannelId);
      let messages = await channel.messages.fetch({limit : this.depth});
      
      for (const m of messages) {rData[m[1].content] = null;}
      return rData;

   }


   async run({

      objClient,
      objDatabase

   }) {

      let setting = await objDatabase.loadSetting();
      console.log('setting', setting); // remove

      // update channels <
      // update repositories <
      Object.entries(setting['channels']).map(async ([k, v]) => {

         objDatabase.setChannel({

            pChannel : k,
            pData : await this.fetchChannel({
               
               pChannelId : v, 
               objClient : objClient
            
            })

         });
         
      });
      await this.setRepos({pSetting : setting, objDatabase : objDatabase});

      // >

      return 'File updated.';

   }

}


// exports <
module.exports = supervisor;

// >


// < 'jordyn says hi!' > //