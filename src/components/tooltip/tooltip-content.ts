import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { TooltipElement } from './tooltip.js';

/**
 * Tooltip Content Component
 * 
 * The content displayed when the tooltip is open.
 * 
 * @slot - Default slot for tooltip content
 * 
 * @example
 * ```html
 * <wc-tooltip-content>
 *   This is the tooltip content
 * </wc-tooltip-content>
 * ```
 */
@customElement('wc-tooltip-content')
export class TooltipContentElement extends PrimitiveElement {
  @property({ type: String })
  ariaLabel = '';

  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'tooltip');

    // Prevent tooltip from closing when hovering over content
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);

    this._updateAttributes();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('ariaLabel')) {
      this._updateAttributes();
    }
  }

  private _handleMouseEnter = () => {
    // Keep tooltip open when hovering over content
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      // Cancel any pending close timeout
      tooltip.openTooltip(0);
    }
  };

  private _handleMouseLeave = () => {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      tooltip.closeTooltip();
    }
  };

  private _updateAttributes() {
    if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }

    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip) {
      this.setAttribute('data-state', tooltip.open ? 'open' : 'closed');
      
      // Hide content when tooltip is closed
      if (!tooltip.open) {
        this.style.display = 'none';
        this.style.pointerEvents = 'none';
      } else {
        this.style.display = '';
        this.style.pointerEvents = 'auto';
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tooltip-content': TooltipContentElement;
  }
}
