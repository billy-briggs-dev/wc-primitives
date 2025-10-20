import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Avatar Root Component
 * 
 * An image element with a fallback for representing the user.
 * 
 * @slot - Default slot for avatar content (image and fallback)
 * 
 * @example
 * ```html
 * <wc-avatar>
 *   <wc-avatar-image src="..." alt="..." />
 *   <wc-avatar-fallback>AB</wc-avatar-fallback>
 * </wc-avatar>
 * ```
 */
@customElement('wc-avatar')
export class AvatarElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-component', 'avatar');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-avatar': AvatarElement;
  }
}
