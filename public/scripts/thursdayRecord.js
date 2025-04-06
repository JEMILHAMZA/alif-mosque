

document.addEventListener('DOMContentLoaded', (event) => {
    let currentPage = parseInt(document.getElementById('announcement-container').dataset.page) || 1;

    document.getElementById('show-more').addEventListener('click', function() {
        const nextPage = currentPage + 1;

        fetch(`/thursdayrecords?page=${nextPage}`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newRecords = doc.getElementById('announcement-container').innerHTML;

                document.getElementById('announcement-container').insertAdjacentHTML('beforeend', newRecords);

                if (!doc.getElementById('show-more')) {
                    document.getElementById('show-more').remove();
                } else {
                    currentPage = nextPage;
                }
            })
            .catch(error => console.error('Error fetching more records:', error));
    });
});

