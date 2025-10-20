import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Dialog Root Component
 * 
 * A modal dialog that overlays content and traps focus within it.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for dialog content (trigger, portal, etc.)
 * 
 * @example
 * ```html
 * <wc-dialog>
 *   <wc-dialog-trigger>Open Dialog</wc-dialog-trigger>
 *   <wc-dialog-portal>
 *     <wc-dialog-overlay />
 *     <wc-dialog-content>
 *       <wc-dialog-title>Dialog Title</wc-dialog-title>
 *       <wc-dialog-description>Dialog description</wc-dialog-description>
 *       <wc-dialog-close>Close</wc-dialog-close>
 *     </wc-dialog-content>
 *   </wc-dialog-portal>
 * </wc-dialog>
 * ```
 */
@customElement('wc-dialog')
export class DialogElement extends PrimitiveElement {
  /**
   * The controlled open state of the dialog.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the dialog.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When false, clicking outside or pressing escape won't close the dialog.
   */
  @property({ type: Boolean })
  modal = true;

  private _previousFocus: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'dialog');
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
   * Open the dialog
   */
  openDialog() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the dialog
   */
  closeDialog() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Toggle the dialog's open state
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
    // Focus management is handled by the dialog-content component
    const content = this.querySelector('wc-dialog-content');
    if (content) {
      setTimeout(() => {
        const focusable = content.querySelector('[autofocus]') || content;
        if (focusable && typeof (focusable as HTMLElement).focus === 'function') {
          (focusable as HTMLElement).focus();
        }
      }, 0);
    }
  }

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-dialog-trigger, wc-dialog-portal, wc-dialog-overlay, wc-dialog-content'
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
    'wc-dialog': DialogElement;
  }
}
