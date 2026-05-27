import { Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatGujaratiDate, toGujaratiDigits } from "./pdfUtils";
import { styles } from "./pdfStyles";
import { fixGujaratiLigatures } from "../lib/filter";

export default function TravelPage({ diary }) {
  const safeData = fixGujaratiLigatures(diary);
  const {
    month,
    year,

    user,

    travelDefaults,

    travelEntries,
  } = safeData;

  return (
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.headerText}>પ્રતિ,</Text>
        <Text style={styles.headerText}>સી કંપની કમા. સાહેબ શ્રી,</Text>
        <Text style={styles.headerText}>રા. અ. પો. દળ જૂથ ૫,</Text>
        <Text style={styles.headerText}>ગોધરા.</Text>
      </View>

      <View style={styles.subject}>
        <Text>
          વિષય:- માહે {toGujaratiDigits(month)}/{toGujaratiDigits(year)} મુસાફરી
          ડાયરી
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text>નામ:- {user?.name}</Text>
        <Text>હોદ્દો:- {user?.role}</Text>
        <Text>બ. નં.- {toGujaratiDigits(user?.badgeNo)}</Text>
      </View>

      {/* --- START TABLE --- */}
      <View style={styles.table}>
        {/* Header Row 1 */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col1]}>
            <Text>
              મુસાફરી શરુ{"\n"}કર્યાનો વખત{"\n"}તથા તેની{"\n"}તારીખ
            </Text>
          </View>
          <View style={[styles.tableCol, styles.col2]}>
            <Text>
              મુસાફરી પુરી{"\n"}કર્યાનો વખત{"\n"}તથા તેની{"\n"}તારીખ
            </Text>
          </View>
          <View style={[styles.tableCol, styles.col34Container]}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 0.67,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text>મુસાફરી</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", flex: 1 }}>
              <View
                style={{
                  width: "50%",
                  borderRightWidth: 0.67,
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text> ક્યાંથી </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>ક્યાં સુધી</Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableCol, styles.col5]}>
            <Text>મુસાફરીનું{"\n"}કારણ</Text>
          </View>
          <View style={[styles.tableCol, styles.col6]}>
            <Text>રેલગાડી થી{"\n"}કે પગ રસ્તે</Text>
          </View>
          <View style={[styles.tableCol, styles.col7]}>
            <Text>કેટલા{"\n"}માઈલ</Text>
          </View>
        </View>

        {/* Header Row 2 (Numbers) */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col1]}>
            <Text>૧</Text>
          </View>
          <View style={[styles.tableCol, styles.col2]}>
            <Text>૨</Text>
          </View>
          <View style={[styles.tableCol, styles.col3]}>
            <Text>૩</Text>
          </View>
          <View style={[styles.tableCol, styles.col4]}>
            <Text>૪</Text>
          </View>
          <View style={[styles.tableCol, styles.col5]}>
            <Text>૫</Text>
          </View>
          <View style={[styles.tableCol, styles.col6]}>
            <Text>૬</Text>
          </View>
          <View style={[styles.tableCol, styles.col7]}>
            <Text>૭</Text>
          </View>
        </View>

        {/* Body Row (rowSpan Simulation) */}
        <View style={styles.tableRow}>
          {/* ✅ FIX: Wrap BOTH inner rows in a SINGLE leftSpanContainer */}
          <View style={styles.leftSpanContainer}>
            {travelEntries.map((row, index) => {
              const isLastRow = index === travelEntries.length - 1;
              // Add bottom border only if it's NOT the last row
              const borderStyle = isLastRow ? { borderBottomWidth: 0.67 } : {};
              const flex = travelEntries.length <= 3 ? { flex: 1 } : {};
              return (
                <>
                  <View style={[styles.innerRow, flex]} key={row?.id}>
                    <View
                      style={[
                        {
                          padding: 3,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          // borderBottomWidth: 0.67,
                        },
                        styles.nestedCol1,
                        borderStyle,
                      ]}
                    >
                      <Text>{formatGujaratiDate(row?.startDate)}</Text>
                      <Text>{toGujaratiDigits(row?.startTime)}</Text>
                    </View>
                    <View
                      style={[
                        {
                          padding: 3,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          // borderBottomWidth: 0.67,
                        },
                        styles.nestedCol2,
                        borderStyle,
                      ]}
                    >
                      <Text>{formatGujaratiDate(row?.endDate)}</Text>
                      <Text>{toGujaratiDigits(row?.endTime)}</Text>
                    </View>
                    <View
                      style={[
                        {
                          padding: 3,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          // borderBottomWidth: 0.67,
                        },
                        styles.nestedCol3,
                        borderStyle,
                      ]}
                    >
                      <Text>{row?.from}</Text>
                    </View>
                    <View
                      style={[
                        {
                          padding: 3,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          // borderBottomWidth: 0.67,
                        },
                        styles.nestedCol4,
                        borderStyle,
                      ]}
                    >
                      <Text>{row?.to}</Text>
                    </View>
                  </View>
                </>
              );
            })}
            {/* Inner Row 6 */}
          </View>
          {/* END of leftSpanContainer */}

          {/* Right side span columns */}
          <View style={[styles.tableCol, styles.col5]}>
            <Text>{travelDefaults?.reason}</Text>
          </View>
          <View style={[styles.tableCol, styles.col6]}>
            <Text> {travelDefaults?.mode}</Text>
          </View>
          <View style={[styles.tableCol, styles.col7]}>
            <Text> {travelDefaults?.distance}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>આપનો વિશ્વાસુ</Text>
        <Text style={styles.signature}>- {user?.name}</Text>
      </View>
    </Page>
  );
}