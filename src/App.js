import { useState } from "react";
import CreateMemo from "./CreateMemo";

const App = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("Memos")) || [],
  );
  const [isForm, setIsForm] = useState(false);
  const [formMemo, setFormMemo] = useState("");

  const newMemoId =
    typeof memos[0] !== "undefined" ? memos.slice(-1)[0].id + 1 : 1;

  const handleOpenForm = (memo) => {
    setFormMemo(memo);
    setIsForm(true);
  };

  return (
    <div className="container">
      <div className="memo-index">
        <ul className="memos">
          {memos.map((memo) => (
            <div
              className="memo"
              key={memo.id}
              onClick={() => handleOpenForm(memo)}
            >
              <button>
                <li className="memo-content">{memo.content.split("\n")[0]}</li>
              </button>
            </div>
          ))}

          <button
            onClick={() => handleOpenForm({ id: newMemoId, content: "" })}
          >
            <li className="plus">+</li>
          </button>
        </ul>
      </div>

      <div>
        {isForm && (
          <CreateMemo
            formMemo={formMemo}
            memos={memos}
            setMemos={setMemos}
            isForm={isForm}
            setIsForm={setIsForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
