// ==========================================================
// INTERVIEW PAGE
// ==========================================================

let currentTopic = null;

let interviewQuestions = [];

let revealedQuestions = 0;


// ==========================================================
// PAGE LOAD
// ==========================================================

window.onload = function(){

    loadInterview();

};


// ==========================================================
// LOAD INTERVIEW
// ==========================================================

function loadInterview(){

    const semester =
        Number(
            localStorage.getItem("selectedSemester")
        );

    const subjectId =
        localStorage.getItem("selectedSubject");

    const topicId =
        localStorage.getItem("selectedTopic");


    console.log("Semester:", semester);

    console.log("Subject ID:", subjectId);

    console.log("Topic ID:", topicId);


    if(
        !semester ||
        !subjectId ||
        !topicId
    ){

        alert("Unable to load interview questions.");

        window.location.href =
            "topic.html";

        return;

    }


    const semesterData =
        notesData[semester];


    if(!semesterData){

        alert("Semester not found.");

        return;

    }


    const subject =
        semesterData.subjects.find(
            function(subject){

                return subject.id === subjectId;

            }
        );


    if(!subject){

        alert("Subject not found.");

        return;

    }


    currentTopic =
        subject.topics.find(
            function(topic){

                return topic.id === topicId;

            }
        );


    if(!currentTopic){

        alert("Topic not found.");

        return;

    }


    loadQuestions(
        subjectId,
        topicId
    );

}


// ==========================================================
// LOAD QUESTIONS FROM data_content.js
// ==========================================================

function loadQuestions(
    subjectId,
    topicId
){

    if(
        typeof contentData === "undefined"
    ){

        alert(
            "contentData is not available."
        );

        return;

    }


    const subjectData =
        contentData[subjectId];


    if(!subjectData){

        alert(
            "Subject content not found."
        );

        return;

    }


    const topicData =
        subjectData.topics[topicId];


    if(!topicData){

        alert(
            "Topic content not found."
        );

        return;

    }


    interviewQuestions =
        topicData.interviewQuestions || [];


    console.log(
        "Interview Questions:",
        interviewQuestions
    );


    displayTopicInformation();

    displayInterviewQuestions();

}


// ==========================================================
// DISPLAY TOPIC INFORMATION
// ==========================================================

function displayTopicInformation(){

    const topicTitle =
        document.getElementById(
            "topicTitle"
        );


    if(topicTitle){

        topicTitle.innerText =
            currentTopic.title;

    }


    const subjectTitle =
        document.getElementById(
            "subjectTitle"
        );


    if(subjectTitle){

        subjectTitle.innerText =
            "Interview Questions";

    }


    updateCounters();

}


// ==========================================================
// DISPLAY QUESTIONS
// ==========================================================

function displayInterviewQuestions(){

    const container =
        document.getElementById(
            "questionsContainer"
        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    if(
        !interviewQuestions ||
        interviewQuestions.length === 0
    ){

        container.innerHTML = `

        <div class="question-card">

            <div class="question-text">

                No interview questions are
                available for this topic yet.

            </div>

        </div>

        `;

        updateCounters();

        return;

    }


    interviewQuestions.forEach(
        function(question,index){

            container.innerHTML += `

            <article
            class="question-card"
            id="question-${index}">

                <div class="question-top">

                    <div class="question-number">

                        ${String(
                            index + 1
                        ).padStart(2,"0")}

                    </div>


                    <div class="question-content">

                        <div class="question-text">

                            ${getQuestionText(question)}

                        </div>


                        <button
                        class="show-answer-btn"
                        id="answerButton-${index}"
                        onclick="toggleAnswer(${index})">

                            <i
                            class="fa-solid fa-eye">
                            </i>

                            Show Answer

                        </button>


                        <div
                        id="answer-${index}"
                        class="answer-box"
                        style="display:none;">

                           ${getAnswerText(question)}

                        </div>

                    </div>

                </div>

            </article>

            `;

        }
    );


    updateCounters();

}

function getQuestionText(question){

    if(typeof question === "string"){

        return question;

    }

    return question.question ||
           "Question not available.";

}


function getAnswerText(question){

    if(typeof question === "string"){

        return "Answer not available.";

    }

    return question.answer ||
           "Answer not available.";

}

// ==========================================================
// SHOW / HIDE ANSWER
// ==========================================================

function toggleAnswer(index){

    const answer =
        document.getElementById(
            "answer-" + index
        );


    const button =
        document.getElementById(
            "answerButton-" + index
        );


    if(!answer || !button){

        return;

    }


    if(
        answer.style.display === "none"
    ){

        answer.style.display =
            "block";


        button.innerHTML = `

            <i class="fa-solid fa-eye-slash"></i>

            Hide Answer

        `;


        revealedQuestions++;

    }

    else{

        answer.style.display =
            "none";


        button.innerHTML = `

            <i class="fa-solid fa-eye"></i>

            Show Answer

        `;


        revealedQuestions--;

    }


    updateCounters();

}


// ==========================================================
// UPDATE COUNTERS
// ==========================================================

function updateCounters(){

    const questionCount =
        document.getElementById(
            "questionCount"
        );


    const revealedCount =
        document.getElementById(
            "revealedCount"
        );


    if(questionCount){

        questionCount.innerText =
            interviewQuestions.length;

    }


    if(revealedCount){

        revealedCount.innerText =
            revealedQuestions;

    }

}


// ==========================================================
// BACK TO TOPIC
// ==========================================================

function goBackToTopic(){

    window.location.href =
        "topic_content.html";

}