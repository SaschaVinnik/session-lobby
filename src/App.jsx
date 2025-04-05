import { sdk } from '@farcaster/frame-sdk';
import { farcasterFrame as frameConnector } from "@farcaster/frame-wagmi-connector";
import { useState, useEffect } from 'react';
import { WagmiProvider, useAccount, useConnect } from 'wagmi';
import { createRoom } from './rooms/createRooms';
import { joinRoom } from './rooms/joinRoom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {config} from './wagmiConfig.ts';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AppInner() {
  const [room, setRoom] = useState(null);
  const [roomMembers, setRoomMembers] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (room && room.player1_fid === address) {
    }
  }, [address, room]);

  
  return (
    <>
      {room ? (
        <RoomReady room={room} roomMembers={roomMembers} />
      ) : (
        <ConnectMenu setRoom={setRoom} setRoomMembers={setRoomMembers} roomMembers={roomMembers} />
      )}
    </>
  );
}

async function testCreateRoom(address, setRoom, setRoomMembers) {
  try {
    const room = await createRoom(address);
    setRoom(room);
    setRoomMembers([room.player1_fid]);
    console.log('Комната успешно создана:', room);
  } catch (error) {
    console.error('Ошибка при создании комнаты:', error);
  }
}

async function testJoinRoom(address, id, setRoom, setRoomMembers, roomMembers) {
  try {
    const room = await joinRoom(id, address);
    setRoom(room);
    setRoomMembers([...roomMembers, address]);
    console.log('Комната после подключения второго игрока:', room);
  } catch (error) {
    console.error('Ошибка при подключении второго игрока:', error);
  }
}

function RoomReady({ room }) {


  return (
    <>
      <div className='main'>
        <div>
			<div className='title'>Комната создана</div>
			<div className='id'>ID комнаты: {room[0].id}</div>
		</div>
		<div>Кто сделал что-то там?</div>
        <div>Игроки в комнате:
			<ul>
				<li>{room[0].player1_fid}</li>
				<li>{room[0].player2_fid}</li>
			</ul>
		</div>
        
      </div>
    </>
  );
}

function ConnectMenu({ setRoom, setRoomMembers, roomMembers }) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const [id, setId] = useState('');

  if (isConnected) {
    return (
      <>
        <div>
          <div onClick={() => testCreateRoom(address, setRoom, setRoomMembers)}>
            Создать комнату
          </div>
        </div>
        <div>
          <div onClick={() => testJoinRoom(address, id, setRoom, setRoomMembers, roomMembers)}>
            Ввести id комнаты
          </div>
		  <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

        </div>
      </>
    );
  }

  return (
	<button type="button" onClick={() => connect({ connector: frameConnector() })}>
		Connect
	</button>
);
}

export default App;


