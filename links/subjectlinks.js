// =====================================
// SUBJECT RESOURCES DATA
// =====================================

const subjectResources = {

    "C Programming":{
        youtube:"https://www.youtube.com/results?search_query=c+programming+playlist",
        pdf:"https://www.google.com/search?q=c+programming+pdf",
        interview:"https://www.google.com/search?q=c+programming+interview+questions",
        practice:"https://www.google.com/search?q=c+programming+practice+questions",
        website:"https://www.w3schools.com/c/",
        quiz:"quiz.html?subject=C%20Programming"
    },

    "Python":{
        youtube:"https://www.youtube.com/results?search_query=python+full+course",
        pdf:"https://www.google.com/search?q=python+notes+pdf",
        interview:"https://www.google.com/search?q=python+interview+questions",
        practice:"https://www.google.com/search?q=python+practice+questions",
        website:"https://www.w3schools.com/python/",
        quiz:"quiz.html?subject=Python"
    },

    "Data Structures":{
        youtube:"https://www.youtube.com/results?search_query=data+structures+playlist",
        pdf:"https://www.google.com/search?q=data+structures+pdf",
        interview:"https://www.google.com/search?q=data+structures+interview+questions",
        practice:"https://www.google.com/search?q=data+structures+practice+questions",
        website:"https://www.geeksforgeeks.org/data-structures/",
        quiz:"quiz.html?subject=Data%20Structures"
    },

    "EEE":{
        youtube:"https://www.youtube.com/results?search_query=EEE+tutorials",
        pdf:"https://www.google.com/search?q=EEE+notes+pdf",
        interview:"https://www.google.com/search?q=EEE+questions",
        practice:"https://www.google.com/search?q=EEE+practice+questions",
        website:"https://www.electrical4u.com/",
        quiz:"quiz.html?subject=EEE"
    },

    "DAA":{
        youtube:"https://www.youtube.com/results?search_query=design+analysis+algorithm+playlist",
        pdf:"https://www.google.com/search?q=daa+notes+pdf",
        interview:"https://www.google.com/search?q=daa+interview+questions",
        practice:"https://www.google.com/search?q=daa+practice+questions",
        website:"https://www.geeksforgeeks.org/design-and-analysis-of-algorithms/",
        quiz:"quiz.html?subject=DAA"
    },

    "C++":{
        youtube:"https://www.youtube.com/results?search_query=c%2B%2B+full+course",
        pdf:"https://www.google.com/search?q=c%2B%2B+notes+pdf",
        interview:"https://www.google.com/search?q=c%2B%2B+interview+questions",
        practice:"https://www.google.com/search?q=c%2B%2B+practice+questions",
        website:"https://www.w3schools.com/cpp/",
        quiz:"quiz.html?subject=C%2B%2B"
    },

    "Web Development":{
        youtube:"https://www.youtube.com/results?search_query=web+development+full+course",
        pdf:"https://www.google.com/search?q=web+development+notes+pdf",
        interview:"https://www.google.com/search?q=web+development+interview+questions",
        practice:"https://www.google.com/search?q=html+css+js+practice+questions",
        website:"https://www.w3schools.com/",
        quiz:"quiz.html?subject=Web%20Development"
    },

    "DBMS":{
        youtube:"https://www.youtube.com/results?search_query=dbms+playlist",
        pdf:"https://www.google.com/search?q=dbms+notes+pdf",
        interview:"https://www.google.com/search?q=dbms+interview+questions",
        practice:"https://www.google.com/search?q=dbms+practice+questions",
        website:"https://www.geeksforgeeks.org/dbms/",
        quiz:"quiz.html?subject=DBMS"
    },

    "Operating System":{
        youtube:"https://www.youtube.com/results?search_query=operating+system+playlist",
        pdf:"https://www.google.com/search?q=operating+system+notes+pdf",
        interview:"https://www.google.com/search?q=os+interview+questions",
        practice:"https://www.google.com/search?q=operating+system+practice+questions",
        website:"https://www.geeksforgeeks.org/operating-systems/",
        quiz:"quiz.html?subject=Operating%20System"
    },

    "Computer Networks":{
        youtube:"https://www.youtube.com/results?search_query=computer+networks+playlist",
        pdf:"https://www.google.com/search?q=computer+networks+notes+pdf",
        interview:"https://www.google.com/search?q=computer+network+interview+questions",
        practice:"https://www.google.com/search?q=computer+network+practice+questions",
        website:"https://www.geeksforgeeks.org/computer-network-tutorials/",
        quiz:"quiz.html?subject=Computer%20Networks"
    },

    "Java":{
        youtube:"https://www.youtube.com/results?search_query=java+full+course",
        pdf:"https://www.google.com/search?q=java+notes+pdf",
        interview:"https://www.google.com/search?q=java+interview+questions",
        practice:"https://www.google.com/search?q=java+practice+questions",
        website:"https://www.w3schools.com/java/",
        quiz:"quiz.html?subject=Java"
    },

    "Artificial Intelligence":{
        youtube:"https://www.youtube.com/results?search_query=artificial+intelligence+course",
        pdf:"https://www.google.com/search?q=artificial+intelligence+pdf",
        interview:"https://www.google.com/search?q=ai+interview+questions",
        practice:"https://www.google.com/search?q=ai+practice+questions",
        website:"https://www.geeksforgeeks.org/artificial-intelligence-tutorial/",
        quiz:"quiz.html?subject=Artificial%20Intelligence"
    },

    "Cloud Computing":{
        youtube:"https://www.youtube.com/results?search_query=cloud+computing+playlist",
        pdf:"https://www.google.com/search?q=cloud+computing+pdf",
        interview:"https://www.google.com/search?q=cloud+computing+questions",
        practice:"https://www.google.com/search?q=cloud+computing+practice+questions",
        website:"https://aws.amazon.com/what-is-cloud-computing/",
        quiz:"quiz.html?subject=Cloud%20Computing"
    },

    "Cyber Security":{
        youtube:"https://www.youtube.com/results?search_query=cyber+security+course",
        pdf:"https://www.google.com/search?q=cyber+security+pdf",
        interview:"https://www.google.com/search?q=cyber+security+interview+questions",
        practice:"https://www.google.com/search?q=cyber+security+practice+questions",
        website:"https://www.geeksforgeeks.org/cyber-security-tutorial/",
        quiz:"quiz.html?subject=Cyber%20Security"
    }

};

// =====================================
// LOAD SUBJECT LINKS
// =====================================

window.addEventListener("load", function(){

    let subject = localStorage.getItem("selectedSubject");

    if(!subject) return;

    let title = document.getElementById("subjectTitle");

    if(title){
        title.innerText = subject + " Resources";
    }

    let data = subjectResources[subject];

    if(!data) return;

    document.querySelector(".youtube-card a").href = data.youtube;
    document.querySelector(".pdf-card a").href = data.pdf;
    document.querySelector(".interview-card a").href = data.interview;
    document.querySelector(".practice-card a").href = data.practice;
    document.querySelector(".site-card a").href = data.website;
    document.querySelector(".quiz-card a").href = data.quiz;

});