import React from 'react';
import './Diary.css'; // Import the CSS file above

// --- UTILS ---
const toGujaratiDigits = (str) => {
  if (!str) return '';
  const gujDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  return str.toString().replace(/\d/g, (d) => gujDigits[d]);
};

const formatGujaratiDate = (dateStr) => {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${toGujaratiDigits(dd)}/${toGujaratiDigits(mm)}/${toGujaratiDigits(yyyy)}`;
};

const getGujaratiDay = (dateStr) => {
  if (!dateStr) return '';
  const days = ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'];
  return days[new Date(dateStr).getDay()];
};

// --- MAIN COMPONENT ---
// export default function TravelAndLeaveDiary({ diary }) {
export default function TravelAndLeaveDiary() {
  // Destructuring the newer data model
const dairy = {
  month: "4",
  year: "2026",
  user: {
    name: "રમેશભાઈ અભેસિંહ પટેલ",
    role: "AHC",
    badgeNo: "135"
  },
  travelDefaults: {
    reason: "મા. માજી મંત્રી શ્રી જયદ્રથસિંહ પરમાર સાહેબના અંગરક્ષક તરીકે ફરજ",
    mode: "સરકારી વાહન",
    distance: ""
  },
  travelEntries: [
    {
      id: "row-1",
      startDate: "2026-04-01",
      endDate: "2026-04-08",
      startTime: "",
      endTime: "",
      from: "ગાંધીનગર",
      to: "કંજરી"
    },
    {
      id: "row-2",
      startDate: "2026-04-08",
      endDate: "2026-04-08",
      startTime: "14:30",
      endTime: "17:15",
      from: "ગાંધીનગર",
      to: "હાલોલ"
    },
    {
      id: "row-3",
      startDate: "2026-04-10",
      endDate: "2026-04-13",
      startTime: "",
      endTime: "",
      from: "હાલોલ",
      to: "કંજરી"
    }
  ],
  leaveEntries:[]
};

  return (
    <div className="bg-gray-100 py-10 print:bg-white print:py-0">
      
      {/* ========================================== */}
      {/* PAGE 1: TRAVEL DIARY                       */}
      {/* ========================================== */}
      <div className="diary-page page-break-after">
        <div className="leading-tight">
          <p>પ્રતિ,</p>
          <p>સી કંપની કમા. સાહેબ શ્રી,</p>
          <p>રા. અ. પો. દળ જૂથ ૫,</p>
          <p>ગોધરા.</p>
        </div>

        <div className="text-center my-4 font-bold">
          વિષય:- માહે {toGujaratiDigits(dairy.month)}/{toGujaratiDigits(dairy.year)} મુસાફરી ડાયરી
        </div>

        <div className="flex justify-between mb-4">
          <span>નામ:- {dairy.user?.name}</span>
          <span>હોદ્દો:- {dairy.user?.role}</span>
          <span>બ. નં.- {toGujaratiDigits(dairy.user?.badgeNo)}</span>
        </div>

        <table className="diary-table">
          <thead>
            {/* Header Row 1 */}
            <tr>
              <th className="col-1" rowSpan="2">મુસાફરી શરુ<br/>કર્યાનો વખત<br/>તથા તેની<br/>તારીખ</th>
              <th className="col-2" rowSpan="2">મુસાફરી પુરી<br/>કર્યાનો વખત<br/>તથા તેની<br/>તારીખ</th>
              <th colSpan="2" className="border-b-0">મુસાફરી</th>
              <th className="col-5" rowSpan="2">મુસાફરીનું<br/>કારણ</th>
              <th className="col-6" rowSpan="2">રેલગાડી થી<br/>કે પગ રસ્તે</th>
              <th className="col-7" rowSpan="2">કેટલા<br/>માઈલ</th>
            </tr>
            {/* Header Row 2 (Sub-headers for 'મુસાફરી') */}
            <tr>
              <th className="col-3">ક્યાંથી</th>
              <th className="col-4">ક્યાં સુધી</th>
            </tr>
            {/* Header Row 3 (Numbers) */}
            <tr>
              <th>૧</th>
              <th>૨</th>
              <th>૩</th>
              <th>૪</th>
              <th>૫</th>
              <th>૬</th>
              <th>૭</th>
            </tr>
          </thead>
          <tbody>
            {dairy?.travelEntries.map((row, index) => (
              <tr key={row.id || index}>
                {/* Individual Row Data */}
                <td>
                  {formatGujaratiDate(row?.startDate)}
                  {row?.startTime && <><br/>{toGujaratiDigits(row.startTime)}</>}
                </td>
                <td>
                  {formatGujaratiDate(row?.endDate)}
                  {row?.endTime && <><br/>{toGujaratiDigits(row.endTime)}</>}
                </td>
                <td>{row?.from}</td>
                <td>{row?.to}</td>

                {/* rowSpan Magic: Only render these columns on the very first loop iteration */}
                {index === 0 && (
                  <>
                    <td rowSpan={dairy.travelEntries.length} className="whitespace-pre-line">
                      {dairy.travelDefaults?.reason}
                    </td>
                    <td rowSpan={dairy.travelEntries.length}>
                      {dairy.travelDefaults?.mode}
                    </td>
                    <td rowSpan={dairy.travelEntries.length}>
                      {toGujaratiDigits(dairy.travelDefaults?.distance)}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="absolute bottom-[20mm] right-[20mm] text-right">
          <p>આપનો વિશ્વાસુ</p>
          <p className="mt-8">- {dairy.user?.name}</p>
        </div>
      </div>

      {/* ========================================== */}
      {/* PAGE 2: LEAVE DIARY                        */}
      {/* ========================================== */}
      <div className="diary-page">
        <div className="leading-tight">
          <p>પ્રતિ,</p>
          <p>સી કંપની કમા. સાહેબ શ્રી,</p>
          <p>રા. અ. પો. દળ જૂથ ૫,</p>
          <p>ગોધરા.</p>
        </div>

        <div className="text-center my-4 font-bold">
          વિષય:- માહે {toGujaratiDigits(dairy.month)}/{toGujaratiDigits(dairy.year)} ની રજા ડાયરી બાબત.
        </div>

        <div className="flex justify-between mb-4">
          <span>નામ:- {dairy.user?.name}</span>
          <span>હોદ્દો:- {dairy.user?.role}</span>
          <span>બ. નં.- {toGujaratiDigits(dairy.user?.badgeNo)}</span>
        </div>

        <table className="diary-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>અ. નં</th>
              <th style={{ width: '20%' }}>તારીખ</th>
              <th style={{ width: '20%' }}>વાર</th>
              <th style={{ width: '25%' }}>ફરજ સ્થળ</th>
              <th style={{ width: '25%' }}>રીમાર્કસ</th>
            </tr>
          </thead>
          <tbody>
            {dairy?.leaveEntries.map((entry, index) => (
              <tr key={entry.id || index}>
                <td>{toGujaratiDigits(index + 1)}</td>
                <td>{formatGujaratiDate(entry?.date)}</td>
                <td>{getGujaratiDay(entry?.date)}</td>
                <td>{entry?.location}</td>
                <td>{entry?.remarks}</td>
              </tr>
            ))}
            {/* Footer Row for Leaves */}
            <tr className="font-bold">
              <td colSpan="2" className="text-right pr-4">કુલ દિવસો</td>
              <td>{toGujaratiDigits(dairy.leaveEntries?.length)}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="absolute bottom-[20mm] right-[20mm] text-right">
          <p>આપનો વિશ્વાસુ</p>
          <p className="mt-8">- {dairy.user?.name}</p>
        </div>
      </div>

    </div>
  );
}