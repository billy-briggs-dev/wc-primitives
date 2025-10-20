import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Tabs Root Component
 * 
 * A set of layered sections of content (tab panels) that are displayed one at a time.
 * 
 * @fires value-change - Fires when the active tab changes
 * 
 * @slot - Default slot for tabs list and panels
 * 
 * @example
 * ```html
 * <wc-tabs value="tab1">
 *   <wc-tabs-list>
 *     <wc-tabs-trigger value="tab1">Tab 1</wc-tabs-trigger>
 *     <wc-tabs-trigger value="tab2">Tab 2</wc-tabs-trigger>
 *   </wc-tabs-list>
 *   <wc-tabs-content value="tab1">Content 1</wc-tabs-content>
 *   <wc-tabs-content value="tab2">Content 2</wc-tabs-content>
 * </wc-tabs>
 * ```
 */
@customElement('wc-tabs')
export class TabsElement extends PrimitiveElement {
  /**
   * The controlled active tab value.
   */
  @property({ type: String })
  value = '';

  /**
   * When true, prevents the user from interacting with the tabs.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The orientation of the tabs.
   */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @state()
  private _activeTab = '';

  override connectedCallback() {
    super.connectedCallback();
    this._activeTab = this.value;
    this.setAttribute('data-orientation', this.orientation);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._activeTab = this.value;
      this._updateChildComponents();
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }

    if (changedProperties.has('orientation')) {
      this.setAttribute('data-orientation', this.orientation);
    }
  }

  /**
   * Set the active tab
   */
  setActiveTab(tabValue: string) {
    if (this.disabled) return;
    this._activeTab = tabValue;
    this.value = tabValue;
    this.requestUpdate();
    this._notifyChange();
    this._updateChildComponents();
  }

  /**
   * Check if a tab is active
   */
  isTabActive(tabValue: string): boolean {
    return this._activeTab === tabValue;
  }

  private _updateChildComponents() {
    // Force child components to update
    const triggers = this.querySelectorAll('wc-tabs-trigger');
    const contents = this.querySelectorAll('wc-tabs-content');
    triggers.forEach((trigger) => (trigger as any).requestUpdate?.());
    contents.forEach((content) => (content as any).requestUpdate?.());
  }

  private _notifyChange() {
    this.dispatchCustomEvent('value-change', { value: this._activeTab });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tabs': TabsElement;
  }
}
