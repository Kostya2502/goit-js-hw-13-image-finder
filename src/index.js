import './styles.css';
import Pixabay from './api'
import templates from './templates.hbs'

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    scroll: document.querySelector('#scroll'),
}

const pixabay = new Pixabay();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault()
    pixabay.query = event.currentTarget.elements.query.value
    if (pixabay.query === '') {
        return alert('write something...')
    }

    pixabay.resetPage()
    clearHits()

    pixabay.fetchHits().then(hits => { addMarkup(hits); pixabay.addPage() })
}

function clearHits() {
    refs.gallery.innerHTML = ''
}

function addMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', templates(hits))
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && pixabay.query !== '') {
            pixabay.fetchHits().then(hits => {
                addMarkup(hits);
                pixabay.addPage();
            });
        }
    });
};

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '200px',
});
observer.observe(refs.scroll);