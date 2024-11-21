import { Chess } from "chess.js";
import { atom } from "recoil";

export const gameId = atom({
    key: "id",
    default: ""
})

export const gameHistory = atom({
    key: "history",
    default: []
})

export const userColor = atom({
    key: "color",
    default: ""
})

export const boardState = atom({
    key: "board",
    default: ""
})

export const boardFen = atom({
    key: "fen",
    default: new Chess().fen() 
})

export const gameStatusState = atom({
    key: "status",
    default: ""
})

export const gameTime = atom({
    key: "time",
    default: 10
})

export const boardSelectedSquare = atom({
    key: "selectedSquare",
    default: ""
})

export const chess = atom({
    key: "chess",
    default: null
})

export const checkState = atom({
    key: "check",
    default: {
        isCheck: false,
        color: "",
        kingPosition: ""
    }
})
