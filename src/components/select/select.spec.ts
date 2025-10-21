import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './select.js';
import './select-trigger.js';
import './select-value.js';
import './select-icon.js';
import './select-portal.js';
import './select-content.js';
import './select-viewport.js';
import './select-item.js';
import './select-item-text.js';
import './select-item-indicator.js';
import './select-group.js';
import './select-label.js';

describe('Select Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render select', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const select = container.querySelector('wc-select');
    expect(select).toBeDefined();
  });

  it('should render trigger', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const trigger = container.querySelector('wc-select-trigger');
    expect(trigger).toBeDefined();
    expect(trigger?.getAttribute('role')).toBe('combobox');
  });

  it('should render value', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const value = container.querySelector('wc-select-value');
    expect(value).toBeDefined();
  });

  it('should render content', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-item value="1">Item 1</wc-select-item>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const content = container.querySelector('wc-select-content');
    expect(content).toBeDefined();
    expect(content?.getAttribute('role')).toBe('listbox');
  });

  it('should render items', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-item value="1">Item 1</wc-select-item>
              <wc-select-item value="2">Item 2</wc-select-item>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const items = container.querySelectorAll('wc-select-item');
    expect(items.length).toBe(2);
    expect(items[0]?.getAttribute('role')).toBe('option');
  });

  it('should have closed state by default', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const select = container.querySelector('wc-select');
    expect(select?.getAttribute('data-state')).toBe('closed');
  });

  it('should support initial value', async () => {
    container.innerHTML = `
      <wc-select value="2">
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-item value="1">Item 1</wc-select-item>
              <wc-select-item value="2">Item 2</wc-select-item>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const select = container.querySelector('wc-select');
    expect(select?.getAttribute('value')).toBe('2');
  });

  it('should support disabled state', async () => {
    container.innerHTML = `
      <wc-select disabled>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const select = container.querySelector('wc-select');
    expect(select?.hasAttribute('data-disabled')).toBe(true);
  });

  it('should render group', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-group>
                <wc-select-label>Group 1</wc-select-label>
                <wc-select-item value="1">Item 1</wc-select-item>
              </wc-select-group>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const group = container.querySelector('wc-select-group');
    expect(group).toBeDefined();
    expect(group?.getAttribute('role')).toBe('group');
  });

  it('should render label', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-group>
                <wc-select-label>Group Label</wc-select-label>
                <wc-select-item value="1">Item 1</wc-select-item>
              </wc-select-group>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const label = container.querySelector('wc-select-label');
    expect(label).toBeDefined();
  });

  it('should update value dynamically', async () => {
    container.innerHTML = `
      <wc-select>
        <wc-select-trigger>
          <wc-select-value placeholder="Select..."></wc-select-value>
        </wc-select-trigger>
        <wc-select-portal>
          <wc-select-content>
            <wc-select-viewport>
              <wc-select-item value="1">Item 1</wc-select-item>
              <wc-select-item value="2">Item 2</wc-select-item>
            </wc-select-viewport>
          </wc-select-content>
        </wc-select-portal>
      </wc-select>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const select = container.querySelector('wc-select');
    select?.setAttribute('value', '2');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(select?.getAttribute('value')).toBe('2');
  });
});
