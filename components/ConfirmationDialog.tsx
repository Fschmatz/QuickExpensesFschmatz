import React from "react";
import { View, StyleSheet } from "react-native";
import { Dialog, Portal, Button, Text, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";

export interface ConfirmationDialogProps {
  message: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  visible,
  setVisible,
  handleConfirm,
  handleCancel,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.title}>Confirmar</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={styles.messageText}>
            {message}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel} textColor={theme.colors.onBackground}>
            Não
          </Button>
          <Button onPress={handleConfirm} textColor={theme.colors.onBackground}>
            Sim
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    dialog: {
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: 20,
      elevation: 0,
    },
    title: {
      color: theme.colors.onBackground,
    },
    messageText: {
      color: theme.colors.onBackground,
    },
  });

export default ConfirmationDialog;
