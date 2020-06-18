import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  staticValues = { roles: null, localCurrency: null };

  constructor() {}

  getRoles() {
    if (!this.staticValues.roles) {
      try {
        this.staticValues.roles = JSON.parse(localStorage.getItem('roles'));
      } catch (error) {}
      if (!this.staticValues.roles) this.staticValues.roles = {};
    }
    return this.staticValues.roles;
  }
  setRoles(value) {
    if (!value) return;
    this.staticValues.roles = value;
  }
  isLoggedIn() {
    return !!localStorage.getItem('AdminToken');
  }
  isDone() {
    return !!localStorage.getItem('AdminToken');
  }
  isSuper() {
    return !!localStorage.getItem('isSuper');
  }
  getToken() {
    return localStorage.getItem('AdminToken');
  }
  login(data) {
    localStorage.setItem('AdminToken', data.token);
    localStorage.setItem('theme', data.theme || '1');
    localStorage.setItem('name', data.name);
    localStorage.setItem('isSuper', data.isSuper);
  }
  logout() {
    ['AdminToken', 'username', 'name', 'isSuper', 'roles'].forEach((x) => {
      localStorage.removeItem(x);
    });
  }
  setCurrentLang(locale) {
    localStorage.setItem('locale', locale);
  }
  getCurrentLang() {
    return localStorage.getItem('locale');
  }
  getUserName() {
    return localStorage.getItem('name') || '';
  }
  getUserTheme() {
    return localStorage.getItem('theme');
  }
  setUserTheme(theme) {
    localStorage.setItem('theme', theme);
  }
  setUserName(name) {
    localStorage.setItem('name', name);
  }
  clear() {
    for (const key in this.staticValues) {
      this.staticValues[key] = null;
    }
    this.logout();
  }
}
