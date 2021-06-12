const Discord = require('discord.js');

module.exports = {
    index:
    /**
     *
     * @param {Discord.Client} client
    */
    function (args, client) {
        args = args.join(" ");
        if (selected.guildid != "none" && selected.channelid != "none"){
            let channel = client.channels.cache.get(selected.channelid);
            if (channel.isText()){
                channel.send(args);
            } else {
                console.log("You can only send message on a text channel")
            }
        } else if (selected.userid != "none"){
            let user = client.users.cache.get(selected.userid);
            user.send(args);
        } else {
            console.log("Nothing Selected !")
        }
    },
    all:
    /**
     *
     * @param {Discord.Client} client
    */
    function (args, client) {
        args = args.join(" ");
        client.users.cache.forEach((user)=>{
            if (typeof user != "undefined" && !user.bot){
                user.send(args);
            }
        })
    },

    help: {
        name: path.parse(path.basename(__filename)).name,
        desc: "Send a message to selected or all (NEED SELECT FIRST)",
        exemple: "",
    },
};