// =====================================
// PREMIUM QUIZ JS (FINAL VERSION)
// =====================================

const urlParams = new URLSearchParams(window.location.search);
const selectedSubject = urlParams.get("subject");

let quizData = [];

// =====================================
// C PROGRAMMING (10)
// =====================================

if(selectedSubject?.trim() === "C Programming"){

quizData = [

{question:"Which function prints output in C?",options:["printf()","cin","puts()","scan()"],answer:"printf()",explanation:"printf() is used to display output in C."},
{question:"Which header file is used for printf()?",options:["stdio.h","math.h","file.h","string.h"],answer:"stdio.h",explanation:"stdio.h contains input-output functions."},
{question:"Which data type stores decimals?",options:["int","float","char","void"],answer:"float",explanation:"float is used for decimal values."},
{question:"Which symbol is used for comments?",options:["//","##","<>","**"],answer:"//",explanation:"// is used for single-line comments."},
{question:"Which loop runs at least once?",options:["for","while","do while","loop"],answer:"do while",explanation:"do-while executes once before checking condition."},
{question:"Array index starts from?",options:["0","1","-1","2"],answer:"0",explanation:"Arrays are 0-indexed in C."},
{question:"Which symbol gives address?",options:["&","%","@","*"],answer:"&",explanation:"& is address operator."},
{question:"Which keyword returns value?",options:["return","back","stop","exit"],answer:"return",explanation:"return sends value back from function."},
{question:"Which operator gives remainder?",options:["%","/","*","+"],answer:"%",explanation:"% is modulus operator."},
{question:"Which is valid variable?",options:["num1","1num","int","my var"],answer:"num1",explanation:"Variable cannot start with number or have space."}

];

}

// =====================================
// JAVA (10)
// =====================================

else if(selectedSubject?.trim() == "Java"){

quizData = [

{question:"Java is a ____ language?",options:["Programming","Database","Browser","OS"],answer:"Programming",explanation:"Java is a programming language."},
{question:"Which keyword creates object?",options:["new","make","create","obj"],answer:"new",explanation:"new keyword is used to create objects."},
{question:"Which method starts Java program?",options:["main()","start()","run()","init()"],answer:"main()",explanation:"Execution starts from main()."},
{question:"Java source file extension?",options:[".java",".js",".class",".py"],answer:".java",explanation:"Java files use .java extension."},
{question:"Which is used for output?",options:["System.out.println()","printf()","echo","print"],answer:"System.out.println()",explanation:"Used to print output."},
{question:"Java supports OOP?",options:["Yes","No","Sometimes","Only web"],answer:"Yes",explanation:"Java is object-oriented."},
{question:"Which is class keyword?",options:["class","ClassName","object","define"],answer:"class",explanation:"class defines structure."},
{question:"Which package imported by default?",options:["java.lang","java.io","java.net","java.util"],answer:"java.lang",explanation:"java.lang is default."},
{question:"Which stores whole numbers?",options:["int","float","char","string"],answer:"int",explanation:"int stores integers."},
{question:"Java is platform ____ ?",options:["Independent","Dependent","Locked","Manual"],answer:"Independent",explanation:"Java is platform independent."}

];

}

// =====================================
// DBMS (10)
// =====================================

else if(selectedSubject?.trim() == "DBMS"){

quizData = [

{question:"DBMS stands for?",options:["Database Management System","Data Build Main System","Digital Base Management","None"],answer:"Database Management System",explanation:"DBMS manages databases."},
{question:"SQL is used for?",options:["Database","Gaming","Design","Photos"],answer:"Database",explanation:"SQL is for database operations."},
{question:"Primary key is?",options:["Unique identifier","Duplicate value","Foreign column","Null value"],answer:"Unique identifier",explanation:"Primary key uniquely identifies rows."},
{question:"Which command inserts data?",options:["INSERT","PUT","ADDROW","CREATE"],answer:"INSERT",explanation:"INSERT adds data."},
{question:"Which command deletes table?",options:["DROP","REMOVE","DELETE ALL","CLEAR"],answer:"DROP",explanation:"DROP deletes table."},
{question:"Rows are also called?",options:["Records","Columns","Keys","Fields"],answer:"Records",explanation:"Rows = records."},
{question:"Columns are also called?",options:["Fields","Rows","Tables","Keys"],answer:"Fields",explanation:"Columns = fields."},
{question:"Which normal form removes partial dependency?",options:["2NF","1NF","BCNF","4NF"],answer:"2NF",explanation:"2NF removes partial dependency."},
{question:"Which join returns matching rows?",options:["INNER JOIN","SIDE JOIN","TOP JOIN","MATCH JOIN"],answer:"INNER JOIN",explanation:"Inner join gives matching rows."},
{question:"Which command views data?",options:["SELECT","SHOWIT","GET","PRINT"],answer:"SELECT",explanation:"SELECT retrieves data."}

];

}

// =====================================
// PYTHON (10)
// =====================================

else if(selectedSubject?.trim() == "Python"){

quizData = [

{question:"Python is a ____ language?",options:["Programming","Database","Browser","Markup"],answer:"Programming",explanation:"Python is a programming language."},
{question:"Which symbol is used for comments?",options:["#","//","<!--","**"],answer:"#",explanation:"# is used for comments in Python."},
{question:"Which keyword prints output?",options:["print()","echo()","printf()","show()"],answer:"print()",explanation:"print() displays output."},
{question:"Which data type stores text?",options:["str","int","float","bool"],answer:"str",explanation:"str stores string values."},
{question:"Python files end with?",options:[".py",".java",".cpp",".html"],answer:".py",explanation:"Python uses .py extension."},
{question:"Which loop repeats code?",options:["for","repeat","loop","iterate"],answer:"for",explanation:"for loop repeats execution."},
{question:"Which keyword defines function?",options:["def","function","func","define"],answer:"def",explanation:"def defines a function."},
{question:"Which stores decimal values?",options:["float","int","char","bool"],answer:"float",explanation:"float stores decimals."},
{question:"Which is correct list?",options:["[1,2,3]","{1,2,3}","(1,2,3)","<1,2,3>"],answer:"[1,2,3]",explanation:"Lists use square brackets."},
{question:"Python is case ____ ?",options:["Sensitive","Insensitive","Neutral","Fixed"],answer:"Sensitive",explanation:"Python is case-sensitive."}

];

}

// =====================================
// DATA STRUCTURES (10)
// =====================================

else if(selectedSubject?.trim() == "Data Structures"){

quizData = [

{question:"Stack follows?",options:["LIFO","FIFO","Random","Priority"],answer:"LIFO",explanation:"Stack uses Last In First Out."},
{question:"Queue follows?",options:["FIFO","LIFO","Tree","Graph"],answer:"FIFO",explanation:"Queue uses First In First Out."},
{question:"Linked list stores?",options:["Nodes","Arrays","Functions","Files"],answer:"Nodes",explanation:"Linked list contains nodes."},
{question:"Which DS uses index?",options:["Array","Stack","Queue","Tree"],answer:"Array",explanation:"Arrays use indexing."},
{question:"Binary tree has max children?",options:["2","3","4","1"],answer:"2",explanation:"Binary tree nodes have 2 children max."},
{question:"Which DS is dynamic?",options:["Linked List","Array","Matrix","String"],answer:"Linked List",explanation:"Linked lists grow dynamically."},
{question:"Push operation used in?",options:["Stack","Queue","Tree","Graph"],answer:"Stack",explanation:"Push inserts into stack."},
{question:"Delete from queue is?",options:["Dequeue","Push","Insert","Pop"],answer:"Dequeue",explanation:"Dequeue removes element."},
{question:"Tree root is?",options:["Top node","Leaf","Edge","Child"],answer:"Top node",explanation:"Root is starting node."},
{question:"Searching fastest in sorted array?",options:["Binary Search","Linear Search","DFS","BFS"],answer:"Binary Search",explanation:"Binary search is efficient."}

];

}

// =====================================
// WEB DEVELOPMENT (10)
// =====================================

else if(selectedSubject?.trim() == "Web Development"){

quizData = [

{question:"HTML stands for?",options:["Hyper Text Markup Language","High Text Machine","Hyperlinks Text","None"],answer:"Hyper Text Markup Language",explanation:"HTML builds webpage structure."},
{question:"CSS is used for?",options:["Styling","Database","Programming","Server"],answer:"Styling",explanation:"CSS styles webpages."},
{question:"JavaScript is used for?",options:["Interactivity","Painting","Storage","Hosting"],answer:"Interactivity",explanation:"JS adds interactivity."},
{question:"Which tag creates link?",options:["<a>","<p>","<h1>","<img>"],answer:"<a>",explanation:"Anchor tag creates links."},
{question:"Which property changes text color?",options:["color","font","bg","text-style"],answer:"color",explanation:"color changes text color."},
{question:"Which symbol selects id in CSS?",options:["#",".","*","@"],answer:"#",explanation:"# selects id."},
{question:"Which function shows popup?",options:["alert()","show()","popup()","msg()"],answer:"alert()",explanation:"alert() shows popup."},
{question:"HTML file extension?",options:[".html",".css",".js",".java"],answer:".html",explanation:"HTML uses .html."},
{question:"CSS stands for?",options:["Cascading Style Sheets","Creative Style","Computer Styling","None"],answer:"Cascading Style Sheets",explanation:"Full form of CSS."},
{question:"JavaScript runs in?",options:["Browser","Printer","CPU only","Scanner"],answer:"Browser",explanation:"JS runs in browser."}

];

}

// =====================================
// OPERATING SYSTEM (10)
// =====================================

else if(selectedSubject?.trim() == "Operating System"){

quizData = [

{question:"OS stands for?",options:["Operating System","Open Software","Online System","Output System"],answer:"Operating System",explanation:"OS manages computer resources."},
{question:"Which is an OS?",options:["Windows","Python","HTML","CPU"],answer:"Windows",explanation:"Windows is operating system."},
{question:"CPU scheduling decides?",options:["Process execution","Painting","Typing","Storage"],answer:"Process execution",explanation:"Scheduling manages processes."},
{question:"RAM is?",options:["Primary Memory","Secondary Memory","Disk","CPU"],answer:"Primary Memory",explanation:"RAM is primary memory."},
{question:"Which memory is temporary?",options:["RAM","ROM","Hard Disk","DVD"],answer:"RAM",explanation:"RAM is volatile."},
{question:"Which manages files?",options:["OS","Compiler","Browser","Editor"],answer:"OS",explanation:"OS handles file management."},
{question:"Multitasking means?",options:["Running multiple tasks","Gaming","Printing","Shutdown"],answer:"Running multiple tasks",explanation:"OS runs multiple tasks together."},
{question:"Kernel is?",options:["Core of OS","App","Virus","Driver"],answer:"Core of OS",explanation:"Kernel is central part."},
{question:"Which is secondary storage?",options:["Hard Disk","RAM","Cache","Register"],answer:"Hard Disk",explanation:"Hard disk stores data permanently."},
{question:"Process in execution is?",options:["Running program","File","Folder","Thread"],answer:"Running program",explanation:"Process is executing program."}

];

}

// =====================================
// EEE (10)
// =====================================

else if(selectedSubject?.trim() == "EEE"){

quizData = [

{question:"EEE stands for?",options:["Electrical and Electronics Engineering","Electronic Easy Engineering","Electric Energy","None"],answer:"Electrical and Electronics Engineering",explanation:"EEE full form."},
{question:"Unit of current?",options:["Ampere","Volt","Watt","Ohm"],answer:"Ampere",explanation:"Current measured in ampere."},
{question:"Unit of voltage?",options:["Volt","Ampere","Watt","Joule"],answer:"Volt",explanation:"Voltage measured in volts."},
{question:"Ohm's law formula?",options:["V=IR","P=VI","I=V/R","Both"],answer:"Both",explanation:"Both formulas are correct."},
{question:"Which device stores charge?",options:["Capacitor","Resistor","Motor","Switch"],answer:"Capacitor",explanation:"Capacitor stores charge."},
{question:"AC stands for?",options:["Alternating Current","Automatic Current","Active Current","None"],answer:"Alternating Current",explanation:"AC changes direction."},
{question:"DC stands for?",options:["Direct Current","Double Current","Dynamic Current","None"],answer:"Direct Current",explanation:"DC flows one direction."},
{question:"Resistance unit?",options:["Ohm","Volt","Ampere","Watt"],answer:"Ohm",explanation:"Resistance measured in ohms."},
{question:"Which converts AC to DC?",options:["Rectifier","Amplifier","Generator","Motor"],answer:"Rectifier",explanation:"Rectifier converts AC to DC."},
{question:"Battery supplies?",options:["DC","AC","Both","None"],answer:"DC",explanation:"Battery gives direct current."}

];

}

// =====================================
// DAA (10)
// =====================================

else if(selectedSubject?.trim() == "DAA"){

quizData = [

{question:"DAA stands for?",options:["Design and Analysis of Algorithms","Data Algorithm Analysis","Digital Algorithm","None"],answer:"Design and Analysis of Algorithms",explanation:"Full form of DAA."},
{question:"Which search is faster?",options:["Binary Search","Linear Search","Bubble Sort","DFS"],answer:"Binary Search",explanation:"Binary search is efficient."},
{question:"Time complexity of binary search?",options:["O(log n)","O(n)","O(n²)","O(1)"],answer:"O(log n)",explanation:"Binary search halves data."},
{question:"Which sorting compares adjacent elements?",options:["Bubble Sort","Merge Sort","Quick Sort","Heap Sort"],answer:"Bubble Sort",explanation:"Bubble sort swaps adjacent elements."},
{question:"Merge sort uses?",options:["Divide and Conquer","Greedy","Dynamic","Backtracking"],answer:"Divide and Conquer",explanation:"Merge sort uses divide and conquer."},
{question:"Worst case of bubble sort?",options:["O(n²)","O(log n)","O(1)","O(n)"],answer:"O(n²)",explanation:"Bubble sort worst case."},
{question:"DFS stands for?",options:["Depth First Search","Data File Search","Direct Search","None"],answer:"Depth First Search",explanation:"DFS explores depth."},
{question:"BFS uses?",options:["Queue","Stack","Array","Tree"],answer:"Queue",explanation:"BFS uses queue."},
{question:"Quick sort average complexity?",options:["O(n log n)","O(n²)","O(1)","O(log n)"],answer:"O(n log n)",explanation:"Average case complexity."},
{question:"Algorithm means?",options:["Step-by-step solution","Program","Language","OS"],answer:"Step-by-step solution",explanation:"Algorithm solves problem stepwise."}

];

}

// =====================================
// C++ (10)
// =====================================

else if(selectedSubject?.trim() == "C++"){

quizData = [

{question:"C++ supports?",options:["OOP","Only DB","Only Web","None"],answer:"OOP",explanation:"C++ supports object-oriented programming."},
{question:"Which operator used for output?",options:["<<",">>","%%","&&"],answer:"<<",explanation:"cout uses << operator."},
{question:"Which keyword defines class?",options:["class","object","define","struct"],answer:"class",explanation:"class defines object blueprint."},
{question:"Which header for cout?",options:["iostream","stdio.h","math.h","string.h"],answer:"iostream",explanation:"iostream contains cout."},
{question:"Object is instance of?",options:["Class","Function","Loop","Variable"],answer:"Class",explanation:"Objects created from classes."},
{question:"Which keyword inherits class?",options:["public","extends","inherit","using"],answer:"public",explanation:"Inheritance syntax uses public."},
{question:"C++ file extension?",options:[".cpp",".java",".py",".html"],answer:".cpp",explanation:"C++ files use .cpp."},
{question:"Which function starts program?",options:["main()","start()","run()","begin()"],answer:"main()",explanation:"Execution starts at main."},
{question:"Which stores true/false?",options:["bool","int","float","char"],answer:"bool",explanation:"bool stores boolean."},
{question:"Which operator accesses member?",options:[".","#","@","$"],answer:".",explanation:"Dot operator accesses members."}

];

}

// =====================================
// COMPUTER NETWORKS (10)
// =====================================

else if(selectedSubject?.trim() == "Computer Networks"){

quizData = [

{question:"Network means?",options:["Connected computers","Single computer","CPU","Printer"],answer:"Connected computers",explanation:"Network connects devices."},
{question:"Internet uses?",options:["TCP/IP","HTML","OS","Compiler"],answer:"TCP/IP",explanation:"TCP/IP protocol suite used."},
{question:"IP stands for?",options:["Internet Protocol","Internal Process","Input Port","None"],answer:"Internet Protocol",explanation:"IP full form."},
{question:"Device connecting networks?",options:["Router","Mouse","Keyboard","Monitor"],answer:"Router",explanation:"Router connects networks."},
{question:"WWW stands for?",options:["World Wide Web","Web World Wire","Wide Web Work","None"],answer:"World Wide Web",explanation:"WWW full form."},
{question:"Which device forwards packets?",options:["Router","Scanner","Speaker","Printer"],answer:"Router",explanation:"Router forwards packets."},
{question:"LAN means?",options:["Local Area Network","Large Area Network","Long Area","None"],answer:"Local Area Network",explanation:"LAN covers small area."},
{question:"WAN covers?",options:["Large area","Single room","Only building","None"],answer:"Large area",explanation:"WAN spans large regions."},
{question:"Which layer sends data?",options:["Transport","Presentation","Session","Physical"],answer:"Transport",explanation:"Transport layer handles delivery."},
{question:"HTTP used for?",options:["Web communication","Gaming","Storage","Printing"],answer:"Web communication",explanation:"HTTP transfers webpages."}

];

}

// =====================================
// ARTIFICIAL INTELLIGENCE (10)
// =====================================

else if(selectedSubject?.trim() == "Artificial Intelligence"){

quizData = [

{question:"AI stands for?",options:["Artificial Intelligence","Auto Information","Advanced Internet","None"],answer:"Artificial Intelligence",explanation:"AI full form."},
{question:"AI simulates?",options:["Human intelligence","Printer","RAM","Keyboard"],answer:"Human intelligence",explanation:"AI mimics human thinking."},
{question:"Which is AI application?",options:["Chatbot","Keyboard","Cable","Mouse"],answer:"Chatbot",explanation:"Chatbots use AI."},
{question:"Machine learning is part of?",options:["AI","Networking","DBMS","OS"],answer:"AI",explanation:"ML belongs to AI."},
{question:"AI used in?",options:["Robots","Only games","Only browser","None"],answer:"Robots",explanation:"AI powers robots."},
{question:"Which company made ChatGPT?",options:["OpenAI","Google","Amazon","Meta"],answer:"OpenAI",explanation:"ChatGPT created by OpenAI."},
{question:"AI can recognize?",options:["Images","Voices","Patterns","All"],answer:"All",explanation:"AI recognizes many patterns."},
{question:"Which language popular in AI?",options:["Python","HTML","CSS","SQL"],answer:"Python",explanation:"Python widely used in AI."},
{question:"AI helps in?",options:["Automation","Typing only","Printing only","None"],answer:"Automation",explanation:"AI automates tasks."},
{question:"AI learns from?",options:["Data","Plastic","Hardware","Ink"],answer:"Data",explanation:"AI models learn from data."}

];

}

// =====================================
// CLOUD COMPUTING (10)
// =====================================

else if(selectedSubject?.trim() == "Cloud Computing"){

quizData = [

{question:"Cloud computing provides?",options:["Online services","Only hardware","Only software","None"],answer:"Online services",explanation:"Cloud offers services online."},
{question:"Google Drive is?",options:["Cloud storage","CPU","Compiler","OS"],answer:"Cloud storage",explanation:"Google Drive stores data online."},
{question:"AWS belongs to?",options:["Amazon","Google","Microsoft","Apple"],answer:"Amazon",explanation:"AWS by Amazon."},
{question:"Cloud data stored on?",options:["Remote servers","Keyboard","Monitor","Mouse"],answer:"Remote servers",explanation:"Cloud stores data remotely."},
{question:"SaaS means?",options:["Software as a Service","Storage as System","Server as Software","None"],answer:"Software as a Service",explanation:"SaaS full form."},
{question:"Example of cloud platform?",options:["Azure","Paint","Notepad","Excel"],answer:"Azure",explanation:"Azure is cloud platform."},
{question:"Cloud helps in?",options:["Data access anywhere","Only gaming","Only printing","None"],answer:"Data access anywhere",explanation:"Cloud accessible globally."},
{question:"Which needs internet?",options:["Cloud computing","Calculator","Notebook","Book"],answer:"Cloud computing",explanation:"Cloud requires internet."},
{question:"IaaS means?",options:["Infrastructure as a Service","Internet as Service","Internal Service","None"],answer:"Infrastructure as a Service",explanation:"IaaS full form."},
{question:"Cloud reduces?",options:["Hardware cost","Coding","Electricity","Typing"],answer:"Hardware cost",explanation:"Cloud lowers infrastructure cost."}

];

}

// =====================================
// CYBER SECURITY (10)
// =====================================

else if(selectedSubject?.trim() == "Cyber Security"){

quizData = [

{question:"Cyber security protects?",options:["Digital systems","Only keyboard","Only printer","None"],answer:"Digital systems",explanation:"Cyber security protects systems."},
{question:"Virus is?",options:["Malware","Hardware","Software update","Cable"],answer:"Malware",explanation:"Virus is malicious software."},
{question:"Strong password should contain?",options:["Letters numbers symbols","Only name","12345","abcd"],answer:"Letters numbers symbols",explanation:"Strong passwords are complex."},
{question:"Phishing attacks try to?",options:["Steal information","Print files","Charge battery","None"],answer:"Steal information",explanation:"Phishing steals data."},
{question:"Firewall used for?",options:["Network protection","Gaming","Storage","Charging"],answer:"Network protection",explanation:"Firewall blocks threats."},
{question:"HTTPS is safer than?",options:["HTTP","FTP","SMTP","TCP"],answer:"HTTP",explanation:"HTTPS encrypts data."},
{question:"Antivirus software removes?",options:["Malware","Keyboard","Battery","RAM"],answer:"Malware",explanation:"Antivirus removes threats."},
{question:"OTP means?",options:["One Time Password","Online Text Password","Only Text Process","None"],answer:"One Time Password",explanation:"OTP used for security."},
{question:"Cyber attack targets?",options:["Systems and data","Books","Pens","Tables"],answer:"Systems and data",explanation:"Attacks target digital assets."},
{question:"Encryption converts data into?",options:["Secret code","Image","Video","Folder"],answer:"Secret code",explanation:"Encryption secures data."}

];

}

// =====================================
// DEFAULT
// =====================================

else{
quizData = [
{question:"Ready?",options:["Yes","No","Start","Go"],answer:"Yes",explanation:"Let's begin!"}
];
}

// =====================================

let currentQuestion = 0;
let score = 0;

let timeLeft = 60;
let timerInterval;

const questionNo = document.getElementById("questionNo");
const scoreBox = document.getElementById("scoreBox");
const questionText = document.getElementById("questionText");
const optionBtns = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");

// End button
const endBtn = document.createElement("button");
endBtn.innerText = "End Quiz";

endBtn.style.cssText =
"margin-top:15px;width:100%;padding:14px;border:none;border-radius:12px;background:#ff4d6d;color:white;font-weight:bold;cursor:pointer;";

endBtn.onclick = endQuiz;

document.querySelector(".quiz-card").appendChild(endBtn);

loadQuestion();

// =====================================

function loadQuestion(){

clearInterval(timerInterval);

let q = quizData[currentQuestion];

questionNo.innerText = `Question ${currentQuestion+1} / ${quizData.length}`;
scoreBox.innerText = "Score: " + score;
questionText.innerText = q.question;

optionBtns.forEach((btn,index)=>{
btn.innerText = q.options[index];
btn.disabled = false;
btn.classList.remove("correct","wrong");
});

nextBtn.style.display = "none";

// clear explanation
let exp = document.getElementById("explanationBox");
if(exp) exp.innerText = "";

startTimer();
}

// =====================================

function checkAnswer(button){

clearInterval(timerInterval);

let selected = button.innerText;
let correct = quizData[currentQuestion].answer;

optionBtns.forEach(btn=>{
btn.disabled = true;
if(btn.innerText == correct) btn.classList.add("correct");
});

if(selected == correct){
score++;
button.classList.add("correct");
}else{
button.classList.add("wrong");
}

scoreBox.innerText = "Score: " + score;
nextBtn.style.display = "block";

// explanation
let exp = document.getElementById("explanationBox");
if(!exp){
exp = document.createElement("div");
exp.id = "explanationBox";
exp.style.marginTop = "15px";
exp.style.color = "#00e5ff";
document.querySelector(".quiz-card").appendChild(exp);
}

exp.innerText = quizData[currentQuestion].explanation;
}

// =====================================

function nextQuestion(){

currentQuestion++;

if(currentQuestion < quizData.length){
loadQuestion();
}else{
showResult();
}
}

// =====================================

function showResult(){

    clearInterval(timerInterval);

    questionText.style.display = "none";
    document.querySelector(".options").style.display = "none";
    nextBtn.style.display = "none";
    endBtn.style.display = "none";

    let message =
    score <= 4 ? "📘 Need more practice." :
    score <= 7 ? "🔥 Good job!" :
    score <= 9 ? "🌟 Great work!" :
    "🏆 Outstanding!";

    resultBox.innerHTML = `
        <h2>${message}</h2>
        <br>
        🎯 Score: ${score} / ${quizData.length}
        <br><br>

        <button onclick="restartQuiz()"
        style="padding:12px 20px;margin-right:10px;background:#00e5ff;border:none;border-radius:10px;">
        Retry
        </button>

        <button onclick="endQuiz()"
        style="padding:12px 20px;background:#ff4d6d;color:white;border:none;border-radius:10px;">
        Back
        </button>
    `;
}

// =====================================

function restartQuiz(){

    currentQuestion = 0;
    score = 0;

    resultBox.innerHTML = "";

    questionText.style.display = "block";

    document.querySelector(".options").style.display = "grid";

    endBtn.style.display = "block";

    loadQuestion();
}

// =====================================

function startTimer(){

timeLeft = 60;
updateTimerUI();

timerInterval = setInterval(()=>{
timeLeft--;
updateTimerUI();

if(timeLeft <= 0){
clearInterval(timerInterval);
nextQuestion();
}
},1000);
}

function updateTimerUI(){

let timerBox = document.getElementById("timerBox");

if(!timerBox){
timerBox = document.createElement("div");
timerBox.id = "timerBox";
timerBox.style.textAlign = "right";
timerBox.style.color = "#ffcc00";
document.querySelector(".quiz-card").prepend(timerBox);
}

timerBox.innerText = "⏱️ " + timeLeft + "s";
}

// =====================================

function downloadCertificate(){

let content = `
Certificate of Achievement

Subject: ${selectedSubject}
Score: ${score}/${quizData.length}
`;

let blob = new Blob([content], {type:"text/plain"});
let link = document.createElement("a");

link.href = URL.createObjectURL(blob);
link.download = "certificate.txt";
link.click();
}

function goBack(){

    window.location.href = "subjectlinks.html";
}

function endQuiz(){
    window.location.href = "subjectlinks.html";
}