/**
 * WC Primitives Core
 * 
 * Headless Web Component Primitives built with Lit 3
 * Framework agnostic, accessible UI components
 * 
 * @packageDocumentation
 */

export { PrimitiveElement } from './primitive-element.js';

// Components
export {
  AccordionElement,
  AccordionItemElement,
  AccordionTriggerElement,
  AccordionContentElement,
} from './components/accordion/index.js';

// Utilities
export {
  VisuallyHiddenElement,
  SlotElement,
  PortalElement,
  AccessibleIconElement,
  DirectionProviderElement,
  getDirection,
  type Direction,
} from './utilities/index.js';
