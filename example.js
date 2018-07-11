const Node = require('.');

const dungeon = new Node('Dungeon');

const lobby = dungeon.add('Lobby');

let roomNumber = 0;

let roomMaker = function(parent){
  roomNumber = roomNumber +1;
  const room = parent.add('Room #'+roomNumber);
  room.on('object', (thing)=>{
    if(thing == 'Bob'){
      if(Math.random() > .5){
      const newRoom = roomMaker(room);
      console.log(room.location().join('/'), 'Bob made a new room ('+room.name +'->'+newRoom.name+')');
      }else{
        console.log(room.location().join('/'), 'Bob finished building');
      }
    }
  });
  return room;
}

roomMaker(lobby.add('Room #'+roomNumber)); // Create the first room
dungeon.pipe('Bob');
dungeon.pipe('Bob');
dungeon.pipe('Bob');
dungeon.pipe('Bob');
