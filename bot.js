const {Client, Events, GatewayIntentBits, Collection} = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates
        ]
    }
); // Объявляем, что robot - бот
const commands = require("./commands.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

robot.on("ready", function() {
    /* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
    console.log(robot.user.username + " запустился!");
});

robot.on('guildCreate', guild => {
    console.log('Joined a new guild: ' + guild.name);
});

robot.on('messageCreate', (msg) => { // Реагирование на сообщения
    if (msg.author.username !== robot.user.username && msg.author.discriminator !== robot.user.discriminator) {
        var command = msg.content.trim() + " ";
        var commandName = command.slice(0, command.indexOf(" "));
        var messArr = command.split(" ");
        for (let commandsCount in commands.commands) {
            var command2 = prefix + commands.commands[commandsCount].name;
            if (command2 === commandName) {
                commands.commands[commandsCount].out(robot, msg, messArr);
            }
        }
    }
});

robot.on("voiceStateUpdate", async (oldState, newState) => {
    const user = await robot.users.fetch(newState.id);
    const member = newState.member;

    if (newState.channel && newState.channel.name === 'Создать канал (+)') {
        newState.guild.channels.create({
            name: user.username,
            type: 2,
            parent: newState.channel.parent,
        }).then((channel) => {
            channel.permissionOverwrites.edit(member, {
                'MoveMembers': true,
                'ManageChannels': true,
                'ManageRoles': true
            });
            member.voice.setChannel(channel);
        }).catch((error) => {
            console.log('error', error);
        });
    }
    if (oldState.channel && oldState.channel.parent.name === '• Приватные комнаты •' && oldState.channel.name !== 'Создать канал (+)') {
        if (oldState.channel.members.size === 0) {
            return oldState.channel.delete();
        }
    }
});


robot.login(token); // Авторизация бота