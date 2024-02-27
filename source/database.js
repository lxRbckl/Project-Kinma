// import <
const {fileGet, axiosGet} = require('lxrbckl');

// >


class database {

   constructor() {

      this.developerMode = true;
      this.dataFilePath = 'data.json'; // process.env.dataFilePath;
      this.configFilePath = 'config.json'; // process.env.cofigFilePath;
      this.configLink = 'https://raw.githubusercontent.com/lxRbckl/Project-Kinma/Project-Kinma-2/settings.json'; // process.env.configLink;

   }


   async loadConfig() {

      return await {

         false : async () => {return axiosGet({pURL : this.configLink});},
         true : async () => {return fileGet({pFile : this.configFilePath});}

      }[this.developerMode]();

   }


   async loadData() {return await fileGet({pFile : this.dataFilePath});}

}


// export <
module.exports = database;

// >