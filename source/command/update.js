class update {

   constructor(pSupervisor) {

      this.supervisor = pSupervisor;

   }


   context() {

      return {

         type : 1,
         name : 'update',
         description : 'description'

      }

   }


   async run() {return await this.supervisor.run()}

}


// export <
module.exports = update;

// >