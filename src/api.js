const key = '19511472-50aab653a67a58395e1eec2d3';
const basicURL = 'https://pixabay.com/api';

export default class Pixabay {
    constructor() {
        this.page = 1;
        this.searchQuery = ''
    }

    async fetchHits() {
        const request = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`
        const response = await fetch(basicURL + request)
        const newResponse = await response.json();
        return newResponse.hits
    }

    addPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}

