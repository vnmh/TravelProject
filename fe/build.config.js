module.exports = {
   apps: [
      {
         name: "3000_travel_project_admin",
         script: "server.js",
         max_memory_restart: "256M",
         ignore_watch: ["node_modules"],
         watch_options: {
            followSymlinks: false
         },
         env: {
            PORT: 300,
            NODE_ENV: "production"
         }
      }
   ]
};
