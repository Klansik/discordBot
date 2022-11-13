const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс

// Команды //

function test(robot, msg, args) {
    msg.channel.send('Test!');
}

function nikSasi(robot, msg, args) {
    msg.channel.send('Mentions ' + msg.mentions.users);
    msg.guild.members.fetch().then(function (members) {
       for (let member of members) {
           if (member[1].user.discriminator === '0885') {
               console.log('kek', member[1].user);
               msg.channel.send(`${member[1].user} pidor`);
           }
       }
    });
}


// Список команд //

var commands_list = [
    {
        name: "test",
        out: test,
        about: "Тестовая команда"
    },
    {
        name: "nikSasi",
        out: nikSasi,
        about: "Команда ник саси"
    }
];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды

module.exports.commands = commands_list;