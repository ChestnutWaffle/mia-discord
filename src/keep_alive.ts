import http from "http";

export const server = http.createServer((req, res) => {
  res.write("Bot is running");
  res.end();
})