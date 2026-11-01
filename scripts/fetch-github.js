const fs = require('fs');

async function syncGitHubContributions(username = process.env.GITHUB_USER || process.argv[2] || 'chittivalasa124') {
  console.log(`[sync-github] Fetching live contributions for ${username}...`);

  let existingData = null;
  const jsonPath = 'public/github-contributions.json';
  if (fs.existsSync(jsonPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch {}
  }

  const url = `https://github.com/users/${username}/contributions`;
  let html = '';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    });
    if (res.ok) {
      html = await res.text();
    }
  } catch (err) {
    console.warn(`[sync-github] Failed to fetch HTML from GitHub: ${err.message}`);
  }

  // 1. Parse total contributions count
  const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  let totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;
  console.log(`[sync-github] Scraped total contributions: ${totalContributions}`);

  // 2. Parse tooltips: <tool-tip ... for="contribution-day-component-C-R">...Text...</tool-tip>
  const tooltips = new Map();
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi;
  let ttMatch;
  while ((ttMatch = tooltipRegex.exec(html)) !== null) {
    const targetId = ttMatch[1];
    const text = ttMatch[2].trim().replace(/\s+/g, ' ');
    tooltips.set(targetId, text);
  }

  // 3. Parse td elements containing data-date
  const tdRegex = /<td\b([^>]*\bdata-date="([^"]+)"[^>]*)>(?:([\s\S]*?)<\/td>)?/gi;
  let tdMatch;
  const rawDateMap = new Map();

  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const attrs = tdMatch[1];
    const date = tdMatch[2];

    const levelMatch = attrs.match(/data-level="([0-9]+)"/);
    const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;

    const idMatch = attrs.match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : '';

    let tooltip = (id && tooltips.get(id)) || '';
    if (!tooltip) {
      tooltip = level > 0 ? `${level} contribution(s) on ${date}` : `No contributions on ${date}`;
    }

    const countMatch = tooltip.match(/^([0-9]+)\s+contribution/i);
    const count = countMatch ? parseInt(countMatch[1], 10) : (level > 0 ? level : 0);

    rawDateMap.set(date, { date, count, level, tooltip });
  }

  console.log(`[sync-github] Scraped ${rawDateMap.size} unique contribution days`);

  // Check if profile activity was marked private or 0 while existing cached data had active days
  let activeScrapedCount = 0;
  for (const item of rawDateMap.values()) {
    if (item.count > 0 || item.level > 0) activeScrapedCount++;
  }

  if (activeScrapedCount === 0 && existingData && Array.isArray(existingData.contributions)) {
    const existingActive = existingData.contributions.filter(c => (c.count > 0 || c.level > 0));
    if (existingActive.length > 0) {
      console.log(`[sync-github] Profile activity is currently private or unindexed; preserving ${existingActive.length} existing active days (${existingData.totalContributions || 204} contributions).`);
      totalContributions = existingData.totalContributions || totalContributions || 204;
      for (const item of existingActive) {
        rawDateMap.set(item.date, {
          date: item.date,
          count: item.count || (item.level > 0 ? item.level : 1),
          level: item.level || 1,
          tooltip: item.tooltip || `${item.count || item.level || 1} contribution(s) on ${item.date}`
        });
      }
    }
  }

  // 4. Scrape dynamic month headers directly from GitHub table
  const months = [];
  const monthRegex = /<td[^>]*class="[^"]*ContributionCalendar-label[^"]*"[^>]*colspan="([0-9]+)"[^>]*>[\s\S]*?<span aria-hidden="true"[^>]*>([A-Za-z]{3})<\/span>[\s\S]*?<\/td>/gi;
  let mMatch;
  while ((mMatch = monthRegex.exec(html)) !== null) {
    months.push({
      name: mMatch[2],
      colSpan: parseInt(mMatch[1], 10)
    });
  }

  // Fallback month headers if not scrapable
  if (months.length === 0) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const endSaturday = new Date(now.getTime() + (6 - dayOfWeek) * 86400000);
    const baseSun = new Date(endSaturday.getTime() - (53 * 7 - 1) * 86400000);

    let curM = -1;
    let span = 0;
    for (let c = 0; c < 53; c++) {
      const mid = new Date(baseSun.getTime() + (c * 7 + 3) * 86400000);
      const m = mid.getUTCMonth();
      if (m !== curM) {
        if (curM !== -1) months.push({ name: monthNames[curM], colSpan: span });
        curM = m;
        span = 1;
      } else {
        span++;
      }
    }
    if (span > 0 && curM !== -1) months.push({ name: monthNames[curM], colSpan: span });
  }

  console.log(`[sync-github] Dynamic month headers (${months.length}): ${months.map(m => `${m.name}(${m.colSpan})`).join(', ')}`);

  // 5. Construct exact 53-week x 7-day column-major matrix dynamically
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const endSaturday = new Date(now.getTime() + (6 - dayOfWeek) * 86400000);
  const baseSunday = new Date(endSaturday.getTime() - (53 * 7 - 1) * 86400000);
  console.log(`[sync-github] Calendar base Sunday computed: ${baseSunday.toISOString().split('T')[0]}`);

  const matrix = [];

  for (let c = 0; c < 53; c++) {
    for (let r = 0; r < 7; r++) {
      const dayOffset = c * 7 + r;
      const cellDate = new Date(baseSunday.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const dateStr = cellDate.toISOString().split('T')[0];

      const match = rawDateMap.get(dateStr);
      if (match) {
        matrix.push({
          date: dateStr,
          count: match.count,
          level: match.level,
          row: r,
          col: c,
          tooltip: match.tooltip
        });
      } else {
        // If date is in future beyond today
        const isFuture = cellDate > now;
        matrix.push({
          date: dateStr,
          count: 0,
          level: isFuture ? -1 : 0,
          row: r,
          col: c,
          tooltip: isFuture ? '' : `No contributions on ${dateStr}`
        });
      }
    }
  }

  // 6. Fetch live user details directly from GitHub API
  let publicRepos = existingData?.publicRepos || 0;
  let followers = existingData?.followers || 0;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === 'number') {
        publicRepos = userData.public_repos;
      }
      if (typeof userData.followers === 'number') {
        followers = userData.followers;
      }
    }
  } catch (e) {
    console.warn('[sync-github] Could not fetch public details from API:', e.message);
  }

  const payload = {
    username,
    totalContributions,
    publicRepos,
    followers,
    months,
    updatedAt: new Date().toISOString(),
    contributions: matrix
  };

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[sync-github] Saved exact 53x7 matrix (${matrix.length} cells) to ${jsonPath}`);

  const activeDays = matrix.filter(d => d.count > 0);
  console.log(`[sync-github] Active contribution days in matrix: ${activeDays.length}`);
  console.log(`[sync-github] Total contributions: ${totalContributions}, public repos: ${publicRepos}, followers: ${followers}`);
}

syncGitHubContributions().catch(err => {
  console.error('[sync-github] Error:', err);
  process.exit(1);
});
