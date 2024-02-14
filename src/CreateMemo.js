import { useState, useEffect } from "react";

const CreateMemo = ({ formMemo, memos, setMemos, isForm, setIsForm }) => {
  const [memo, setMemo] = useState(formMemo.content);
  const isFormMemo = memos.find((m) => m.id === formMemo.id);

  useEffect(() => {
    setMemo(formMemo.content);
  }, [formMemo]);

  const handleSave = () => {
    let newMemos;
    if (isFormMemo) {
      newMemos = memos.map((m) =>
        m.id === formMemo.id ? { ...m, content: memo } : m,
      );
    } else {
      newMemos = [...memos, { id: formMemo.id, content: memo }];
    }

    addNewMemos(newMemos);
  };

  const handleDelete = (id) => {
    const newMemos = memos.filter((memo) => memo.id !== id);
    addNewMemos(newMemos);
  };

  const addNewMemos = (newMemos) => {
    setMemos(newMemos);
    setIsForm(!isForm);
    localStorage.setItem("Memos", JSON.stringify(newMemos));
  };

  return (
    <>
      <textarea
        placeholder="メモを入力して下さい"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      <div className="form-button">
        <button className="btn btn--blue btn--radius" onClick={handleSave}>
          {isFormMemo ? "編集" : "追加"}
        </button>
        {isFormMemo && (
          <button
            className="btn btn--blue btn--radius"
            onClick={() => handleDelete(formMemo.id)}
          >
            削除
          </button>
        )}
      </div>
    </>
  );
};

export default CreateMemo;
