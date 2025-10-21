import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Trigger Component
 * 
 * The button that toggles the select dropdown.
 * 
 * @slot - Default slot for trigger content (usually contains select-value)
 * 
 * @example
 * ```html
 * <wc-select-trigger>
 *   <wc-select-value placeholder="Select..."></wc-select-value>
 * </wc-select-trigger>
 * ```
 */
@customElement('wc-select-trigger')
export class SelectTriggerElement extends PrimitiveElement {
  override connectedCallback() {
    super.connectedCallback();
    
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('aria-haspopup', 'listbox');
    
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
    
    // Update aria-expanded based on parent state
    this._updateAriaExpanded();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const select = this.closest('wc-select');
    if (select && !select.disabled) {
      this.dispatchEvent(
        new CustomEvent('select-trigger-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    const select = this.closest('wc-select');
    if (!select || select.disabled) return;

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('select-trigger-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _updateAriaExpanded() {
    const observer = new MutationObserver(() => {
      const select = this.closest('wc-select');
      if (select) {
        this.setAttribute('aria-expanded', select.open ? 'true' : 'false');
      }
    });

    const select = this.closest('wc-select');
    if (select) {
      observer.observe(select, { attributes: true, attributeFilter: ['data-state'] });
      this.setAttribute('aria-expanded', select.open ? 'true' : 'false');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select-trigger': SelectTriggerElement;
  }
}
