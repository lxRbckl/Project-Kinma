# Project Kinma by Alex Arbuckle #


# import <
from os.path import isdir
from asyncio import sleep
from github import Github
from discord import Intents
from lxRbckl import requestsGet
from os import path, remove, system
from datetime import datetime as dt
from discord.ext import commands, tasks

# >


# local <
githubToken = ''
discordToken = ''

gGithub = Github(githubToken)
gChannel = 1042924004467556393
gDirectory = '/'.join(path.realpath(__file__).split('/')[:-1])
kinma = commands.Bot(command_prefix = '', intents = Intents.all())
gSettingLink = 'https://github.com/lxRbckl/Project-Skotak/raw/main/setting.json'

# >


@tasks.loop(hours = 12)
async def backupData():
    '''  '''

    # local <
    date = dt.now().strftime('%A')
    user = requestsGet(pLink = gSettingLink)['user']['add']

    # >

    # clear directory <
    # iterate (repository per user) <
    system(command = f'sudo rm -r -f {date}')
    system(command = f'sudo mkdir {gDirectory}/{date}')
    for r in [r.full_name for u in user for r in gGithub.get_user(u).get_repos()]:

        system(command = 'sudo git clone {} {}/{}/{}'.format(

            f'https://github.com/{r}.git',
            gDirectory,
            date,
            r.split('/')[1]

        ))
        await sleep(10)

    # >

    await kinma.get_channel(gChannel).send('`Running`')


@kinma.event
async def on_ready(): backupData.start()


# main <
if (__name__ == '__main__'): kinma.run(discordToken)

# >
