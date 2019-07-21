document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".user-input");

  function createLine(number) {
    const newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.id = `line-${number}`;
    newLine.setAttribute("contenteditable", "true");

    return newLine;
  }

  for (i = 1; i <= 8; i++) {
    input.appendChild(createLine(i));
  }
});
