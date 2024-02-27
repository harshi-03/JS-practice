document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const apiDataBody = document.getElementById('apiDataBody');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('errorContainer');
    loader.style.display = 'block';
    setTimeout(() => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            errorContainer.textContent = `Error fetching data: ${error.message}`;
        })
        .finally(() => {
   
            loader.style.display = 'none';
        });
    }, 2000);
  
    function displayData(data) {

        data.forEach(item => {
           
            const row = apiDataBody.insertRow();
            const userIdCell = row.insertCell(0);
            const titleCell = row.insertCell(1);
            const bodyCell = row.insertCell(2);

            userIdCell.textContent = item.userId || 'N/A';
            titleCell.textContent = item.title || 'N/A';
            bodyCell.textContent = item.body || 'N/A';
        });
    }
});
