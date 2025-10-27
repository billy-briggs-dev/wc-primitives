import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Viewport Component
 * 
 * The container that displays toasts. Should be placed inside the toast provider.
 * 
 * @slot - Default slot for toast elements
 * 
 * @example
 * ```html
 * <wc-toast-viewport></wc-toast-viewport>
 * ```
 */
@customElement('wc-toast-viewport')
export class ToastViewportElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-toast-viewport', '');
    this.setAttribute('role', 'region');
    this.setAttribute('aria-live', 'polite');
    this.setAttribute('aria-label', 'Notifications');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-viewport': ToastViewportElement;
  }
}
