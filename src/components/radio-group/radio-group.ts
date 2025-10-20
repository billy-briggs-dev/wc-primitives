import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Radio Group Component
 * 
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 * 
 * @fires value-change - Fires when the selected value changes
 * 
 * @slot - Default slot for radio group items
 * 
 * @example
 * ```html
 * <wc-radio-group value="option1">
 *   <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
 *   <wc-radio-group-item value="option2">Option 2</wc-radio-group-item>
 * </wc-radio-group>
 * ```
 */
@customElement('wc-radio-group')
export class RadioGroupElement extends PrimitiveElement {
  /**
   * The controlled selected value.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the radio group.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The name of the radio group (for form submission).
   */
  @property({ type: String })
  name = '';

  /**
   * When true, the radio group is required for form submission.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * The orientation of the radio group.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'vertical';

  @state()
  private _selectedValue = '';

  override connectedCallback() {
    super.connectedCallback();
    this._selectedValue = this.value;
    this.setAttribute('role', 'radiogroup');
    this.setAttribute('data-orientation', this.orientation);

    // Add keyboard navigation
    this.addEventListener('keydown', this._handleKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._selectedValue = this.value;
      this._updateChildItems();
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('data-disabled');
        this.removeAttribute('aria-disabled');
      }
      this._updateChildItems();
    }

    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
    }

    if (changedProperties.has('required')) {
      if (this.required) {
        this.setAttribute('aria-required', 'true');
      } else {
        this.removeAttribute('aria-required');
      }
    }
  }

  /**
   * Set the selected value
   */
  setValue(value: string) {
    if (this.disabled) return;
    this._selectedValue = value;
    this.value = value;
    this.requestUpdate();
    this._notifyChange();
    this._updateChildItems();
  }

  /**
   * Check if a value is selected
   */
  isValueSelected(value: string): boolean {
    return this._selectedValue === value;
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const items = Array.from(this.querySelectorAll('wc-radio-group-item')) as HTMLElement[];
    const enabledItems = items.filter(
      item => !item.hasAttribute('disabled') && !item.hasAttribute('data-disabled')
    );

    if (enabledItems.length === 0) return;

    const currentIndex = enabledItems.findIndex(
      item => item === document.activeElement || item.contains(document.activeElement)
    );

    let nextIndex = currentIndex;

    const isHorizontal = this.orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    if (e.key === nextKey) {
      e.preventDefault();
      nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % enabledItems.length;
    } else if (e.key === prevKey) {
      e.preventDefault();
      nextIndex =
        currentIndex === -1
          ? enabledItems.length - 1
          : (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabledItems.length - 1;
    } else {
      return;
    }

    const nextItem = enabledItems[nextIndex];
    if (nextItem) {
      nextItem.focus();
      // Auto-select on navigation (standard radio behavior)
      const value = nextItem.getAttribute('value');
      if (value) {
        this.setValue(value);
      }
    }
  };

  private _updateChildItems() {
    const items = this.querySelectorAll('wc-radio-group-item');
    items.forEach((item) => {
      if ('requestUpdate' in item && typeof item.requestUpdate === 'function') {
        item.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('value-change', { value: this.value });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-radio-group': RadioGroupElement;
  }
}
