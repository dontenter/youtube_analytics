const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function findLatestCSV(publicDir) {
  const files = fs.readdirSync(publicDir)
    .filter(f => /^raw_crawler(_msn_youtube_|_data_)\d.*\.csv$/.test(f))
    .sort();
  if (files.length === 0) {
    throw new Error('No raw_crawler_*.csv file found in public/');
  }
  return path.join(publicDir, files[files.length - 1]);
}

const csvPath = findLatestCSV(path.join(process.cwd(), 'public'));
const idsPath = path.join(process.cwd(), 'scripts', 'Ids.xlsx');
const campaignsPath = path.join(process.cwd(), 'scripts', 'campaigns.json');
const updatesPath = path.join(process.cwd(), 'scripts', 'updates.json');
const gameNamesPath = path.join(process.cwd(), 'scripts', 'gameNames.json');
const outputPath = path.join(process.cwd(), 'public', 'data.json');

function loadGameNames(excelPath, override) {
  const workbook = xlsx.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const names = {};
  for (let i = 1; i < rows.length; i++) {
    const [name, id] = rows[i];
    if (id && name) {
      names[String(id).trim()] = String(name).trim();
    }
  }
  // Local JSON overrides take precedence over Excel mapping
  return { ...names, ...override };
}

function loadJsonConfig(configPath) {
  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.warn(`Could not load config from ${configPath}: ${err.message}`);
    return {};
  }
}

function loadGameNamesOverride(configPath) {
  const data = loadJsonConfig(configPath);
  if (!data || typeof data !== 'object') return {};
  const normalized = {};
  for (const [id, name] of Object.entries(data)) {
    if (id && name) {
      normalized[String(id).trim()] = String(name).trim();
    }
  }
  return normalized;
}

function getSortedDates(config, gameId) {
  const dates = config[gameId];
  if (!Array.isArray(dates)) return [];
  return dates.slice().sort();
}

function parseCSV(content, names, campaigns, updates) {
  const lines = content.split('\n').filter(line => line.trim());
  const data = {};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Remove surrounding quotes from the entire line
    if (line.startsWith('"') && line.endsWith('"')) {
      line = line.slice(1, -1);
    }

    if (i === 0) {
      // Header row
      continue;
    }

    const parts = line.split(',');
    if (parts.length !== 4) {
      console.warn(`Skipping malformed line ${i + 1}: ${line}`);
      continue;
    }

    const [day, source, gameId, gameplaysStr] = parts;
    const gameplays = parseInt(gameplaysStr, 10);

    if (!data[gameId]) {
      data[gameId] = {
        id: gameId,
        name: names[gameId] || gameId,
        records: [],
        campaignRanges: [],
        updateDates: getSortedDates(updates, gameId),
      };
    }

    data[gameId].records.push({
      day,
      gameplays,
    });
  }

  // Sort records by day and calculate stats
  const games = Object.values(data).map(game => {
    game.records.sort((a, b) => a.day.localeCompare(b.day));
    
    const gameplays = game.records.map(r => r.gameplays);
    const total = gameplays.reduce((sum, val) => sum + val, 0);
    const avg = Math.round(total / gameplays.length);
    const max = Math.max(...gameplays);
    const min = Math.min(...gameplays);
    const launchDate = game.records[0]?.day || '';
    
    return {
      ...game,
      total,
      avg,
      max,
      min,
      launchDate,
      campaignRanges: [],
    };
  });

  // Sort games by total gameplays descending
  games.sort((a, b) => b.total - a.total);

  return games;
}

const gameNamesOverride = loadGameNamesOverride(gameNamesPath);
const names = loadGameNames(idsPath, gameNamesOverride);
const campaigns = loadJsonConfig(campaignsPath);
const updates = loadJsonConfig(updatesPath);
const content = fs.readFileSync(csvPath, 'utf-8');
const games = parseCSV(content, names, campaigns, updates);

const summary = {
  totalGames: games.length,
  totalGameplays: games.reduce((sum, g) => sum + g.total, 0),
  dateRange: {
    start: games.reduce((min, g) => {
      const firstDay = g.records[0]?.day;
      return firstDay && firstDay < min ? firstDay : min;
    }, '9999-99-99'),
    end: games.reduce((max, g) => {
      const lastDay = g.records[g.records.length - 1]?.day;
      return lastDay && lastDay > max ? lastDay : max;
    }, '0000-00-00'),
  },
  games,
};

fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
console.log(`Generated ${outputPath}`);
console.log(`Games: ${summary.totalGames}`);
console.log(`Total gameplays: ${summary.totalGameplays.toLocaleString()}`);
console.log(`Date range: ${summary.dateRange.start} - ${summary.dateRange.end}`);
