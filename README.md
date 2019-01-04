# Sticky Node made by Nan Da

This is a technical assessment requested by Maltem Consulting Group (Singapore). This project was developed in regard of https://github.com/TheodoreGC/sticky-note.
Main functionalities of this project include:
  - Add new note with title and content
  - Find note by the title
  - Delete note

## Technology Stack
The project was developed using below libraries and frameworks:
* [ReactJS](https://reactjs.org/) - A Javascript library for building user interfaces
* [Materialize](https://materializecss.com/) - A modern responsive front-end framework based on material design
* [sweetalert](https://sweetalert.js.org/) - A library to display error and warning popups beautifully

### Installation and Setup
The project requires [Node.js](https://nodejs.org/) to run.
Versions during this project development: NodeJS v8.11.4 & npm 6.4.1

Clone the repo:
```
git clone https://github.com/nanda248/nanda-sticky-note.git
```

Install the dependencies and start the server:

```sh
$ cd nanda-sticky-note
$ npm install
$ npm start
```
Then the server should be running on http://localhost:3000/

### Peoject Summary
It is a simple sticky note project where user can simply add and delete sticky notes.

**Adding note** 
Error messages will be prompted to user for following actions.
- User cannot add note with empty title and content.
- User cannot enter more than 10 words in title and 30 words in content

**Searching for note**
- User can find the notes by the title
- Search is immediate as user types regardless of upper and lower case
- Search will return No Result if matching word is not found

**Deleting note**
- User will be prompted verification popup window to confirm delete action
- Deleted notes cannot be recovered

**Limitations: **
Since the project has no backend and DB, all data will be refreshed to initial state when the page is reloaded. There are 4 sample sticky notes at the initial state. There is no edit feature of the notes as per test instruction. 

License
----
Copyright of NanDa
