const container = document.getElementById('movie-container');
const searcher = document.getElementById('searcher');
let allMovies = [];

fetch('https://api.tvmaze.com/shows')
    .then(res => res.json())
    .then(data => {
        allMovies = data;
        render(allMovies);
    });

function render(list) {
    container.innerHTML = '';
    list.forEach(movie => {
        container.innerHTML += `
            <div style="display: inline-block; width: 200px; margin: 10px; vertical-align: top; text-align: center;">
                <img src="${movie.image.medium}" style="width: 100%; border-radius: 8px;">
                <h3 style="font-size: 16px;">${movie.name}</h3>
                <p style="font-size: 12px; color: gray;">${movie.genres.join(', ')}</p>
            </div>
        `;
    });
}

searcher.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allMovies.filter(movie => 
        movie.name.toLowerCase().includes(term) || 
        movie.genres.join(' ').toLowerCase().includes(term)
    );
    render(filtered);
});