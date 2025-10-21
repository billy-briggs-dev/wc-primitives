import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { SelectElement } from './select.js';

/**
 * Select Value Component
 * 
 * Displays the currently selected value or a placeholder.
 * 
 * @example
 * ```html
 * <wc-select-value placeholder="Select an option..."></wc-select-value>
 * ```
 */
@customElement('wc-select-value')
export class SelectValueElement extends PrimitiveElement {
  /**
   * The placeholder text to display when no value is selected.
   */
  @property({ type: String })
  placeholder = '';

  override connectedCallback() {
    super.connectedCallback();
    this._updateValue();
    
    // Listen for value changes from parent
    const select = this.closest('wc-select');
    if (select) {
      select.addEventListener('value-change', this._handleValueChange);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    const select = this.closest('wc-select');
    if (select) {
      select.removeEventListener('value-change', this._handleValueChange);
    }
  }

  private _handleValueChange = () => {
    this._updateValue();
  };

  private _updateValue() {
    const select = this.closest('wc-select') as SelectElement | null;
    if (!select) return;

    const selectedLabel = select.getSelectedLabel();
    
    if (selectedLabel) {
      this.textContent = selectedLabel;
      this.removeAttribute('data-placeholder');
    } else {
      this.textContent = this.placeholder;
      this.setAttribute('data-placeholder', '');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-value': SelectValueElement;
  }
}
