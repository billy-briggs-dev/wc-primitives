import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Close Component
 * 
 * A button to close the toast.
 * 
 * @slot - Default slot for close button content
 * 
 * @example
 * ```html
 * <wc-toast-close>×</wc-toast-close>
 * ```
 */
@customElement('wc-toast-close')
export class ToastCloseElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-toast-close', '');
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', 'Close');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    this._closeToast();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._closeToast();
    }
  };

  private _closeToast() {
    const toast = this.closest('wc-toast') as any;
    if (toast && typeof toast.closeToast === 'function') {
      toast.closeToast();
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-close': ToastCloseElement;
  }
}
