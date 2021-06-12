const Discord = require('discord.js');

module.exports = {
    index:
    /**
     *
     * @param {Discord.Client} client
    */
    function (args, client) {
        args = args.join(" ");
        if (lastmessageid != "none"){
            let user = client.users.cache.get(lastmessageid);
            user.send(args);
        } else {
            console.log("Nobody send you message !")
        }
    },

    help: {
        name: path.parse(path.basename(__filename)).name,
        desc: "Send a message to last guy that send a message to you",
        exemple: "reply hello man",
    },
};