import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './separator.js';

describe('Separator Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render', async () => {
    container.innerHTML = `<wc-separator></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator).toBeDefined();
  });

  it('should have separator role by default', async () => {
    container.innerHTML = `<wc-separator></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator?.getAttribute('role')).toBe('separator');
  });

  it('should have horizontal orientation by default', async () => {
    container.innerHTML = `<wc-separator></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator?.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('should support vertical orientation', async () => {
    container.innerHTML = `<wc-separator orientation="vertical"></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator?.getAttribute('data-orientation')).toBe('vertical');
    expect(separator?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should not have aria-orientation for horizontal', async () => {
    container.innerHTML = `<wc-separator orientation="horizontal"></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator?.getAttribute('aria-orientation')).toBeNull();
  });

  it('should support decorative mode', async () => {
    container.innerHTML = `<wc-separator decorative></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator');
    expect(separator?.getAttribute('role')).toBe('none');
    expect(separator?.getAttribute('aria-orientation')).toBeNull();
  });

  it('should update orientation dynamically', async () => {
    container.innerHTML = `<wc-separator></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator') as any;
    separator.orientation = 'vertical';
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(separator?.getAttribute('data-orientation')).toBe('vertical');
    expect(separator?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should update decorative mode dynamically', async () => {
    container.innerHTML = `<wc-separator></wc-separator>`;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const separator = container.querySelector('wc-separator') as any;
    expect(separator?.getAttribute('role')).toBe('separator');
    
    separator.decorative = true;
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(separator?.getAttribute('role')).toBe('none');
    expect(separator?.getAttribute('aria-orientation')).toBeNull();
  });
});
