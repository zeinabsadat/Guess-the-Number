document.addEventListener("DOMContentLoaded", () => {
    generateRandomNumber();

    // Ensure input fields are readonly
    document.querySelectorAll(".input").forEach(input => {
        input.setAttribute("readonly", true);
    });

    // Reset hint when the user changes their guess
    document.querySelectorAll(".input").forEach(input => {
        input.addEventListener("input", resetHint);
    });
});

let actualNumber = ""; // Store the actual generated number

function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate number between 1-100
    actualNumber = String(randomNumber).padStart(3, "0"); // Format as three-digit string
    let hiddenNumber = "#".repeat(3); // Hide the number as ###

    document.getElementById("generatedNumber").textContent = hiddenNumber;
    document.getElementById("generatedNumber").dataset.actualNumber = actualNumber;
}

function appendNumber(num) {
    let input1 = document.getElementById("number1");
    let input2 = document.getElementById("number2");
    let input3 = document.getElementById("number3");

    // Fill inputs sequentially
    if (input1.value === "") {
        input1.value = num;
    } else if (input2.value === "") {
        input2.value = num;
    } else if (input3.value === "") {
        input3.value = num;
    }
}

function backspace() {
    let input1 = document.getElementById("number1");
    let input2 = document.getElementById("number2");
    let input3 = document.getElementById("number3");

    // Remove last entered number
    if (input3.value !== "") {
        input3.value = "";
    } else if (input2.value !== "") {
        input2.value = "";
    } else if (input1.value !== "") {
        input1.value = "";
    }

    resetHint(); // Reset the hint when a number is removed
}

function checkGuess() {
    let input1 = document.getElementById("number1").value;
    let input2 = document.getElementById("number2").value;
    let input3 = document.getElementById("number3").value;
    let guessedNumber = input1 + input2 + input3; // Combine inputs into a string

    let hint = document.getElementById("hint");
    let displayedNumber = document.getElementById("generatedNumber");

    if (guessedNumber.length < 3) {
        hint.textContent = "Please enter a three-digit number!";
        return;
    }

    if (guessedNumber === actualNumber) {
        displayedNumber.textContent = actualNumber; // Reveal the number
        hint.textContent = "Correct! You guessed the number!";
    } else if (guessedNumber > actualNumber) {
        hint.textContent = "Your number is too big!";
    } else {
        hint.textContent = "Your number is too small!";
    }
}

// Function to reset hint
function resetHint() {
    document.getElementById("hint").textContent = "Start to Guess!";
}
