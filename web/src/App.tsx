import './styles/main.css';
import logo from './assets/logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

//TODO Make web responsive
//TODO Put the game list into a carousel (recommended: https://keen-slider.io)
//TODO Make validation with warning style (recommended: https://react-hook-form.com)
//TODO Integration with Twitch (get up streaming games)
//TODO Integration with Discord (auto load discord tag)

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(fetchGames, []);

    function fetchGames() {
        axios('http://localhost/games')
            .then(({ data }) => setGames(data));
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
            <CreateAdModal games={ games }/>
        </Dialog.Root>
      </div>
  );
}

export default App;
