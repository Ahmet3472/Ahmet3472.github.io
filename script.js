let Q_nr = 0;
let points = 0;

// Funktion zum Abrufen von zufälligen Fragen von der Open Trivia Database (OTDB)
async function fetchRandomQuestions() {
    const response = await fetch("https://opentdb.com/api.php?amount=20&type=multiple");
    const data = await response.json();

    // Verarbeite die API-Antwort und erstelle das Format für die Quizfragen
    quizQuestions = data.results.map(question => {
        const options = [...question.incorrect_answers, question.correct_answer];
        const shuffledOptions = shuffleArray(options);

        return {
            question: question.question,
            options: shuffledOptions,
            correctAnswer: shuffledOptions.indexOf(question.correct_answer) + 1
        };
    });

    // Zeige die erste Frage
    show();
}

// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funktion zum Anzeigen einer Frage
function show() {
    var question = document.getElementById("question");

    var A = document.getElementById("Answer_A");
    var B = document.getElementById("Answer_B");
    var C = document.getElementById("Answer_C");
    var D = document.getElementById("Answer_D");

    question.innerHTML = "<p>" + quizQuestions[Q_nr].question + "</p>";

    A.innerHTML = "<p>" + quizQuestions[Q_nr].options[0] + "</p>";
    B.innerHTML = "<p>" + quizQuestions[Q_nr].options[1] + "</p>";
    C.innerHTML = "<p>" + quizQuestions[Q_nr].options[2] + "</p>";
    D.innerHTML = "<p>" + quizQuestions[Q_nr].options[3] + "</p>";
}

// Funktion zum Überprüfen der Antwort
function check(answer) {
    var P = document.getElementById("points");

    if (parseInt(answer) === quizQuestions[Q_nr].correctAnswer) {
        // Richtig beantwortet
        points += 10;
    } else {
        // Falsch beantwortet
        points -= 20;
        if(points < 0){
            points = 0;
        }
    }

    P.innerHTML = "<span>" + points + "</span>";

    // Gehe zur nächsten Frage
    Q_nr++;

    // Überprüfe, ob es noch weitere Fragen gibt
    if (Q_nr < quizQuestions.length) {
        // Zeige die nächste Frage
        show();
    } else {
        // Das Quiz ist abgeschlossen
        alert("Quiz abgeschlossen!");
    }
}

// Lade zufällige Fragen beim Laden der Seite
fetchRandomQuestions();
