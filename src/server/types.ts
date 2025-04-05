export type Player = {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  
  export type Room = {
    id: string;
    hostId: string;
    players: Map<string, Player>;
    status: 'waiting' | 'playing' | 'ended';
  };