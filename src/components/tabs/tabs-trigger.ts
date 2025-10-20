import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';
import type { TabsElement } from './tabs.js';

/**
 * Tabs Trigger Component
 * 
 * The button that activates its associated content.
 * 
 * @slot - Default slot for trigger content
 * 
 * @example
 * ```html
 * <wc-tabs-trigger value="tab1">Tab 1</wc-tabs-trigger>
 * ```
 */
@customElement('wc-tabs-trigger')
export class TabsTriggerElement extends PrimitiveElement {
  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  disabled = false;

  private _tabs: TabsElement | null = null;
  private _contentId = '';

  override connectedCallback() {
    super.connectedCallback();
    this._tabs = this.closest('wc-tabs');
    this._contentId = this.generateId('tabs-content');

    this.setAttribute('role', 'tab');
    this.setAttribute('type', 'button');

    // Add click handler
    this.addEventListener('click', this._handleClick);

    this._updateState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  private _handleClick = () => {
    if (this.disabled || (this._tabs && this._tabs.disabled)) return;
    if (this._tabs) {
      this._tabs.setActiveTab(this.value);
    }
  };

  private _updateState() {
    if (!this._tabs) return;

    const isActive = this._tabs.isTabActive(this.value);
    const isDisabled = this.disabled || this._tabs.disabled;

    this.setAttribute('data-state', isActive ? 'active' : 'inactive');
    this.setAttribute('aria-selected', isActive ? 'true' : 'false');
    this.setAttribute('tabindex', isActive ? '0' : '-1');
    this.setAttribute('aria-controls', this._contentId);

    if (isDisabled) {
      this.setAttribute('data-disabled', '');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('data-disabled');
      this.removeAttribute('aria-disabled');
    }

    // Set the content ID on the corresponding content element
    const content = this._tabs.querySelector(
      `wc-tabs-content[value="${this.value}"]`
    );
    if (content) {
      content.setAttribute('id', this._contentId);
      content.setAttribute('aria-labelledby', this.id || this.generateId('tabs-trigger'));
      if (!this.id) {
        this.id = content.getAttribute('aria-labelledby') || '';
      }
    }
  }

  override updated() {
    this._updateState();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tabs-trigger': TabsTriggerElement;
  }
}
