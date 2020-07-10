import { readdirSync } from 'fs';
import { resolve } from 'path';

module.exports = (client: any) => {
    client.logger.info('  [-] Initialize commands');
    const load = (dirs: string) => {
        const commands = readdirSync(resolve(__dirname, `../commands/${dirs}`)).filter((f) => f.endsWith('.js'));
        
        for (const file of commands) {
            const cmdfile = require(resolve(__dirname, `../commands/${dirs}/${file}`));
            const key = file.slice(0, -3);

            client.logger.info(`    + '${key}' added.`);

            client.cmds.set(key, cmdfile);
            cmdfile.aliases.forEach((alias: string) => {
                client.cmdsalias.set(alias, key);
            });

            if (cmdfile.regex) {
                client.cmdsregex.set(key, `\\${cmdfile.name}\\`);
                cmdfile.aliases.forEach((alias: string) => {
                    client.cmdsregex.set(alias, `\\${key}\\`);
                });
            }
        }
    };

    ['bot', 'discord', 'dragonnest', 'fun', 'moderation'].forEach((x) => load(x));
    client.regexList = new RegExp(client.cmdsregex.map((key: any, item: any) => item).join('|'));
    client.logger.info('  [V] Done!');
};
