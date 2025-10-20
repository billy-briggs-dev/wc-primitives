import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../primitive-element.js';

/**
 * Visually Hidden Component
 * 
 * Hides content from view but keeps it accessible to screen readers.
 * Useful for providing additional context to assistive technologies.
 * 
 * @slot - Default slot for content to be visually hidden
 * 
 * @example
 * ```html
 * <wc-visually-hidden>
 *   Additional context for screen readers
 * </wc-visually-hidden>
 * ```
 */
@customElement('wc-visually-hidden')
export class VisuallyHiddenElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this._applyStyles();
  }

  private _applyStyles() {
    // Apply visually hidden styles directly to the element
    const style = this.style;
    style.position = 'absolute';
    style.width = '1px';
    style.height = '1px';
    style.padding = '0';
    style.margin = '-1px';
    style.overflow = 'hidden';
    style.clip = 'rect(0, 0, 0, 0)';
    style.whiteSpace = 'nowrap';
    style.borderWidth = '0';
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-visually-hidden': VisuallyHiddenElement;
  }
}
