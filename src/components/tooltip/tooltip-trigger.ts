import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { TooltipElement } from './tooltip.js';

/**
 * Tooltip Trigger Component
 * 
 * The element that triggers the tooltip on hover or focus.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-tooltip-trigger>Hover me</wc-tooltip-trigger>
 * ```
 */
@customElement('wc-tooltip-trigger')
export class TooltipTriggerElement extends PrimitiveElement {
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._contentId = this.generateId('tooltip-content');

    this.setAttribute('tabindex', '0');

    // Add event listeners
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
    this.addEventListener('focus', this._handleFocus);
    this.addEventListener('blur', this._handleBlur);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('blur', this._handleBlur);
  }

  private _handleMouseEnter = () => {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      tooltip.openTooltip();
    }
  };

  private _handleMouseLeave = () => {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      tooltip.closeTooltip();
    }
  };

  private _handleFocus = () => {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      tooltip.openTooltip(0); // No delay on focus
    }
  };

  private _handleBlur = () => {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (tooltip && !tooltip.disabled) {
      tooltip.closeTooltip();
    }
  };

  private _updateState() {
    const tooltip = this.closest('wc-tooltip') as TooltipElement | null;
    if (!tooltip) return;

    this.setAttribute('data-state', tooltip.open ? 'open' : 'closed');
    this.setAttribute('aria-describedby', this._contentId);

    if (tooltip.disabled) {
      this.setAttribute('data-disabled', '');
    } else {
      this.removeAttribute('data-disabled');
    }

    // Update the content with the ID
    const content = tooltip.querySelector('wc-tooltip-content');
    if (content) {
      content.setAttribute('id', this._contentId);
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
    'wc-tooltip-trigger': TooltipTriggerElement;
  }
}
