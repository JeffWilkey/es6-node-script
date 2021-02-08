require('dotenv').config();

module.exports = {
  dbUrlEU: process.env.MS5_EU_DB_URL,
  dbUrlUK: process.env.MS5_UK_DB_URL,
  dbUrlAU: process.env.MS5_AU_DB_URL,
};
