import { useState, useEffect, useContext } from "react";
import { IsLoginContext } from "./Context.js";

const CreateMemo = ({ formMemo, onSave, onDelete }) => {
  const [memo, setMemo] = useState(formMemo.content);
  const isLogin = useContext(IsLoginContext);

  useEffect(() => {
    setMemo(formMemo.content);
  }, [formMemo]);

  return (
    <>
      <textarea
        placeholder="メモを入力して下さい"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      {isLogin && (
        <div className="form-button">
          <button
            className="btn btn--blue btn--radius"
            onClick={() => onSave({ id: formMemo.id, content: memo })}
          >
            {formMemo.id ? "編集" : "追加"}
          </button>
          {formMemo.id && (
            <button
              className="btn btn--blue btn--radius"
              onClick={() => onDelete(formMemo.id)}
            >
              削除
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CreateMemo;
