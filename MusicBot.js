


const { Client, Util } = require('discord.js');
const { PREFIX } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const client = new Client({ disableEveryone: true });

const youtube = new YouTube(process.env.YT_API);

const queue = new Map();



client.on('ready', () => console.log('Shard 1/1 funciando corretamente (aparentemente) tudo operacional!'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(PREFIX.length)

const moment = require('moment');
moment.locale('pt-BR'); 
	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(':x: **l** Me desculpe, mas você precisa usar os comandos em um canal de voz!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('<:erro:433408341197193216> **|** Oops! Que horror, parece que falta a permissão **CONNECT** para eu funcionar.');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('<:erro:433408341197193216> **|** Oops! Que horror, parece que falta a permissão **SPEAK** para eu funcionar.');
		} 

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist **|** **${playlist.title}** foi adcionado na fila`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 4);
					let index = 0;
					const Discord = require('discord.js');
					let embed = new Discord.RichEmbed()
					.setColor(`BLUE`)
					.setDescription(`**Seleção de música** \n ${videos.map(video2 => `**${++index} -** [${video2.title}](${video2.url})`).join('\n')} \n Por favor, forneça um valor para selecionar um dos resultados da pesquisa variando de 1 à 3.`)
					.setFooter(`Seleção de música - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)
msg.channel.send({embed: embed})

					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 4, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Introduzido valor inválido, cancelando a seleção de vídeo.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 **|** Não consegui encontrar.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **|** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Nada tocando...');
		serverQueue.connection.dispatcher.end('Ok... Pulando a primeira música da lista. `queue`');
		return msg.channel.send(':white_check_mark: **|** Pulei a música.')

	

 
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **|** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Nada tocando...');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Ok...');
		return undefined;
	} else if (command === `volume`) {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **|** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('🇽 **|** Nada tocando.');
		if (!args[1]) return msg.channel.send(`Volume atual é: **${serverQueue.volume}**`);
		if(args[1] > 10) return msg.reply(`Ei o max. é dez (10) `)
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send("🔈 **|** Volume alterado para `" + args[1] + "`");
	} else if (command === `np`) {
		

		if (!serverQueue) return msg.channel.send('🇽 **|** Nada tocando.');

		const Discord1 = require('discord.js');
		const embed = new Discord1.RichEmbed()
		.setAuthor(`${serverQueue.songs[0].canal}`, message.guild.iconURL)
		.setColor(`RED`)
		.setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
	.setFooter(`Agora tocando - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)

		 msg.channel.send({embed: embed})
		return undefined;

	} else if (command === `queue`) {
		if (!serverQueue) return msg.channel.send('🇽 **l** Nada tocando.');
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
		.setDescription(`
		__**Fila de músicas: (de ${msg.guild})**__ \n\n\n ${serverQueue.songs.map(song => `**-** [${song.title}](${song.url})`).join('\n')}\n\n ▶ l **Agora tocando**: ${serverQueue.songs[0].title}`)
	.setThumbnail(`${serverQueue.songs[0].thumb}`)
	.setFooter(`Fila de músicas - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)
 
		return msg.channel.send({embed: embed})
	

		
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(`⏸ Pausei a música para você, para despausar use k!resume.`);
		}
		return msg.channel.send('🇽 **|** Nada tocando.');
		
return undefined;
	} else if (command === `resume`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ **|** Música restaurada pra você!');
		}
		return msg.channel.send('🇽 **|** Nada tocando.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
		thumb: `https://img.youtube.com/vi/${video.id}/sddefault.jpg`,
		duration: video.durationSeconds,
		canal: video.channel.title
	};

	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Erro: Não pude entrar no canal (${error})`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **|** **${song.title}** foi adcionada na fila!`);
	}
	return undefined;
}


function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	const moment = require('moment');
	moment.locale('pt-BR'); 
	var minutes = Math.floor(song.duration / 60);
	var seconds = Math.floor(song.duration % 60);

	const Discord200 = require('discord.js');
	const embed = new Discord200.RichEmbed()
	.setAuthor(`Música`, client.user.avatarURL)
	.setDescription(':minidisc: **|** Começou a tocar: '+`**[${song.title}](${song.url})** `+'`'+minutes+':'+seconds+'` de: **'+song.canal+'**.')
.setThumbnail(`${serverQueue.songs[0].thumb}`)
.setFooter(`Adcionada à fila com sucesso! - Música • ${moment().calendar()}`, client.user.avatarURL)
serverQueue.textChannel.send({embed : embed})
}

client.login(process.env.BOT_TOKEN);
