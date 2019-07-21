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
    var lineId = e.target.id;
    var currentLine = document.getElementById(lineId);
    var textLine = lineId.slice(lineId.length - 1) - 1;

    for (var currentNode = currentLine.firstChild; currentNode; currentNode = currentNode.nextSibling) {
      if (!currentNode.textContent) {
        currentLine.removeChild(currentNode);
        //console.log('empty node');
      } else if (currentNode.nodeType === 3 || currentNode.textContent.length > 1) {
        var content = currentNode.textContent;
        var contentLength = content.length;

        for (var i = 0; i < contentLength; i++) {
          var newSpan = document.createElement('span');
          var newTextNode = document.createTextNode(content.slice(0, 1));
          content = content.slice(1);

          //add text to new span
          newSpan.appendChild(newTextNode);

          //insert span then remove old text node
          currentLine.insertBefore(newSpan, currentNode);
        }

        currentLine.removeChild(currentNode);
      }

    }
    //console.log(currentLine); //test
  }

  function assessInput(e) {
    var lineId = e.target.id;
    var currentLine = document.getElementById(lineId);
    var textLine = lineId.slice(lineId.length - 1) - 1;
    var letterArray = [];
    var nodeIndex = 0;

    for (var currentNode = currentLine.firstChild; currentNode; currentNode = currentNode.nextSibling) {
      var letter = currentNode.textContent;
      letterArray.push(letter);

      if (letter !== transcription[textLine][nodeIndex]) {
        currentNode.setAttribute('class', 'incorrect');
      } else if (currentNode.textContent === transcription[textLine][nodeIndex]) {
        currentNode.setAttribute('class', 'correct');
      }
      nodeIndex++;
    }

    //attempt to deal with &nbsp issue; successful
    letterArray = letterArray.map(function(char) {
      if (char.charCodeAt(0) === 160) {
        return ' ';
      } else {
        return char;
      }
    });
    //console.log(letterArray); //test

    if (letterArray.join('') === transcription[textLine]) {
      currentLine.classList.add("entry-perfect");
      currentLine.blur();
      currentLine.setAttribute('contenteditable', 'false');
      //console.log(currentLine); //test
    }
  }

  for (i = 1; i <= 8; i++) {
    input.appendChild(createLine(i));
  }
});
