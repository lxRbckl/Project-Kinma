// import <
const cron = require('node-cron');
const {

   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

const update = require('./command/update.js');

// >


class client {

   constructor({

      pToken,
      objDatabase,
      objSupervisor

   }) {

      this.token = pToken;
      this.database = objDatabase;
      this.supervisor = objSupervisor;
      this.guildId = process.env.guildId;
      this.channelId = process.env.channelId;
      this.applicationId = process.env.applicationId; 

      this.client = new Client({

         rest : {version : '10'},
         intents : [
      
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
            
         ]

      });

      this.commands = {

         'update' : new update({
            
            objClient : this.client,
            objDatabase : this.database,
            objSupervisor : this.supervisor
         
         })

      };

   }


   message(content) {

      let channel = this.client.channels.cache.get(this.channelId);
      channel.send('`' + content + '`');

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         let command = this.commands[interaction.commandName];
         let result = await command.run();
         this.message(result);

      });

   }


   schedule() {

      this.client.on('ready', async () => {

         cron.schedule('0 0 * * *', async () => {

            let result = await this.supervisor.run({

               objClient : this.client,
               objDatabase : this.database

            });
            this.message(result);

         });

      });

   }


   async run() {

      console.log('V2'); // version //

      let commands = Object.values(this.commands);

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : commands.map(c => c.context())}

      );

      this.listen();
      this.schedule();

   }

}


// export <
module.exports = client;

// >