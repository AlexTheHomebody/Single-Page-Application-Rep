var $body = $('#body');

fetch('http://localhost:7777/api/workers')
    .then(response=> response.json())
    .then(data => {
        data.forEach(workers =>{
            var workerElement = document.createElement('li');
            workerElement.innerHTML = `${workers.first_name} ${workers.last_name}- department number ${workers.depart_id}`;
            console.log(workerElement);
            $body.append(workerElement);
        })
    });