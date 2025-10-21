import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Icon Component
 * 
 * An optional icon for the select trigger (typically a chevron).
 * 
 * @slot - Default slot for the icon
 * 
 * @example
 * ```html
 * <wc-select-icon>
 *   <svg>...</svg>
 * </wc-select-icon>
 * ```
 */
@customElement('wc-select-icon')
export class SelectIconElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-hidden', 'true');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-icon': SelectIconElement;
  }
}
