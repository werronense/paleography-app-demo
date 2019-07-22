const transcription = [
  "Veni creator sp(irit)us men",
  "tes tuorum uisita i(m)",
  "ple superna gratia que tu",
  "creasti peccora",
  "Memento salutis auctor",
  "quod n(ost)ri quondam corporis",
  "ex illibata uirgine nascendo",
  "formam sumpseris"
]

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".user-input");

  function createLine(number) {
    const newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.id = `line-${number}`;
    newLine.setAttribute("contenteditable", "true");
    newLine.addEventListener('keyup', function(e) {
      cleanLine(e);
      assessInput(e);
    });

    return newLine;
  }

  function cleanLine(e) {
    const lineId = e.target.id;
    const currentLine = document.getElementById(lineId);
    const textLine = lineId.slice(lineId.length - 1) - 1;

    for (let currentNode = currentLine.firstChild; currentNode; currentNode = currentNode.nextSibling) {
      if (!currentNode.textContent) {
        currentLine.removeChild(currentNode);
      } else if (currentNode.nodeType === 3 || currentNode.textContent.length > 1) {
        let content = currentNode.textContent;
        const contentLength = content.length;

        for (let i = 0; i < contentLength; i++) {
          const newSpan = document.createElement('span');
          const newTextNode = document.createTextNode(content.slice(0, 1));
          content = content.slice(1);

          //add text to new span
          newSpan.appendChild(newTextNode);

          //insert span then remove old text node
          currentLine.insertBefore(newSpan, currentNode);
        }

        currentLine.removeChild(currentNode);
      }

    }
  }

  function assessInput(e) {
    const lineId = e.target.id;
    const currentLine = document.getElementById(lineId);
    const textLine = lineId.slice(lineId.length - 1) - 1;
    let letters = [];
    let nodeIndex = 0;

    for (let currentNode = currentLine.firstChild; currentNode; currentNode = currentNode.nextSibling) {
      const letter = currentNode.textContent;
      letters.push(letter);

      if (letter !== transcription[textLine][nodeIndex]) {
        currentNode.setAttribute('class', 'incorrect');
      } else if (currentNode.textContent === transcription[textLine][nodeIndex]) {
        currentNode.setAttribute('class', 'correct');
      }
      nodeIndex++;
    }

    // resolves an issue with &nbsp characters in some browsers
    letters = letters.map((char) => {
      if (char.charCodeAt(0) === 160) {
        return ' ';
      } else {
        return char;
      }
    });

    if (letters.join('') === transcription[textLine]) {
      currentLine.classList.add("entry-perfect");
      currentLine.setAttribute('contenteditable', 'false');
      currentLine.blur();

      // searches for a new line to assign focus
      const allLines = document.querySelectorAll(".line");
      const incomplete = Array.from(allLines).filter(node => node.getAttribute("contenteditable") === "true");
      //console.log(incomplete);
      if (incomplete.length > 0) {
        const focusTarget = incomplete[0].getAttribute("id");
        //console.log(document.querySelector(`#${focusTarget}`));
        document.querySelector(`#${focusTarget}`).focus();
      }
    }
  }

  for (i = 1; i <= 8; i++) {
    input.appendChild(createLine(i));
  }
});
