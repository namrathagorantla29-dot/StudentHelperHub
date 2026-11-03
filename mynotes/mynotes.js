// =======================
// AUTHENTICATION CHECK
// =======================

const token = localStorage.getItem("token");

console.log("My Notes token:", token);

if (!token) {
    alert("No token found!");
    window.location.href = "auth/login.html";
}

// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("load", function () {

    if (window.location.pathname.includes("mynotes.html")) {

        let userName = localStorage.getItem("userName");

        if (!token) {
            window.location.href = "../auth/login.html";
            return;
        }

        let welcomeText =
            document.getElementById("welcomeText");

        if (welcomeText) {
            welcomeText.innerText =
                "Welcome, " + userName + " 👋";
        }

        // Theme Load
        let savedTheme =
            localStorage.getItem("siteTheme");

        if (savedTheme) {
            document.body.classList.add(
                savedTheme + "-theme"
            );
        }

        loadNotes();
    }
});

// ===============================
// GLOBAL EDIT ID
// ===============================

let editId = null;

// ===============================
// ADD NOTE
// ===============================

async function addNote() {

    let title =
        document.getElementById("title");

    let content =
        document.getElementById("content");

    let category =
        document.getElementById("category");

    let msg =
        document.getElementById("msg");

    if (!title || !content || !category || !msg) {
        console.log("Missing HTML Elements");
        return;
    }

    let noteTitle =
        title.value.trim();

    let noteContent =
        content.value.trim();

    let noteCategory =
        category.value;

    // Validation

    if (noteTitle === "" || noteContent === "") {

        msg.innerText =
            "Please fill all fields.";

        msg.style.color = "red";

        return;
    }

    let url =
        "http://localhost:5000/add-note";

    let bodyData = {
        title: noteTitle,
        content: noteContent,
        category: noteCategory
    };

    // UPDATE NOTE

    if (editId !== null) {

        url =
            "http://localhost:5000/update-note";

        bodyData = {
            id: editId,
            title: noteTitle,
            content: noteContent,
            category: noteCategory
        };
    }

    try {

        let response =
            await fetch(url, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify(bodyData)
            });

        let data =
            await response.json();

        console.log("ADD NOTE RESPONSE:", data);

        msg.innerText =
            data.message || "Success";

        msg.style.color =
            "green";

        // Clear Fields

        title.value = "";
        content.value = "";

        editId = null;

        document.getElementById("saveBtn")
            .innerText = "Save Note";

        loadNotes();
    }

    catch (error) {

        console.log("ADD NOTE ERROR:", error);

        msg.innerText =
            "Server Error";

        msg.style.color =
            "red";
    }
}

// ===============================
// LOAD NOTES
// ===============================

async function loadNotes() {

    let notesList = document.getElementById("notesList");

    if (!notesList) return;

    try {

        const response = await fetch(
            "http://localhost:5000/notes",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);
        console.log("IS ARRAY:", Array.isArray(data));

        // ...rest of your existing code

        notesList.innerHTML = "";

        // If backend sends object instead of array
        let notes = data;

        if (data.notes) {
            notes = data.notes;
        }

        if (!Array.isArray(notes)) {

            notesList.innerHTML = `
                <p style="color:red;">
                    Backend is not returning notes array.
                </p>
            `;

            console.log("Returned Data:", data);
            return;
        }

        if (notes.length === 0) {

            notesList.innerHTML = `
                <p style="color:gray;">
                    No notes available.
                </p>
            `;

            return;
        }

        notes.sort(function(a,b){
            return (b.pinned || 0) - (a.pinned || 0);
        });

        notes.forEach(function(note){

            let card = document.createElement("div");

            card.className =
                note.pinned == 1
                ? "note-card pinned-card"
                : "note-card";

            card.innerHTML = `

                <div class="category-badge">
                    ${note.category || "Study"}
                </div>

                <h3>${note.title}</h3>

                <p>
                    ${note.is_locked == 1
                        ? "🔒 Locked Note"
                        : note.content}
                </p>

                <small>
                    ${
                        note.created_at
                        ? new Date(note.created_at)
                            .toLocaleString()
                        : ""
                    }
                </small>

                <br><br>

                <button onclick='editNote(
                    "${note.id}",
                    ${JSON.stringify(note.title)},
                    ${JSON.stringify(note.content)},
                    ${JSON.stringify(note.category || "Study")}
                )'>
                    ✏ Edit
                </button>

                <button onclick="deleteNote(${note.id})">
                    🗑 Delete
                </button>

                <button onclick="pinNote(${note.id}, ${note.pinned == 1 ? 0 : 1})">
                    ${note.pinned == 1 ? "📌 Unpin" : "📌 Pin"}
                </button>

                ${
                    note.is_locked == 1
                    ? `
                        <button onclick="openLocked(${note.id})">
                            🔓 Unlock
                        </button>
                    `
                    : `
                        <button onclick="lockNote(${note.id})">
                            🔒 Lock
                        </button>
                    `
                }

                <button onclick="downloadSingleNote(${note.id})">
                    📄 PDF
                </button>

            `;

            notesList.appendChild(card);
        });

    }
    catch(error){

        console.log("LOAD NOTES ERROR:", error);

        notesList.innerHTML = `
            <p style="color:red;">
                Failed to load notes.
            </p>
        `;
    }
}

// ===============================
// DELETE NOTE
// ===============================

async function deleteNote(id) {

    let confirmDelete =
        confirm("Delete this note?");

    if (!confirmDelete) return;

    try {

        await fetch("http://localhost:5000/delete-note/" + id, {

            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        loadNotes();
    }

    catch (error) {

        console.log(error);
    }
}

// ===============================
// EDIT NOTE
// ===============================

function editNote(
    id,
    title,
    content,
    category
) {

    document.getElementById("title").value =
        title;

    document.getElementById("content").value =
        content;

    document.getElementById("category").value =
        category;

    editId = id;

    document.getElementById("saveBtn")
        .innerText = "Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ===============================
// SEARCH NOTES
// ===============================

function searchNotes() {

    let input =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    let cards =
        document.querySelectorAll(".note-card");

    cards.forEach(function (card) {

        let text =
            card.innerText.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";
        }
        else {

            card.style.display = "none";
        }
    });
}

// ===============================
// PIN NOTE
// ===============================

async function pinNote(id, pinned) {

    try {

        await fetch(
            "http://localhost:5000/pin-note",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    id: id,
                    pinned: pinned
                })
            }
        );

        loadNotes();
    }

    catch (error) {

        console.log(error);
    }
}

// ===============================
// THEME
// ===============================

function setTheme(color) {

    document.body.classList.remove(
        "blue-theme",
        "purple-theme",
        "green-theme"
    );

    document.body.classList.add(
        color + "-theme"
    );

    localStorage.setItem(
        "siteTheme",
        color
    );
}

// ===============================
// LOCK NOTE
// ===============================

async function lockNote(id) {

    let pass =
        prompt("Enter password");

    if (!pass) return;

    try {

        let response =
            await fetch(
                "http://localhost:5000/lock-note",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify({
                        id: id,
                        password: pass
                    })
                }
            );

        let data =
            await response.json();

        alert(data.message);

        loadNotes();
    }

    catch (error) {

        console.log(error);
    }
}

// ===============================
// OPEN LOCKED NOTE
// ===============================

async function openLocked(id) {

    let pass =
        prompt("Enter password");

    if (!pass) return;

    try {

        let response =
            await fetch(
                "http://localhost:5000/open-note",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify({
                        id: id,
                        password: pass
                    })
                }
            );

        let data =
            await response.json();

        if (data.success) {

            alert("Unlocked Successfully 🔓");

            loadNotes();
        }
        else {

            alert("Wrong Password ❌");
        }
    }

    catch (error) {

        console.log(error);
    }
}

// ===============================
// DOWNLOAD ALL NOTES PDF
// ===============================

async function downloadPDF() {

    const { jsPDF } =
        window.jspdf;

    const doc =
        new jsPDF();

    let userId =
        localStorage.getItem("userId");

    let response =
        await fetch(
            "http://localhost:5000/notes/" + userId, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

    let notes =
        await response.json();

    let y = 20;

    doc.setFontSize(20);

    doc.text(
        "Student Helper Hub Notes",
        20,
        y
    );

    y += 20;

    notes.forEach(function (note, index) {

        if (y > 250) {

            doc.addPage();

            y = 20;
        }

        doc.setFontSize(14);

        doc.text(
            (index + 1) + ". " + note.title,
            20,
            y
        );

        y += 10;

        doc.setFontSize(11);

        let lines =
            doc.splitTextToSize(
                note.content,
                160
            );

        doc.text(lines, 20, y);

        y +=
            (lines.length * 7) + 15;
    });

    doc.save("MyNotes.pdf");
}

// ===============================
// DOWNLOAD SINGLE NOTE PDF
// ===============================

async function downloadSingleNote(id) {

    let userId =
        localStorage.getItem("userId");

    let response =
        await fetch(
            "http://localhost:5000/notes/" + userId, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

    let notes =
        await response.json();

    let note =
        notes.find(function (n) {
            return n.id == id;
        });

    if (!note) return;

    const { jsPDF } =
        window.jspdf;

    const doc =
        new jsPDF();

    doc.setFontSize(20);

    doc.text(
        "Student Helper Hub",
        20,
        20
    );

    doc.setFontSize(16);

    doc.text(
        note.title,
        20,
        40
    );

    let lines =
        doc.splitTextToSize(
            note.content,
            160
        );

    doc.setFontSize(11);

    doc.text(lines, 20, 60);

    doc.save(note.title + ".pdf");
}

// ===============================
// LOGOUT
// ===============================

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "../index.html";
}