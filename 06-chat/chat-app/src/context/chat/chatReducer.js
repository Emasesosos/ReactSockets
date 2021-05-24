import { types } from "../../types/types";

export const chatReducer = (state, action) => {

    switch(action.type) {
        case types.activarChat:
            if(state.chatActivo === action.payload) return state;
            return {
                ...state,
                chatActivo: action.payload,
                mensajes: [],
            }
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [...action.payload],
            }
        default:
            return state;
    }

};