import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Provider Component
 * 
 * The provider component that manages toast state and provides context to toast elements.
 * 
 * @slot - Default slot for viewport and other content
 * 
 * @example
 * ```html
 * <wc-toast-provider>
 *   <wc-toast-viewport></wc-toast-viewport>
 * </wc-toast-provider>
 * ```
 */
@customElement('wc-toast-provider')
export class ToastProviderElement extends PrimitiveElement {
  /**
   * The time in milliseconds before a toast automatically closes (default: 5000).
   */
  @property({ type: Number })
  duration = 5000;

  /**
   * The maximum number of toasts that can be displayed at once.
   */
  @property({ type: Number })
  swipeThreshold = 50;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-toast-provider', '');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-provider': ToastProviderElement;
  }
}
