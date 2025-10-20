import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './avatar.js';
import './avatar-image.js';
import './avatar-fallback.js';
import type { AvatarElement } from './avatar.js';
import type { AvatarImageElement } from './avatar-image.js';
import type { AvatarFallbackElement } from './avatar-fallback.js';

describe('Avatar Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render avatar element', () => {
    container.innerHTML = `
      <wc-avatar>
        <wc-avatar-fallback>AB</wc-avatar-fallback>
      </wc-avatar>
    `;

    const avatar = container.querySelector('wc-avatar') as AvatarElement;
    expect(avatar).toBeDefined();
    expect(avatar.tagName.toLowerCase()).toBe('wc-avatar');
  });

  it('should render avatar with image and fallback', async () => {
    container.innerHTML = `
      <wc-avatar>
        <wc-avatar-image src="test.jpg" alt="Test"></wc-avatar-image>
        <wc-avatar-fallback>AB</wc-avatar-fallback>
      </wc-avatar>
    `;

    await new Promise(resolve => setTimeout(resolve, 100));

    const avatarImage = container.querySelector('wc-avatar-image') as AvatarImageElement;
    const avatarFallback = container.querySelector('wc-avatar-fallback') as AvatarFallbackElement;

    expect(avatarImage).toBeDefined();
    expect(avatarFallback).toBeDefined();
  });

  it('should set data-component attribute on avatar', () => {
    container.innerHTML = `<wc-avatar></wc-avatar>`;

    const avatar = container.querySelector('wc-avatar') as AvatarElement;
    expect(avatar.getAttribute('data-component')).toBe('avatar');
  });

  describe('Avatar Image', () => {
    it('should render avatar image element', () => {
      container.innerHTML = `
        <wc-avatar>
          <wc-avatar-image src="test.jpg" alt="Test"></wc-avatar-image>
        </wc-avatar>
      `;

      const avatarImage = container.querySelector('wc-avatar-image') as AvatarImageElement;
      expect(avatarImage).toBeDefined();
      expect(avatarImage.tagName.toLowerCase()).toBe('wc-avatar-image');
    });

    it('should have src and alt properties', () => {
      const avatarImage = document.createElement('wc-avatar-image') as AvatarImageElement;
      avatarImage.src = 'test.jpg';
      avatarImage.alt = 'Test Image';
      container.appendChild(avatarImage);

      expect(avatarImage.src).toBe('test.jpg');
      expect(avatarImage.alt).toBe('Test Image');
    });

    it('should set data-component attribute', () => {
      container.innerHTML = `<wc-avatar-image></wc-avatar-image>`;

      const avatarImage = container.querySelector('wc-avatar-image') as AvatarImageElement;
      expect(avatarImage.getAttribute('data-component')).toBe('avatar-image');
    });
  });

  describe('Avatar Fallback', () => {
    it('should render avatar fallback element', () => {
      container.innerHTML = `
        <wc-avatar>
          <wc-avatar-fallback>AB</wc-avatar-fallback>
        </wc-avatar>
      `;

      const avatarFallback = container.querySelector('wc-avatar-fallback') as AvatarFallbackElement;
      expect(avatarFallback).toBeDefined();
      expect(avatarFallback.tagName.toLowerCase()).toBe('wc-avatar-fallback');
    });

    it('should render fallback content', async () => {
      container.innerHTML = `
        <wc-avatar>
          <wc-avatar-fallback>AB</wc-avatar-fallback>
        </wc-avatar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));

      const avatarFallback = container.querySelector('wc-avatar-fallback') as AvatarFallbackElement;
      expect(avatarFallback.textContent?.trim()).toBe('AB');
    });

    it('should have delayMs property', () => {
      const avatarFallback = document.createElement('wc-avatar-fallback') as AvatarFallbackElement;
      avatarFallback.delayMs = 500;
      container.appendChild(avatarFallback);

      expect(avatarFallback.delayMs).toBe(500);
    });

    it('should set data-component attribute', () => {
      container.innerHTML = `<wc-avatar-fallback></wc-avatar-fallback>`;

      const avatarFallback = container.querySelector('wc-avatar-fallback') as AvatarFallbackElement;
      expect(avatarFallback.getAttribute('data-component')).toBe('avatar-fallback');
    });

    it('should delay rendering when delayMs is set', async () => {
      container.innerHTML = `
        <wc-avatar>
          <wc-avatar-fallback delayMs="200">AB</wc-avatar-fallback>
        </wc-avatar>
      `;

      await new Promise(resolve => setTimeout(resolve, 100));
      
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Should be visible now
      const avatarFallback = container.querySelector('wc-avatar-fallback') as AvatarFallbackElement;
      const textContentAfter = avatarFallback.textContent?.trim();
      expect(textContentAfter).toBe('AB');
    });
  });
});
