import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { AlertDialogElement } from './alert-dialog.js';

/**
 * Alert Dialog Content Component
 * 
 * Contains the alert dialog content and handles accessibility attributes.
 * Alert dialogs cannot be dismissed by clicking outside or pressing Escape,
 * requiring explicit user action through Cancel or Action buttons.
 * 
 * @slot - Default slot for alert dialog content
 * 
 * @example
 * ```html
 * <wc-alert-dialog-content>
 *   <wc-alert-dialog-title>Title</wc-alert-dialog-title>
 *   <wc-alert-dialog-description>Description</wc-alert-dialog-description>
 *   <!-- action buttons -->
 * </wc-alert-dialog-content>
 * ```
 */
@customElement('wc-alert-dialog-content')
export class AlertDialogContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = '';

  private _dialog: AlertDialogElement | null = null;
  private _titleId = '';
  private _descriptionId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-alert-dialog');
    this._titleId = this.generateId('alert-dialog-title');
    this._descriptionId = this.generateId('alert-dialog-description');

    this.setAttribute('role', 'alertdialog');
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('tabindex', '-1');

    this._updateAttributes();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('ariaLabel')) {
      this._updateAttributes();
    }
  }

  private _updateAttributes() {
    // Set aria-labelledby if title exists, otherwise use aria-label
    const title = this.querySelector('wc-alert-dialog-title');
    const description = this.querySelector('wc-alert-dialog-description');

    if (title) {
      this.setAttribute('aria-labelledby', this._titleId);
      title.setAttribute('id', this._titleId);
    } else if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }

    if (description) {
      this.setAttribute('aria-describedby', this._descriptionId);
      description.setAttribute('id', this._descriptionId);
    }

    if (this._dialog) {
      this.setAttribute('data-state', this._dialog.open ? 'open' : 'closed');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog-content': AlertDialogContentElement;
  }
}
