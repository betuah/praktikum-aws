module.exports = {
   apps: [
      {
         name: "apps",
         script: "app.js",
         instances: 1,
         exec_mode: "cluster",
         max_memory_restart: "1G",
         autorestart: true,
         watch: false,
         max_restarts: 10,
         log_date_format: "YYYY-MM-DD HH:mm Z",
         env: {
            NODE_ENV: "production",
         },
      },
   ],
};
