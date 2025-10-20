import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Hover Card Root Component
 * 
 * A popup that displays rich content when the user hovers over or focuses on a trigger element.
 * Similar to tooltip but designed for richer content and allows interaction with the content.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for hover card content (trigger, content)
 * 
 * @example
 * ```html
 * <wc-hover-card>
 *   <wc-hover-card-trigger>Hover me</wc-hover-card-trigger>
 *   <wc-hover-card-content>Rich hover card content</wc-hover-card-content>
 * </wc-hover-card>
 * ```
 */
@customElement('wc-hover-card')
export class HoverCardElement extends PrimitiveElement {
  /**
   * The controlled open state of the hover card.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the hover card.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The delay in milliseconds before showing the hover card.
   */
  @property({ type: Number })
  openDelay = 700;

  /**
   * The delay in milliseconds before hiding the hover card.
   */
  @property({ type: Number })
  closeDelay = 300;

  private _openTimeout: ReturnType<typeof setTimeout> | null = null;
  private _closeTimeout: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.closeHoverCard();
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
  }

  /**
   * Open the hover card with optional delay
   */
  openHoverCard(delay?: number) {
    if (this.disabled) return;
    
    this._clearTimeouts();
    
    const delayMs = delay ?? this.openDelay;
    
    if (delayMs > 0) {
      this._openTimeout = setTimeout(() => {
        this._setOpen(true);
      }, delayMs);
    } else {
      this._setOpen(true);
    }
  }

  /**
   * Close the hover card with optional delay
   */
  closeHoverCard(delay?: number) {
    if (this.disabled) return;
    
    this._clearTimeouts();
    
    const delayMs = delay ?? this.closeDelay;
    
    if (delayMs > 0) {
      this._closeTimeout = setTimeout(() => {
        this._setOpen(false);
      }, delayMs);
    } else {
      this._setOpen(false);
    }
  }

  private _setOpen(value: boolean) {
    if (this.open !== value) {
      this.open = value;
    }
  }

  private _clearTimeouts() {
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
      this._openTimeout = null;
    }
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = null;
    }
  }

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-hover-card-trigger, wc-hover-card-content'
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
    'wc-hover-card': HoverCardElement;
  }
}
