import { LANG_CUSTOM_IDS, LANG_CUSTOM_ID_ARR, OPEN_LANG_CUSTOM_IDS, OPEN_LANG_CUSTOM_ID_ARR, discord_locale_to_google_langs, languages, open_languages } from './utils/languages';
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client, ApplicationCommandType, MessageType, Routes } from '@discordjs/core';

import { env, translate } from './config';
import { buttons_row, open_buttons_row } from './components/row';




// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

// rest.delete(Routes.applicationCommand(env.DISCORD_CLIENT_ID, "1158703148337209395")).then(() => console.log("successfully delete command 1158703148337209395"));
// rest.delete(Routes.applicationCommand(env.DISCORD_CLIENT_ID, "1158480699523870802")).then(() => console.log("successfully delete command 1158480699523870802"));
// rest.delete(Routes.applicationCommand(env.DISCORD_CLIENT_ID, "1166749710695010429")).then(() => console.log("successfully delete command 1166749710695010429"));



const gateway = new WebSocketManager({
  token: env.DISCORD_TOKEN,
  intents: GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessages | GatewayIntentBits.DirectMessages | GatewayIntentBits.GuildWebhooks | GatewayIntentBits.GuildMembers,
  rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

client.api.applicationCommands.createGlobalCommand(process.env.DISCORD_CLIENT_ID, {
  name: "Translate Text",
  type: ApplicationCommandType.Message
})

client.api.applicationCommands.createGlobalCommand(process.env.DISCORD_CLIENT_ID, {
  name: "Translate to Locale",
  type: ApplicationCommandType.Message
})

client.api.applicationCommands.createGlobalCommand(process.env.DISCORD_CLIENT_ID, {
  name: "Open Translation",
  type: ApplicationCommandType.Message
})
// client.api.applicationCommands.createGlobalCommand(process.env.DISCORD_CLIENT_ID, {
//   name: "Open Translate Locale",
//   type: ApplicationCommandType.Message
// })

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
  if (interaction.type === InteractionType.ApplicationCommand && interaction.data.name === 'Translate Text') {
    // console.log("Translate Text triggered")

    if (interaction.data.type !== ApplicationCommandType.Message) return;

    const resolved_data = interaction.data.resolved

    const target_id = interaction.data.target_id

    console.log("user:", interaction.locale ?? interaction.user)

    const content = resolved_data.messages[target_id].content;

    // console.log({ resolved_data })



    await api.interactions.reply(interaction.id, interaction.token, {
      flags: MessageFlags.Ephemeral,
      components: [buttons_row],
      embeds: [{
        title: "Translate text to a language",
        description: content,
        color: 1,
      }]
    })
  }

  if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.message.type === MessageType.ContextMenuCommand && LANG_CUSTOM_ID_ARR.includes(interaction.data.custom_id as any)) {
      // await api.interactions.deferMessageUpdate(interaction.id, interaction.token)
      // console.log("context menu command")
      const text = interaction.message.embeds[0].description!;

      // console.log({ original_message: interaction.message.message_reference })

      const custom_id = interaction.data.custom_id as keyof typeof LANG_CUSTOM_IDS
      const translated_text = await translate(text, { to: languages[custom_id] })

      await api.interactions.reply(interaction.id, interaction.token, {
        content: translated_text[0],
        flags: MessageFlags.Ephemeral
      })

      // await api.interactions.deleteReply(env.DISCORD_CLIENT_ID, interaction.id)

    }

    if (interaction.message.type === MessageType.ContextMenuCommand && OPEN_LANG_CUSTOM_ID_ARR.includes(interaction.data.custom_id as any)) {
      const text = interaction.message.embeds[0].description!;

      // console.log({ original_message: interaction.message.message_reference })

      const custom_id = interaction.data.custom_id as typeof OPEN_LANG_CUSTOM_IDS[keyof typeof OPEN_LANG_CUSTOM_IDS]
      const translated_text = await translate(text, { to: open_languages[custom_id] })

      await api.interactions.reply(interaction.id, interaction.token, {
        // content: text,
        embeds: [{
          title: `Translation`,
          description: `From: ${text}\nTo: ${translated_text[0]}`
        }]
      })

      await api.interactions.deleteReply(env.DISCORD_CLIENT_ID, interaction.id);
    }
  }

  if (interaction.type === InteractionType.ApplicationCommand && interaction.data.name === "Translate to Locale") {

    if (interaction.data.type !== ApplicationCommandType.Message) return;

    const resolved_data = interaction.data.resolved

    const target_id = interaction.data.target_id

    const content = resolved_data.messages[target_id].content;

    const translated_text = await translate(content, { to: discord_locale_to_google_langs[interaction.locale] })

    await api.interactions.reply(interaction.id, interaction.token, {
      flags: MessageFlags.Ephemeral,
      content: translated_text[0]
    })
  }

  // if (interaction.type === InteractionType.ApplicationCommand && interaction.data.name === "Open Translate Locale") {

  //   if (interaction.data.type !== ApplicationCommandType.Message) return;

  //   const resolved_data = interaction.data.resolved

  //   const target_id = interaction.data.target_id

  //   const content = resolved_data.messages[target_id].content;

  //   const translated_text = await translate(content, { to: discord_locale_to_google_langs[interaction.locale] })

  //   await api.interactions.reply(interaction.id, interaction.token, {
  //     content: translated_text[0]
  //   })
  // }

  if (interaction.type === InteractionType.ApplicationCommand && interaction.data.name === "Open Translation") {

    if (interaction.data.type !== ApplicationCommandType.Message) return;

    const resolved_data = interaction.data.resolved

    const target_id = interaction.data.target_id

    const resolved_message = resolved_data.messages[target_id]

    const content = resolved_message.content;

    await api.interactions.reply(interaction.id, interaction.token, {
      components: [open_buttons_row],
      embeds: [{
        title: "Translate text to a language",
        description: content,
        color: 1,
      }]
    })
  }

});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));

// Start the WebSocket connection.
gateway.connect();