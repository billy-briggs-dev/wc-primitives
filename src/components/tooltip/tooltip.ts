import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Tooltip Root Component
 * 
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for tooltip content (trigger, content)
 * 
 * @example
 * ```html
 * <wc-tooltip>
 *   <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
 *   <wc-tooltip-content>Tooltip content</wc-tooltip-content>
 * </wc-tooltip>
 * ```
 */
@customElement('wc-tooltip')
export class TooltipElement extends PrimitiveElement {
  /**
   * The controlled open state of the tooltip.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the tooltip.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The delay in milliseconds before showing the tooltip.
   */
  @property({ type: Number })
  delayDuration = 700;

  /**
   * Whether to skip the delay when moving between tooltips.
   */
  @property({ type: Boolean })
  skipDelayDuration = 300;

  private _openTimeout: ReturnType<typeof setTimeout> | null = null;
  private _closeTimeout: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tooltip');
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
        this.closeTooltip();
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
   * Open the tooltip with optional delay
   */
  openTooltip(delay?: number) {
    if (this.disabled) return;
    
    this._clearTimeouts();
    
    const delayMs = delay ?? this.delayDuration;
    
    if (delayMs > 0) {
      this._openTimeout = setTimeout(() => {
        this._setOpen(true);
      }, delayMs);
    } else {
      this._setOpen(true);
    }
  }

  /**
   * Close the tooltip with optional delay
   */
  closeTooltip(delay?: number) {
    if (this.disabled) return;
    
    this._clearTimeouts();
    
    if (delay && delay > 0) {
      this._closeTimeout = setTimeout(() => {
        this._setOpen(false);
      }, delay);
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
      'wc-tooltip-trigger, wc-tooltip-content'
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
    'wc-tooltip': TooltipElement;
  }
}
