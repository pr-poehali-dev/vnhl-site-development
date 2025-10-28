const API_URL = 'https://functions.poehali.dev/4f70112c-d0f4-4f79-a92a-48c6cdffea14';

export const api = {
  async getTeams() {
    const response = await fetch(`${API_URL}?resource=teams`);
    return response.json();
  },

  async saveTeams(teams: any[]) {
    const response = await fetch(`${API_URL}?resource=teams`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teams)
    });
    return response.json();
  },

  async getMatches() {
    const response = await fetch(`${API_URL}?resource=matches`);
    return response.json();
  },

  async saveMatches(matches: any[]) {
    const response = await fetch(`${API_URL}?resource=matches`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matches)
    });
    return response.json();
  },

  async getPlayoffs() {
    const response = await fetch(`${API_URL}?resource=playoffs`);
    return response.json();
  },

  async savePlayoffs(bracket: any) {
    const response = await fetch(`${API_URL}?resource=playoffs`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bracket)
    });
    return response.json();
  },

  async getRules() {
    const response = await fetch(`${API_URL}?resource=rules`);
    const result = await response.json();
    return result.content || '';
  },

  async saveRules(rules: any) {
    const response = await fetch(`${API_URL}?resource=rules`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: rules })
    });
    return response.json();
  },

  async getChampion() {
    const response = await fetch(`${API_URL}?resource=champion`);
    const result = await response.json();
    return { teamName: result.team_name || '', logo: result.logo || '🏆', year: result.year || '' };
  },

  async saveChampion(champion: any) {
    const response = await fetch(`${API_URL}?resource=champion`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName: champion.teamName, logo: champion.logo, year: champion.year })
    });
    return response.json();
  },

  async getSettings(key: string = 'site_icon') {
    const response = await fetch(`${API_URL}?resource=settings&key=${key}`);
    const result = await response.json();
    return result.value || '🏒';
  },

  async saveSettings(key: string, value: string) {
    const response = await fetch(`${API_URL}?resource=settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return response.json();
  }
};