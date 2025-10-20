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
  AlertDialogElement,
  AlertDialogTriggerElement,
  AlertDialogPortalElement,
  AlertDialogOverlayElement,
  AlertDialogContentElement,
  AlertDialogTitleElement,
  AlertDialogDescriptionElement,
  AlertDialogActionElement,
  AlertDialogCancelElement,
} from './components/alert-dialog/index.js';

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

export {
  PopoverElement,
  PopoverTriggerElement,
  PopoverAnchorElement,
  PopoverPortalElement,
  PopoverContentElement,
  PopoverCloseElement,
} from './components/popover/index.js';

export {
  ToolbarElement,
  ToolbarButtonElement,
  ToolbarSeparatorElement,
  ToolbarToggleGroupElement,
  ToolbarToggleItemElement,
} from './components/toolbar/index.js';

export { SeparatorElement } from './components/separator/index.js';

export {
  ScrollAreaElement,
  ScrollAreaViewportElement,
  ScrollAreaScrollbarElement,
  ScrollAreaThumbElement,
  ScrollAreaCornerElement,
} from './components/scroll-area/index.js';

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
