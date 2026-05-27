import React from "react";
import {
  formatGujaratiDate,
  getGujaratiWeekday,
  toGujaratiDigits,
} from "../../pdf/pdfUtils";

export default function TravelAndLeaveDiary({ dairy }) {
  const { month, year, user, travelDefaults, travelEntries, leaveEntries } =
    dairy;

  return (
    <>
      <style>{`
        .preview-page-container {
          width: 210mm;
          height: 297mm;
          padding: 20mm;
          padding-left: 30mm;
          box-sizing: border-box;
          position: relative;
          background: white;
        }

        .preview-subject {
          margin-top: 10px;
          text-align: center;
        }

        .preview-user-info {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
        .preview-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          table-layout: fixed;
          /* Ensures the table itself has an outer border */
          border: 0.67px solid black; 
        }

        .preview-table th,
        .preview-table td {
          /* Add only vertical borders by default to cells */
          border-left: 0.67px solid black;
          border-right: 0.67px solid black;
          font-weight: lighter;
          padding: 3px;
          text-align: center;
          vertical-align: middle;
        }

        /* Keep horizontal lines ONLY inside the table header (thead) */
        .preview-table thead tr th {
          border-top: 0.67px solid black;
          border-bottom: 0.67px solid black;
        }

        /* Remove all internal horizontal lines from the table body rows */
        .preview-travel-table tbody tr td {
          border-top: none;
          border-bottom: none;
        }

        /* Optional: If you want a clean border-right style adjustment matching your previous code */
        .preview-travel-table td {
          border-right: 0.5px solid black;
        }

        .leave-table-body {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          table-layout: fixed;
        }

        .leave-table-body th,
        .leave-table-body td {
          border: 0.67px solid black;
          font-weight: lighter;
          padding: 3px;
          text-align: center;
          vertical-align: middle;
        }

        .leave-table-body-table td {
          border-right: 0.5px solid black;
        }

        .preview-travel-table th:nth-child(1),
        .preview-travel-table th:nth-child(2) {
          width: 16%;
        }
        .preview-travel-table th:nth-child(3) {
          width: 30%;
        }
        .preview-travel-table th:nth-child(4) {
          width: 14%;
        }
        .preview-travel-table th:nth-child(5) {
          width: 13%;
        }
        .preview-travel-table th:nth-child(6) {
          width: 12%;
        }
        .p2Col1 { 
        width: 10% }
        .p2Col2 { width: 20% }
  .p2Col3 { width: 20% }
  .p2Col4 { width: 25% }
  .p2Col5 { width: 25% }
        .preview-footer {
          bottom: 20mm;
          right: 10mm;
          text-align: right;
        }
        
        .preview-signature {
          margin-top: 8mm;
        }
      `}</style>
      {/* ==================== PAGE 1: TRAVEL DIARY ==================== */}
      <div className="mx-auto">
        <div className="preview-page-container shadow-md rounded-sm overflow-hidden">
          <div>
            <p>પ્રતિ,</p>
            <p>સી કંપની કમા. સાહેબ શ્રી,</p>
            <p>રા. અ. પો. દળ જૂથ ૫,</p>
            <p>ગોધરા.</p>
          </div>

          <div className="preview-subject">
            વિષય:- માહે {toGujaratiDigits(month)}/{toGujaratiDigits(year)}{" "}
            મુસાફરી ડાયરી
          </div>

          <div className="preview-user-info">
            <span>નામ:- {user?.name}</span>
            <span>હોદ્દો:- {user?.role}</span>
            <span>બ. નં.- {toGujaratiDigits(user?.badgeNo)}</span>
          </div>

          <table className="preview-table preview-travel-table">
            <thead>
              <tr>
                <th rowSpan="2">
                  મુસાફરી શરુ <br /> કર્યાનો વખત <br /> તથા તેની <br /> તારીખ
                </th>
                <th rowSpan="2">
                  મુસાફરી પુરી <br /> કર્યાનો વખત <br /> તથા તેની <br /> તારીખ
                </th>
                <th colSpan="2">મુસાફરી</th>
                <th rowSpan="2">
                  મુસાફરીનું <br /> કારણ
                </th>
                <th rowSpan="2">
                  રેલગાડી થી <br /> કે પગ રસ્તે
                </th>
                <th rowSpan="2">કેટલા માઈલ</th>
              </tr>
              <tr>
                <th>ક્યાંથી</th>
                <th>ક્યાં સુધી</th>
              </tr>
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
              {travelEntries?.map((row, index) => (
                <tr key={row?.id || index}>
                  <td>
                    {row?.startDate && formatGujaratiDate(row.startDate)}
                    {row?.startTime && (
                      <>
                        <br />
                        {toGujaratiDigits(row.startTime)}
                      </>
                    )}
                  </td>
                  <td>
                    {row?.endDate && formatGujaratiDate(row.endDate)}
                    {row?.endTime && (
                      <>
                        <br />
                        {toGujaratiDigits(row.endTime)}
                      </>
                    )}
                  </td>
                  <td>{row?.from}</td>
                  <td>{row?.to}</td>

                  {index === 0 && (
                    <>
                      <td rowSpan={travelEntries.length}>
                        {travelDefaults?.reason}
                      </td>
                      <td rowSpan={travelEntries.length}>
                        {travelDefaults?.mode}
                      </td>
                      <td rowSpan={travelEntries.length}>
                        {travelDefaults?.distance &&
                          toGujaratiDigits(travelDefaults.distance)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="preview-footer mt-2">
            <p>આપનો વિશ્વાસુ</p>
            <p className="preview-signature">- {user?.name}</p>
          </div>
        </div>

        {/* ==================== PAGE 2: LEAVE DIARY ==================== */}
        <div className="mt-4 preview-page-container shadow-md rounded-sm overflow-hidden">
          <div>
            <p>પ્રતિ,</p>
            <p>સી કંપની કમા. સાહેબ શ્રી,</p>
            <p>રા. અ. પો. દળ જૂથ ૫,</p>
            <p>ગોધરા.</p>
          </div>

          <div className="preview-subject">
            વિષય:- માહે {toGujaratiDigits(month)}/{toGujaratiDigits(year)} ની
            રજા ડાયરી બાબત.
          </div>

          <div className="preview-user-info">
            <span>નામ:- {user?.name}</span>
            <span>હોદ્દો:- {user?.role}</span>
            <span>બ. નં.- {toGujaratiDigits(user?.badgeNo)}</span>
          </div>

          <table className="leave-table-body">
            <thead>
              <tr>
                <th className="p2Col1">અ. નં</th>
                <th className="p2Col2">તારીખ</th>
                <th className="p2Col3">વાર</th>
                <th className="p2Col4">ફરજ સ્થળ</th>
                <th className="p2Col5">રીમાર્કસ</th>
              </tr>
            </thead>
            <tbody>
              {leaveEntries?.map((entry, index) => (
                <tr key={entry?.id || index}>
                  <td>{toGujaratiDigits(index + 1)}</td>
                  <td>{entry?.date && formatGujaratiDate(entry.date)}</td>
                  <td>{entry?.date && getGujaratiWeekday(entry.date)}</td>
                  <td>{entry?.location}</td>
                  <td>{entry?.remarks}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">કુલ દિવસો</td>
                <td>{toGujaratiDigits(leaveEntries?.length || 0)}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="preview-footer mt-2">
            <p>આપનો વિશ્વાસુ</p>
            <p className="preview-signature">- {user?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
