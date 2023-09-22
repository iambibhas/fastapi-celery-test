// custom javascript

(function() {
  console.log('Sanity Check!');
})();

function handleClick(type) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: type }),
  })
  .then(response => response.json())
  .then(data => getStatus(data.task_id));
}

function getStatus(taskID) {
  fetch(`/tasks/${taskID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    const html = `
      <tr>
        <td>${taskID}</td>
        <td>${data.task_status}</td>
        <td>${data.task_result}</td>
      </tr>`;
    // document.getElementById('tasks').prepend(html);
    const newRow = document.getElementById('tasks').insertRow();
    newRow.innerHTML = html;
    const taskStatus = data.task_status;
    if (taskStatus === 'SUCCESS' || taskStatus === 'FAILED') return false;
    setTimeout(function() {
      getStatus(data.task_id);
    }, 1000);
  })
  .catch(err => console.log(err));
}
