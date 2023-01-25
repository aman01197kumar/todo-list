import React, { useState } from "react";

import "../style/TodoPage.css";

function TodoPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [addtoggleBtn, setAddToggleBtn] = useState(true);
  const [alertBox, setAlertBox] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const addItems = (e) => {
    e.preventDefault();

    if (!title && !text) {
    } else if (!addtoggleBtn) {
      const temp = [...data];
      temp[activeIndex].title = title;
      temp[activeIndex].text = text;
      setActiveIndex(null);
      setAddToggleBtn(true);
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        title: title,
        text: text
      };
      setData([...data, inputData]);
      setTitle("");
      setText("");
    }
  };

  function deleteItem() {
    setAlertBox(true);
  }

  function yesDelete() {
    const dlt = data.filter((item, id) => {
      return id !== activeIndex ? item : null;
    });
    setData([...dlt]);
    setAlertBox(false);
  }
  function noDelete() {
    setAlertBox(false);
  }

  function editBtn(index) {
    let editedItem = data[index];
    setActiveIndex(index);
    setAddToggleBtn(false);
    setText(editedItem.text);
    setTitle(editedItem.title);
  }

  return (
    <>
      {alertBox ? (
        <div className="alertBar">
          <p className="deleteText">Delete this task?</p>
          <button className="yesButtn" onClick={() => yesDelete()}>
            Yes
          </button>
          <button className="noButtn" onClick={() => noDelete()}>
            No
          </button>
        </div>
      ) : null}
      <div
        style={{
          filter: alertBox && "blur(2px)"
        }}
      >
        <header>
          <div className="title">GYIZER</div>
          <div className="subtitle">TODO APP</div>
        </header>

        <div className="flex-container">
          <div className="input-container">
            <input
              placeholder="Title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <input
              placeholder="Input..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          {addtoggleBtn ? (
            <button className="add" onClick={addItems}>
              +
            </button>
          ) : (
            <button className="update" onClick={addItems}>
              UPDATE
            </button>
          )}
        </div>
        <div className="todo-list">
          {data.length !== 0 ? (
            data.map((item, index) => {
              return (
                <div className="task-container">
                  <div className="todo-task">
                    <div className="todo-title" key={index}>
                      {item.title}
                    </div>
                    <divuo className="todo-text" key={index}>
                      {item.text}
                    </divuo>
                  </div>
                  <div className="task-buttons">
                    {activeIndex === index ? (
                      <>
                        <button onClick={() => editBtn(index)} className="edit">
                          <i class="fa fa-pencil"></i>
                        </button>

                        <button
                          onClick={() => deleteItem(index)}
                          className="delete"
                        >
                          x
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                        className="i-button"
                      >
                        i
                      </button>
                    )}{" "}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-taskContainer" style={{ background: "red" }}>
              <div className="border-top"></div>
              <div className="no-task">No tasks</div>
              <div className="border-bottom"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoPage;
