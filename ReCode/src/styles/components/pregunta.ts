import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface PreguntaViewStyles {
  gradient: ViewStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
  tabBar: ViewStyle;
  tabBarContent: ViewStyle;
  container: ViewStyle;
  languageRow: ViewStyle;
  answersContainer: ViewStyle;
  answerBlock: ViewStyle;
  answerBlockSelected: ViewStyle;
  answerBlockDisabled: ViewStyle;
  bottomSection: ViewStyle;
  hintButton: ViewStyle;
  nextButton: ViewStyle;
  nextButtonDisabled: ViewStyle;
}

interface PreguntaTextStyles {
  tabTitle: TextStyle;
  languageLabel: TextStyle;
  languageValue: TextStyle;
  questionTitle: TextStyle;
  answerText: TextStyle;
  answerTextSelected: TextStyle;
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
    paddingBottom: 48 + 140, // statusBarHeight + 140
  },
  tabBar: {
    width: "100%",
    height: 48 + 64, // statusBarHeight + 64
    backgroundColor: "#0F0F16",
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  tabBarContent: {
    marginHorizontal: 20,
    marginTop: 48 + 8, // statusBarHeight + 8
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  answersContainer: {
    marginBottom: 40,
  },
  answerBlock: {
    backgroundColor: "#1A1A28",
    borderWidth: 1,
    borderColor: "#767684",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    width: "100%",
  },
  answerBlockSelected: {
    borderColor: "#7C5CFF",
    backgroundColor: "#1E1E3A",
  },
  answerBlockDisabled: {
    opacity: 0.5,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  hintButton: {
    backgroundColor: "#e7d512",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3a3a4a",
  },
  nextButton: {
    backgroundColor: "#67c767",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: "#7C5CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: "#3a3a4a",
    shadowOpacity: 0,
    elevation: 0,
  },
});

const preguntaTextStyles = StyleSheet.create<PreguntaTextStyles>({
  tabTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },
  languageLabel: {
    color: "#6B6B7A",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginRight: 10,
  },
  languageValue: {
    color: "#7C5CFF",
    fontSize: 18,
    fontWeight: "700",
  },
  questionTitle: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 26,
    lineHeight: 36,
    color: "#F2F2F7",
    marginBottom: 32,
  },
  answerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#E8E8ED",
    textAlign: "center",
  },
  answerTextSelected: {
    color: "#7C5CFF",
    fontWeight: "700",
  },
  hintText: {
    color: "#F2F2F7",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

export const preguntaStyles = {
  ...preguntaViewStyles,
  ...preguntaTextStyles,
};