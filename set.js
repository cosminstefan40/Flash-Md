const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0s1NmFEZWRaL2Vzbm1sNStBQ3hEWFJQNjB3S21KcHpqOTBkeGxleWtGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNKaktLMTlmZEsxZENKWVQ0eWxtVkpmd1ZCY0lJWmxNNnF1dml0bGJHYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrS1AwSVpqS0JTc2tDb0xuOXJZMkdCek16ZFZGYlFWUHdIWnFmUTJnMzFvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDbFF1NHZQazZxbmRFamoyWk0rTDVmU1RWVVVEQmZDV3JlZUtIa2dFV1dRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldKS2NTUmZiRWxCaXpISWdWMjY1QzF2KzNucUlmUnJBQkZxTGplVzI5RWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlgxSnROYVg0VUFXV1RuREdwYmVJSFJSVHdWamVSamNiOXdsc0RwR28rMTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JweExneDNCMUJJSmt6d3ZyaytrZHJqNkczeUNCdktmU3NSTDFrNEMxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTM3UGtBQTA2a0F0bERCNlh3UnV5WTFSZFpLRFB2SWFaelY0bndOSGdSdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhEMWducTdISmZtbDlIZStDQ1FqQWQ5SCtDOUg0VXRGNnl4b2xieXpUbXcwV3VRNUJick9GdDlWNlRJb2lnMXhFWFQwSjNRRFdyRnc1eUdWNmNUNUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJDbTVXamE0a1NVOW15aWFXL0YrWThUNUp2b3lFblhtZys5R1hueFJPendRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNDRTNBRjY0NTFFOTUyNkIyNTJBQzUyQTk0QjkwRjY1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzM2OTEyMDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZFQ0I5RDFDOUYyQjBGNzlFODQ5RTQyNUVCNTBBRUFBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzM2OTEyMDV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndPa1NSMHV2VEJDdTNWQWNJZXIxeHciLCJwaG9uZUlkIjoiZDUxODViNDgtOWNjZC00ZjcwLThlYjYtNjVkMDkyNjc2ZjY4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitsR2tJcVJnWnN3WTFVclQ4UytoYVh4Mk91cz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIY2wwOXpOYWRPZDdQM3dRRGtZekdwcXlPWnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOEZKUjVaMloiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5Ojk0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImFub25pbSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkQ5ejVVRkVMT08yTG9HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWW5adm5HTTdzNGFlejRieTZ3dmpVMXFYSExGcWxFRHIzMkpTOUN2SHNrbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiREpoNC9yZmRiZFlLVWNZOUN1cXR4TmZUMWh1cGNEY0hsbW5sa1NXMTVUUTdQZUNWUGF1ZUpwN2R2Z3dWYnNOMkVSeUlBZDdiZ2c3RVlmdC9hcmFpREE9PSIsImRldmljZVNpZ25hdHVyZSI6Ing2RDdqVk5BL1ZudmJZd0lyNHdEaERYNU15TXJSTU8xV3Q3aDBaTXd2WXpJOFFBNjVrc3JzSXMrM0J5bG02Wi9ZU2E1VmZ2aGwxNTYzSjA5NHM2NkF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6OTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0oyYjV4ak83T0ducytHOHVzTDQxTmFseHl4YXBSQTY5OWlVdlFyeDdKSyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzY5MTIwMSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEZEUifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "ANONIM",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "0770811929",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
