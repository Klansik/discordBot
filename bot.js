const {Client, Events, GatewayIntentBits} = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
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


robot.login(token); // Авторизация бота