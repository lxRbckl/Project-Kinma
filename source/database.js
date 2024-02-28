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
      this.dataFilePath = process.env.dataFilePath;
      this.reposFilePath = process.env.reposFilePath;
      this.settingFilePath = process.env.settingFilePath;
      this.channelsFilePath = process.env.channelsFilePath;

   }


   async loadSetting() {

      return await {

         false : async () => {return axiosGet({pURL : this.settingLinks});},
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


   async buildDatabase() {

      let dir = await dirGet({pDir : ''});

      // if (no data) {
      if (!(dir.includes(this.dataFilePath))) {

         await dirSet({pDir : this.dataFilePath});
         await dirSet({pDir : this.reposFilePath});
         await dirSet({pDir : this.channelsFilePath});

      }

      // >

   }

}


// export <
module.exports = database;

// >