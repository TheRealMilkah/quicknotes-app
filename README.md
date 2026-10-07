# QuickNotes App

QuickNotes is a simple, fast and responsive note-taking web application built with vanilla HTML, CSS and JavaScript. It allows users to capture quick thoughts, organize them by category (Personal, Work, Study), search through them instantly, and keeps everything saved automatically in the browser so notes survive page refreshes.

## Features
- Add notes with text, category (Personal, Work, Study) and timestamp
- Delete individual notes with unique ID (no index shifting)
- Live search that filters notes as you type (case-insensitive)
- Validation for empty notes and 200-character limit
- Dynamic note counter (0, 1, many)
- Data persistence using localStorage with safe JSON parsing
- Responsive design with Flexbox form and category colour-coding
- Bonus: Clear all notes with confirmation dialog

## How to run the project locally
1. Clone the repository:
   git clone https://github.com/TheRealMilkah/quicknotes-app.git
2. Navigate into the project folder:
   cd quicknotes-app
3. Open index.html in your browser:
   - Double-click the file in File Explorer, or
   - Drag and drop index.html into Chrome, or
   - In VS Code: Right-click index.html -> Open with Live Server
No dependencies or build step required. The app runs 100% in the browser.

## What I learned
While building QuickNotes I practiced three key concepts:

1. Secure DOM manipulation and XSS prevention: I learned to build UI safely using document.createElement and textContent instead of innerHTML for user inputs. This prevents script injection. I also used Date.now() for unique IDs so delete operations target the correct note without relying on array indexes.

2. State management and persistence with localStorage: I implemented state as an array of note objects and synced it with localStorage using JSON.stringify and JSON.parse with try/catch for safe parsing. I learned how to load on page start, save after every mutation, and keep the UI in sync after refresh.

3. Responsive design and semantic HTML accessibility: I structured the page with semantic tags header, main, section, footer and linked labels to inputs for accessibility. Using Flexbox for the form and a media query max-width 600px I made the layout stack vertically on mobile, and used category-based left-border colours and badges to communicate metadata clearly.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
