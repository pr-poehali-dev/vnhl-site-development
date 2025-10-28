import { api } from './api';

export const dataStore = {
  async loadTeams() {
    try {
      const teams = await api.getTeams();
      if (teams && teams.length > 0) {
        localStorage.setItem('vnhl_teams', JSON.stringify(teams));
        return teams;
      }
      const localTeams = localStorage.getItem('vnhl_teams');
      return localTeams ? JSON.parse(localTeams) : [];
    } catch (error) {
      console.error('Error loading teams:', error);
      const localTeams = localStorage.getItem('vnhl_teams');
      return localTeams ? JSON.parse(localTeams) : [];
    }
  },

  async saveTeams(teams: any[]) {
    localStorage.setItem('vnhl_teams', JSON.stringify(teams));
    try {
      await api.saveTeams(teams);
    } catch (error) {
      console.error('Error saving teams to server:', error);
    }
  },

  async loadMatches() {
    try {
      const matches = await api.getMatches();
      if (matches && matches.length > 0) {
        localStorage.setItem('vnhl_matches', JSON.stringify(matches));
        return matches;
      }
      const localMatches = localStorage.getItem('vnhl_matches');
      return localMatches ? JSON.parse(localMatches) : [];
    } catch (error) {
      console.error('Error loading matches:', error);
      const localMatches = localStorage.getItem('vnhl_matches');
      return localMatches ? JSON.parse(localMatches) : [];
    }
  },

  async saveMatches(matches: any[]) {
    localStorage.setItem('vnhl_matches', JSON.stringify(matches));
    try {
      await api.saveMatches(matches);
    } catch (error) {
      console.error('Error saving matches to server:', error);
    }
  },

  async loadPlayoffs() {
    try {
      const playoffs = await api.getPlayoffs();
      if (playoffs) {
        localStorage.setItem('vnhl_playoffs', JSON.stringify(playoffs));
        return playoffs;
      }
      const localPlayoffs = localStorage.getItem('vnhl_playoffs');
      return localPlayoffs ? JSON.parse(localPlayoffs) : { roundOf16: [], quarterFinals: [], semiFinals: [], final: null };
    } catch (error) {
      console.error('Error loading playoffs:', error);
      const localPlayoffs = localStorage.getItem('vnhl_playoffs');
      return localPlayoffs ? JSON.parse(localPlayoffs) : { roundOf16: [], quarterFinals: [], semiFinals: [], final: null };
    }
  },

  async savePlayoffs(playoffs: any) {
    localStorage.setItem('vnhl_playoffs', JSON.stringify(playoffs));
    try {
      await api.savePlayoffs(playoffs);
    } catch (error) {
      console.error('Error saving playoffs to server:', error);
    }
  },

  async loadRules() {
    try {
      const rules = await api.getRules();
      if (rules) {
        localStorage.setItem('vnhl_rules', JSON.stringify(rules));
        return rules;
      }
      const localRules = localStorage.getItem('vnhl_rules');
      return localRules ? JSON.parse(localRules) : [];
    } catch (error) {
      console.error('Error loading rules:', error);
      const localRules = localStorage.getItem('vnhl_rules');
      return localRules ? JSON.parse(localRules) : [];
    }
  },

  async saveRules(rules: any) {
    localStorage.setItem('vnhl_rules', JSON.stringify(rules));
    try {
      await api.saveRules(rules);
    } catch (error) {
      console.error('Error saving rules to server:', error);
    }
  },

  async loadChampion() {
    try {
      const champion = await api.getChampion();
      if (champion) {
        localStorage.setItem('vnhl_champion', JSON.stringify(champion));
        return champion;
      }
      const localChampion = localStorage.getItem('vnhl_champion');
      return localChampion ? JSON.parse(localChampion) : { teamName: '', logo: '🏆', year: '' };
    } catch (error) {
      console.error('Error loading champion:', error);
      const localChampion = localStorage.getItem('vnhl_champion');
      return localChampion ? JSON.parse(localChampion) : { teamName: '', logo: '🏆', year: '' };
    }
  },

  async saveChampion(champion: any) {
    localStorage.setItem('vnhl_champion', JSON.stringify(champion));
    try {
      await api.saveChampion(champion);
    } catch (error) {
      console.error('Error saving champion to server:', error);
    }
  },

  async loadSettings(key: string = 'site_icon') {
    try {
      const value = await api.getSettings(key);
      if (value) {
        localStorage.setItem(`vnhl_${key}`, value);
        return value;
      }
      return localStorage.getItem(`vnhl_${key}`) || '🏒';
    } catch (error) {
      console.error('Error loading settings:', error);
      return localStorage.getItem(`vnhl_${key}`) || '🏒';
    }
  },

  async saveSettings(key: string, value: string) {
    localStorage.setItem(`vnhl_${key}`, value);
    try {
      await api.saveSettings(key, value);
    } catch (error) {
      console.error('Error saving settings to server:', error);
    }
  },
};
