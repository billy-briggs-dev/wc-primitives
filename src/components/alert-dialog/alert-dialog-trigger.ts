import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AlertDialogElement } from './alert-dialog.js';

/**
 * Alert Dialog Trigger Component
 * 
 * The button that opens the alert dialog.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-alert-dialog-trigger>Delete Account</wc-alert-dialog-trigger>
 * ```
 */
@customElement('wc-alert-dialog-trigger')
export class AlertDialogTriggerElement extends PrimitiveElement {
  private _dialog: AlertDialogElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-alert-dialog');

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('type', 'button');

    // Add click handler
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    // Update initial state
    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    if (this._dialog && !this._dialog.disabled) {
      this._dialog.toggleDialog();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._dialog && !this._dialog.disabled) {
        this._dialog.toggleDialog();
      }
    }
  };

  private _updateState() {
    if (!this._dialog) return;

    this.setAttribute('data-state', this._dialog.open ? 'open' : 'closed');
    this.setAttribute('aria-expanded', this._dialog.open ? 'true' : 'false');

    if (this._dialog.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }
  }

  override updated() {
    this._updateState();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-trigger': AlertDialogTriggerElement;
  }
}
