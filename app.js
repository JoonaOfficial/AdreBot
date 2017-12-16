const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const weather = require('weather-js');

client.commands = new Discord.Collection();

function userInfo(user) {
  var finalString = '';

  finalString += '**' + user.username + '**, with the **ID** of **' + user.id + '**';

  return finalString;

}

var prefix = "-";

client.on("ready", () => client.user.setPresence({ status: "dnd", game: {name: `0.5 | -help`} }));
  console.log(`Still same beautiful!`);

    client.on("guildMemberAdd", function(member) {
        var guildchannel = member.guild.channels.find("name", "logs");
        if (!guildchannel) {
          return;
        }
        var connect = new Discord.RichEmbed()
        .setColor(0x00FF00)
        .setDescription(`**Please welcome ** ***${member.user.username}#${member.user.discriminator} to ${member.guild.name}*** **😊**`)
        .setTimestamp()
        var logschannel = client.channels.find("name", "logs");

        member.guild.channels.find("name", "logs").sendEmbed(connect);
    });

    client.on("guildMemberRemove", function(rmember) {
        var guildchannel = rmember.guild.channels.find("name", "logs");
        if (!guildchannel) {
          return;
        }
        var disconnect = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setDescription(`***${rmember.user.username}#${rmember.user.discriminator}*** ** left. Bye-bye 😦..**`)
        .setTimestamp()
        var logschannel = client.channels.find("name", "logs");

        rmember.guild.channels.find("name", "logs").sendEmbed(disconnect);
    });

    client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.slice(prefix.lenght).split(" ");
  if (!message.content.startsWith(prefix)) return;

   if (message.channel.type === 'dm') return message.channel.send("Commands are ment to do in a guild. Thanks :blush:!");

   if (message.content.startsWith(prefix + "binfo")) {
       var binfo = new Discord.RichEmbed()
       .setColor(0xFF0000)
       .addField("AdreBot is designed for maintenance.", "Right now im still updating it, but it has now next commands: -purge , -help, -stats, -ping, -warn and still doing more!")
       .addField("Support Guild", "https://www.discord.me/adrebot")
       .setImage("https://cdn.discordapp.com/attachments/375276909568720906/376327142574915585/7066fdba2c0c9db7d1f09684c2b6f7c7_90x90.jpg")
       message.channel.sendEmbed(binfo);
     };

     if (message.content.startsWith(prefix + "subcount")) {
         var subcount = new Discord.RichEmbed()
         .setColor(0x00FFFF)
         .addField("JoonaP's live subcount", "[Click here to see the website](https://socialblade.com/youtube/channel/UCuCYzxCkF7aq-42i0GQwKRA/realtime)")
         .setImage("https://cdn.discordapp.com/attachments/374295656019394570/376305843571916807/JPEG_20170922_210433.jpg")
         message.channel.sendEmbed(subcount);
};

if (message.content.startsWith(prefix + "ping")) {
  const m = await message.channel.sendMessage("I think I'm pinging :thinking:");
 var ping = new Discord.RichEmbed()
 .setColor(0xFF0000)
 .setDescription(`**Pong :ping_pong:! Latency is \`${m.createdTimestamp - message.createdTimestamp} ms\`.\nAPI Latency is \`${Math.round(client.ping)} ms\`**`)
 .setFooter(`${message.author.username}#${message.author.discriminator}`)
 .setTimestamp()
 message.channel.sendEmbed(ping);
};

if (message.content.startsWith(prefix + "kick")) {
   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with `Administrator`!')
   if(message.mentions.users.size === 0) {
     return message.reply("please mention a user to kick.").catch(console.error);
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember) {
    return message.reply("that user does not seem valid.");
    }
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
      return message.reply("I don't have permission \`Kick Members\` to do this!").catch(console.error);
    }
    kickMember.kick().then(member => {
      let text = args.slice(2).join(" ");
      let kick1 = new Discord.RichEmbed()
      .setColor(0xFFA200)
      .setDescription(`**Action: \`KICK\`\n\n** **__Kicked user:__** \`${member.user.username}#${member.user.discriminator}\`\n**__Moderator:__** \`${message.author.username}#${message.author.discriminator}\`\n**__Reason:__** ${text}`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`)
      .setTimestamp()
      message.guild.channels.find("name", "mod-log").sendEmbed(kick1);
      let kick2 = new Discord.RichEmbed()
      .setColor(0xFFA200)
      .setDescription(`**${message.author.username}#${message.author.discriminator}** *kicked you from* **${member.guild.name}**!\n**Reason:** ${text}**`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`)
      .setTimestamp()
      member.user.sendEmbed(kick2);
      }).catch(console.error);
    }

  if (message.content.startsWith(prefix + "warn")) {
     message.delete();
   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with `Administrator`!')
      var member = message.guild.member(message.mentions.users.first());
      if (!member) {
          return message.channel.send("You didn't mention any user!");
      }
      var text = args.slice(2).join(" ");
      var warning = new Discord.RichEmbed()
      .setColor(0xFFFF00)
      .setDescription(`**Action: \`WARN\`\n\n** **__Warned user:__** \`${member.user.username}#${member.user.discriminator}\`\n**__Moderator:__** \`${message.author.username}#${message.author.discriminator}\`\n**__Reason:__** ${text}`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`)
      .setTimestamp()
      message.guild.channels.find("name", "mod-log").sendEmbed(warning);
      var warningsend = new Discord.RichEmbed()
      .setColor(0xFFFF00)
      .setDescription(`**${message.author.username}#${message.author.discriminator}** *warned you in the* **${member.guild.name}** server!\n**Reason:** ${text}**`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`)
      .setTimestamp()
      member.user.sendEmbed(warningsend);
    };

    if (message.content.startsWith(prefix + "say")) {
       if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with `Administrator`!')
        if (args.length === 0){
         return message.channel.send('Specify something you wan\'t me to say.');
    }
        message.delete();
        message.channel.send(args.slice(1).join(" "));
    }

if (message.content.startsWith(prefix + "appeal")) {
message.delete();
    var msg = args.slice(1).join(" ");
    var appeal = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .addField(`${message.author.username}#${message.author.discriminator} sent a appeal!`, `<@&375627616985677825> :eyes:`)
    .setDescription(`**Appeal: ${msg}**`)
    .setTimestamp()
    client.channels.get("374295390478008340").sendEmbed(appeal);
    var appeal1 = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .addField(`${message.author.user}#${message.author.discriminator}`, "Thank you for your appeal. Stuff is going to contact you, if stuff is sure, that something is wrong.")
    .setTimestamp()
    member.user.sendEmbed(appeal1);
  };

if (message.content.startsWith(prefix + "version")) {
    message.delete();
    var version = new Discord.RichEmbed()
    .setColor(0x800080)
    .addField("**Version**", "0.5")
    .addField("**Added:**", "-weather, -warn, -kick, -8ball, -avatar & -help")
    .addField("**Removed:**", "Nothing")
    .addField("**Repaired:**", "Welcome message, leave message & -ping")
    .setTimestamp()
    message.channel.sendEmbed(version);
};

 if (message.content.startsWith(prefix + "help")) {
  message.delete();
  message.reply("help is coming..").then((botrpl) => botrpl.delete(5000));
  var help = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .addField("Here you can see all commands that exist on this bot.", "**Maintenance commands:**\n`-purge (amount)\n-warn (player & warning)\n-kick (player & reason)`\n\n**User commands:**\n`-ping\n-say (message)\n-appeal (issue/error)\n-stats\n-binfo\n-invite\n-avatar\n-weather (place name)\n-8ball (question)`")
  .setTimestamp()
  message.author.sendEmbed(help);
  };

if (message.content.startsWith(prefix + "invite")) {
    message.delete();
    var invite = new Discord.RichEmbed()
    .setColor(0xFFFFFF)
    .setImage("https://cdn.discordapp.com/attachments/375276909568720906/376327142574915585/7066fdba2c0c9db7d1f09684c2b6f7c7_90x90.jpg")
    .addField("Thank you for adding **AdreBot** to your server", "[Click here to add AdreBot to your server](http://bit.ly/adrebot)")
    .setFooter(`${message.author.username}#${message.author.discriminator}`)
    .setImage("https://cdn.discordapp.com/attachments/369950932911521792/380051760535830528/JPEG_20171017_233617.jpg")
    .setTimestamp()
    message.channel.sendEmbed(invite);
};

if (message.content.startsWith(prefix + "stats")) {
    message.delete();
    var stats = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setImage("https://cdn.discordapp.com/attachments/375276909568720906/376327142574915585/7066fdba2c0c9db7d1f09684c2b6f7c7_90x90.jpg")
    .addField("**BOT STATS**", "---------------")
    .addField("**Users:**", `${client.users.size}`)
    .addField("**Servers:**", `${client.guilds.size}`)
    .addField("**Channels:**", `${client.channels.size}`)
    .addField("**Discord.js:**", "v11.2.1")
    .addField("**Node:**", "v8.4.0")
    .setFooter(`${message.author.username}#${message.author.discriminator}`)
    .setTimestamp()
    message.channel.sendEmbed(stats);
};

    if (message.content.startsWith(prefix + "8ball")) {
        var text = args.slice(1).join(" ");
        var magicArray = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.', 'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', 'I would not count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Are you done asking questions yet?', 'Why should I even know this?', 'The answer lies within yourself.', 'Why are you asking me?', 'Follow the seahorse.', 'Very doubtful.'];
        var randomReply = Math.floor(Math.random() * magicArray.length);
        var ballz = new Discord.RichEmbed()
        .setColor(0x00ccff)
        .setDescription(`Question: **${text}**\n${magicArray[randomReply]}`)
        .setFooter(`${message.author.username}#${message.author.discriminator}`)
        .setTimestamp()
        message.channel.sendEmbed(ballz);
    }

if (message.content.startsWith(prefix + 'weather')) {
        if (args.length === 0) return message.channel.send('Please specify a location.');
        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function(err, result) {
            if (err) message.channel.send(err);

            if (result.length === 0) {
                message.channel.send('Location not found! Specify a valid location');
                return;
            }

            var current = result[0].current;
            var location = result[0].location;

                var weather = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0xff9e30)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', location.degreetype, true)
                .addField('Temperature', `${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true);
                message.channel.sendEmbed(weather);
        });
    }

    if (message.author.equals(client.user)) return;

if (message.content.startsWith(prefix + 'avatar')) {
let messageArray = message.content.split(" ");
let args2 = messageArray.slice(1);
let firstmentioned = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args2[0]);
if (!firstmentioned) return message.channel.send("You did not specify a user mention!");
let embed = new Discord.RichEmbed()
.setImage(firstmentioned.user.avatarURL)
.setColor(0x7A5D51)
message.channel.send({ embed });
}

if (message.content.startsWith(prefix + "purge")) {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with `Administrator`');
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('must specify a user and amount, or just an amount, of messages to purge!');
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
message.reply(`deleted ${amount} messages!`)
var purge = new Discord.RichEmbed()
.setColor(0xFE2EF7)
.setDescription(`***${message.author.username}*** **deleted ${amount} messages in ** ***#${message.channel.name}***`)
.setTimestamp()
message.guild.channels.find("name", "logs").sendEmbed(purge);
});
};

if (message.content.startsWith(prefix + "userinfo")) {
    let member = message.guild.member(message.mentions.users.first());
    if (!member) {
        return message.channel.send("Invalid member!");
    }
    var userinfo = new Discord.RichEmbed()
    .addField("Username", `${member.user.username}`)
    .addField("Discord ID", `${member.user.id}`)
    .addField("Registered At", `${member.user.createdAt}`)
    .setColor(0x048BF9)
    .setFooter(`${message.author.username}`)
    .setTimestamp()
    message.channel.sendEmbed(userinfo);
};

 });

   client.on('error', (e) => console.error(e));
   client.on('warn', (e) => console.warn(e));

   process.on("unhandledRejection", err => {
   console.error("Uncaught Promise Error: \n" + err.stack);
 });

client.login(process.env.MzY5OTQxNzU5MzMxMTM5NTg1.DMiHiQ.il2xJ2ZefQBY2gkq_p2LO4ZjnYA);
