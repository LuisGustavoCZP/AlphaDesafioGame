const { NOTIMP } = require("dns");

module.exports = {
   apps: [
      {
         script: "backend/index.js",
         cwd: "./backend/",
         name: "Backend",
         watch: true
      },
      {
         script: "frontend/server.js",
         cwd: "./frontend/",
         name: "Frontend",
         watch: true
      }
   ]
}