import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Item Indicator Component
 * 
 * Renders when the item is selected. Typically contains a checkmark icon.
 * 
 * @slot - Default slot for indicator content (usually an icon)
 * 
 * @example
 * ```html
 * <wc-select-item-indicator>
 *   <svg>...</svg>
 * </wc-select-item-indicator>
 * ```
 */
@customElement('wc-select-item-indicator')
export class SelectItemIndicatorElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-select-item-indicator', '');
    this._updateVisibility();
  }

  private _updateVisibility() {
    const item = this.closest('wc-select-item');
    if (!item) return;

    const observer = new MutationObserver(() => {
      const isSelected = item.getAttribute('data-state') === 'checked';
      this.style.display = isSelected ? '' : 'none';
    });

    observer.observe(item, { attributes: true, attributeFilter: ['data-state'] });
    
    // Initial update
    const isSelected = item.getAttribute('data-state') === 'checked';
    this.style.display = isSelected ? '' : 'none';
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-item-indicator': SelectItemIndicatorElement;
  }
}
