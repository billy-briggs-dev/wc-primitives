import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './scroll-area.js';
import './scroll-area-viewport.js';
import './scroll-area-scrollbar.js';
import './scroll-area-thumb.js';
import './scroll-area-corner.js';

describe('Scroll Area Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render scroll area', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const scrollArea = container.querySelector('wc-scroll-area');
    expect(scrollArea).toBeDefined();
  });

  it('should render viewport', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const viewport = container.querySelector('wc-scroll-area-viewport');
    expect(viewport).toBeDefined();
    expect(viewport?.getAttribute('data-scroll-area-viewport')).toBe('');
  });

  it('should render scrollbar', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
        <wc-scroll-area-scrollbar orientation="vertical">
          <wc-scroll-area-thumb></wc-scroll-area-thumb>
        </wc-scroll-area-scrollbar>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const scrollbar = container.querySelector('wc-scroll-area-scrollbar');
    expect(scrollbar).toBeDefined();
    expect(scrollbar?.getAttribute('data-orientation')).toBe('vertical');
  });

  it('should render thumb', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
        <wc-scroll-area-scrollbar orientation="vertical">
          <wc-scroll-area-thumb></wc-scroll-area-thumb>
        </wc-scroll-area-scrollbar>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const thumb = container.querySelector('wc-scroll-area-thumb');
    expect(thumb).toBeDefined();
    expect(thumb?.getAttribute('data-scroll-area-thumb')).toBe('');
  });

  it('should render corner', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
        <wc-scroll-area-corner></wc-scroll-area-corner>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const corner = container.querySelector('wc-scroll-area-corner');
    expect(corner).toBeDefined();
    expect(corner?.getAttribute('data-scroll-area-corner')).toBe('');
  });

  it('should support different scroll types', async () => {
    container.innerHTML = `
      <wc-scroll-area type="always">
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const scrollArea = container.querySelector('wc-scroll-area');
    expect(scrollArea?.getAttribute('data-type')).toBe('always');
  });

  it('should support horizontal scrollbar', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
        <wc-scroll-area-scrollbar orientation="horizontal">
          <wc-scroll-area-thumb></wc-scroll-area-thumb>
        </wc-scroll-area-scrollbar>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const scrollbar = container.querySelector('wc-scroll-area-scrollbar');
    expect(scrollbar?.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('should update type dynamically', async () => {
    container.innerHTML = `
      <wc-scroll-area>
        <wc-scroll-area-viewport>Content</wc-scroll-area-viewport>
      </wc-scroll-area>
    `;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const scrollArea = container.querySelector('wc-scroll-area');
    scrollArea?.setAttribute('type', 'always');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(scrollArea?.getAttribute('data-type')).toBe('always');
  });
});
