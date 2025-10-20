import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Switch Component
 * 
 * A control that allows the user to toggle between checked and unchecked states.
 * 
 * @fires checked-change - Fires when the checked state changes
 * 
 * @slot - Default slot for switch content (usually thumb element)
 * 
 * @example
 * ```html
 * <wc-switch checked>
 *   <span class="thumb"></span>
 * </wc-switch>
 * ```
 */
@customElement('wc-switch')
export class SwitchElement extends PrimitiveElement {
  /**
   * The checked state of the switch.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * When true, prevents the user from interacting with the switch.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, the switch is required for form submission.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * The name of the switch for form submission.
   */
  @property({ type: String })
  name = '';

  /**
   * The value of the switch for form submission (default: "on").
   */
  @property({ type: String })
  value = 'on';

  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'switch');
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

    if (changedProperties.has('checked') || changedProperties.has('disabled') || changedProperties.has('required')) {
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
    this.checked = !this.checked;
  }

  private _handleClick = () => {
    this.toggle();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  private _updateState() {
    this.setAttribute('data-state', this.checked ? 'checked' : 'unchecked');
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');

    if (this.disabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }

    if (this.required) {
      this.setAttribute('aria-required', 'true');
    } else {
      this.removeAttribute('aria-required');
    }
  }

  private _notifyChange() {
    this.dispatchCustomEvent('checked-change', { checked: this.checked });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-switch': SwitchElement;
  }
}
