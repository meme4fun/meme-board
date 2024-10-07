import logging

from tenacity import stop_after_attempt, wait_fixed, retry, retry_if_exception_type
import requests

from common.http_client import HttpClient
from common.singleton import Singleton
from config.social_auth_config import TW_CLIENT_ID, TW_REDIRECT_URL, TW_CODE_VERIFIER, DISCORD_CLIENT_ID, \
    DISCORD_CLIENT_SECRET, DISCORD_API_ENDPOINT, DISCORD_REDIRECT_URL
from common.common_exception import CommonException


class DiscordClient(HttpClient):
    API_HOST = DISCORD_API_ENDPOINT

    def __init__(self):
        super(DiscordClient, self).__init__()

    async def request_get(self, *args, **kwargs):
        await self.get(*args, **kwargs)

    async def request_post(self, *args, **kwargs):
        await self.post(*args, **kwargs)

    def build_url(self, path):
        return f"{self.API_HOST}{path}"

    async def refresh_token(self, refresh_token):
        path = '/oauth2/token'
        url = self.build_url(path)
        data = {
            'client_id': DISCORD_CLIENT_ID,
            'client_secret': DISCORD_CLIENT_SECRET,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        # resp = await self.request_post(url, data=data, headers=headers)
        resp = requests.post(url, data=data, headers=headers)
        resp.raise_for_status()
        return resp.json()

    async def discord_user_me(self, access_token):
        path = "/users/@me"
        url = self.build_url(path)
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        # resp = await self.request_get(url, headers=headers)
        return resp.json()

    async def get_discord_access_token_by_code(self, code):
        path = '/oauth2/token'
        url = self.build_url(path)
        data = {
            'client_id': DISCORD_CLIENT_ID,
            'client_secret': DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': DISCORD_REDIRECT_URL
        }
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': DISCORD_REDIRECT_URL
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        resp = requests.post(url, data=data, headers=headers, auth=(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET))
        resp.raise_for_status()
        # resp = await self.request_post(url, data=data, headers=headers, auth=(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET))
        return resp.json()

    async def discord_guild_member(self, access_token):
        GUILD_ID = ""
        path = f"/users/@me/guilds/{GUILD_ID}/member"
        url = self.build_url(path)
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        resp = await self.get(url, headers=headers)
        return resp

    async def discord_get_channel_member(self, discord_uid, access_token):
        channel_id = None
        path = f"/channels/{channel_id}/thread-members/{discord_uid}"
        url = self.build_url(path)
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        resp = await self.get(url, headers=headers)
        return resp

    async def discord_get_connections(self, access_token):
        path = f"/users/@me/connections"
        url = self.build_url(path)
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        return resp.json()


discordClientIns = None


async def get_discordClientIns():
    global discordClientIns
    if discordClientIns:
        return discordClientIns
    else:
        ins = DiscordClient()
        await ins.initialize()
        discordClientIns = ins
    return ins
