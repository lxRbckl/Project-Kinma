// import <
const {fileGet, axiosGet} = require('lxrbckl');

// >


class database {

   constructor() {

      this.developerMode = true;
      this.dataFilePath = 'data.json'; // process.env.dataFilePath;
      this.dataLink = 'https://raw.githubusercontent.com/lxRbckl/Project-Kinma/Project-Kinma-2/data.json'; // process.env.dataLink;

   }


   async loadData() {

      return await {

         false : async () => {return axiosGet({pURL : this.dataLink});},
         true : async () => {return fileGet({pFile : this.dataFilePath});}

      }[this.developerMode]();

   }

}


// export <
module.exports = database;

// >