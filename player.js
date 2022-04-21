
const MAX_PLAYERS = 10000;

let players = {};
let playerID = 0;

function create(socket) {
    playerID = (++playerID) % MAX_PLAYERS

    players[playerID] = {
        id: playerID,
        socket: socket,
        room: null
    }

    return players[playerID];
}

function get(id) {
    return players[id];
}

module.exports = {create, get};