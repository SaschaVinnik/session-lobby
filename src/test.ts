import { roomManager } from './index';

const host = { id: '1', name: 'TestHost' };
const room = roomManager.createRoom(host);

console.log('Room created:', room);
