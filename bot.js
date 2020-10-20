const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');

require('./util/eventLoader')(client);
  const Client = new Discord.Client()
    const Constants = require('discord.js/src/util/Constants.js')
    Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`
    Client.on("ready", () => {
      console.log("Loading status..")
      Client.user.setActivity(``, { type: 3, browser: "DISCORD IOS"  });
    });
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);





client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let teyitkanali = "758262063469428786"; // GEÇİÇİ ODA OLACAK ODANIN IDSI
  const google = require("google-tts-api");
  let user = client.users.get(newMember.id);
  let isimsoyle = newMember.user.username;

  if (!newMember.user.bot && newMember.guild.channels.has(teyitkanali) && newMember.voiceChannel && newMember.voiceChannel.id === teyitkanali) {
    try {
      await newMember.voiceChannel.join();
    google(`${isimsoyle} Hoşgeldin aktif olmanı dilerim`, 'tr', 1).then(url => {
        newMember.voiceChannel.join().then(connection => {
            connection.playStream(url).on("end", () => {
                connection.disconnect();
            })
        })
    })      
      async kanal => {    
      }
    } catch (yashinu) { console.error(yashinu) };
  };
  });




//Settings!
const yourID = "671645885888856064"; //Instructions on how to get this: https://redd.it/40zgse //Kendi İD'nizi Yazın
const setupCMD = "!t" //İstediğiniz Komut Yapabilirsiniz örn : !kayıtol
let initialMessage = ``; //Dilediğiniz Şeyi Yazabilirsiniz
const roles = ["761220729738887228", "・Special", "Reklam Ekibi"]; //İstediğiniz Rolü Yazabilirsiniz
const reactions = ["764851151010791455", "two", "three"]; //İstediğiniz Emojiyi Ekleyebilirsiniz
const botToken = "NzY0MjM5NjIzNDUwNzg3ODUw.X4DXnQ.hLAN8dIGsZwQLOFLa8iuQ6LKgWc";  //Burası Boş Kalsın
                    

//Load up the bot...
const bot = new Discord.Client();
client.login(botToken);

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Test vocal 1 spec 2 r 3`); //DONT CHANGE THIS
    return messages;
}


client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]); 
                }
            });
        }
    }
})


client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
      
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});



// Hoş Geldin Mesajı

client.on("guildMemberAdd", member => {  
  const kanal = "764243472583753750";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
 
  var kontrol;
if (kurulus < 259200) kontrol = '<a:701554645184544900:751585895680966666> ** __Bu Hesap Güvenilir Değil__** <a:701554645184544900:751585895680966666>'
if (kurulus > 259200) kontrol = '<a:tach2:750868306994528306> ** __Bu Hesap Güvenilir Gözüküyor__** <a:tach2:750868306994528306>'
  moment.locale("tr");
  let buse = client.channels.get(kanal);
buse.send("**<a:724858444921962538:750868328079163392> Hoşgeldin!** " + member + " **Seninle \`" + member.guild.memberCount + "\` Kişiyiz.**  \n <a:680441705060892787:751585887925829682> **Müsait olduğunda sese gelip mta lol cs ets among oynayabilir sohbet edebilirsin.** \n <a:696053294778286091:753687972360093848> Hesabın Oluşturulma Tarihi:" + moment(member.user.createdAt).format("** YYYY __DD MMMM dddd (hh:mm:ss)__**") +  "\n"  + kontrol + " \n **<a:710207518281826436:753688359393689691>** **Tagımızı alarak `❁` bize destek olabilirsin.** \n",  new Discord.Attachment("https://64.media.tumblr.com/5154dbbde38b3fbabb54a2c78e53b156/tumblr_pll7ev9M7r1uocsx1o1_400.gif"                   
   )
  );
});

// Hoş Geldin Mesajı
const ms = require('ms')

const DataVoice = new Map()

client.on("voiceStateUpdate", async(oldMember, newMember) => {
  if(oldMember.user.bot) return;
  newMember.guild = oldMember.guild
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    let bal = db.fetch(`Voice.${oldMember.guild.id}.${oldMember.user.id}`)

    if(bal === null) bal = 0

    DataVoice.set(oldMember.user.id, Date.now())
  }else if(oldUserChannel !== undefined && newUserChannel === undefined) {
    let total = (Date.now() - DataVoice.get(oldMember.user.id))
    console.log(total)

    db.add(`Voice.${oldMember.guild.id}.${oldMember.user.id}`, total)

  }
})

// Şüpheli Hesap

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(3, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("760511839712444517") ///Cezalı Rol ID'si
   var kayıtsız = member.guild.roles.get("") ///Kayıtsız rolü ID'si
   member.addRole(rol)
member.user.send('Hesabınız Bir Hafta Gibi Kısa Bir Sürede Açıldığı İçin Cezalıya Atıldınız, Yetkililere Bildirerek Açtırabilirsiniz.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)

    
   }
        else {

        }  
    });
//



client.on("userUpdate", async (eski, yeni) => {
  var sunucu = client.guilds.get('747946695144243260'); // Buraya Sunucu ID
  var uye = sunucu.members.get(yeni.id);
  var normalTag = "❁"; // Buraya Normal Tag (Yoksa boş bırakın)
  var ekipTag = "❁"; // Sunucunun Tagı
  var ekipRolü = "759101283352182854"; // Tagın Rol IDsi
  var logKanali = "758262072235524127"; // Loglanacağı Kanalın ID

  if (!sunucu.members.has(yeni.id) || yeni.bot || eski.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.has(ekipRolü)) {
    try {
      await uye.addRole(ekipRolü);
      await uye.setNickname((uye.displayName).replace(normalTag, ekipTag));
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.get(logKanali).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.has(ekipRolü)) {
    try {
      await uye.removeRoles(uye.roles.filter(rol => rol.position >= sunucu.roles.get(ekipRolü).position));
      await uye.setNickname((uye.displayName).replace(ekipTag, normalTag));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.get(logKanali).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch(err) { console.error(err) };
  };
});



// Botu Sese Koyma

client.on("ready", () => {
  client.channels.get("758262060621496320").join();
   //main dosyaya atılacak
})

// Botu Sese Koyma

// JAİL \\
client.on("guildMemberAdd", async member => {
  let cezalan = db.get(`ceza.${member.guild.id}`);
  if (cezalan.some(cezali => member.id === cezali.slice(1))) {
    setTimeout(() => {
      member.setRoles(["760511839712444517"]);
      
    }, 2000);
    member.guild.channels.get('764227653204836372').send(`${member} üyesi sunucuya girdi ve cezalıya atıldı!`);
    return
  };
});
// JAİL \\
////


module.exports = async role => {
  const kanal = role.guild.channels.get("758262053374132224").id;
  if (!kanal) return;
  const guild = role.guild;
  const audit = await guild.fetchAuditLogs({ limit: 1 });
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  const embed = await new Discord.RichEmbed()
        .setTitle('**Role Deleted**')
        .addField('Role', `@${role.name}\n\`${role.id}\``, true)
        .addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
        .setFooter('Time of Action')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
 let log = role.guild.channels.find( channel => channel.name === "mod-kanalı");
 log.send("<@"+entry.executor.id+"> isimli kullanici bir rolü sildi ve yetkilerini aldim.")
role.guild.members.get(entry.executor.id).roles.forEach(r => {
role.guild.members.get(entry.executor.id).removeRole(r)
console.log("rolleralindi")

})
};

////

client.on("channelDelete", async function(channel) {
if(channel.guild.id !== "747946695144243260") return;/////CodePLUS/////
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
    if(logs.entries.first().executor.bot) return;
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 1"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 2"))
    })
const sChannel = channel.guild.channels.find(c=> c.id ==="758262053374132224")//kanalın id si yazılıcak
const cıks = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :tiks:`)
.setFooter('Kanal Koruma Sistemi')
channel.guild.owner.send(` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım:tiks:`)
}) 

/////

