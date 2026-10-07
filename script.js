const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');
let notes = [];
function loadNotes() {
  const stored = localStorage.getItem('quicknotes');
  if (stored) {
    try { notes = JSON.parse(stored); } catch { notes = []; }
  }
}
function saveNotes() { localStorage.setItem('quicknotes', JSON.stringify(notes)); }
function updateCount(filteredNotes) {
  const list = filteredNotes || notes;
  if (list.length === 0 && searchInput.value.trim() === '') {
    noteCount.textContent = 'You have no notes yet.';
  } else if (list.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${list.length} notes.`;
  }
}
function render() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let filtered = notes;
  if (searchTerm) { filtered = notes.filter(note => note.text.toLowerCase().includes(searchTerm)); }
  notesList.textContent = '';
  if (searchTerm && filtered.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No notes match your search.';
    li.style.fontStyle = 'italic';
    li.style.color = '#777';
    notesList.appendChild(li);
    updateCount(filtered);
    return;
  }
  filtered.forEach(note => {
    const li = document.createElement('li');
    li.classList.add(`category-${note.category.toLowerCase()}`);
    const topDiv = document.createElement('div');
    topDiv.className = 'note-top';
    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => { deleteNote(note.id); });
    topDiv.appendChild(textP);
    topDiv.appendChild(deleteBtn);
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';
    const categorySpan = document.createElement('span');
    categorySpan.className = 'category-label';
    categorySpan.textContent = note.category;
    const dateSpan = document.createElement('span');
    dateSpan.textContent = note.createdAt;
    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);
    li.appendChild(topDiv);
    li.appendChild(metaDiv);
    notesList.appendChild(li);
  });
  updateCount(filtered);
}
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  render();
}
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  errorMessage.textContent = '';
  if (text === '') { errorMessage.textContent = 'Please type a note first.'; return; }
  if (text.length > 200) { errorMessage.textContent = 'Notes must be 200 characters or fewer.'; return; }
  const newNote = { id: Date.now(), text: text, category: noteCategory.value, createdAt: new Date().toLocaleString() };
  notes.unshift(newNote);
  saveNotes();
  render();
  noteInput.value = '';
  noteInput.focus();
});
searchInput.addEventListener('input', () => { render(); });
clearAllBtn.addEventListener('click', () => {
  if (notes.length === 0) return;
  if (confirm('Delete all notes?')) { notes = []; saveNotes(); render(); }
});
loadNotes();
render();
// validation and delete added
