import { useState } from "react";

import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";

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
        />
      )}
    </div>
  );
}