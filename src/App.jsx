import { useState } from "react";

import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import TravelAndLeaveDiary from "./components/diary/TravelAndLeaveDiary";

export default function App() {
  const [selectedDiary, setSelectedDiary] =
    useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {selectedDiary ? (
        <EditorPage
          diary={selectedDiary}
          onBack={() =>
            setSelectedDiary(null)
          }
          onUpdateDiary={setSelectedDiary}
        />
      ) : (
        <HomePage
          onOpenDiary={setSelectedDiary}
          onCreateDiary={setSelectedDiary}
        />
      )}
    </div>
    // preview -> travel and leaver diary, share-> filterd data(!અં !આં ) PdfDcument. 
    // <TravelAndLeaveDiary/>
  );
}