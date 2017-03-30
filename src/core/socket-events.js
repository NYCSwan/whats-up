import keyMirror from 'key-mirror';

const socketEvents = keyMirror({
	system: null,  //push message to every connected user (like maitanance issues or @all)
    fact: null  //push message to individual
});

export {socketEvents}