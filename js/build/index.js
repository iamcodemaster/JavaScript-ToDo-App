"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note(title) {
    _classCallCheck(this, Note);

    this.title = title;
    this.element = this.createElement(title);
  }

  _createClass(Note, [{
    key: "createElement",
    value: function createElement(title) {
      // create needed elements
      var newNote = document.createElement('div');
      var noteContent = document.createElement("p");
      var noteLink = document.createElement("a");

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

  }, {
    key: "add",
    value: function add() {
      document.querySelector(".notes").appendChild(this.element).className = 'card animated zoomInUp';
    }
  }, {
    key: "saveToStorage",
    value: function saveToStorage() {
      localStorage.setItem(this.title, this.title);
    }
  }, {
    key: "remove",
    value: function remove() {

      // remember the note element
      var removedNote = this;

      // delete from local storage also
      localStorage.removeItem(this.firstChild.innerHTML);

      // animate the removed element
      this.className = 'card animated zoomOutUp';
      setTimeout(function () {
        // delete element after animation (after 1 sec)
        removedNote.remove();
      }, 1000);
    }
  }]);

  return Note;
}();

var App = function () {
  function App() {
    _classCallCheck(this, App);

    console.log("👊🏼 The CodeMaster Constructor!");

    this.btnAdd = document.getElementById('btnAddNote');
    this.noteText = document.getElementById("txtAddNote");

    // execute a function when the user use the button
    this.btnAdd.addEventListener("click", this.createNote.bind(this));

    // execute a function when the user releases a key on the keyboard
    this.noteText.addEventListener("keyup", function (e) {
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

  _createClass(App, [{
    key: "loadNotesFromStorage",
    value: function loadNotesFromStorage() {
      for (var i = 0; i < localStorage.length; i++) {
        var note = new Note(localStorage.getItem(localStorage.key(i)));
        note.add();
      }
    }

    // this function will create a new note by using the Note() class

  }, {
    key: "createNote",
    value: function createNote(e) {
      // cancel the default action, if needed
      e.preventDefault();
      var note = new Note(this.noteText.value);

      // add note to the screen
      note.add();

      // add note to the local storage
      note.saveToStorage();

      // reset the the input form
      this.reset();
    }

    // this function will reset the form

  }, {
    key: "reset",
    value: function reset() {
      this.noteText.value = "";
    }
  }]);

  return App;
}();

var app = new App();

//# sourceMappingURL=index.js.map