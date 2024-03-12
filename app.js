document.addEventListener('DOMContentLoaded', function () {
    const firstPage = document.getElementById('firstPage');
    const secondPage = document.getElementById('secondPage');
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const apiDataBody = document.getElementById('apiDataBody');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('errorContainer');     
    const loadDataButton = document.getElementById('loadDataButton');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    loadDataButton.addEventListener('click', function () {
  
        loader.style.display = 'block';
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';

        loadData();
    });

    searchButton.addEventListener('click', performSearch);
    // $(".sortButton").on("click", function () {
    //     var column = $(this).data("column");
    //     var order = $(this).hasClass("asc") ? "desc" : "asc";
    //     $("#apiDataTable tbody").find("tr").sort(function (a, b) {
    //         var aValue = $(a).find("td").eq(column).text();
    //         var bValue = $(b).find("td").eq(column).text();
    //         var compareResult;
    //         if (column === 0) {
    //             compareResult = order === "asc" ? parseInt(aValue) - parseInt(bValue) : parseInt(bValue) - parseInt(aValue);
    //         } else {
    //             compareResult = order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    //         }

    //         return compareResult;
    //     }).appendTo("#apiDataTable tbody");

        
    //     $(this).toggleClass("asc desc");

    //     $(".sortButton").not(this).removeClass("asc desc");
    // });  
    function sortTable(column) {
        var order = this.classList.contains("asc") ? "desc" : "asc";
    
        Array.from(apiDataTable.querySelectorAll('tbody tr'))
            .sort(function (a, b) {
                var aValue = a.querySelector('td:nth-child(' + (column + 1) + ')').textContent;
                var bValue = b.querySelector('td:nth-child(' + (column + 1) + ')').textContent;

                var compareResult;
                if (column === 0) {
                    compareResult = order === "asc" ? parseInt(aValue) - parseInt(bValue) : parseInt(bValue) - parseInt(aValue);
                } else {
                    compareResult = order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
    
                return compareResult;
            })
            .forEach(function (row) {
                apiDataTable.querySelector('tbody').appendChild(row);
            });
        this.classList.toggle("asc");
        this.classList.toggle("desc");
        Array.from(document.querySelectorAll(".sortButton"))
            .filter(button => button !== this)
            .forEach(button => {
                button.classList.remove("asc", "desc");
            });
    }
    
    document.querySelectorAll(".sortButton").forEach(function (button, index) {
        button.addEventListener("click", function () {
            sortTable.call(this, index);
        });
    });
    
    function loadData() {
        loader.style.display = 'block';

        setTimeout(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayData(data);
                
                searchContainer.style.display = 'block';
                wrapper.style.display = 'block';
                loader.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                errorContainer.textContent = `Error fetching data: ${error.message}`;
            })
            .finally(() => {
                loader.style.display = 'none';
            });
        }, 2000);
    }

  
    function displayData(data) {
        apiDataTable.style.display = 'table'; // Display the table
        apiDataBody.innerHTML = '';
        // const filteredData = data.filter(item => item.userId === 1);
        data.forEach(item => {
           
            const row = apiDataBody.insertRow();
            const userIdCell = row.insertCell(0);
            const titleCell = row.insertCell(1);
            const bodyCell = row.insertCell(2);

            userIdCell.textContent = item.id || 'N/A';
            titleCell.textContent = item.title || 'N/A';
            bodyCell.textContent = item.body || 'N/A';
        });
       
    }
    function performSearch() {
        const searchText = searchInput.value.toLowerCase();
        const rows = apiDataBody.querySelectorAll('tr');
        rows.forEach(row => {
            const userIdCell = row.querySelector('td:nth-child(1)');
const titleCell = row.querySelector('td:nth-child(2)');
const bodyCell = row.querySelector('td:nth-child(3)');

const userIdText = userIdCell.textContent.toLowerCase();
const titleText = titleCell.textContent.toLowerCase();
const bodyText = bodyCell.textContent.toLowerCase();


            if (userIdText.includes(searchText) || titleText.includes(searchText) || bodyText.includes(searchText)) {
                row.style.display = ''; 
            } else {
                row.style.display = 'none'; 
            }
        });
    }
});

