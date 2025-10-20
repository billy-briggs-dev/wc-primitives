import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Alert Dialog Root Component
 * 
 * A modal dialog that interrupts the user with important content and expects a response.
 * Alert dialogs are more restrictive than regular dialogs and are typically used for
 * confirmations or destructive actions.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for alert dialog content (trigger, portal, etc.)
 * 
 * @example
 * ```html
 * <wc-alert-dialog>
 *   <wc-alert-dialog-trigger>Delete Account</wc-alert-dialog-trigger>
 *   <wc-alert-dialog-portal>
 *     <wc-alert-dialog-overlay />
 *     <wc-alert-dialog-content>
 *       <wc-alert-dialog-title>Are you sure?</wc-alert-dialog-title>
 *       <wc-alert-dialog-description>
 *         This action cannot be undone. This will permanently delete your account.
 *       </wc-alert-dialog-description>
 *       <wc-alert-dialog-cancel>Cancel</wc-alert-dialog-cancel>
 *       <wc-alert-dialog-action>Delete</wc-alert-dialog-action>
 *     </wc-alert-dialog-content>
 *   </wc-alert-dialog-portal>
 * </wc-alert-dialog>
 * ```
 */
@customElement('wc-alert-dialog')
export class AlertDialogElement extends PrimitiveElement {
  /**
   * The controlled open state of the alert dialog.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the alert dialog.
   */
  @property({ type: Boolean })
  disabled = false;

  private _previousFocus: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    // Don't set role on root - role should only be on content
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();
      
      if (this.open) {
        this._handleDialogOpen();
      } else {
        this._handleDialogClose();
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  /**
   * Open the alert dialog
   */
  openDialog() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the alert dialog
   */
  closeDialog() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Toggle the alert dialog's open state
   */
  toggleDialog() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _handleDialogOpen() {
    // Store the element that triggered the dialog for focus return
    if (document.activeElement) {
      this._previousFocus = document.activeElement;
    }

    // Trap focus in the dialog
    this._trapFocus();
  }

  private _handleDialogClose() {
    // Return focus to the trigger element
    const previousFocus = this._previousFocus;
    if (previousFocus && typeof (previousFocus as HTMLElement).focus === 'function') {
      (previousFocus as HTMLElement).focus();
    }
    this._previousFocus = null;
  }

  private _trapFocus() {
    // Focus management is handled by the alert-dialog-content component
    const content = this.querySelector('wc-alert-dialog-content');
    if (content) {
      requestAnimationFrame(() => {
        const focusable = content.querySelector('[autofocus]') || content;
        if (focusable && typeof (focusable as HTMLElement).focus === 'function') {
          (focusable as HTMLElement).focus();
        }
      });
    }
  }

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-alert-dialog-trigger, wc-alert-dialog-portal, wc-alert-dialog-overlay, wc-alert-dialog-content'
    );
    children.forEach((child) => {
      if ('requestUpdate' in child && typeof child.requestUpdate === 'function') {
        child.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('open-change', { open: this.open });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert-dialog': AlertDialogElement;
  }
}
