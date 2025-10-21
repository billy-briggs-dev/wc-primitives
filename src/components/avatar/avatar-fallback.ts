import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Avatar Fallback Component
 * 
 * An element that renders when the image hasn't loaded. This means it will render while the image is loading
 * and also if there was an error loading the image.
 * 
 * @slot - Default slot for fallback content (typically initials)
 * 
 * @example
 * ```html
 * <wc-avatar>
 *   <wc-avatar-image src="..." alt="..." />
 *   <wc-avatar-fallback>AB</wc-avatar-fallback>
 * </wc-avatar>
 * ```
 */
@customElement('wc-avatar-fallback')
export class AvatarFallbackElement extends PrimitiveElement {
  /**
   * Useful for delaying rendering so it only appears for those with slower internet connections.
   * Duration in milliseconds.
   */
  @property({ type: Number })
  delayMs = 0;

  @state()
  private _canRender = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-component', 'avatar-fallback');
    
    // Check if there's an avatar-image sibling
    this._checkSiblingImage();
  }

  private _checkSiblingImage() {
    const parent = this.parentElement;
    if (!parent) {
      this._scheduleRender();
      return;
    }

    const avatarImage = parent.querySelector('wc-avatar-image');
    if (!avatarImage) {
      // No image, render immediately (after delay if specified)
      this._scheduleRender();
      return;
    }

    // Listen for image load/error events
    const handleLoad = () => {
      this._canRender = false; // Hide fallback when image loads
      this.requestUpdate();
    };

    const handleError = () => {
      this._scheduleRender(); // Show fallback on error
    };

    avatarImage.addEventListener('load', handleLoad);
    avatarImage.addEventListener('error', handleError);

    // Initially show fallback (will be hidden if image loads)
    this._scheduleRender();
  }

  private _scheduleRender() {
    if (this.delayMs > 0) {
      setTimeout(() => {
        this._canRender = true;
      }, this.delayMs);
    } else {
      this._canRender = true;
    }
  }

  override render() {
    if (!this._canRender) {
      return html``;
    }

    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-avatar-fallback': AvatarFallbackElement;
  }
}
