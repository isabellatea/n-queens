/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({'n': n});

  var findASolution = function(row) {
    if (row === n) {
      return board.rows();
    }
    for (var column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyRooksConflicts()) {
        var validResult = findASolution(row + 1);
        if (validResult) {
          return validResult;
        }
      }
      board.togglePiece(row, column);
    }
  };

  solution = findASolution(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var findEachSolution = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyRooksConflicts()) {
        findEachSolution(row + 1);
      }
      board.togglePiece(row, column);
    }
  };

  findEachSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({'n': n});
  if (n === 2 || n === 3) {
    return board.rows();
  }

  var findASolution = function(row) {
    if (row === n) {
      return board.rows();
    }

    for (var column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyQueensConflicts()) {
        var validResult = findASolution(row + 1);
        if (validResult) {
          return validResult;
        }
      }
      board.togglePiece(row, column);
    }
  };

  solution = findASolution(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var totalPiecesOnBoard = function() {
    var currentBoard = board.rows();
    return currentBoard.reduce(function(boardTotal, row) {
      return boardTotal + row.reduce(function(rowTotal, rowAtColumn) {
        return rowTotal + rowAtColumn;
      }, 0);
    }, 0);
  };

  var findEachSolution = function(row) {
    if (row === n) {
      if (totalPiecesOnBoard() === n) {
        solutionCount++;
      }
      return;
    }

    for (var column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyQueensConflicts()) {
        findEachSolution(row + 1);
      }
      board.togglePiece(row, column);
    }
  };

  findEachSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

