const { Octokit } = require("@octokit/core");
const Discord = require("discord.js");
var hfbot = new Discord.Client()
var unirest = require('unirest');

hfbot.once('ready', () => {
    hfbot.user.setActivity("Watching out for :q help")
	console.log('Ready!');
});
const octokit = new Octokit({ auth: `` });
hfbot.on('message', async (msg) => {
    var content = msg.content;
    if (content.startsWith(':')) {
        content = content.slice(1,content.length).split(' ')
        switch(content[0]) {
            case "q":
                const repo = content[1];
                if (repo == "help")
                {
                    msg.channel.send(
                        "Hello, I am Hacktoberbot\n\
Send a message with\n\
```\
:q repo_owner/repo_name\
```\
**or**\n\
```\
:q <SLAP_THE_GITHUB_LINK_HERE>\
```"
                    )
                    return;
                }
                if (!repo) {
                    return
                }
                var owner;
                var repos;
                if (content[1].startsWith("https")) {
                    owner = content[1].slice("https://github.com/".length, content[1].length).split("/")[0]
                    repos = content[1].slice("https://github.com/".length, content[1].length).split("/")[1]
                } else {
                    owner = content[1].split('/')[0]
                    repos = content[1].split('/')[1]
                }
                var resp = await octokit.request('GET /repos/{owner}/{repo}/topics', {
                        owner: owner,
                        repo: repos,
                        mediaType: {
                        previews: [
                            'mercy'
                        ]
                    }
                });
                
                const topics = resp["data"]["names"];
                for (var topic of topics)
                    if (topic == "hacktoberfest" || topic == "hacktoberfest2020") {
                        msg.channel.send(`Yep\n`)
                        return;
                    }
                    else {
                        continue;  
                    }
            break;
        }
    }
})

hfbot.login(require("./auth.json")["token"]);