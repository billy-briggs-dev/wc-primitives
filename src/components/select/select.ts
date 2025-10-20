import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Select Root Component
 * 
 * A dropdown select component that allows users to pick a value from a list of options.
 * 
 * @fires value-change - Fires when the selected value changes
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for select components (trigger, content, etc.)
 * 
 * @example
 * ```html
 * <wc-select value="apple">
 *   <wc-select-trigger>
 *     <wc-select-value placeholder="Select a fruit..."></wc-select-value>
 *   </wc-select-trigger>
 *   <wc-select-portal>
 *     <wc-select-content>
 *       <wc-select-viewport>
 *         <wc-select-item value="apple">Apple</wc-select-item>
 *         <wc-select-item value="banana">Banana</wc-select-item>
 *         <wc-select-item value="orange">Orange</wc-select-item>
 *       </wc-select-viewport>
 *     </wc-select-content>
 *   </wc-select-portal>
 * </wc-select>
 * ```
 */
@customElement('wc-select')
export class SelectElement extends PrimitiveElement {
  /**
   * The controlled open state of the select.
   */
  @property({ type: Boolean })
  open = false;

  /**
   * The value of the currently selected item.
   */
  @property({ type: String })
  value = '';

  /**
   * The name attribute for form submission.
   */
  @property({ type: String })
  name = '';

  /**
   * When true, prevents the user from interacting with the select.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, the user must select a value before submitting a form.
   */
  @property({ type: Boolean })
  required = false;

  @state()
  private _selectedLabel = '';

  private _triggerElement?: HTMLElement;
  private _contentElement?: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-select-root', '');
    
    // Listen for item selection
    this.addEventListener('select-item-click', this._handleItemClick as EventListener);
    
    // Listen for trigger click
    this.addEventListener('select-trigger-click', this._handleTriggerClick as EventListener);
    
    // Close on outside click
    document.addEventListener('click', this._handleOutsideClick);
    
    // Close on escape
    document.addEventListener('keydown', this._handleEscape);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('select-item-click', this._handleItemClick as EventListener);
    this.removeEventListener('select-trigger-click', this._handleTriggerClick as EventListener);
    document.removeEventListener('click', this._handleOutsideClick);
    document.removeEventListener('keydown', this._handleEscape);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      if (changedProperties.has('open')) {
        this._notifyOpenChange();
      }
      
      // Update content visibility
      const content = this.querySelector('wc-select-content');
      if (content) {
        if (this.open) {
          content.setAttribute('data-state', 'open');
        } else {
          content.setAttribute('data-state', 'closed');
        }
      }
    }

    if (changedProperties.has('value')) {
      this._updateSelectedLabel();
      if (changedProperties.has('value')) {
        this._notifyValueChange();
      }
    }
  }

  /**
   * Open the select dropdown.
   */
  openSelect() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the select dropdown.
   */
  closeSelect() {
    this.open = false;
  }

  /**
   * Toggle the select dropdown.
   */
  toggleSelect() {
    if (this.open) {
      this.closeSelect();
    } else {
      this.openSelect();
    }
  }

  /**
   * Set the selected value.
   */
  setValue(value: string) {
    if (this.disabled) return;
    this.value = value;
    this.closeSelect();
  }

  /**
   * Get the label for the currently selected item.
   */
  getSelectedLabel(): string {
    return this._selectedLabel;
  }

  private _handleItemClick = (e: CustomEvent) => {
    const { value } = e.detail;
    this.setValue(value);
  };

  private _handleTriggerClick = () => {
    this.toggleSelect();
  };

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.open) return;
    
    const target = e.target as Node;
    if (!this.contains(target)) {
      this.closeSelect();
    }
  };

  private _handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.closeSelect();
      
      // Return focus to trigger
      const trigger = this.querySelector('wc-select-trigger') as HTMLElement;
      if (trigger) {
        trigger.focus();
      }
    }
  };

  private _updateSelectedLabel() {
    const items = this.querySelectorAll('wc-select-item');
    items.forEach(item => {
      const itemValue = item.getAttribute('value');
      if (itemValue === this.value) {
        this._selectedLabel = item.textContent?.trim() || '';
        item.setAttribute('data-state', 'checked');
      } else {
        item.setAttribute('data-state', 'unchecked');
      }
    });
  }

  private _notifyValueChange() {
    this.dispatchCustomEvent('value-change', { value: this.value });
  }

  private _notifyOpenChange() {
    this.dispatchCustomEvent('open-change', { open: this.open });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select': SelectElement;
  }
}
