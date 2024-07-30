import { useState } from 'react';


export default function useTicTacToe(boardSize) {

    const [size, setSize] = useState('');
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [error, setError] = useState('');
    const [isdraw, setIsDraw] = useState(false);


    const handleChange = (e) => {
        setSize(e.target.value);
    };

    const startGame = () => {
        const num = parseInt(size);
        if (num === 0 || num === 1) {
            setError("Enter a valid board size");
            return;
        }
        if (!Number.isInteger(Math.sqrt(num))) {
            setError('The number of cells must be a perfect square.');
            return;
        }
        setError('');
        const initialBoard = Array(num).fill(null);
        setBoard(initialBoard);
        setWinner(null);
        setCurrentPlayer('X');
    };

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWinner = (board) => {
        const size = Math.sqrt(board.length);
        const lines = [];

        // Rows
        for (let i = 0; i < size; i++) {
            lines.push(board.slice(i * size, i * size + size));
        }

        // Columns
        for (let i = 0; i < size; i++) {
            lines.push(board.filter((_, idx) => idx % size === i));
        }

        // Diagonals
        lines.push(board.filter((_, idx) => idx % (size + 1) === 0));
        lines.push(board.filter((_, idx) => idx % (size - 1) === 0 && idx !== 0 && idx !== board.length - 1));

        if(!board.includes(null)) {
            setIsDraw(!isdraw);
        }

        for (let line of lines) {
            if (line.every(cell => cell === 'X')) {
                setWinner('X');
                return;
            }
            if (line.every(cell => cell === 'O')) {
                setWinner('O');
                return;
            }
        }
        
    };

    const renderBoard = () => {
        const size = Math.sqrt(board.length);
        const rows = [];
        for (let i = 0; i < size; i++) {
            const cells = [];
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                cells.push(
                    <button key={index} className="cell" onClick={() => handleClick(index)}>
                        {board[index]}
                    </button>
                );
            }
            rows.push(<div key={i} className="row">{cells}</div>);
        }
        return rows;
    };

    return {
        startGame,
        handleChange,
        checkWinner,
        renderBoard,
        handleChange,
        size,
        setSize,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        winner,
        setWinner,
        error,
        setError,
        isdraw,
        setIsDraw,
    }
}
