import { ConfirmDialog } from "react-native-simple-dialogs";
import { appColors } from "@constants";

const ConfirmationDialog = ({
  message,
  visible,
  setVisible,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <ConfirmDialog
      title="Confirmar"
      message={message}
      visible={visible}
      onTouchOutside={setVisible}
      positiveButton={{
        title: "Sim",
        onPress: handleConfirm,
        titleStyle: {
          color: appColors.text,
        },
        style: {
          textTransform: "none",
        },
      }}
      negativeButton={{
        title: "Não",
        onPress: handleCancel,
        titleStyle: {
          color: appColors.text,
        },
        style: {
          textTransform: "none",
        },
      }}
      dialogStyle={{
        backgroundColor: appColors.dialogBackground,
        borderRadius: 16,
        paddingLeft: 0,
        paddingRight: 8,
        paddingBottom: 8,
      }}
      titleStyle={{
        color: appColors.text,
        fontWeight: "bold",
        fontSize: 18,
      }}
      messageStyle={{
        color: appColors.text,
        fontSize: 16,
      }}
    />
  );
};

export default ConfirmationDialog;
