import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Toast Root Component
 * 
 * An individual toast notification element.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for toast content (title, description, action, close)
 * 
 * @example
 * ```html
 * <wc-toast open>
 *   <wc-toast-title>Success</wc-toast-title>
 *   <wc-toast-description>Your changes have been saved.</wc-toast-description>
 *   <wc-toast-close>Dismiss</wc-toast-close>
 * </wc-toast>
 * ```
 */
@customElement('wc-toast')
export class ToastElement extends PrimitiveElement {
  /**
   * The controlled open state of the toast.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The type/variant of the toast (for styling purposes).
   */
  @property({ type: String })
  type: 'foreground' | 'background' = 'foreground';

  /**
   * The duration in milliseconds before the toast automatically closes.
   * Set to 0 to disable auto-close.
   */
  @property({ type: Number })
  duration = 5000;

  @state()
  private _autoCloseTimer: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', this.type === 'foreground' ? 'assertive' : 'polite');
    this.setAttribute('aria-atomic', 'true');
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearAutoCloseTimer();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      
      if (this.open) {
        this._startAutoCloseTimer();
      } else {
        this._clearAutoCloseTimer();
      }
    }

    if (changedProperties.has('type')) {
      this.setAttribute('data-type', this.type);
      this.setAttribute('aria-live', this.type === 'foreground' ? 'assertive' : 'polite');
    }
  }

  /**
   * Open the toast
   */
  openToast() {
    this.open = true;
  }

  /**
   * Close the toast
   */
  closeToast() {
    this.open = false;
  }

  private _startAutoCloseTimer() {
    this._clearAutoCloseTimer();
    
    if (this.duration > 0) {
      this._autoCloseTimer = window.setTimeout(() => {
        this.closeToast();
      }, this.duration);
    }
  }

  private _clearAutoCloseTimer() {
    if (this._autoCloseTimer !== null) {
      clearTimeout(this._autoCloseTimer);
      this._autoCloseTimer = null;
    }
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
    'wc-toast': ToastElement;
  }
}
