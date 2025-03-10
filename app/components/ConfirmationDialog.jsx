import React from "react";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { AppColors } from "../utils/constants/appColors";

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
          color: AppColors.text,
        },
        style: {
          textTransform: "none",
        },
      }}
      negativeButton={{
        title: "Não",
        onPress: handleCancel,
        titleStyle: {
          color: AppColors.text,
        },
        style: {
          textTransform: "none",
        },
      }}
      dialogStyle={{
        backgroundColor: AppColors.secondaryContainer,
        borderRadius: 16,
        paddingLeft: 0,
        paddingRight: 8,
        paddingBottom: 8,
      }}
      titleStyle={{
        color: AppColors.text,
        fontWeight: "bold",
        fontSize: 18,
      }}
      messageStyle={{
        color: AppColors.text,
        fontSize: 16,
      }}
    />
  );
};

export default ConfirmationDialog;
