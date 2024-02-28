class update {

   constructor({
      
      objClient,
      objDatabase,
      objSupervisor
      
   }) {

      this.client = objClient;
      this.database = objDatabase;
      this.supervisor = objSupervisor;

   }


   context() {

      return {

         type : 1,
         name : 'update',
         description : 'description'

      }

   }


   async run() {
      
      return await this.supervisor.run({

         objClient : this.client,
         objDatabase : this.database

      });
   
   }

}


// export <
module.exports = update;

// >