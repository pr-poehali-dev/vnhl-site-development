const API_URL = 'https://functions.poehali.dev/4f70112c-d0f4-4f79-a92a-48c6cdffea14';

export const api = {
  async getTeams() {
    const response = await fetch(`${API_URL}?path=teams`);
    return response.json();
  },

  async saveTeams(teams: any[]) {
    const response = await fetch(`${API_URL}?path=teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teams })
    });
    return response.json();
  },

  async getMatches() {
    const response = await fetch(`${API_URL}?path=matches`);
    return response.json();
  },

  async saveMatches(matches: any[]) {
    const response = await fetch(`${API_URL}?path=matches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matches })
    });
    return response.json();
  },

  async getPlayoffs() {
    const response = await fetch(`${API_URL}?path=playoffs`);
    return response.json();
  },

  async savePlayoffs(bracket: any) {
    const response = await fetch(`${API_URL}?path=playoffs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bracket })
    });
    return response.json();
  },

  async getRules() {
    const response = await fetch(`${API_URL}?path=rules`);
    return response.json();
  },

  async saveRules(rules: any[]) {
    const response = await fetch(`${API_URL}?path=rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules })
    });
    return response.json();
  },

  async getChampion() {
    const response = await fetch(`${API_URL}?path=champion`);
    return response.json();
  },

  async saveChampion(champion: any) {
    const response = await fetch(`${API_URL}?path=champion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ champion })
    });
    return response.json();
  },

  async getSettings() {
    const response = await fetch(`${API_URL}?path=settings`);
    return response.json();
  },

  async saveSettings(settings: any) {
    const response = await fetch(`${API_URL}?path=settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    });
    return response.json();
  }
};
