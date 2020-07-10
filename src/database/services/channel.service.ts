import { logger } from '../../lib/logger';
import { Channel } from '../models/channel.model';

module.exports = {
    getAllChannel() {
        Channel.find({}, (e, ch) => {
            if (e) {
                return logger.error(e);
            }

            return ch;
        });
    },

    getChannel(chId: string) {
        return Channel.findOne({ channelId: chId });
    },

    addChannel(gId: string, chId: string, name: string) {
        const channel = new Channel({ guildId: gId, channelId: chId, channelName: name });
        channel.save((e, ch) => {
            if (e) {
                return logger.error(e);
            }

            logger.info(`[DB]: #${name}(${chId}) in ${gId} saved!`);
        });
    },

    deleteChannel(gId: string, chId: string) {
        Channel.findOneAndDelete({ guildId: gId, channelId: chId }, (e, deleted) => {
            if (e) {
                return logger.error(e);
            }

            const msg = deleted ? 'deleted!' : 'not found!';
            logger.info(`[DB]: ${chId} in ${gId} ${msg}`);
        });
    },

    updateChannel(gId: string, chId: string, data: any) {
        Channel.findOneAndUpdate({ guildId: gId, channelId: chId }, data, (e, ch) => {
            if (e) {
                return logger.error(e);
            }

            const msg = ch ? 'updated!' : 'not found!';
            logger.info(`[DB]: ${chId} in ${gId} ${msg}`);
        });
    },
};
