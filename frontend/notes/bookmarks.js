let bookmarks = [];

// ============================================
// LOAD PAGE
// ============================================

window.onload = function(){

    loadBookmarks();

};

// ============================================
// LOAD BOOKMARKS
// ============================================

function loadBookmarks(){

    bookmarks =
    JSON.parse(
        localStorage.getItem("bookmarks")
    ) || [];

    displayBookmarks(bookmarks);

    updateCount();

}

// ============================================
// DISPLAY BOOKMARKS
// ============================================

function displayBookmarks(data){

    let container =
    document.getElementById("bookmarksContainer");

    let empty =
    document.getElementById("emptyState");

    container.innerHTML = "";

    if(data.length === 0){

        container.style.display = "none";

        empty.style.display = "block";

        return;

    }

    container.style.display = "grid";

    empty.style.display = "none";

    data.forEach(function(bookmark,index){

        let topic = bookmark.topic;

        container.innerHTML += `

        <div class="bookmark-card">

            <div class="bookmark-top">

                <div class="bookmark-icon">

                    <i class="fa-solid fa-book"></i>

                </div>

                <div class="saved-badge">

                    ⭐ Saved

                </div>

            </div>

            <h3>

                ${topic.title}

            </h3>

            <p>

                ${topic.description}

            </p>

            <div class="topic-details">

                <span>

                    <i class="fa-solid fa-folder"></i>

                    ${bookmark.subjectName}

                </span>

                <span>

                    <i class="fa-regular fa-clock"></i>

                    ${topic.readingTime}

                </span>

            </div>

            <div class="card-buttons">

                <button
                class="study-btn"
                onclick="studyTopic(${index})">

                    📖 Study

                </button>

                <button
                class="remove-btn"
                onclick="removeBookmark(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

}

// ============================================
// SEARCH BOOKMARKS
// ============================================

function searchBookmarks(){

    let value =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    let filtered =
    bookmarks.filter(function(bookmark){

        return bookmark.topic.title
        .toLowerCase()
        .includes(value);

    });

    displayBookmarks(filtered);

}

// ============================================
// STUDY TOPIC
// ============================================

function studyTopic(index){

    let bookmark = bookmarks[index];

    if(!bookmark){

        alert("Bookmark not found.");

        return;

    }

    localStorage.setItem(

        "selectedSemester",

        bookmark.semester

    );

    localStorage.setItem(

        "selectedSubject",

        bookmark.subjectId

    );

    localStorage.setItem(

        "selectedTopic",

        bookmark.topic.id

    );

    window.location.href =

    "topic_content.html";

}

// ============================================
// REMOVE BOOKMARK
// ============================================

function removeBookmark(index){

    let confirmDelete =

    confirm(

        "Remove this bookmark?"

    );

    if(!confirmDelete){

        return;

    }

    bookmarks.splice(index,1);

    localStorage.setItem(

        "bookmarks",

        JSON.stringify(bookmarks)

    );

    displayBookmarks(bookmarks);

    updateCount();

}

// ============================================
// UPDATE COUNT
// ============================================

function updateCount(){

    document.getElementById(

        "bookmarkCount"

    ).innerText =

    bookmarks.length;

}

// ============================================
// REFRESH PAGE WHEN USER RETURNS
// ============================================

window.addEventListener(

    "focus",

    function(){

        loadBookmarks();

    }

);

// ============================================
// GO BACK
// ============================================

function goBack(){

    window.history.back();

}