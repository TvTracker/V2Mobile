// Load data from local storage with debugging
let series = JSON.parse(localStorage.getItem('series')) || [];
console.log('Loaded series from localStorage:', series);

function addSeries() {
    const name = document.getElementById('series-name').value;
    const season = parseInt(document.getElementById('season').value);

    if (!name || !season) {
        alert('Please enter a series name and season.');
        return;
    }

    const newSeries = {
        name: name,
        season: season,
        episode: 1
    };

    series.push(newSeries);
    localStorage.setItem('series', JSON.stringify(series));
    console.log('Added series, new data:', series);
    document.getElementById('series-name').value = '';
    document.getElementById('season').value = '';
    loadSeries();
}

function loadSeries() {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = '';

    series.forEach((seriesItem, index) => {
        const div = document.createElement('div');
        div.className = 'series';
        div.innerHTML = `
            <h3>${seriesItem.name} - Season ${seriesItem.season}, Episode ${seriesItem.episode}</h3>
            <button class="finished-btn" onclick="finishEpisode(${index})">Finished Episode</button>
            <button class="delete-btn" onclick="deleteSeries(${index})">Delete Series</button>
        `;
        seriesList.appendChild(div);
    });
}

function finishEpisode(index) {
    series[index].episode++;
    localStorage.setItem('series', JSON.stringify(series));
    console.log('Updated episode, new data:', series);
    loadSeries();
}

function deleteSeries(index) {
    series.splice(index, 1);
    localStorage.setItem('series', JSON.stringify(series));
    console.log('Deleted series, new data:', series);
    loadSeries();
}

// Load series on page load
window.onload = loadSeries;