FROM node:18.16.0


ENV tokenOctokit undefined
ENV tokenDiscord undefined

ENV guildId undefined
ENV channelId undefined
ENV applicationId undefined

ENV messageDepth undefined

ENV settingLink undefined
ENV dataFilePath undefined
ENV reposFilePath undefined
ENV settingFilePath undefined
ENV channelsFilePath undefined


WORKDIR /app
COPY ./ /app
RUN npm install


CMD ["node", "index.js"]