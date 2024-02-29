FROM node:18.16.0


# referencing docker compose #
ENV tokenOctokit ${tokenOctokit}
ENV tokenDiscord ${tokenDiscord}

ENV guildId ${guildId}
ENV channelId ${channelId}
ENV applicationId ${applicationId}

ENV messageDepth ${messageDepth}

ENV settingLink ${settingLink}
ENV reposFilePath ${reposFilePath}
ENV settingFilePath ${settingFilePath}
ENV channelsFilePath ${channelsFilePath}


WORKDIR /app
COPY ./ /app
RUN npm install


CMD ["node", "index.js"]