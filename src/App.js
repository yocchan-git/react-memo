import { useState } from "react";
import CreateMemo from "./CreateMemo";
import { IsLoginContext } from "./Context";

const App = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("Memos")) || [],
  );
  const [isForm, setIsForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formMemo, setFormMemo] = useState("");

  const handleOpenForm = (memo) => {
    setFormMemo(memo);
    setIsForm(true);
  };

  const handleSaveMemo = (memo) => {
    let newMemos;
    if (memo.id) {
      newMemos = memos.map((m) =>
        m.id === memo.id ? { ...m, content: memo.content } : m,
      );
    } else {
      memo.id = crypto.randomUUID();
      newMemos = [...memos, memo];
    }

    addNewMemos(newMemos);
  };

  const handleDeleteMemo = (id) => {
    const newMemos = memos.filter((memo) => memo.id !== id);
    addNewMemos(newMemos);
  };

  const addNewMemos = (newMemos) => {
    setMemos(newMemos);
    setIsForm(!isForm);
    localStorage.setItem("Memos", JSON.stringify(newMemos));
  };

  return (
    <IsLoginContext.Provider value={isLogin}>
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
                  <span className="memo-content fs-2">
                    {memo.content.split("\n")[0]}
                  </span>
                </button>
              </li>
            ))}

            <li onClick={() => handleOpenForm({ id: "", content: "" })}>
              <button className="fs-2">+</button>
            </li>
          </ul>
        </div>

        <div>
          <div>
            <button
              className="login-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "ログアウト" : "ログイン"}
            </button>
          </div>
          {isForm && (
            <CreateMemo
              formMemo={formMemo}
              onSave={handleSaveMemo}
              onDelete={handleDeleteMemo}
            />
          )}
        </div>
      </div>
    </IsLoginContext.Provider>
  );
};

export default App;
