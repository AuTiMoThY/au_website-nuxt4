// PM2 配置文件
// 使用: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: './.output/server/index.mjs',
      cwd: './',
      instances: 'max', // 或指定數量，如 2
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2/error.log',
      out_file: './logs/pm2/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};

