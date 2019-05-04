const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const Jimp = require('jimp')

client.login(process.env.SECRET)

client.on("ready", async(message) => {
  
  console.log("Online!");
  client.user.setPresence({
    status: 'online',
    game: {
      name: "Destiny 2",
      type: 'PLAYING'
    }
  })
})

/*client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if(err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No hay comandos para cargar");
    return;
  }
  console.log(`Cargando ${jsFiles.length} comandos`);

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    client.commands.set(props.help.name, props)
  });
});


let prefix = "$"
client.on("message", async(message) => {
  let guild = message.guild;
    let args = message.content.split(" ").slice(1).join(" ");
  let command = message.content.toLowerCase().split(" ")[0];
  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd)
    cmd.run(client, message, args);
});*/
client.on('guildMemberAdd', member => {
  let avatar
  if(member.user.avatarURL === null) {
    avatar = member.user.defaultAvatarURL
  }else {
    avatar = member.user.avatarURL
  }
Jimp.read(avatar, function (err, top) {
  top.resize(151, 165)
  top.quality(60)
    Jimp.read("https://cdn.discordapp.com/attachments/574287178679451650/574309356212977692/Bienvenido.png", function(err, image) {
    if (err) console.log(err);
    image.composite(top, 20, 90)
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
      image.print(font, 380, 135, member.user.username)
          
      image.getBuffer(Jimp.AUTO, (err, cb) => {
        if (err) throw err;
        client.channels.get("574288100562305055").send({file: cb})
            })
        })
      })
    })
})