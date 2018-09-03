let fs = require('fs');
let data;

if (!fs.existsSync('data.txt'))
{
    while (!fs.existsSync('data.txt')) {}
    data = JSON.parse(fs.readFileSync('data.txt', 'utf8'));
}

let DubAPI = require('dubapi');

new DubAPI({username: data.user, password: data.pass}, function(err, bot)
{
    function finishAttendanting(allAttendant)
    {
        // LOGS
        // console.log("attendanting set to 0");
        // for(var i = 0; i < queue.length; i++)
        //     console.log("queue: " + queue[i]);
        // for(var i = 0; i < attendingList.length; i++)
        //     console.log("attendingList: " + attendingList[i]);
        attendanting = 0;

        //If allAttendant true is because all users are presents so there is no reason to pause anyone

        if(allAttendant)
        {
            bot.sendChat("`Todos estão presentes.`");
        }
        else
        {
            for(let i = 0; i < queue.length; i++)
            {
                if(attendingList.indexOf(queue[i]) == -1)
                {
                    bot.moderatePauseDJ(queueUser[i], function() {});
                    // LOGS
                    // console.log(queueUser[i]);
                    bot.sendChat("Retirando " + queue[i] + " da fila.");
                }
            }
        }

        queue = [];
        queueUser = [];
        attendingList = [];
    }

    async function startAttendanting(time)
    {
        attendanting = 1;
        // LOGS
        // console.log("attendanting set to 1");
        bot.sendChat("@djs CHAMADA 1/5");
        for(let i = 2; i <= 5; i++)
        {
            if(attendanting == 0)
                break;
            await sleep(250*time);
            bot.sendChat("@djs CHAMADA " + i + "/5");

        }
        if(attendanting == 1)
            finishAttendanting(false);
    }

    function sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isMod(user)
    {
        return (bot.isMod(user) || bot.isManager(user) || bot.isOwner(user) ||  bot.isCreator(user))
    }

    if (err)
    {
        return console.error(err);
    }

    let attendanting = 0;
    let response = 0;
    let queue = [];
    let queueUser = [];
    let attendingList = [];
    let retirados = 0;
    let botName = "";
    let myID = "587a90e5a57dd766009509f9";
    let phrases =
    [
        "O sentido da vida é leitar e ser leitado.",
        ":3",
        "Credo, um humano falante.",
        "Que vontade de comer uma trap massa, bixo.",
        "O Oleg apanha pra mendigo.",
        "AnaoQ é viado e dá a bunda.",
        "Toca um rica ai."
    ];
    let questions =
    [
        "Sim, mas é claro.",
        "Se você estiver motivado, é possível!",
        "Sim, com dificuldade",
        "Provavelmente não.",
        "Não.",
        "Nunca.",
        "Sei lá, cara, te vira, filho da puta.",
        "Pergunta pra sua mãe, aquela puta.",
        "Apenas se a motivação for tão grande quanto a do mendigo que bateu no Oleg"
    ];

    console.log('Running DubAPI v' + bot.version);

    function connect()
    {
        bot.connect(data.room);
    }

    bot.on('connected', function(name)
    {
        console.log('Connected to ' + name);
        // LOGS
        // console.log("before");
        // response = bot.getQueue();
        // console.log(response);
        // console.log("after");
        bot.sendChat("Chegay :3");
        botName = bot.getSelf().username;
        phrases.push("@" + botName + " de onde você veio?");
    });

    bot.on('disconnected', function(name)
    {
        console.log('Disconnected from ' + name);
        setTimeout(connect, 15000);
    });

    bot.on('error', function(err)
    {
        console.error(err);
    });

    bot.on(bot.events.userJoin, function(name)
    {
        // LOGS
        // console.log(name);
        bot.sendChat("Bem vindo, " + name.user.username);
        bot.sendChat(":3");
    });

    bot.on(bot.events.roomPlaylistDub, function(data)
    {
        if(data.type == "room_playlist-dub" && data.dubtype == "downdub")
        {
            response = data;
            let downCount = response.raw.playlist.downdubs;
            // LOGS
            // console.log(downCount);
            response = bot.getQueue();
            let queueCount = response.length;

            if(queueCount <= 2 && downCount >=3)
            {
                bot.moderateSkip();
                bot.sendChat( queueCount + " na fila, " + downCount + " downvotes.");
            }
            else if ((downCount >= queueCount/2) && queueCount > 2)
            {
                bot.moderateSkip();
                bot.sendChat( queueCount + " na fila, " + downCount + " downvotes.");
            }
        }
    });

    bot.on(bot.events.chatMessage, function(data)
    {
        // LOGS
        // console.log("attendanting: " + attendanting);
        if((data.message.indexOf("@"+botName) !== -1) && (isMod(data.user) || (data.user.id === myID)))
        {
           if(data.message.indexOf("chamada") !== -1 && attendanting === 0)
           {
                if(attendingList.indexOf(data.user.username) === -1)
                {
                    attendingList.push(data.user.username);
                }
                response = bot.getQueue();
                // LOGS
                // console.log(response);
                for(let i = 0; i < response.length; i++)
                {
                    queue.push(response[i].user.username);
                    queueUser.push(response[i].uid);
                    // LOGS
                    // console.log("queue[" + i + "] = " + queue[i]);
                }
                startAttendanting(60);
            }
            else if (data.user.id === myID)
            {
                if(data.message.indexOf("skip") !== -1)
                {
                    bot.moderateSkip();
                }
                else if(data.message.indexOf("?") !== -1)
                {
                    bot.sendChat(questions[Math.floor(Math.random()*questions.length)]);
                }
                else
                {
                    bot.sendChat(phrases[Math.floor(Math.random()*phrases.length)]);
                }
            }
        }
        else if(attendanting == 1)
        {
            if((attendingList.indexOf(data.user.username) === -1) && (queue.indexOf(data.user.username) !== -1))
            {
                attendingList.push(data.user.username);
                bot.sendChat("`" + data.user.username + " presente " + attendingList.length + "/" + queue.length + "`");
                if(attendingList.length === queue.length)
                {
                    finishAttendanting(true);
                    attendanting = 0;
                    bot.sendChat("`Todos estão presentes.`");
                }
            }
        }
    });

    connect();
});
