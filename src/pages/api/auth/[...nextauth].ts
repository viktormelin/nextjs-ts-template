import NextAuth from 'next-auth';
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			token: 'https://discord.com/api/oauth2/token',
			userinfo: 'https://discord.com/api/users/@me',
			authorization: {
				params: {
					scope: 'identify email guilds guilds.members.read',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			let retVal: boolean | string = '/discord';

			await fetch(`https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${account?.access_token}`,
				},
			}).then((res) =>
				res.json().then((data) => {
					if (data) {
						if (data.roles.includes(process.env.DISCORD_VERIFIED_ROLE)) {
							retVal = true;
						}
					}
				})
			);

			return retVal;
		},
	},
});
