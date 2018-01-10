var DubAPI = require('dubapi');

new DubAPI({username: 'Putinha-Bot', password: '123456789'}, function(err, bot) {
    if (err) return console.error(err);

    var resp=0;
    var count_fila=0;
    var count_downs = { "downdubs":"0"};
    //var teste = 0;
    var chamada = 0;
    var fila = [];
    var fila_user = [];
    var presentes = [];
    var retirados = 0;

    bla = function(){
    return new Promise(function(fulfill, reject){
        count_downs = bot.getScore();
        fulfill(resultValue);
    });
};

    console.log('Running DubAPI v' + bot.version);

    function connect() {bot.connect('radioanao');}

    function skip () 
    {
        count_downs = bot.getScore();
    }

    skip = function(){

    return new Promise(function(fulfill, reject){
        count_downs = bot.getScore();
        fulfill(count_downs);
    });
};



    function skip2()
    {
        count_downs = count_downs.downdubs;
            console.log(count_downs);
    }


    bot.on('connected', function(name) {
        console.log('Connected to ' + name);

        // while(1)
        // {
        //     count_downs = bot.getScore();
        //     while(count_downs == null);
        //     count_downs = count_downs.downdubs;
        //     console.log(count_downs);
        //     //myPromise.then(console.log(count_downs));
        //     //count_downs// = resp.downdubs;
        //     //console.log("count_downs");
        //     if(count_downs !== 0 && count_downs != null)
        //     {
        //         resp = bot.getQueue();
        //         count_fila = resp.length;
        //         console.log(count_downs + " " + count_fila);
        //         if(count_fila <= 2 && count_downs >=3)
        //             bot.moderateSkip();
        //         else if (count_downs >= count_fila/2)
        //             bot.moderateSkip();
        //     }
        //     //wait(5000);
        // }


    });

    function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

    bot.on('disconnected', function(name) {
        console.log('Disconnected from ' + name);

        setTimeout(connect, 15000);
    });

    bot.on('error', function(err) {
        console.error(err);
    });

    bot.on(bot.events.userJoin, function(name)
    {
        console.log(name);
        //bot.sendChat(resp.length + " pessoas na fila :3");
    });

    bot.on(bot.events.chatMessage, function(data) {
        if((data.message.indexOf("help") !== -1) && (data.user.username.indexOf("Putinha-Bot") == -1) && (data.message.indexOf("@Putinha-Bot") !== -1) && (bot.isMod(data.user) || bot.isManager(data.user) || bot.isOwner(data.user) ||  bot.isCreator(data.user)))
        {
             bot.sendChat("Caso a música tenha os `downvotes necessários`, basta digitar algo no chat para que eu `pule` a música. Para a `Staff` realizar chamada, basta me quotar com a palavra `chamada` e após a contagem, me quotar com a palavra `finalizar`.");       
        }
        // else if((data.message.indexOf("help") !== -1) && (data.user.username.indexOf("Putinha-Bot") == -1) && (data.message.indexOf("@Putinha-Bot") !== -1))
        // {
        //     bot.sendChat("Caso a música tenha os `downvotes necessários`, basta digitar algo no chat para que eu `pule` a música.")
        // }
        else if(data.message.indexOf("@Putinha-Bot") !== -1)
        {
            if(bot.isMod(data.user) || bot.isManager(data.user) || bot.isOwner(data.user) ||  bot.isCreator(data.user))
            {
               //bot.sendChat("@" + data.user.username + " é da Staff.");
               if(data.message.indexOf("chamada") !== -1 && chamada == 0)
               {
                    resp = bot.getQueue();
                    console.log(resp);
                    //resp = JSON.parse(resp);
                    for(var i = 0; i < resp.length; i++)
                    {
                        //console.log(resp[i].user.username);
                        //bot.sendChat(resp[i].user.username);
                        fila.push(resp[i].user.username);
                        fila_user.push(resp[i].uid);
                        console.log("fila[" + i + "] = " + fila[i]);
                    }
 
                    chamada = 1;
 
                    for(var i =0; i < 5; i++)
                        bot.sendChat("@djs CHAMADA " + (i+1) + "/5");// CHAMADA RESPONDAM APENAS UMA VEZ " + (i+1) + "/5");                  
               }
               else if((data.message.indexOf("finalizar") !== -1) && (chamada == 1))
               {
                //count_downs = bot.getScore();
                chamada = 0;
                for(var i = 0; i < fila.length; i++)
                    console.log("fila: " + fila[i]);
                for(var i = 0; i < presentes.length; i++)
                    console.log("presentes: " + presentes[i]);
                //{
                for(var j = 0; j < fila.length; j++)
                    if(presentes.indexOf(fila[j]) == -1)
                    {
                        //bot.moderateRemoveDJ(fila_user[j]);
                        bot.sendChat("@mods `retirem o " + fila[j] + "`");
                        retirados ++;
                    }
                if(retirados == 0)
                    bot.sendChat("`Todos estão presentes.`");
                else
                    retirados = 0;
                fila = [];
                fila_user = [];
                presentes = [];
                    //console.log("fila: " + fila[i]);
                //}
               
                    //console.log("presentes: " + presentes[i]);
               }

               // else
               //  bot.sendChat(":thumbsup: (me quote com `help` para mais informações) ");
            // else if(data.message.indexOf("qual o sentido da vida?") !== -1)
            //     bot.sendChat("Leitar e ser leitado.");
            // else if(data.message.indexOf("ping") !== -1)
            //     bot.sendChat("@" + data.user.username + " pong :3");
            // //else if (data.user.username.indexOf("Poneiamigo") !== -1)
            // //{
            //     //bot.sendChat("@" + data.user.username + " sua puta.");
            // //}
            // else if ((data.message.indexOf("puta") !== -1) || (data.message.indexOf("vagabunda") !== -1))
            //     bot.sendChat("Me enche de leitinho quente :3 , " + "@" + data.user.username);
              
            }
            else if ((data.user.username.indexOf("Craviee") !== -1) && (data.message.indexOf("skip") !== -1))
                bot.moderateSkip();
            else if (data.user.username.indexOf("Craviee") !== -1)
                bot.sendChat(":thumbsup:");
            // else
            //     bot.sendChat(":thumbsup: (me quote com `help` para mais informações) ");
        }
            else if(chamada == 1)
         {
             //console.log(data.user.username + ': ' + data.message);
            //  for(var i = 0; i < resp.length; i++)
            // {
            //     console.log( "fila[" + i + "] = " + fila[i] + " " + data.user.username);
            //      if(fila[i] == data.user.username)
            //      {
            //          //bot.sendChat("@" + data.user.username + " presente");
            //          console.log( "fila[" + i + "] = " + fila[i] + " presente");
            //          fila[i] = 0;
            //          //console.log( fila[fila.indexOf(data.user.username)] + " presente");
            //          console.log( "fila[" + i + "] = " + fila[i] + " zerado");
            //          break;    
            //      }
            // }
            if(presentes.indexOf(data.user.username) == -1)
            {
                presentes.push(data.user.username);
            }
         }

            
        count_downs = bot.getScore();
        count_downs = count_downs.downdubs;
        if(count_downs !== 0 && count_downs != null && ((data.user.username.indexOf("Putinha-Bot") == -1)))
        {
            resp = bot.getQueue();
            count_fila = resp.length;
            //console.log(count_downs + " " + count_fila);
            if(count_fila <= 2 && count_downs >=3)
            {
                bot.moderateSkip();
                bot.sendChat( count_fila + " na fila, " + count_downs + " downvotes."); 
            }
            else if ((count_downs >= count_fila/2) && count_fila > 2)
            {
                bot.moderateSkip();
                bot.sendChat( count_fila + " na fila, " + count_downs + " downvotes.");
            }
        }

        //console.log(data.user.username + ': ' + data.message);
    });

    connect();



    // while(1)
    // {
    //     resp = bot.getScore();
    //     console.log(resp);
    //     //myPromise.then(console.log(count_downs));
    //     count_downs = resp.downdubs;
    //     console.log(count_downs);
    //     if(count_downs !== 0)
    //     {
    //         resp = bot.getQueue();
    //         count_fila = resp.length;
    //         //console.log(count_downs + " " + count_fila);
    //         if(count_fila <= 2 && count_downs >=3)
    //             bot.moderateSkip();
    //         else if (count_downs >= count_fila/2)
    //             bot.moderateSkip();
    //     }
    // }

});