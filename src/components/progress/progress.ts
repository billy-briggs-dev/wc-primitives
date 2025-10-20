import { html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PrimitiveElement } from '../../primitive-element.js';

/**
 * Progress Component
 * 
 * Displays an indicator showing the completion progress of a task.
 * 
 * @slot - Default slot for progress indicator
 * 
 * @example
 * ```html
 * <wc-progress value="50" max="100">
 *   <wc-progress-indicator />
 * </wc-progress>
 * ```
 */
@customElement('wc-progress')
export class ProgressElement extends PrimitiveElement {
  /**
   * The current progress value.
   */
  @property({ type: Number })
  value: number | null = null;

  /**
   * The maximum progress value.
   */
  @property({ type: Number })
  max = 100;

  /**
   * Gets the progress as a percentage (0-100) or null if indeterminate
   */
  @state()
  private _percentage: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
    this._updateProgress();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('value') || changedProperties.has('max')) {
      this._updateProgress();
    }
  }

  /**
   * Get the progress percentage (0-100)
   */
  getPercentage(): number | null {
    return this._percentage;
  }

  private _updateProgress() {
    // Handle indeterminate state (null or undefined value)
    if (this.value === null || this.value === undefined) {
      this._percentage = null;
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('data-value');
      this.setAttribute('data-state', 'indeterminate');
    } else {
      // Calculate percentage
      const clampedValue = Math.max(0, Math.min(this.value, this.max));
      this._percentage = this.max > 0 ? (clampedValue / this.max) * 100 : 0;
      
      this.setAttribute('aria-valuenow', String(clampedValue));
      this.setAttribute('data-value', String(clampedValue));
      this.setAttribute('data-state', 'complete');
    }

    // Always set aria-valuemin and aria-valuemax
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', String(this.max));

    // Update child indicators
    this._updateChildIndicators();
  }

  private _updateChildIndicators() {
    const indicators = this.querySelectorAll('wc-progress-indicator');
    indicators.forEach((indicator) => {
      if ('requestUpdate' in indicator && typeof indicator.requestUpdate === 'function') {
        indicator.requestUpdate();
      }
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-progress': ProgressElement;
  }
}
