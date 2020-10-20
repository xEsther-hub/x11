const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  if(message.author.id !== "671645885888856064") //ESTHER
  if(message.author.id !== "476136751937880084") //EDWARD
  if(message.author.id !== "698338771783123045") //HÜSEYİN
  if(message.author.id !== "538041599880462367") //MİNEVRA/İTALYA
  if(!message.member.roles.array().filter(r => r.id === "")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  let LoZUye = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!LoZUye) return message.reply(`Cezalıya atılacak üyeyi belirtmelisin!`).then(m => m.delete(5000));
  let cezaliRolu = "760511839712444517"; // CEZALI ROLÜNÜN ID
  const sebeb = args.slice(1).join(' ')
  if (!sebeb) return message.reply(`Yetkili Notu Eklemelisin`).then(m => m.delete(5000));
  let cezalilar = db.get(`ceza.${message.guild.id}`);
  cezalilar.filter(kisi => LoZUye.id !== kisi.slice(1));
  
    LoZUye.removeRole(cezaliRolu);
    db.set(`ceza.${message.guild.id}`, cezalilar);
    message.channel.send(`${LoZUye} Adlı üye başarıyla cezası kaldırıldı! ve Üye rolü eklendi.`).then(m => m.delete(5000));
    
  const kod = "```fix";
  const kod2 = "```";
  const log = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Kullanıcının Cezası Bitti!")
  .setDescription(`
**Jail Biten Üye:** ${LoZUye}
**Jail Bitiren Yetkili:** ${message.author}

**Yetkili Notu:** ${kod}
${sebeb}${kod2}
`)
  
    let onay = message.guild.channels.find(`name`, "cezali")
    message.guild.channels.get(onay.id).send(log)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'unjail', 
  description: 'Cezalıya çıkarır.',
  usage: 'unjail',
  kategori: 'kullanıcı'
};