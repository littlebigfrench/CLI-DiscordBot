const Discord = require("discord.js");
var client = new Discord.Client();

global.fs = require('fs');
global.path = require('path');
global.commandsFolder = "./commands";
global.selected = {
    guildid: "none",
    channelid: "none",
    userid: "none",
}
global.lastmessageid = "none";

ready = false;

global.Reset = "\x1b[0m";
global.Black = "\x1b[30m";
global.Red = "\x1b[31m";
global.Green = "\x1b[32m";
global.Yellow = "\x1b[33m";
global.Blue = "\x1b[34m";
global.Magenta = "\x1b[35m";
global.Cyan = "\x1b[36m";
global.White = "\x1b[37m";

global.fixedlog = (message) =>{
    let q = "";
    message += "\n";
    if (selected.guildid != "none"){
        q += `${Red}G${Yellow}:${client.guilds.cache.get(selected.guildid).name}`;
        if (selected.channelid != "none"){
            let channel = client.guilds.cache.get(selected.guildid).channels.cache.get(selected.channelid);
            q += `-${Red}C.${channel.type.split("")[0].toUpperCase()}${Yellow}:${channel.name}`;
        }
    } else if (selected.userid != "none"){
        q += `${Red}U${Yellow}:${client.users.cache.get(selected.userid).username}`;
    }
    if (q != ""){
        if (ready){
            message += `${Yellow}${client.user.username} (${q}) # ${Reset}`;
        } else {
            message += `${Yellow}${client.user.username} (${q}) # ${Reset}`;
        }
    } else {
        if (ready){
            message += `${Yellow}${client.user.username} # ${Reset}`;
        } else {
            message += `${Yellow}STARTING # ${Reset}`;
        }
    }
    process.stdout.write(message);
}

process.stdout.write(`${Yellow}STARTING # ${Reset}`);
process.stdin.on('data', (chunk) => {
    chunk = chunk.toString().trim();
    if (chunk){
        try {
            processCommand(chunk);
        } catch (err) {
            console.log(err);
        }
    }
    let q = "";
    if (selected.guildid != "none"){
        q += `${Red}G${Yellow}:${client.guilds.cache.get(selected.guildid).name}`;
        if (selected.channelid != "none"){
            let channel = client.guilds.cache.get(selected.guildid).channels.cache.get(selected.channelid);
            q += `-${Red}C.${channel.type.split("")[0].toUpperCase()}${Yellow}:${channel.name}`;
        }
    } else if (selected.userid != "none"){
        q += `${Red}U${Yellow}:${client.users.cache.get(selected.userid).username}`;
    }
    if (q != ""){
        if (ready){
            process.stdout.write(`${Yellow}${client.user.username} (${q}) # ${Reset}`);
        } else {
            process.stdout.write(`${Yellow}${client.user.username} (${q}) # ${Reset}`);
        }
    } else {
        if (ready){
            process.stdout.write(`${Yellow}${client.user.username} # ${Reset}`);
        } else {
            process.stdout.write(`${Yellow}STARTING # ${Reset}`);
        }
    }
});

getFunctionsOfFile = (path) => {
    return Object.getOwnPropertyNames(require(`${path}`));
}

processCommand = (args) => {
    let command = args.split(" ")[0];
    let subcommand = args.split(" ")[1];
    let filepath = `${commandsFolder}/${command}.js`;
    if (fs.existsSync(`${commandsFolder}/${command}.js`)) {
        let file = require(filepath);
        let functionOfFile = getFunctionsOfFile(`${commandsFolder}/${command}.js`);
        let result = false;
        if (functionOfFile.includes(subcommand)){
            args = args.split(" ");
            args.shift();
            args.shift();
            result = file[subcommand](args, client);
        } else {
            if (functionOfFile.includes("index")){
                args = args.split(" ");
                args.shift();
                result = file["index"](args, client);
            } else {
                console.log("File does not have index function !");
            }
        }
        if (!result) {
            return delete require.cache[require.resolve(filepath)];
        } else {
            return;
        }
    } else {
        filepath = `${commandsFolder}/unknown.js`;
        let file = require(filepath);
        args = args.split(" ");
        args.shift();
        file["index"](args, client);
        return delete require.cache[require.resolve(filepath)];
    }
}

function FetchMembers(){
    client.guilds.cache.forEach((guild)=>{
        guild.members.fetch();
    })
    setTimeout(() => {FetchMembers()}, 1500);
}

client.on("ready", ()=>{
    ready = true;
    FetchMembers();
})

client.on("message", (message)=>{
    if (message.channel.type == "dm" && message.author.id != client.user.id){
        fixedlog(`\nfrom ${Green}${message.author.username}${White}: `+message.content);
        global.lastmessageid = message.author.id;
    }
})































































client.login("YOUR KEY HERE");