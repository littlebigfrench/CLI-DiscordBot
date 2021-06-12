const Discord = require('discord.js');

module.exports = {
    index:
    /**
     *
     * @param {Discord.Client} client
    */
    function (args, client) {
        query = args[0];
        args.shift();
        let guild;
        let channel;
        let user;
        let role;
        switch(query){
            default:
                let help = require("./help.js");
                help.external("./"+path.basename(__filename));
            break;
            case "guilds":
                guild = client.guilds.cache.get(args[0]);
                if (typeof guild != "undefined"){
                    global.selected = {
                        guildid: guild.id,
                        channelid: "none",
                        userid: "none",
                    }
                } else {
                    console.log("Unknown Guild");
                }
            break;
            case "channels":
                if (selected.guildid != "none"){
                    channel = client.guilds.cache.get(selected.guildid).channels.cache.get(args[0]);
                    if (typeof channel != "undefined"){
                        global.selected = {
                            guildid: selected.guildid,
                            channelid: channel.id,
                            userid: "none",
                        }
                    } else {
                        console.log("Unknown Channel");
                    }
                } else {
                    console.log("Unknown Guild");
                }
            break;
            case "users":
                user = client.users.cache.get(args[0]);
                if (typeof user != "undefined" && !user.bot){
                    global.selected = {
                        guildid: "none",
                        channelid: "none",
                        userid: user.id,
                    }
                } else {
                    console.log("Unknown User");
                }
            break;
            case "roles":
                console.log("WORK IN PROGRESS (GIVE SOME CASE OF USE TO LittleBigFrench#5458)");
            break;
            case "byname":
                guild = client.guilds.cache.find(guild => guild.name.toLowerCase().includes(args.join("").toLowerCase()));
                user = client.users.cache.find(user => user.username.toLowerCase().includes(args.join("").toLowerCase()));
                if (selected.guildid != "none"){
                    channel = client.guilds.cache.get(selected.guildid).channels.cache.find(channel => channel.name.toLowerCase().includes(args[0].toLowerCase()));
                }
                if (typeof guild != "undefined"){
                    global.selected = {
                        guildid: guild.id,
                        channelid: "none",
                        userid: "none",
                    }
                } else if (typeof user != "undefined"){
                    global.selected = {
                        guildid: "none",
                        channelid: "none",
                        userid: user.id,
                    }
                } else if (typeof channel != "undefined"){
                    global.selected = {
                        guildid: channel.guild.id,
                        channelid: channel.id,
                        userid: "none",
                    }
                } else {
                    console.log("Nothing found !");
                }
            break;
        }
    },
};