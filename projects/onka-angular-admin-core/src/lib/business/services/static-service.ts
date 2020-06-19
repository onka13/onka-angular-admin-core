import { Injectable } from '@angular/core';

/**
 * Stores static values, access local storage
 */
@Injectable({
  providedIn: 'root',
})
export class StaticService {
  staticValues = { roles: null, localCurrency: null };

  constructor() {}

  /**
   * Get user roles
   */
  getRoles() {
    if (!this.staticValues.roles) {
      try {
        this.staticValues.roles = JSON.parse(localStorage.getItem('roles'));
      } catch (error) {}
      if (!this.staticValues.roles) this.staticValues.roles = {};
    }
    return this.staticValues.roles;
  }

  /**
   * Set user roles
   */
  setRoles(value) {
    if (!value) return;
    this.staticValues.roles = value;
  }

  /**
   * Is logged in?
   */
  isLoggedIn() {
    return !!localStorage.getItem('AdminToken');
  }

  /**
   * Is super user
   */
  isSuper() {
    return !!localStorage.getItem('isSuper');
  }

  /**
   * Get admin panel token
   */
  getToken() {
    return localStorage.getItem('AdminToken');
  }

  /**
   * Store login data
   * @param data login data
   */
  login(data) {
    localStorage.setItem('AdminToken', data.token);
    localStorage.setItem('theme', data.theme || '1');
    localStorage.setItem('name', data.name);
    localStorage.setItem('isSuper', data.isSuper);
  }

  /**
   * Clear login data
   */
  logout() {
    ['AdminToken', 'username', 'name', 'isSuper', 'roles'].forEach((x) => {
      localStorage.removeItem(x);
    });
  }

  /**
   * Set current locale
   * @param locale locale
   */
  setCurrentLang(locale) {
    localStorage.setItem('locale', locale);
  }

  /**
   * Get current language
   */
  getCurrentLang() {
    return localStorage.getItem('locale');
  }

  /**
   * Get current username
   */
  getUserName() {
    return localStorage.getItem('name') || '';
  }

  /**
   * Get current user theme
   */
  getUserTheme() {
    return localStorage.getItem('theme');
  }

  /**
   * Set user theme
   * @param theme theme
   */
  setUserTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  /**
   * Set username
   */
  setUserName(name) {
    localStorage.setItem('name', name);
  }

  /**
   * Clear all static values
   */
  clear() {
    for (const key in this.staticValues) {
      this.staticValues[key] = null;
    }
    this.logout();
  }
}
