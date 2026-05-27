import {
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

import gujaratiFont from "../assets/fonts/NotoSansGujarati-Regular.ttf";

Font.register({
  family: "Gujarati",
  src: gujaratiFont,
});

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Gujarati', // Essential for Gujarati characters
    fontSize: 10,
    paddingTop: '20mm',
    paddingBottom: '20mm',
    paddingLeft: '30mm',
    paddingRight: '20mm',
    backgroundColor: '#ffffff',
  },
  headerText: {
    marginBottom: 2,
  },
  subject: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  // Table Globals
  table: {
    width: '100%',
    borderTopWidth: 0.67,
    borderLeftWidth: 0.67,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: "stretch",
  },
  tableCol: {
    borderRightWidth: 0.67,
    borderBottomWidth: 0.67,
    borderColor: '#000',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  // Page 1 Specific Widths
  col1: { width: '16%' },
  col2: { width: '16%' },
  col34Container: { width: '30%', padding: 0, flexDirection: 'column' }, // For the header nesting
  col3: { width: '15%' }, // In data row
  col4: { width: '15%' }, // In data row
  col5: { width: '14%' },
  col6: { width: '13%' },
  col7: { width: '12%' },

  // Nested Header for Column 3 & 4
  nestedHeaderTop: {
    width: '100%',
    borderBottomWidth: 0.67,
    borderColor: '#000',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  nestedHeaderBottom: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  nestedHeaderCellLeft: {
    width: '50%',
    borderRightWidth: 0.67,
    borderColor: '#000',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nestedHeaderCellRight: {
    width: '50%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  // Nested RowSpan logic styling
  leftSpanContainer: {
    width: '62%', // 16+16+15+15
    flexDirection: 'column',
  },
  nestedCol1: { width: '25.80%', borderRightWidth: 0.67 }, // 16 / 62
  nestedCol2: { width: '25.80%', borderRightWidth: 0.67 }, // 16 / 62
  nestedCol3: { width: '24.19%', borderRightWidth: 0.67 }, // 15 / 62
  nestedCol4: { width: '24.19%', borderRightWidth: 0.67 }, // 15 / 62

  // Page 2 Specific Widths
  p2Col1: { width: '10%' },
  p2Col2: { width: '20%' },
  p2Col3: { width: '20%' },
  p2Col4: { width: '25%' },
  p2Col5: { width: '25%' },

  innerRow: {
    flexDirection: 'row',
    width: '100%',
    //  flex: 1, //   rows.length <= 3
  },
  bodyColFullHeight: {
    borderRightWidth: 0.67,
    borderColor: '#000',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  footer: {
    position: 'reletive',
    // position: 'absolute',
    marginTop: '4mm',
    bottom: '20mm',
    right: '20mm',
    // textAlign: 'right',
    alignItems: "flex-end",
  },

  signature: {
    marginTop: '8mm',
  },
});