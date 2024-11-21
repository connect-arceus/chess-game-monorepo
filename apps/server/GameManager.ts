import type { User } from "./UserManager";
import { nanoid } from "nanoid";
import { Chess } from "chess.js";
import type { WebSocket } from "ws";
import { OUTGOING_MESSAGE } from "./messages/outgoingMessages";

export enum GAME_STATUS {
    WAITING = 'WAITING',
    STARTED = 'STARTED',
    RECONNECTING = 'RECONNECTING',
    ENDED = 'ENDED'
}

export type Move = { from: string; to: string; }

export type Player = {
    user: User;
    socket: WebSocket;
}

export interface Game {
    id: string;
    player1: { user: User; socket: WebSocket; color: string; };
    player2: { user: User; socket: WebSocket; color: string; } | null;
    chess: any;
    board: any;
    time: number;
}

export class GameManager {

    private games: Game[];
    private waiting: string | null;

    constructor() {
        this.games = [];
    }

    init(player: Player, gameTime: any) {
        const waiting = this.games.find((game) => game.player2 === null)

        if (!waiting) {
            const chess = new Chess();
            const game = {
                id: nanoid(),
                player1: {
                    color: "W",
                    ...player
                },
                player2: null,
                chess,
                board: chess.board(),
                time: gameTime, 
            }
    
            this.games.push(game)
            player.socket.send(JSON.stringify({
                type: OUTGOING_MESSAGE.INIT_GAME,
                payload: {
                    status: GAME_STATUS.WAITING,
                    ...game
                }
            }))
        } else {
            this.games = this.games.map((game) => {
                if (game.id === waiting.id) {
                    return { ...game, player2: { color: "B", ...player }};
                } else {
                    return game
                }
            })

            const game = this.games.find((game) => game.id === waiting.id)

            game.player1.socket.send(JSON.stringify({
                type: OUTGOING_MESSAGE.INIT_GAME,
                payload: {
                    id: game.id,
                    board: game.board,
                    chess: game.chess,
                    time: game.time,
                    player: {
                        color: "W",
                        ...game.player1
                    },
                    opponent: {
                        color: "B",
                        ...game.player2
                    },
                    status: GAME_STATUS.STARTED,
                }
            }))                        
            game.player2.socket.send(JSON.stringify({
                type: OUTGOING_MESSAGE.INIT_GAME,
                payload: {
                    id: game.id,
                    board: game.board,
                    chess: game.chess,
                    time: game.time,
                    player: {
                        color: "B",
                        ...game.player2
                    },
                    opponent: {
                        color: "W",
                        ...game.player1
                    },
                    status: GAME_STATUS.STARTED,
                }
            }))                        
        }
    }

    startGame() {
        
    }

    move(id: string, player: User, move: Move) {
        const game = this.games.find((game) => game.id === id)
        if (!game || !game.player2) return;

        try {

            if (game.chess.turn() === game.player1.color.toLowerCase() && game.player1.user.id === player.id) {
                game.chess.move(`${move.from}${move.to}`)
            } else if (game.chess.turn() === game.player2.color.toLowerCase() && game.player2.user.id === player.id) {
                game.chess.move(`${move.from}${move.to}`)
            }

        } catch (error) {
            console.log(error)            
        }

        let payload = {
            type: OUTGOING_MESSAGE.MOVE,
            payload: {
                check: { isCheck: false, color: "", kingPosition: ""},
                board: game.chess.board(),
                fen: game.chess.fen(),
                history: game.chess.history({ verbose: true }),
            }
        }

        if (game.chess.inCheck()) {

            const findKing = () => {
                let kingPosition = ""
                game.chess.board().map((row, rowIndex) => {
                    if (row !== null) {
                        row.map((col, colIndex) => {
                            if (col !== null && col.type === "k" && col.color === game.chess.turn()) {
                                kingPosition = col.square
                            }
                        })
                    }
                })
                return kingPosition
            }

            payload = {
                type: OUTGOING_MESSAGE.MOVE,
                payload: {
                    check: { isCheck: true , color: game.chess.turn() === "w" ? "B" : "W", kingPosition: findKing() },
                    board: game.chess.board(),
                    fen: game.chess.fen(),
                    history: game.chess.history({ verbose: true }),
                }
            }
        }

        if (game.chess.isCheckmate()) {
            this.endGame(game)
        }

        game.player1.socket.send(JSON.stringify(payload))
        game.player2.socket.send(JSON.stringify(payload))

    }

    endGame(game: Game) {
        if (!game || !game.player2) return;

        if (game.chess.isCheckmate()) {
            game.player1.socket.send(JSON.stringify({
                type: OUTGOING_MESSAGE.GAME_OVER,
                payload: {
                    status: GAME_STATUS.ENDED,
                    isCheckmate: true,
                    winner: game.chess.turn() === "w" ? game.player2.user : game.player1.user,
                    color: game.chess.turn().toUpperCase()
                }
            }))
            game.player2.socket.send(JSON.stringify({
                type: OUTGOING_MESSAGE.GAME_OVER,
                payload: {
                    status: GAME_STATUS.ENDED,
                    isCheckmate: true,
                    winner: game.chess.turn() === "w" ? game.player2.user : game.player1.user,
                    color: game.chess.turn().toUpperCase()
                }
            }))
        }

    }

    handleDisconnect() {

    }

}