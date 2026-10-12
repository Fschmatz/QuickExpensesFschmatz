export const KEYPAD_BUTTON = {
  radius: {
    initial: 50,
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
  borderRadius: {
    card: 20,
    fab: 20,
    dialog: 20,
    input: 25,
    full: 50,
  },
};
