// For main Page
// Search Button 
document.querySelector('.search').addEventListener('click', function(){

    var searchurl = "index.html"

    window.location.href = searchurl;

});

//Post Button
document.querySelector('.post').addEventListener('click', function(){
    var posturl = 'post.html'

    window.location.href = posturl
});

document.querySelector('.reset').addEventListener('click', function(){
    var reset = 'index.html'

    window.location.href = reset
})



function searchPerson() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (searchInput.trim() === '') {
        resultDiv.innerHTML = '<p>Naam toh Daal ;)</p>';
        return;
    }

    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=300&titles=${encodeURIComponent(searchInput)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];

            if (page.missing) {
                resultDiv.innerHTML = '<p>No results found.</p>';
            } else {
                const imageUrl = page.thumbnail ? page.thumbnail.source : '';
                const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="${page.title}">` : '';

                resultDiv.innerHTML = `
                    <div class="result-container">
                        ${imageHtml}
                        <h2>${page.title}</h2>
                        <p>${page.extract}</p>
                        <a href="https://en.wikipedia.org/?curid=${page.pageid}" target="_blank">Read more on Wikipedia</a>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = '<p>An error occurred. Please try again and Recheck name of the Person</p>';
        });
}
