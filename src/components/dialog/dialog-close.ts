import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { DialogElement } from './dialog.js';

/**
 * Dialog Close Component
 * 
 * A button that closes the dialog.
 * 
 * @slot - Default slot for close button content
 * 
 * @example
 * ```html
 * <wc-dialog-close>Close</wc-dialog-close>
 * ```
 */
@customElement('wc-dialog-close')
export class DialogCloseElement extends PrimitiveElement {
  private _dialog: DialogElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-dialog');

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('type', 'button');

    // Add click handler
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    if (this._dialog) {
      this._dialog.closeDialog();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._dialog) {
        this._dialog.closeDialog();
      }
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dialog-close': DialogCloseElement;
  }
}
