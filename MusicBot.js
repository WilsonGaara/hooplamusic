


const { Client, Util } = require('discord.js');
const { PREFIX } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(process.env.YT_API);

const queue = new Map();



client.on('ready', () => console.log('<HooplaMUSIC>\n...\nUm bot simples de música para o Discord.\nIniciado!'));

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
	if (command === `tocar`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(':x: **l** Me desculpe, mas você precisa usar os comandos em um canal de voz!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('Faltando permissão `CONNECT` ou `CONECTAR` no canal de voz.');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('Desculpa mas eu não tenho a permissão de falar neste canal de voz. Contate um administrador para me entregar esta permissão.');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send('💿 **l** Playlist> Adicionei a playlist `'+playlist.title+'` na fila.');
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 6);
					let index = 0;
					const Discord = require('discord.js');
					let embed = new Discord.RichEmbed()
					.setColor(`BLUE`)
					.setDescription(`**Seleção de música** \n ${videos.map(video2 => `**${++index} -** **[${video2.title}](${video2.url})**`).join('\n')} \n Por favor, forneça um valor para selecionar um dos resultados da pesquisa variando de 1 à 6.`)
					.setFooter(`Seleção de música - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)
msg.channel.send({embed: embed})

					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6, {
							maxMatches: 1,
							time: 20000,
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
					return msg.channel.send('🆘 **l** Não consegui encontrar.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `pular`) {
		if  (!msg.member.hasPermissions(["MANAGE_GUILD"])) return msg.reply("<:blobastonished:395358298968424448> **l** Desculpe, porém você não tem permissão para usar este comando bobinho(a). Por isso criei a limitação DJ, para mais informações. Use `"+PREFIX+"dj`");
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **l** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Nada tocando...');
		msg.reply(`a música foi pulada.`)

		serverQueue.connection.dispatcher.end();
		
		return undefined;




	} else if (command === `ping`) {
		if(Math.round(client.ping) < 75) return msg.channel.send(':ping_pong: l Ping:  ' +   '`' + Math.round(client.ping) +  '`' + '\nStatus: Ótimo, Shard trabalhando como nunca. 😃')


			if(Math.round(client.ping) > 200) return msg.channel.send(':ping_pong: l Ping:  ' +   '`' + Math.round(client.ping) +  '`' + '\nStatus: Ruim, muita lentidão no shard. 😖')
				msg.channel.send(':ping_pong: l Ping:  ' +   '`' + Math.round(client.ping) +  '`' + '\n Tudo operacional, shard funcionando normalmente com um pouco de delay. ✅')
		return undefined;


	} else if (command === `parar`) {
		if  (!msg.member.hasPermissions(["MANAGE_GUILD"])) return msg.reply("<:blobastonished:395358298968424448> **l** Desculpe, porém você não tem permissão para usar este comando bobinho(a). Por isso criei a limitação DJ, para mais informações. Use `"+PREFIX+"dj`");
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **l** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Nada tocando...');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		return undefined;
	} else if (command === `dj`) {			
			msg.reply(`<:blobcouncil:395358351195897866> **l** as permissões DJ foram criadas para impedir que pessoas não autorizadas abusem do bot, assim limitando o bot por permissão. Essa permissão seria: MANAGE_GUILD ou Gerenciar Servidor.`)
			return undefined;
		} else if (command === `volume`) {
		if  (!msg.member.hasPermissions(["MANAGE_GUILD"])) return msg.reply("<:blobastonished:395358298968424448> **l** Desculpe, porém você não tem permissão para usar este comando bobinho(a). Por isso criei a limitação DJ, para mais informações. Use `"+PREFIX+"dj`");
		if (!msg.member.voiceChannel) return msg.channel.send(':x: **l** Você não ficou em um canal de voz!');
		if (!serverQueue) return msg.channel.send('🇽 **l** Nada tocando.');
		if (!args[1]) return msg.channel.send(`Volume atual é: **${serverQueue.volume}**`);
		if(args[1] > 10) return msg.reply(`Ei o max. é dez (10) `)
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send("🔈 **l** Volume alterado para `" + args[1] + "`");
	} else if (command === `tocando`) {

		if (!serverQueue) return msg.channel.send('🇽 **l** Nada tocando.');

		const Discord1 = require('discord.js');
		const embed = new Discord1.RichEmbed()
		.setAuthor(`${serverQueue.songs[0].canal}`)
		.setColor(`RED`)
		.setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - YouTube`)
	.setFooter(`Agora tocando - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)

		 msg.channel.send({embed: embed})
		return undefined;



	} else if (command === `lista`) {
		if (!serverQueue) return msg.channel.send('🇽 **l** Nada tocando.');

		const Discord = require('discord.js');
	
		const embed = new Discord.RichEmbed()
		.setDescription(`
		__**Fila de músicas: (de ${msg.guild})**__ \n\n\n ${serverQueue.songs.map(song => `**-** [${song.title}](${song.url})`+'`['+ `${Math.floor(song.duration / 60)}`+':'+ Math.floor(song.duration % 60)+']`').join('\n')}\n\n ▶ l **Agora tocando**: ${serverQueue.songs[0].title}`)
	.setThumbnail(`${serverQueue.songs[0].thumb}`)
	.setFooter(`Fila de músicas - Música • ${moment().calendar()}`, msg.author.displayAvatarURL)

		return msg.channel.send({embed: embed})



	} else if (command === `pausar`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(`⏸ Pausei a música para você`);
		}
		return msg.channel.send('🇽 **l** Nada tocando.');

	} else if (command === `resumir`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ **l** Música restaurada pra você!');
		}
		return msg.channel.send('🇽 **l** Nada tocando.');
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
	if(song.canal.includes('VEVO')) { return msg.reply(`<:blobfrowningbig:395358289917116438> **l** Desculpe, mas não posso reproduzir músicas **VEVO**. Pulando esta música VEVO...`)
		serverQueue.voiceChannel.leave();

	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
	queue.delete(guild.id)

		} else {
		
		}
	

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
		else return msg.reply(`:minidisc: **l** **${song.title}** foi adcionada na fila.`);
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
			if (reason === 'Stream is not generating quickly enough.') serverQueue.textChannel.send('Opa! Primeira música da lista acabou. Caso a lista encerre sairei de: `' + serverQueue.voiceChannel.name + '`');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	const moment = require('moment');
	moment.locale('pt-BR');
	var minutes = Math.floor(song.duration / 60);
var seconds = Math.floor(song.duration % 60);

serverQueue.textChannel.send(':minidisc: **l** Tocando agora `'+ song.title +'`\n'+'`['+minutes+':'+seconds + ']`')
}

client.login(process.env.BOT_TOKEN);
