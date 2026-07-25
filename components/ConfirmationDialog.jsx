import { Dialog, Portal, Button, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

const ConfirmationDialog = ({
  message,
  visible,
  setVisible,
  handleConfirm,
  handleCancel,
}) => {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={setVisible}
        style={{
          backgroundColor: theme.colors.elevation.level3,
          borderRadius: 20,
          elevation: 0,
        }}
      >
        <Dialog.Title style={{ color: theme.colors.onBackground }}>
          Confirmar
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: theme.colors.onBackground, fontSize: 16 }}>
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

export default ConfirmationDialog;
