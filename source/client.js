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
      this.guildId = '768020237139705857'; // process.env.guildId;
      this.channelId = '1210158694919176222'; // process.env.channelId;
      this.applicationId = '1210136647992344596'; // process.env.applicationId; // 1211692530069143552 

      this.commands = {

         'update' : new update(this.supervisor)

      };

      this.client = new Client({

         rest : {version : '10'},
         intents : [
      
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
            
         ]

      });

   }


   message(content) {

      let channel = this.client.channels.cache.get(this.channelId);
      channel.send('`' + content + '`');

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         //

      });

   }


   schedule() {

      this.client.on('ready', async () => {

         await this.supervisor.getChannels({

            objClient : this.client,
            pConfig : await this.database.loadConfig()
   
         });

         // cron.schedule('0 0 * * *', async () => {

         //    //

         // });

      });

   }


   async run() {

      let commands = Object.values(this.commands);

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : commands.map(c => c.context())}

      );

      // this.listen();
      this.schedule();

   }

}


// export <
module.exports = client;

// >