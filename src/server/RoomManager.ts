import { Room, Player } from './types';
import { randomUUID } from 'crypto';

class RoomManager {
  private rooms: Map<string, Room> = new Map();

  createRoom(host: Player): Room {
    const roomId = randomUUID();
    const room: Room = {
      id: roomId,
      hostId: host.id,
      players: new Map([[host.id, host]]),
      status: 'waiting',
    };
    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(roomId: string, player: Player): Room | null {
    const room = this.rooms.get(roomId);
    if (!room || room.players.has(player.id)) return null;
    room.players.set(player.id, player);
    return room;
  }

  leaveRoom(roomId: string, playerId: string): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    room.players.delete(playerId);
    if (room.players.size === 0) this.rooms.delete(roomId);
    return room;
  }

  startGame(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'waiting') return false;
    room.status = 'playing';
    return true;
  }

  endGame(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'playing') return false;
    room.status = 'ended';
    return true;
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  getRooms(): Room[] {
    return Array.from(this.rooms.values());
  }
}

export const roomManager = new RoomManager();