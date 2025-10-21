import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Scroll Area Corner Component
 * 
 * The corner element at the intersection of horizontal and vertical scrollbars.
 * 
 * @example
 * ```html
 * <wc-scroll-area-corner></wc-scroll-area-corner>
 * ```
 */
@customElement('wc-scroll-area-corner')
export class ScrollAreaCornerElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-scroll-area-corner', '');
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-scroll-area-corner': ScrollAreaCornerElement;
  }
}
