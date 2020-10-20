const Discord = require('discord.js');

exports.run = (client, message, args) => {

if (!message.member.hasPermission("OWNER")) return message.channel.send(`Bu komutu kullanmak için **Yönetici** olmalısın.`);

  let mesaj = args.slice(0).join(' ');
  let tag = "❁"

  if (!mesaj) return message.reply('Birşey Yazman Gerekiyor!');

      message.guild.members.filter(b => b.user.username.includes(tag)).map(a => {

a.send(mesaj)

})
  
message.channel.send(`Mesaj basariyla tagdaki üyelere gonderildi.`);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['tagduyuru'],
  permLevel: 0
};

exports.help = {
  name: 'tag-duyuru',
  description: 'İstediğiniz şeyi bota duyurtur.',
  usage: 'tag-duyuru'
};