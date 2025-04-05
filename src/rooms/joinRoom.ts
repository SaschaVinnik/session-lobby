import { supabase } from '../client'; 


export async function joinRoom(roomId: string, player2_fid: string) {

  const { data: room, error: getRoomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single(); 

  
  if (getRoomError) {
    console.error('Ошибка при получении комнаты:', getRoomError);
    throw getRoomError; 
  }

  if (room.player2_fid && room.player2_fid !== player2_fid) {
    console.log('Комната уже заполнена. Второй игрок не может подключиться.');
    return;
  }



  const { data, error } = await supabase
    .from('rooms')
    .update({ player2_fid }) 
    .eq('id', roomId) 
    .select(); 


  if (error) {
    console.error('Ошибка при подключении второго игрока:', error);
    throw error;
  }


  console.log('Комната после подключения второго игрока:', data);
  return data;
}