var board, score = 0, rows = 4, columns = 4;

window.onload = function () {
    setBoard();
}
function setBoard() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let box = document.createElement("div");
            box.id = (r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateBox(box, num);
            document.getElementById("board").append(box);

        }
    }
    addRandomBox();
    addRandomBox();
}

// updating the box 
function updateBox(box, num) {
    box.innerText = "";                             //setting previous value to null
    box.classList.value = "";                       //setting all previous classes to empty
    box.classList.add("box");                       //adding new class box
    if (num > 1) {
        box.innerText = num.toString();             //adding new text to box                                                
        box.classList.add("x" + num.toString());      //adding a new class to box (x2,x4 etc.)
    }
}
try {
    document.addEventListener("keyup", (e) => {         //eventlistener listens any event that happens
        if (e.code == "ArrowLeft") {                     //it can be a mouse click or keyboard keypress
            slideLeft();
        }
        else if (e.code == "ArrowRight") {
            slideRight();
        }
        else if (e.code == "ArrowUp") {
            slideUp();
        }
        else if (e.code == "ArrowDown") {
            slideDown();
        }
        addRandomBox();
        document.getElementById("score").innerText(score);
    });
} catch (error) {
    document.write(error);
}


function clearZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {

    row = clearZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = clearZero(row);

    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function updateBox_leftright(r) {
    for (let c = 0; c < columns; c++) {
        let box = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
        updateBox(box, num);
    }
}
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        updateBox_leftright(r);
    }

}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        updateBox_leftright(r);
    }
}


function updateBox_updown(c) {
    for (let r = 0; r < rows; r++) {
        let box = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
        updateBox(box, num);
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let i = 0; i < columns; i++) {
            board[i][c] = row[i];
        }
        updateBox_updown(c);
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let i = 0; i < columns; i++) {
            board[i][c] = row[i];
        }
        updateBox_updown(c);
    }
}

function emptyFound() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function addRandomBox() {
    if (!emptyFound) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let box = document.getElementById(r.toString() + "-" + c.toString());
            box.innerText = "2";
            box.classList.add("x2");
            found = true;
        }
    }
}
