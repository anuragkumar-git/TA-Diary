import { Document } from "@react-pdf/renderer";

import TravelPage from "./TravelPage";
import LeavePage from "./LeavePage";

export default function PdfDocument({ diary }) {
  return (
    <Document>
      <TravelPage diary={diary} />
      <LeavePage diary={diary} />
    </Document>
  );
}
