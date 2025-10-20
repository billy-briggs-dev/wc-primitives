import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Checkbox Component
 * 
 * A control that allows the user to toggle between checked and not checked.
 * Supports three states: checked, unchecked, and indeterminate.
 * 
 * @fires checked-change - Fires when the checked state changes
 * 
 * @slot - Default slot for checkbox content (typically a visual indicator)
 * 
 * @example
 * ```html
 * <wc-checkbox checked>Accept terms</wc-checkbox>
 * ```
 */
@customElement('wc-checkbox')
export class CheckboxElement extends PrimitiveElement {
  /**
   * The controlled checked state of the checkbox.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The indeterminate state of the checkbox.
   * This is useful for parent checkboxes that control child checkboxes.
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * When true, prevents the user from interacting with the checkbox.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, the checkbox must be checked for the form to be submitted.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * The name of the checkbox when used in a form.
   */
  @property({ type: String })
  name = '';

  /**
   * The value of the checkbox when used in a form.
   */
  @property({ type: String })
  value = 'on';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'checkbox');
    this.setAttribute('type', 'button');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
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

    if (
      changedProperties.has('checked') ||
      changedProperties.has('indeterminate') ||
      changedProperties.has('disabled')
    ) {
      this._updateState();
      if (changedProperties.has('checked')) {
        this._notifyChange();
      }
    }
  }

  /**
   * Toggle the checked state
   */
  toggle() {
    if (this.disabled) return;
    
    // If indeterminate, the first toggle should set to checked
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
  }

  private _handleClick = () => {
    this.toggle();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  private _updateState() {
    // Update ARIA attributes
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
      this.setAttribute('data-state', 'indeterminate');
    } else {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.setAttribute('data-state', this.checked ? 'checked' : 'unchecked');
    }

    // Update disabled state
    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }

    // Update required attribute
    if (this.required) {
      this.setAttribute('aria-required', 'true');
    } else {
      this.removeAttribute('aria-required');
    }
  }

  private _notifyChange() {
    this.dispatchCustomEvent('checked-change', { 
      checked: this.checked,
      indeterminate: this.indeterminate 
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-checkbox': CheckboxElement;
  }
}
