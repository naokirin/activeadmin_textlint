const textlintWorker = new Worker("/textlint-worker.js");

// textlintに渡す
function postToTextlint(text) {
  textlintWorker.postMessage({
    command: "lint",
    text: text,
    ext: ".txt",
  });
}

// 最初のtextareaの下にエラーを表示する
function setTextlintResult(result) {
  let textareas = document.getElementsByTagName("textarea");
  if (textareas.length) {
    let textarea = textareas[0];
    let textareaNext = textarea.nextElementSibling;
    let errors;
    if (textareaNext != null && textareaNext.getAttribute("id") === "textlint-errors") {
      errors = textareaNext;
    } else {
      errors = document.createElement('div');
      errors.setAttribute("id", "textlint-errors");
    }
    textarea.parentNode.insertBefore(errors, textarea.nextElementSibling);
    errors.innerHTML = result.join("<br>");
  }
}

// textlintの処理後の結果を受け取る
function registerTextlintCallback() {
  textlintWorker.onmessage = (event) => {
    if (event.data.command === "lint:result") {
      const messages = event.data.result.messages;
      const result = messages.map(
        (message) => `[${message.line}:${message.column}] ${message.message}`
      );
      setTextlintResult(result);
    }
  };
}

// 最初のtextareaからtextlintに値を渡す
let timer;
function startTextlint() {
  registerTextlintCallback();
  let textareas = document.getElementsByTagName("textarea");
  if (textareas.length) {
    let textarea = textareas[0];

    textarea.addEventListener("input", () => {
      // 1秒以上入力がないときにtextlintに渡す
      if (timer) { clearTimeout(timer); }
      timer = setTimeout(() => {
        postToTextlint(textarea.value);
      }, 1000);
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  registerTextlintCallback();
  startTextlint();
});
