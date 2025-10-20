import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { RadioGroupElement } from './radio-group.js';

/**
 * Radio Group Item Component
 * 
 * An individual radio button within a radio group.
 * Must be used within a wc-radio-group component.
 * 
 * @slot - Default slot for radio button content
 * 
 * @example
 * ```html
 * <wc-radio-group>
 *   <wc-radio-group-item value="option1">Option 1</wc-radio-group-item>
 * </wc-radio-group>
 * ```
 */
@customElement('wc-radio-group-item')
export class RadioGroupItemElement extends PrimitiveElement {
  /**
   * The value of this radio item.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the radio item.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, the radio item is required (inherits from group).
   */
  @property({ type: Boolean })
  required = false;

  private _radioGroup: RadioGroupElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._radioGroup = this.closest('wc-radio-group') as RadioGroupElement;

    this.setAttribute('role', 'radio');

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }

    // Add event listeners
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled') || changedProperties.has('value')) {
      this._updateState();
    }
  }

  /**
   * Select this radio item
   */
  select() {
    if (this.disabled || !this._radioGroup || this._radioGroup.disabled) return;
    this._radioGroup.setValue(this.value);
  }

  private _handleClick = () => {
    this.select();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    // Space key to select
    if (e.key === ' ') {
      e.preventDefault();
      this.select();
    }
    // Arrow keys handled by parent group
  };

  private _updateState() {
    const isChecked = this._radioGroup?.isValueSelected(this.value) ?? false;
    const isDisabled = this.disabled || this._radioGroup?.disabled || false;

    this.setAttribute('aria-checked', isChecked ? 'true' : 'false');
    this.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');

    if (isDisabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      // Only the checked item or first item should be focusable
      if (isChecked) {
        this.setAttribute('tabindex', '0');
      } else {
        // Check if this is the first enabled item
        const items = this._radioGroup?.querySelectorAll('wc-radio-group-item');
        const firstEnabledItem = Array.from(items || []).find(
          item => !item.hasAttribute('disabled') && !item.hasAttribute('data-disabled')
        );
        if (firstEnabledItem === this && !this._radioGroup?.value) {
          this.setAttribute('tabindex', '0');
        } else {
          this.setAttribute('tabindex', '-1');
        }
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-radio-group-item': RadioGroupItemElement;
  }
}
