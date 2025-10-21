import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Portal Component
 * 
 * Portals the select content to the body to escape overflow constraints.
 * 
 * @slot - Default slot for select content
 * 
 * @example
 * ```html
 * <wc-select-portal>
 *   <wc-select-content>...</wc-select-content>
 * </wc-select-portal>
 * ```
 */
@customElement('wc-select-portal')
export class SelectPortalElement extends PrimitiveElement {
  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-portal': SelectPortalElement;
  }
}
