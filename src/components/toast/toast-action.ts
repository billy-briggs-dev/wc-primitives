import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Action Component
 * 
 * An action button within the toast.
 * 
 * @slot - Default slot for action button content
 * 
 * @example
 * ```html
 * <wc-toast-action>Undo</wc-toast-action>
 * ```
 */
@customElement('wc-toast-action')
export class ToastActionElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-toast-action', '');
    this.setAttribute('role', 'button');
    
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
    // Don't automatically close on action click
    // Let the consumer decide
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-toast-action': ToastActionElement;
  }
}
