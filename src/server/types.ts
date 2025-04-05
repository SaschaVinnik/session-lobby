export type Player = {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  
  export type Room = {
    id: string;
    player1_fid: string,
    player2_fid: string | null,
    started: boolean,
    created_at: string
  };