import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import IconButton from "./IconButton";
import { formatDate, formatMoney, useStyles } from "@utils";
import { LoanItem } from "../entities/loan";
import { CARD, FONT_WEIGHT } from "@constants";

export interface LoanTileProps {
  loan: LoanItem;
  onDelete: (loan: LoanItem) => void;
  onEdit: (loan: LoanItem) => void;
}

const LoanTile: React.FC<LoanTileProps> = ({ loan, onDelete, onEdit }) => {
  const styles = useStyles(createStyles);

  return (
    <Card mode="contained" style={styles.card}>
      <TouchableRipple onPress={() => onEdit(loan)} style={styles.touchable}>
        <Card.Title
          title={loan.name}
          titleVariant="titleMedium"
          titleStyle={styles.title}
          subtitle={
            loan.note
              ? `R$ ${formatMoney(loan.value)}\n${loan.note}\n${formatDate(loan.createdDate, "dd/mm/yyyy")}`
              : `R$ ${formatMoney(loan.value)}\n${formatDate(loan.createdDate, "dd/mm/yyyy")}`
          }
          subtitleVariant="bodyMedium"
          subtitleStyle={styles.subtitle}
          subtitleNumberOfLines={3}
          right={() => (
            <View style={styles.rightContainer}>
              <IconButton
                icon="checkmark-circle-outline"
                onPress={() => onDelete(loan)}
                size={28}
                style={styles.iconButton}
              />
            </View>
          )}
        />
      </TouchableRipple>
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      elevation: 0,
      borderRadius: CARD.borderRadius,
      overflow: "hidden",
      backgroundColor: theme.colors.elevation.level3,
    },
    touchable: {
      paddingVertical: 16,
    },
    title: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 4,
      lineHeight: 20,
    },
    rightContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: 16,
    },
    iconButton: {
      margin: 0,
      padding: 0,
    },
  });

export default LoanTile;
