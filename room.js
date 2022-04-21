
const MAX_ROOMS = 1000;

let rooms = {};

function joinOrCreate(player) {

    // Find room
    for (let roomID in rooms) {
        if (rooms[roomID].player2 == null) {
            rooms[roomID].player2 = player;
            player.room = rooms[roomID];
            return rooms[roomID];
        }
    }

    // Find free room id
    let roomID = 0;
    while (rooms[roomID] != null) {
        roomID = (++roomID) % MAX_ROOMS;
    }

    // Create new room
    rooms[roomID] = {
        id: roomID,
        player1: player,
        player2: null
    }

    player.room = rooms[roomID];

    return rooms[roomID];
}

module.exports = {joinOrCreate};