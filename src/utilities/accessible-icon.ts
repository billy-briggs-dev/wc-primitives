import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../primitive-element.js';

/**
 * Accessible Icon Component
 * 
 * Makes icon-only buttons accessible by providing a label for screen readers.
 * The icon is marked as aria-hidden and the label is visually hidden.
 * 
 * @slot - Default slot for the icon element
 * 
 * @example
 * ```html
 * <button>
 *   <wc-accessible-icon label="Close">
 *     <svg>...</svg>
 *   </wc-accessible-icon>
 * </button>
 * ```
 */
@customElement('wc-accessible-icon')
export class AccessibleIconElement extends PrimitiveElement {
  /**
   * The accessible label for the icon. This will be visually hidden
   * but available to screen readers.
   */
  @property({ type: String })
  label = '';

  override firstUpdated() {
    this._setupIcon();
  }

  private _setupIcon() {
    // Mark all child elements as decorative (hidden from screen readers)
    const children = Array.from(this.children);
    children.forEach((element) => {
      if (element.tagName.toLowerCase() !== 'span') {
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('focusable', 'false');
      }
    });
  }

  override render() {
    return html`
      <slot></slot>
      ${this.label
        ? html`<span
            style="
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            "
            >${this.label}</span
          >`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-accessible-icon': AccessibleIconElement;
  }
}
