const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Logged in as Some Bot#2997");
})

app.get("/", (req, res) => {
  res.send("Bot should be online");
})

const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

let maxStickMessageCount = 10
let count = 0
let channel = ""
let stickyContent = ""
let lastStickyMessage = ""

client.on("messageCreate", async message => {
//sticky check
  if (stickyContent && channel === message.channel.id) {
    count++
    if (count === maxStickMessageCount) {
      await lastStickyMessage.delete
      lastStickyMessage = await message.channel.send(stickyContent)
      count = 0
    }
  }

  if (message.content.toLowerCase().startsWith("stick")) {
    if (!message.member.permissions.has("KICK_MEMBERS")) return
    let content = message.content.split(" ").slice(1).join(" ")
    if (!content) return message.channel.send("[!][No message to stick]")
    try {
    stickyContent = content
    channel = message.channel.id
    lastStickyMessage = await message.channel.send(stickyContent)
    count = 0
    } catch(err) {
      console.log(err)
      message.channel.send("An error occurred!")
    }
  }
  if (message.content.toLowerCase().startsWith("unstick")) {
    stickyContent = ""
    lastStickyMessage = ""
    channel = ""
    message.channel.send("Successfully removed the sticked message!")
  }

  if (message.content === "ping") {
    message.channel.send("pong")
  }
  if (message.content.startsWith("say")) {
    let content = message.content.split(" ").slice(1).join(" ")
    if (!content) return message.channel.send("[!][No message to say!]")
    message.channel.send(content)
  }
  if (message.content.startsWith("dm")) {
    let target = message.mentions.users.first()
    let content = message.content.split(" ").slice(2).join(" ")
    if (!target) return message.channel.send("[!][No user mentioned!]")
    if (!content) return message.channel.send("[!][No message to send!]")
    target.send(content).then(message.channel.send("Sent the message to the user successfully!"))
  }
})

client.login(process.env.token);