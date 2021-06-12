module.exports = {
    index: function (args) {
        let help = require("./help.js");
        help.external("./"+path.basename(__filename));
    },
    external: function (filepath) {
        if (typeof filepath == "object"){
            filepath = filepath[0].trim();
        }
        let file = require(filepath);
        let functionOfFile = Object.getOwnPropertyNames(file);
        let help = file.help;
        let text = "";
        text += `Help for ${help.name} : \n`;
        text += ` ${help.desc} \n`;
        text += ` SubCommands : \n`;
        let x = 0;
        let reallength = 0;
        functionOfFile.forEach((subfunction, i) => {
            if (subfunction != "index" && subfunction != "help"){
                reallength++;
            }
        });
        functionOfFile.forEach((subfunction, i) => {
            if (subfunction != "index" && subfunction != "help"){
                if (x == reallength-1){
                    text += ` - ${subfunction}`;
                } else {
                    text += ` - ${subfunction} \n`;
                }
                x++;
            }
        });
        console.log(text);
    },
    help: {
        name: path.parse(path.basename(__filename)).name,
        desc: "Return exemples and subcommands of a command",
        exemple: "help list",
    },
};