const container = document.getElementById("movie-container");

fetch("https://api.tvmaze.com/shows")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(peli => {
            const movieCard = `
                <div class="movie-card">
                    <img src="${peli.image ? peli.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${peli.name}">
                    <h2>${peli.name}</h2>
                    <p><strong>Géneros:</strong> ${peli.genres.length > 0 ? peli.genres.join(", ") : "N/A"}</p>
                </div>
            `;
            container.innerHTML += movieCard;
        });
    })
    .catch(error => {
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error(error);
    });
