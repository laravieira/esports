import './styles/main.css';
import logo from './assets/logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from './components/Input';
import { Button } from './components/Button';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(fetchGames);

    function fetchGames() {
        fetch('http://localhost/games')
            .then(response => response.json())
            .then(setGames);
    }

    function renderGame(game: Game) {
        return (
            <GameBanner key={ game.id }
                        url={ game.bannerUrl }
                        title={ game.title }
                        adsCount={ game._count.ads }/>
        );
    }

  return (
      <div className="max-w-[1344px] flex flex-col items-center m-20">
        <img src={ logo }  alt="eSports logo from NLW 9"/>
        <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.</h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
            { games.map(renderGame) }
        </div>

        <Dialog.Root>
            <CreateAdBanner/>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg width-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                    <form action="" method="post" className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="game" className="font-semibold">Qual o game?</label>
                            <Input type="text"
                                   id="game"
                                   placeholder="Selecione o game que deseja jogar"
                                   required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Seu nome (ou nickname)</label>
                            <Input type="text"
                                   id="name"
                                   placeholder="Como te chamam dentro do game?"
                                   required/>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="years">Joga há quantos anos?</label>
                                <Input type="number"
                                       id="years"
                                       placeholder="Tudo bem ser ZERO"
                                       max={ 150 }
                                       min={ 0 }
                                       step={ 1 }
                                       required/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord">Qual seu Discord?</label>
                                <Input type="text"
                                       id="discord"
                                       placeholder="Usuário#0000"
                                       pattern="^.{3,32}#[0-9]{4}$"
                                       required/>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="on-week">Quando costuma jogar?</label>
                                <div className="grid gap-1 grid-cols-7 ">
                                    <Button title="Domingo">D</Button>
                                    <Button title="Segunda">S</Button>
                                    <Button title="Terça">T</Button>
                                    <Button title="Quarta">Q</Button>
                                    <Button title="Quinta">Q</Button>
                                    <Button title="Sexta">S</Button>
                                    <Button title="Sábado">S</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="on-day-start">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input type="time"
                                           id="on-day-start"
                                           placeholder="De"
                                           required/>
                                    <Input type="time"
                                           id="on-day-end"
                                           placeholder="Até"
                                           required/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2 text-sm">
                            <Input type="checkbox" id="voice"/>
                            <label htmlFor="voice" className="select-none">Custumo me conectar ao chat de voz</label>
                        </div>
                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                                Cancelar
                            </Dialog.Close>
                            <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                                <GameController size={ 24 }/>Encontrar Duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
      </div>
  );
}

export default App;
