import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Item Component
 * 
 * An item in the select dropdown.
 * 
 * @slot - Default slot for item content
 * 
 * @example
 * ```html
 * <wc-select-item value="apple">
 *   <wc-select-item-text>Apple</wc-select-item-text>
 *   <wc-select-item-indicator>✓</wc-select-item-indicator>
 * </wc-select-item>
 * ```
 */
@customElement('wc-select-item')
export class SelectItemElement extends PrimitiveElement {
  /**
   * The value of the item.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from selecting this item.
   */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'option');
    this.setAttribute('data-select-item', '');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
    
    // Update selected state
    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('data-disabled');
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('value')) {
      this._updateState();
    }
  }

  private _handleClick = (e: MouseEvent) => {
    if (this.disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    this.dispatchEvent(
      new CustomEvent('select-item-click', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('select-item-click', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _updateState() {
    const select = this.closest('wc-select');
    if (select) {
      const isSelected = select.value === this.value;
      this.setAttribute('data-state', isSelected ? 'checked' : 'unchecked');
      this.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-item': SelectItemElement;
  }
}
