import {supabase} from '../client' 
import { v4 as uuidv4 } from 'uuid';  
import { Room } from '../server/types';

export async function createRoom(fid: string): Promise<Room> {

  const id = uuidv4();


  const { data, error } = await supabase
    .from('rooms')
    .insert([
      {
        id,  
        player1_fid: fid,  
        started: false,
            
      },
    
    ])
    .select()  
    .single();

  if (error) {
    console.error('Ошибка при создании комнаты:', error);
    throw error;  
  }


  return data;
}