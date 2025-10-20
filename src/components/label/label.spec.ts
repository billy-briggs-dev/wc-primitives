import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './label.js';

describe('Label Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render', async () => {
    container.innerHTML = `<wc-label>Username</wc-label>`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    expect(label).toBeDefined();
    expect(label?.textContent).toBe('Username');
  });

  it('should have proper role', async () => {
    container.innerHTML = `<wc-label>Username</wc-label>`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    expect(label?.getAttribute('role')).toBe('label');
  });

  it('should set for attribute', async () => {
    container.innerHTML = `<wc-label for="username">Username</wc-label>`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    expect(label?.getAttribute('for')).toBe('username');
  });

  it('should focus associated input on click', async () => {
    container.innerHTML = `
      <wc-label for="username">Username</wc-label>
      <input id="username" type="text" />
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    const input = container.querySelector('#username') as HTMLInputElement;

    expect(input).toBeDefined();
    expect(document.activeElement).not.toBe(input);

    label?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.activeElement).toBe(input);
  });

  it('should toggle checkbox on click', async () => {
    container.innerHTML = `
      <wc-label for="agree">Agree</wc-label>
      <input id="agree" type="checkbox" />
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    const checkbox = container.querySelector('#agree') as HTMLInputElement;

    expect(checkbox).toBeDefined();
    expect(checkbox.checked).toBe(false);

    label?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(checkbox.checked).toBe(true);
  });

  it('should work without for attribute', async () => {
    container.innerHTML = `<wc-label>Simple label</wc-label>`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    expect(label).toBeDefined();
    expect(label?.getAttribute('for')).toBe(null);

    // Should not throw error when clicked
    expect(() => label?.click()).not.toThrow();
  });

  it('should handle slotted content', async () => {
    container.innerHTML = `
      <wc-label for="email">
        <span>Email Address</span>
      </wc-label>
    `;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const label = container.querySelector('wc-label');
    const span = label?.querySelector('span');
    expect(span?.textContent).toBe('Email Address');
  });
});
