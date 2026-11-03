const linksData = {

    1:{
        title:"Semester 1 Resources",
        items:[
            ["C Programming","Beginner"],
            ["Python","Basics"]
        ]
    },

    2:{
        title:"Semester 2 Resources",
        items:[
            ["Data Structures","DS Notes"],
            ["EEE","EEE Concepts"]
        ]
    },

    3:{
        title:"Semester 3 Resources",
        items:[
            ["DAA","Algorithms"],
            ["C++","OOP Concepts"]
        ]
    },

    4:{
        title:"Semester 4 Resources",
        items:[
            ["Web Development","HTML CSS JS"],
            ["DBMS","SQL & Database"]
        ]
    },

    5:{
        title:"Semester 5 Resources",
        items:[
            ["Operating System","OS Notes"],
            ["Computer Networks","Networking"],
            ["Java","Java Programming"]
        ]
    },

    6:{
        title:"Semester 6 Resources",
        items:[
            ["Artificial Intelligence","AI Basics"],
            ["Cloud Computing","Cloud"],
            ["Cyber Security","Security"]
        ]
    },

    7:{
        title:"My Saved Links",
        items:[
            ["My Resource","Saved Link"]
        ]
    }
};

function showLinks(sem, clickedCard){

    let main = document.getElementById("linksMainPage");
    let page = document.getElementById("resourcePage");
    let title = document.getElementById("resourceTitle");
    let box = document.getElementById("resourceCards");

    let data = linksData[sem];

    if(!data) return;

    main.style.display = "none";
    page.style.display = "block";

    document.querySelectorAll(".card").forEach(card=>{
        card.classList.remove("active");
    });

    if(clickedCard){
        clickedCard.classList.add("active");
    }

    title.innerText = data.title;

    let html = "";

    data.items.forEach(item=>{

        html += `
        <div class="card">

            <h3>${item[0]}</h3>

            <p>${item[1]}</p>

            <a href="#"
               class="open-btn"
               onclick="openSubjectLinks('${item[0]}')">
               Open Resources
            </a>

        </div>
        `;
    });

    box.innerHTML = html;
}

function openSubjectLinks(subject){

    localStorage.setItem("selectedSubject", subject);

    window.location.href = "subjectlinks.html";
}

function goBackLinks(){

    document.getElementById("linksMainPage").style.display = "block";

    document.getElementById("resourcePage").style.display = "none";

    document.querySelectorAll(".card").forEach(card=>{
        card.classList.remove("active");
    });
}