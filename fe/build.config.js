module.exports = {
   apps: [
      {
         name: "8888_travel_project_admin",
         script: "server.js",
         max_memory_restart: "256M",
         ignore_watch: ["node_modules"],
         watch_options: {
            followSymlinks: false
         },
         env: {
            PORT: 8888,
            NODE_ENV: "production"
         }
      }
   ]
};
