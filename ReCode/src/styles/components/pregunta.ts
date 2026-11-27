import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  viewStyles,
  textStyles,
  shadows,
} from "../common";

interface PreguntaViewStyles {
  gradient: ViewStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
  container: ViewStyle;
  languageRow: ViewStyle;
  answersContainer: ViewStyle;
  answerBlock: ViewStyle;
  answerBlockSelected: ViewStyle;
  answerBlockDisabled: ViewStyle;
  answerBlockCorrect: ViewStyle;
  answerBlockWrong: ViewStyle;
  hintButtonDisabled: ViewStyle;
  timer: ViewStyle;
  timerUrgente: ViewStyle;
  centrado: ViewStyle;
  resultadoTarjeta: ViewStyle;
  bottomSection: ViewStyle;
  hintButton: ViewStyle;
  nextButton: ViewStyle;
  nextButtonDisabled: ViewStyle;
}

interface PreguntaTextStyles {
  languageLabel: TextStyle;
  languageValue: TextStyle;
  questionTitle: TextStyle;
  answerText: TextStyle;
  answerTextSelected: TextStyle;
  answerTextCorrect: TextStyle;
  answerTextWrong: TextStyle;
  languageLevel: TextStyle;
  feedback: TextStyle;
  timerText: TextStyle;
  mensaje: TextStyle;
  resultadoTitulo: TextStyle;
  resultadoPuntaje: TextStyle;
  resultadoDetalle: TextStyle;
  hintText: TextStyle;
  nextButtonText: TextStyle;
}

const preguntaViewStyles = StyleSheet.create<PreguntaViewStyles>({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.navbar,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderColor: colors.borderPrimary,
  },
  answersContainer: {
    marginBottom: spacing.xxxl,
  },
  answerBlock: {
    ...viewStyles.answerBlock,
  },
  answerBlockSelected: {
    ...viewStyles.answerBlockSelected,
  },
  answerBlockDisabled: {
    ...viewStyles.answerBlockDisabled,
  },
  answerBlockCorrect: {
    ...viewStyles.answerBlockCorrect,
  },
  answerBlockWrong: {
    ...viewStyles.answerBlockWrong,
  },
  hintButtonDisabled: {
    opacity: 0.4,
  },
  timer: {
    ...viewStyles.timerContainer,
  },
  timerUrgente: {
    ...viewStyles.timerUrgent,
  },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  resultadoTarjeta: {
    ...viewStyles.resultCard,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  hintButton: {
    backgroundColor: colors.warning,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderSecondary,
  },
  nextButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxxl,
    borderRadius: borderRadius.md,
    ...shadows.nextButton,
  },
  nextButtonDisabled: {
    backgroundColor: colors.borderSecondary,
    shadowOpacity: 0,
    elevation: 0,
  },
});

const preguntaTextStyles = StyleSheet.create<PreguntaTextStyles>({
  languageLabel: {
    ...textStyles.languageLabel,
  },
  languageValue: {
    ...textStyles.languageValue,
  },
  questionTitle: {
    ...textStyles.questionTitle,
  },
  answerText: {
    ...textStyles.answerText,
  },
  answerTextSelected: {
    ...textStyles.answerTextSelected,
  },
  answerTextCorrect: {
    ...textStyles.answerTextCorrect,
  },
  answerTextWrong: {
    ...textStyles.answerTextWrong,
  },
  languageLevel: {
    ...textStyles.languageLevel,
  },
  feedback: {
    ...textStyles.feedback,
  },
  timerText: {
    ...textStyles.timerText,
  },
  mensaje: {
    ...textStyles.mensaje,
  },
  resultadoTitulo: {
    ...textStyles.resultTitle,
  },
  resultadoPuntaje: {
    ...textStyles.resultScore,
  },
  resultadoDetalle: {
    ...textStyles.resultDetail,
  },
  hintText: {
    ...textStyles.hintText,
  },
  nextButtonText: {
    ...textStyles.nextButtonText,
  },
});

export const preguntaStyles = {
  ...preguntaViewStyles,
  ...preguntaTextStyles,
};