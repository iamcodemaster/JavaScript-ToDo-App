class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }

  createElement(title){
    // create needed elements
    let newNote = document.createElement('div');
    let noteContent = document.createElement("p");
    let noteLink = document.createElement("a");

    // add needed attributes
    newNote.setAttribute("class", "card");
    noteLink.setAttribute("class", "card-remove");
    noteLink.setAttribute("href", "#");

    // add content
    noteLink.innerHTML = "Remove";
    noteContent.innerHTML = this.title;

    //build note
    newNote.appendChild(noteContent);
    newNote.appendChild(noteLink);

    // click event to remove this note
    noteLink.addEventListener('click', this.remove.bind(newNote));

    return newNote;
  }

  // this function will append the note to the screen somehow
  add(){
    document.querySelector(".notes").appendChild(this.element).className = 'card animated zoomInUp';
  }

  saveToStorage(){
    localStorage.setItem(this.title, this.title);
  }

  remove(){

    // remember the note element
    let removedNote = this;

    // delete from local storage also
    localStorage.removeItem(this.firstChild.innerHTML);

    // animate the removed element
    this.className = 'card animated zoomOutUp';
    setTimeout( () => {
      // delete element after animation (after 1 sec)
      removedNote.remove();
    }, 1000);

  }
}

class App {
  constructor() {
    console.log("👊🏼 The CodeMaster Constructor!");

    this.btnAdd = document.getElementById('btnAddNote');
    this.noteText = document.getElementById("txtAddNote");

    // execute a function when the user use the button
    this.btnAdd.addEventListener("click", this.createNote.bind(this));

    // execute a function when the user releases a key on the keyboard
    this.noteText.addEventListener("keyup", (e) => {
      // cancel the default action, if needed
      e.preventDefault();
      // dnmber 13 is the "Enter" key on the keyboard
      if (e.keyCode === 13) {
        // trigger the button element with a click
        document.getElementById('btnAddNote').click();
      }
    });

    this.loadNotesFromStorage();

  }

  loadNotesFromStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      let note = new Note(localStorage.getItem(localStorage.key(i)));
      note.add();
    }
  }

  // this function will create a new note by using the Note() class
  createNote(e){
    // cancel the default action, if needed
    e.preventDefault();
    let note = new Note(this.noteText.value);

    // add note to the screen
    note.add();

    // add note to the local storage
    note.saveToStorage();

    // reset the the input form
    this.reset();
  }


  // this function will reset the form
  reset(){
    this.noteText.value = "";
  }

}

let app = new App();
