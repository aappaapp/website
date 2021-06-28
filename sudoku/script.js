$(function () {
    class Sudoku {
        constructor() {
            this.board = this.blank_board_array();
        }

        blank_board_array() {
            return [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        }

        // I can't figure out how to get this working with the "set" keyword, so making a method for now
        set_board(board_string) {
            if (!board_string.match(/^\d{81}$/m)) {
                this.board = this.blank_board_array();
                return;
            }

            for (let row = 0; row <= 8; row++) {
                for (let column = 0; column <= 8; column++) {
                    this.board[row][column] = board_string.charAt(row * 9 + column);
                }
            }

            /*
            if ( ! this.puzzle_is_valid() ) {
                this.board = this.blank_board_array();
                return;
            }
            */
        }

        get_board_array() {
            return this.board;
        }

        make_move(row, col, value) {
            this.board[row][col] = value;
        }

        is_legal_move(row, col, value) {
            // check for non numbers
            // weird that JS match function doesn't put quotes around regex
            if (!value.match(/^[1-9]$/m)) {
                return false;
            }

            // check row
            for (let i = 0; i <= 8; i++) {
                if (value == this.board[row][i]) {
                    return false;
                }
            }

            // check column
            for (let i = 0; i <= 8; i++) {
                if (value == this.board[i][col]) {
                    return false;
                }
            }

            // check 3x3 grid
            let row_offset = Math.floor(row / 3) * 3;
            let col_offset = Math.floor(col / 3) * 3;
            for (let i = 0 + row_offset; i <= 2 + row_offset; i++) {
                for (let j = 0 + col_offset; j <= 2 + col_offset; j++) {
                    if (value == this.board[i][j]) {
                        return false;
                    }
                }
            }

            return true;
        }
    };

    let game1 = new Sudoku();
    let import_string = 120450089406709103080100450200060001500801004800030007040000910000912005000040078;
    let import_button = document.getElementById('import');
    let sudoku_squares = createArray(9, 9);

    for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
            sudoku_squares[row][col] = $('.sudoku').find('tbody').find('tr').eq(row).find('td').eq(col).find('input')[0];
        }
    }

    // import_button.addEventListener("mouseup", function () {
    // });
    import_string = document.getElementsByName("import_string")[0].value;
    game1.set_board(import_string);
    print_sudoku_to_webpage(game1);

    for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
            sudoku_squares[row][col].addEventListener('input', function (e) {
                e.target.classList.remove("invalid");
                e.target.classList.remove('valid');
                if (!game1.is_legal_move(row, col, e.target.value) && e.target.value != "") {
                    e.target.value = "";
                    highlight_temporarily(e.target, 2000);
                } else {
                    game1.make_move(row, col, e.target.value);
                    if ($(':focus').val() != '') {
                        $(':focus').addClass('valid');
                    }
                }
            });
        }
    }
    function print_sudoku_to_webpage(sudoku_object) {
        let board = sudoku_object.get_board_array();
        clear_webpage_board();
        for (let row = 0; row <= 8; row++) {
            for (let col = 0; col <= 8; col++) {
                if (board[row][col] != 0) {
                    let input = sudoku_squares[row][col];
                    input.value = board[row][col];
                    input.classList.add('imported_square');
                    input.readOnly = true;
                }
            }
        }
    }

    function clear_webpage_board() {
        for (let row = 0; row <= 8; row++) {
            for (let col = 0; col <= 8; col++) {
                sudoku_squares[row][col].value = "";
                sudoku_squares[row][col].classList.remove('imported_square');
            }
        }
    }

    // This code is borrowed from another website. Thanks google.
    function createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--) arr[length - 1 - i] = createArray.apply(this, args);
        }

        return arr;
    }

    function highlight_temporarily(obj, timeout_in_ms) {
        obj.classList.add('invalid');
        obj.value = 'X';
        obj.readOnly = true;
        setTimeout(function () {
            obj.classList.remove('invalid');
            obj.value = '';
            obj.readOnly = false;
        }, timeout_in_ms);
    }
});
