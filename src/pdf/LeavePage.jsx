import { Page, View, Text } from "@react-pdf/renderer";
import {
  formatGujaratiDate,
  getGujaratiWeekday,
  toGujaratiDigits,
} from "./pdfUtils";
import { styles } from "./pdfStyles";
import { fixGujaratiLigatures } from "../lib/filter";

export default function LeavePage({ diary }) {
  const safeData = fixGujaratiLigatures(diary);
  const {
    month,
    year,

    user,

    leaveEntries,
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
          વિષય:- માહે {toGujaratiDigits(month)}/{toGujaratiDigits(year)} ની રજા
          ડાયરી બાબત.
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text>નામ:- {user?.name}</Text>
        <Text>હોદ્દો:- {user?.role}</Text>
        <Text>બ. નં.- {toGujaratiDigits(user?.badgeNo)}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.p2Col1]}>
            <Text>અ. નં</Text>
          </View>
          <View style={[styles.tableCol, styles.p2Col2]}>
            <Text>તારીખ</Text>
          </View>
          <View style={[styles.tableCol, styles.p2Col3]}>
            <Text>વાર</Text>
          </View>
          <View style={[styles.tableCol, styles.p2Col4]}>
            <Text>ફરજ સ્થળ</Text>
          </View>
          <View style={[styles.tableCol, styles.p2Col5]}>
            <Text>રીમાર્કસ</Text>
          </View>
        </View>

        {leaveEntries.map((entry, index) => (
          <View style={styles.tableRow} key={entry?.id}>
            <View style={[styles.tableCol, styles.p2Col1]}>
              <Text>{toGujaratiDigits(index + 1)}</Text>
            </View>
            <View style={[styles.tableCol, styles.p2Col2]}>
              <Text>{formatGujaratiDate(entry?.date)}</Text>
            </View>
            <View style={[styles.tableCol, styles.p2Col3]}>
              <Text>{getGujaratiWeekday(entry?.date)}</Text>
            </View>
            <View style={[styles.tableCol, styles.p2Col4]}>
              <Text>{entry?.location}</Text>
            </View>
            <View style={[styles.tableCol, styles.p2Col5]}>
              <Text>{entry?.remarks}</Text>
            </View>
          </View>
        ))}

        {/* Table Footer Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "30%" }]}>
            <Text>કુલ દિવસો</Text>
          </View>
          <View style={[styles.tableCol, { width: "20%" }]}>
            <Text>{toGujaratiDigits(leaveEntries?.length)}</Text>
          </View>
          <View style={[styles.tableCol, { width: "25%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.tableCol, { width: "25%" }]}>
            <Text></Text>
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
