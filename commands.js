const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс

const insults = ['антисоветчик', 'русофоб', 'чмоха', 'чмоня', 'дурачок', 'пидорас', 'парень - сила есть ума ни нада', 'подсос тильта', 'раздолбанная дырка'];

// Команды //

function test(robot, msg, args) {
    msg.channel.send('Test!');
}

function pravda(robot, msg, args) {
    msg.guild.members.fetch().then(function (members) {
       for (let member of members) {
           if (member[1].user.discriminator === '7549') {
               msg.channel.send(`${member[1].user} ` + insults[Math.floor(Math.random() * (insults.length - 1))]);
           }
       }
    });
}

function createVoiceChannel(robot, msg, args) {
    if (msg.member.permissions.has('Administrator')) {
        msg.guild.channels.create({
            name: '• Приватные комнаты •',
            type: 4
        }).then((channel) => {
            msg.guild.channels.create({
                name: 'Создать канал (+)',
                type: 2,
                parent: channel.id
            });
        }).catch((error) => {
            console.log('error', error);
        });
    }
}


// Список команд //

var commands_list = [
    {
        name: "test",
        out: test,
        about: "Тестовая команда"
    },
    {
        name: "true",
        out: pravda,
        about: "Команда оскробления ника"
    },
    {
        name: "createVoiceChannel",
        out: createVoiceChannel,
        about: "Создает голосовой канал для приватных голосовых бесед"
    }
];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды

module.exports.commands = commands_list;