// import <
const {
   
   dirGet,
   dirSet,
   fileSet,
   fileGet, 
   axiosGet

} = require('lxrbckl');

// >


class database {

   constructor() {

      this.developerMode = false;
      this.settingLink = process.env.settingLink;
      this.reposFilePath = process.env.reposFilePath;
      this.settingFilePath = process.env.settingFilePath;
      this.channelsFilePath = process.env.channelsFilePath;

   }


   async loadSetting() {

      return await {

         false : async () => {return axiosGet({pURL : this.settingLink});},
         true : async () => {return fileGet({pFile : this.settingFilePath});}

      }[this.developerMode]();

   }


   async setChannel({

      pData,
      pChannel

   }) {

      let fPath = `${this.channelsFilePath}/${pChannel}.json`;
      let fIn = await fileGet({pFile : fPath, pErrorMessage : {}});
      
      await fileSet({pFile : fPath, pData : {...fIn, ...pData}});

   }

}


// export <
module.exports = database;

// >