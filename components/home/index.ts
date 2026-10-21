// Top components
export * from "./top";

// Bottom components
export * from "./bottom";

// Header
export { default as HeaderButtons } from "./HeaderButtons";
export type { HeaderButtonsProps } from "./HeaderButtons";

// Backward compatibility aliases
export { default as HomeTopContainer } from "./top/TopContainer";
export type { TopContainerProps as HomeTopContainerProps } from "./top/TopContainer";

export { default as HomeTopCurrentMonth } from "./top/CurrentMonth";
export type { CurrentMonthProps as HomeTopCurrentMonthProps } from "./top/CurrentMonth";

export { default as HomeMonthProgressBar } from "./top/MonthProgressBar";
export type { MonthProgressBarProps as HomeMonthProgressBarProps } from "./top/MonthProgressBar";

export { default as HomeBottomContainer } from "./bottom/BottomContainer";
export type { BottomContainerProps as HomeBottomContainerProps } from "./bottom/BottomContainer";

export { default as HomeBottomConfirmButton } from "./bottom/ConfirmButton";
export type { ConfirmButtonProps as HomeBottomConfirmButtonProps } from "./bottom/ConfirmButton";

export { default as HomeBottomDeleteButton } from "./bottom/DeleteButton";
export type { DeleteButtonProps as HomeBottomDeleteButtonProps } from "./bottom/DeleteButton";

export { default as HomeBottomNumberButton } from "./bottom/NumberButton";
export type { NumberButtonProps as HomeBottomNumberButtonProps } from "./bottom/NumberButton";

export { default as HomeHeaderButtons } from "./HeaderButtons";
