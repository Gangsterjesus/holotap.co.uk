import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 28, fontWeight: "700", marginBottom: 20, color: "#0078FF", textAlign: "center" },
  subHeader: { fontSize: 22, fontWeight: "600", marginBottom: 10, color: "#333" },
  card: { backgroundColor: "#f5f5f5", padding: 20, borderRadius: 12, marginBottom: 30 },
  label: { fontSize: 16, color: "#555", marginTop: 10 },
  value: { fontSize: 20, fontWeight: "600", color: "#222" },
  txCard: { backgroundColor: "#fafafa", padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: "#eee" },
  txLabel: { fontSize: 14, color: "#666", marginTop: 6 },
  txValue: { fontSize: 18, fontWeight: "600", color: "#222" },
  statusSuccess: { color: "#0A8F00" },
  statusFailed: { color: "#D00000" },
  link: { fontSize: 18, color: "#0078FF", fontWeight: "600", textAlign: "center", marginTop: 20 },
  loadingText: { marginTop: 20, fontSize: 18, color: "#555", textAlign: "center" },
  errorHeader: { fontSize: 26, fontWeight: "700", color: "#D00000", marginBottom: 20, textAlign: "center" },
  errorNote: { fontSize: 18, color: "#555", marginBottom: 40, textAlign: "center" },
  listContent: { paddingBottom: 40 },
});
