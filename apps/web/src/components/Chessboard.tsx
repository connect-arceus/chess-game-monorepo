import { Chessboard as Board } from "react-chessboard"
import { useRecoilState } from "recoil";
import { boardFen, boardSelectedSquare, checkState, userColor } from "../store/store";
import { Square } from "chess.js";
import { useRef } from "react";

const Chessboard = ({
    movePiece,
}: {
    movePiece: (move: { from: string; to: string }) => void;
}) => {
    const [selectedSquare, setSelectedSquare] = useRecoilState(boardSelectedSquare);
    const [position] = useRecoilState(boardFen);
    const [color] = useRecoilState(userColor)
    const [check] = useRecoilState(checkState)

    const board = useRef(null);

    const handleSquareClick = (square: Square) => {
        if (selectedSquare) {
            // Attempt to make the move
            movePiece({
                from: selectedSquare,
                to: square,
            });

            setSelectedSquare("");

        } else {
            setSelectedSquare(square);
        }
    };

    const handlePieceDrop: (
        sourceSquare: Square,
        targetSquare: Square,
        piece: string,
    ) => boolean = (sourceSquare, targetSquare) => {
        movePiece({
            from: sourceSquare,
            to: targetSquare,
        });

        return false;
    };

    if (check.isCheck) {
        if (!board.current) return;
        console.log("Check!")
        console.log(check)
        // find the king and change the color of the square
    }

    return (
        <Board
            ref={board}
            onSquareClick={handleSquareClick}
            onPieceDrop={(src, target, piece) => handlePieceDrop(src, target, piece)}
            boardWidth={700}
            position={position}
            boardOrientation={color === "W" ? "white" : "black"}
            customSquareStyles={{
                [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
                [check.kingPosition]: { backgroundColor: "rgba(255, 0, 0, 0.4)" },
            }}
        />
    );
};


export default Chessboard