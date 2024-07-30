import useTicTacToe from "../hooks/use-tic-tac-toe";

const TicTacToe = () => {
    const {
        startGame,
        renderBoard,
        handleChange,
        size,
        board,
        winner,
        error,
        isdraw,
    } = useTicTacToe();

    return (
        <div className="game">
            <div>
                <h1>Tic Tac Toe</h1>
                <input
                    type="number"
                    value={size}
                    onChange={handleChange}
                    placeholder="Enter number of cells" />
                <button
                    onClick={startGame}>
                    Start Game
                </button>
                {error && <p className="error">{error}</p>}
            </div>
            <div className='organize'>
                <div className="board">
                    {board.length > 0 && renderBoard()}
                </div>
            </div>
            { isdraw===true && <p className="winner"><b>It's a draw!!!</b></p>}
            { winner && <p className="winner">Player {winner} wins!</p>}
        </div>
    );
};

export default TicTacToe;
