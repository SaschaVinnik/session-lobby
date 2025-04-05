import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Room, Player } from '../server/types';

let socket: Socket | null = null;

export function useLobby(roomId: string, player: Player) {
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    socket = io({ path: '/api/socket' });

    socket.emit('join-room', { roomId, player });

    socket.on('room-update', (updatedRoom: Room) => {
      setRoom(updatedRoom);
    });

    return () => {
      socket?.emit('leave-room', { roomId, playerId: player.id });
      socket?.disconnect();
    };
  }, [roomId, player]);

  return { room };
}