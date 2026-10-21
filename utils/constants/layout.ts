const DEFAULT_BORDER_RADIUS = 20;

export const KEYPAD_BUTTON = {
  radius: {
    initial: 40,
    pressed: DEFAULT_BORDER_RADIUS,
  },
  animationDuration: {
    pressIn: 100,
    pressOut: 150,
  },
};

export const FAB_BUTTON = {
  borderRadius: DEFAULT_BORDER_RADIUS,
};

export const CARD = {
  borderRadius: DEFAULT_BORDER_RADIUS,
};

export const FONT_WEIGHT = {
  default: "400" as const,
  bold: "600" as const,
};

export const MONTH_PROGRESS_BAR = {
  height: 25,
};

export const LAYOUT = {
  card: CARD,
  fab: FAB_BUTTON,
  keypad: KEYPAD_BUTTON,
  fontWeight: FONT_WEIGHT,
  monthProgressBar: MONTH_PROGRESS_BAR,
};
