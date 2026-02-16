const container = document.getElementById('movie-container');
const searcher = document.getElementById('searcher');
let allMovies = [];

container.innerHTML = '<h2>Loading...</h2>';

if (!navigator.onLine) {
    container.innerHTML = '<h2>No internet connection.</h2>';
} else {
    fetch('https://api.tvmaze.com/shows')
        .then(res => {
            if (!res.ok) {
                throw new Error('API link error or server down');
            }
            return res.json();
        })
        .then(data => {
            allMovies = data;
            render(allMovies);
        })
        .catch(err => {
            container.innerHTML = `<h2>Error: ${err.message}</h2>`;
        });
}

function render(list) {
    if (list.length === 0) {
        container.innerHTML = '<h2>No results found.</h2>';
        return;
    }

    container.innerHTML = '';
    list.forEach(movie => {
        const imgSrc = movie.image ? movie.image.medium : 'https://via.placeholder.com/210x295';
        
        container.innerHTML += `
            <div style="display: inline-block; width: 200px; margin: 10px; text-align: center; vertical-align: top;">
                <img src="${imgSrc}" style="width: 100%; border-radius: 8px;">
                <h3>${movie.name}</h3>
                <p>${movie.genres.join(', ')}</p>
            </div>
        `;
    });
}

searcher.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allMovies.filter(m => 
        m.name.toLowerCase().includes(term) || 
        m.genres.join(' ').toLowerCase().includes(term)
    );
    render(filtered);
});