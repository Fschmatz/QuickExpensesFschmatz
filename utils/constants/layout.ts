export const KEYPAD_BUTTON = {
  radius: {
    initial: 40,
    pressed: 20,
  },
  animationDuration: {
    pressIn: 100,
    pressOut: 150,
  },
};

export const FAB_BUTTON = {
  borderRadius: 20,
};

export const CARD = {
  borderRadius: 20,
};

export const FONT_WEIGHT = {
  default: "400" as const,
  bold: "600" as const,
};

export const LAYOUT = {
  card: CARD,
  fab: FAB_BUTTON,
  keypad: KEYPAD_BUTTON,
  fontWeight: FONT_WEIGHT,
};
