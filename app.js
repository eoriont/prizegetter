var fs = require('fs');
var yaml = require('js-yaml');
var mojang = require('mojang');
var request = require('request-promise');

async function parse(path, ymlpath) {
    let url = await request(path);
    let yml = yaml.safeLoad(fs.readFileSync(ymlpath, 'utf8').toString());
    let json = JSON.parse(url);

    let newjson = {};

    for (let i = 0; i < json.length; i++) {
        let jsonobj = json[i];
        let newjsonobj = {};
        let prizeId = jsonobj["student_prize_id"];
        let gc = jsonobj["give_command"];
        let username = jsonobj["minecraft_username"];
        newjsonobj = {
            gc, for: username
        };
        newjson[prizeId] = newjsonobj;
    }

    console.log(newjson);

    fs.writeFileSync(ymlpath, yaml.safeDump(newjson));
}

let prizesLink = "https://www.mvcodeclub.com/students/mc_prizes";
let permissionsFile = "/home/mc/server/plugins/CCPrizeGetter/all_prizes.yml";
let permissionsFile2 = __dirname+"/test.txt";
parse(prizesLink, permissionsFile);

