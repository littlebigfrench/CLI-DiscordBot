const Discord = require("discord.js");

module.exports = {
    index:
    /**
     *
     * @param {Discord.Client} client
    */
    function (args, client) {
        query = args[0];
        args.shift();
        switch(query){
            default:
                let help = require("./help.js");
                help.external("./"+path.basename(__filename));
            break;
            case "guilds":
                client.guilds.cache.forEach((guild)=>{
                    console.log(`${guild.name}: ${guild.id}`);
                })
            break;
            case "channels":
                if (selected.guildid == "none"){
                    client.channels.cache.forEach((channel)=>{
                        console.log(`${channel.name}: ${channel.id}`);
                    })
                } else {
                    client.guilds.cache.get(selected.guildid).channels.cache.forEach((channel)=>{
                        console.log(`${channel.name}: ${channel.id}`);
                    })
                }
            break;
            case "users":
                if (selected.guildid == "none"){
                    client.users.cache.forEach((user)=>{
                        console.log(`${user.username}: ${user.id}`);
                    })
                } else {
                    client.guilds.cache.get(selected.guildid).members.cache.forEach((member)=>{
                        console.log(`${member.user.username}: ${member.user.id}`);
                    })
                }
            break;
            case "roles":
                if (selected.guildid == "none"){
                    console.log("Nothing Selected !");
                } else {
                    client.guilds.cache.get(selected.guildid).roles.cache.forEach((role)=>{
                        console.log(`${role.name}: ${role.id}`);
                    })
                }
            break;
        }
    },
    help: {
        name: path.parse(path.basename(__filename)).name,
        desc: "List name and ids of [guilds, channels, users, 'emoji???']",
        exemple: "list [guilds, channels, users, 'roles']",
    },
};