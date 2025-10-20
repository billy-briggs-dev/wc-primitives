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

export {
  DialogElement,
  DialogTriggerElement,
  DialogPortalElement,
  DialogOverlayElement,
  DialogContentElement,
  DialogTitleElement,
  DialogDescriptionElement,
  DialogCloseElement,
} from './components/dialog/index.js';

export {
  TabsElement,
  TabsListElement,
  TabsTriggerElement,
  TabsContentElement,
} from './components/tabs/index.js';

export { ToggleElement } from './components/toggle/index.js';

export {
  TooltipElement,
  TooltipTriggerElement,
  TooltipContentElement,
} from './components/tooltip/index.js';
