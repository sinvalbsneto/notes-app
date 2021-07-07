function registerNote() {
  let title = document.getElementById("title").value;
  let note = document.getElementById("note").value;
  let created_at = new Date().toLocaleString();

  let noteData = {
    title: title,
    note: note,
    created_at: created_at
  };

  let dataString = JSON.stringify(noteData);

  if (typeof (Storage) !== 'undefined') {

    localStorage.setItem(title, dataString);
    alert("Note registered successfully.");
    window.location.reload();

  } else {
    alert("Sorry, your browser doesn't support localStorage");
  }
}

function showNotes(dataObj) {
  let title = dataObj.title;
  return `<li class="list-group-item list-item" id="${title}" onclick="getOneNote('${title}')">${title}</li>`;
}

function getNotes() {
  let notesList = document.getElementById("notes-list");

  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  if (values.length < 1) {
    let deleteAllNotesBtn = document.getElementById("delete-notes-btn");
    deleteAllNotesBtn.classList.add('hidden');
    notesList.innerHTML = "<h5>There's no notes here.</h5>";
  }

  values.forEach(note => {
    let dataObj = JSON.parse((note));

    notesList.innerHTML += showNotes(dataObj);
  });
}

function showNoteInList(noteObj) {
  let notesList = document.getElementById("notes-list");
  notesList.innerHTML = `
    <li class="list-group-item">
      <div class="row">
        <div class="row">
          <div class="col-4 float-end">
            <button class="btn" onclick="window.location.reload()">
              <span><i class="bi bi-x"></i></span>
            </button>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="row">
            <h4>${noteObj.title}</h4>
          </div>
          <br>
          <div class="row">
            <p>${noteObj.note}</p>
          </div>
          <div class="row">
            <p style="font-size: 90%;">${noteObj.created_at}</p>
          </div>
          <div class="row">
            <div class="col-2 float-end">
              <button class="btn edit-btn float-start" onclick="setEditMode('${noteObj.title}')">
                <span><i class="bi bi-pencil"></i></span>
              </button>
            </div>
            <div class="col float-start">
              <button class="btn remove-btn float-start" onclick="removeNote('${noteObj.title}')">
                <span><i class="bi bi-trash"></i></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
}

function getOneNote(title) {
  let note = localStorage.getItem(title);
  let noteObj = JSON.parse(note);

  showNoteInList(noteObj);
}

function setEditMode(title) {
  let pageTitle = document.getElementById("page-title");
  pageTitle.innerHTML = "Edit Note";

  let form = {
    title: document.getElementById("title"),
    note: document.getElementById("note")
  };

  let note = localStorage.getItem(title);
  let noteObj = JSON.parse(note);

  form.title.value = noteObj.title;
  form.note.value = noteObj.note;

  let submitBtn = document.getElementById("submit-btn");
  submitBtn.innerHTML = "Edit note";
}

function removeNote(title) {
  localStorage.removeItem(title);
  alert("Note deleted successfully.")
  window.location.reload();
}

function clearAllNotes() {
  localStorage.clear();
  alert("Successfully deleted notes.")
  window.location.reload();
}