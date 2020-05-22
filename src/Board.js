import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.3,
  };
  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // let board = [
    //   [true, true, true, true],
    //   [true, true, false, true],
    //   [true, false, false, false],
    //   [true, true, false, true],
    // ];
    // return board;
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let row = 0; row < this.props.nrows; row++) {
      let newRow = [];
      for (let col = 0; col < this.props.ncols; col++) {
        let light = Math.random();
        if (light <= this.props.chanceLightStartsOn) {
          newRow.push(true);
        } else {
          newRow.push(false);
        }
      }
      board.push(newRow);
    }
    return board;
  }

  checkWin() {
    let board = this.state.board;
    for (let row = 0; row < this.props.nrows; row++) {
      for (let col = 0; col < this.props.ncols; col++) {
        if (board[row][col] === false) {
          return false;
        }
      }
    }
    return true;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord;
    let hasWon = false;

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    let directions = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    flipCell(y, x);
    directions.forEach((dir) => {
      let ver = dir[0];
      let hor = dir[1];
      flipCell(y + ver, x + hor);
      console.log(y + ver, x + hor);
    });
    // win when every cell is turned off
    // TODO: determine is the game has been won
    hasWon = this.checkWin();
    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */
  generateBoard(row, index) {
    console.log(index);
    let items = [];
    for (let col = 0; col < this.props.ncols; col++) {
      items.push(
        <Cell
          key={[index, col]}
          value={[index, col]}
          isLit={this.state.board[index][col]}
          flipCellsAroundMe={this.flipCellsAround}
        />
      );
    }
    return items;
  }

  render() {
    // if the game is won, just show a winning msg & render nothing else
    return (
      <div className="Board">
        <h1 className="gameTitle">Lights Out Game</h1>
        {this.state.hasWon ? (
          <div className="winnerSign">
            <div className="neon">Game </div>
            <div className="flux">Over! </div>
          </div>
        ) : (
          <div>
            <tbody className="grid-container">
              {this.state.board.map((row, index) => (
                <trow>{this.generateBoard(row, index)}</trow>
              ))}
            </tbody>
          </div>
        )}
        <p>{this.board}</p>
      </div>
    );
  }
}

export default Board;
