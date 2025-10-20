import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Title Component
 * 
 * The title of the toast notification.
 * 
 * @slot - Default slot for title content
 * 
 * @example
 * ```html
 * <wc-toast-title>Success</wc-toast-title>
 * ```
 */
@customElement('wc-toast-title')
export class ToastTitleElement extends PrimitiveElement {
  private _titleId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._titleId = this.generateId('toast-title');
    this.setAttribute('id', this._titleId);
    this.setAttribute('data-toast-title', '');

    // Notify parent toast about this title
    this._notifyParent();
  }

  private _notifyParent() {
    const toast = this.closest('wc-toast');
    if (toast) {
      toast.setAttribute('aria-labelledby', this._titleId);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-title': ToastTitleElement;
  }
}
