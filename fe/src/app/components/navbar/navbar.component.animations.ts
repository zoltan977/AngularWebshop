import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInOut = trigger('slideInOut', [
    state('outLeft', style({
      left: '-100%',
    })),
    state('outRight', style({
      left: '100%',
    })),
    transition('* => outLeft, outRight => *', [
      animate('500ms')
    ])
])