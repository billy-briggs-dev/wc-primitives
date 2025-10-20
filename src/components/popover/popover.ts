import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Popover Root Component
 * 
 * A non-modal dialog that floats near a trigger element.
 * Unlike Dialog, popovers are non-modal and allow interaction with the rest of the page.
 * 
 * @fires open-change - Fires when the open state changes
 * 
 * @slot - Default slot for popover content (trigger, anchor, portal, etc.)
 * 
 * @example
 * ```html
 * <wc-popover>
 *   <wc-popover-trigger>Open Popover</wc-popover-trigger>
 *   <wc-popover-portal>
 *     <wc-popover-content>
 *       Popover content here
 *       <wc-popover-close>Close</wc-popover-close>
 *     </wc-popover-content>
 *   </wc-popover-portal>
 * </wc-popover>
 * ```
 */
@customElement('wc-popover')
export class PopoverElement extends PrimitiveElement {
  /**
   * The controlled open state of the popover.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * When true, prevents the user from interacting with the popover.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When true, clicking outside will close the popover.
   */
  @property({ type: Boolean })
  modal = false;

  private _previousFocus: Element | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      this.setAttribute('data-state', this.open ? 'open' : 'closed');
      this._notifyChange();
      this._updateChildComponents();
      
      if (this.open) {
        this._handlePopoverOpen();
      } else {
        this._handlePopoverClose();
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('data-disabled', '');
      } else {
        this.removeAttribute('data-disabled');
      }
    }
  }

  /**
   * Open the popover
   */
  openPopover() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Close the popover
   */
  closePopover() {
    if (this.disabled) return;
    this.open = false;
  }

  /**
   * Toggle the popover's open state
   */
  toggleOpen() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _handlePopoverOpen() {
    // Store the element that triggered the popover for focus return
    if (document.activeElement) {
      this._previousFocus = document.activeElement;
    }

    // Setup outside click handler for modal popovers
    if (this.modal) {
      setTimeout(() => {
        document.addEventListener('click', this._handleOutsideClick);
      }, 0);
    }
  }

  private _handlePopoverClose() {
    // Return focus to the trigger element
    const previousFocus = this._previousFocus;
    if (previousFocus && typeof (previousFocus as HTMLElement).focus === 'function') {
      (previousFocus as HTMLElement).focus();
    }
    this._previousFocus = null;

    // Remove outside click handler
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    const content = this.querySelector('wc-popover-content');
    const trigger = this.querySelector('wc-popover-trigger');
    const target = e.target as Node;

    // Check if click is outside content and trigger
    if (
      content &&
      !content.contains(target) &&
      trigger &&
      !trigger.contains(target)
    ) {
      this.closePopover();
    }
  };

  private _updateChildComponents() {
    // Force child components to update
    const children = this.querySelectorAll(
      'wc-popover-trigger, wc-popover-portal, wc-popover-content, wc-popover-anchor'
    );
    children.forEach((child) => {
      if ('requestUpdate' in child && typeof child.requestUpdate === 'function') {
        child.requestUpdate();
      }
    });
  }

  private _notifyChange() {
    this.dispatchCustomEvent('open-change', { open: this.open });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-popover': PopoverElement;
  }
}
