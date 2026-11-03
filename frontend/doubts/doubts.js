// ===============================
// POST NEW DOUBT
// ===============================

async function postDoubt(){

    let subjectInput = document.getElementById("subjectInput");
    let doubtInput = document.getElementById("doubtInput");

    let subject = subjectInput.value.trim();
    let doubt = doubtInput.value.trim();

    if(subject === "" || doubt === ""){
        alert("Please fill all fields");
        return;
    }

    const token = localStorage.getItem("token");

    if(!token){
        alert("Please login to post a doubt.");
        window.location.href = "../auth/login.html";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/doubts",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    subject: subject,
                    doubt: doubt
                })
            }
        );

        const data = await response.json();

        console.log("DOUBT API RESPONSE:", data);

        if(!response.ok || !data.success){
            alert(data.message || "Failed to post doubt.");
            return;
        }

        // Create My Doubt Card
        let myDoubts = document.getElementById("myDoubts");

        let myCard = createDoubtCard(
            subject,
            doubt,
            true
        );

        myDoubts.prepend(myCard);

        // Create Public Card
        let recentDoubts =
            document.getElementById("recentDoubts");

        let publicCard = createDoubtCard(
            subject,
            doubt,
            false
        );

        recentDoubts.prepend(publicCard);

        // Clear inputs
        subjectInput.value = "";
        doubtInput.value = "";

        alert("Doubt posted successfully!");

    }
    catch(error){

        console.error("DOUBT ERROR:", error);

        alert("Unable to connect to the server.");

    }
}


// ===============================
// CREATE DOUBT CARD
// ===============================

function createDoubtCard(subject, doubt, isMine){

    let card = document.createElement("div");
    card.className = "doubt-item";

    let buttons = "";

    if(isMine){
        buttons = `
            <button class="small-btn" onclick="likeDoubt(this)">❤️ Like</button>
            <button class="small-btn" onclick="deleteDoubt(this)">🗑 Delete</button>
        `;
    } else {
        buttons = `
            <button class="small-btn" onclick="likeDoubt(this)">❤️ Like</button>
            <button class="small-btn" onclick="replyDoubt()">Reply</button>
        `;
    }

    card.innerHTML = `
        <h3>${subject}</h3>
        <p>${doubt}</p>

        <div class="actions">
            ${buttons}
        </div>
    `;

    return card;
}


// ===============================
// DELETE DOUBT
// ===============================

function deleteDoubt(button){

    let card = button.parentElement.parentElement;
    card.remove();
}


// ===============================
// LIKE BUTTON TOGGLE
// ===============================

function likeDoubt(button){

    if(button.innerText === "❤️ Like"){
        button.innerText = "💙 Liked";
    } else {
        button.innerText = "❤️ Like";
    }
}


// ===============================
// REPLY FUNCTION
// ===============================

function replyDoubt(){

    let reply = prompt("Enter your reply:");

    if(reply && reply.trim() !== ""){
        alert("Reply posted: " + reply);
    } else {
        alert("Reply cancelled");
    }
}