let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
render();
}

  function render() {
    let contentDiv = document.getElementById('content');
    let tableHtml = '<table>';

    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let symbol = fields[index] ? fields[index] : '';
        tableHtml += `<td>${symbol}</td>`;
      }
      tableHtml += '</tr>';
    }

    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
  }

  