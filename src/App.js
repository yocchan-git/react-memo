import { useState } from "react";
import CreateMemo from "./CreateMemo";

const App = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("Memos")) || [],
  );
  const [isForm, setIsForm] = useState(false);
  const [formMemo, setFormMemo] = useState("");

  const newMemoId = crypto.randomUUID();

  const handleOpenForm = (memo) => {
    setFormMemo(memo);
    setIsForm(true);
  };

  return (
    <div className="container">
      <div className="memo-index">
        <ul className="memos">
          {memos.map((memo) => (
            <li
              className="memo"
              key={memo.id}
              onClick={() => handleOpenForm(memo)}
            >
              <button>
                <div className="memo-content fs-2">{memo.content.split("\n")[0]}</div>
              </button>
            </li>
          ))}

          <li
            onClick={() => handleOpenForm({ id: newMemoId, content: "" })}
          >
            <button className="fs-2">+</button>
          </li>
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
