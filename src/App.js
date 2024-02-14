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

  const newMemoId =
    typeof memos[0] !== "undefined" ? memos.slice(-1)[0].id + 1 : 1;

  const handleOpenForm = (memo) => {
    setFormMemo(memo);
    setIsForm(true);
  };

  return (
    <IsLoginContext.Provider value={isLogin}>
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
                  <li className="memo-content">
                    {memo.content.split("\n")[0]}
                  </li>
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
              memos={memos}
              setMemos={setMemos}
              isForm={isForm}
              setIsForm={setIsForm}
            />
          )}
        </div>
      </div>
    </IsLoginContext.Provider>
  );
};

export default App;
