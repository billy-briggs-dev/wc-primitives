import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dialog Content Component
 * 
 * Contains the dialog content and handles accessibility attributes.
 * 
 * @slot - Default slot for dialog content
 * 
 * @example
 * ```html
 * <wc-dialog-content>
 *   <wc-dialog-title>Title</wc-dialog-title>
 *   <wc-dialog-description>Description</wc-dialog-description>
 *   <!-- other content -->
 * </wc-dialog-content>
 * ```
 */
@customElement('wc-dialog-content')
export class DialogContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = '';

  private _dialog: any = null;
  private _titleId = '';
  private _descriptionId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._dialog = this.closest('wc-dialog');
    this._titleId = this.generateId('dialog-title');
    this._descriptionId = this.generateId('dialog-description');

    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('tabindex', '-1');

    // Add escape key handler
    this.addEventListener('keydown', this._handleKeydown);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('ariaLabel')) {
      this._updateAttributes();
    }
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._dialog?.modal) {
      e.preventDefault();
      this._dialog.closeDialog();
    }
  };

  private _updateAttributes() {
    // Set aria-labelledby if title exists, otherwise use aria-label
    const title = this.querySelector('wc-dialog-title');
    const description = this.querySelector('wc-dialog-description');

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
    'wc-dialog-content': DialogContentElement;
  }
}
