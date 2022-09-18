import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Input } from './Input';
import { Check, GameController } from 'phosphor-react';
import { AdBannerSelect } from './AdBannerSelect';
import { Game } from '../App';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FormEvent, useState } from 'react';
import axios from 'axios';

interface WeekDay {
    value: string,
    title: string,
    text: string
}

interface CreateAdModalProps {
    games: Game[];
}

export function CreateAdModal({ games }: CreateAdModalProps) {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoice, setUseVoice] = useState<boolean>(true);

    async function onAdSubmit(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data);

        try {
            await axios.post(`http://localhost/games/${data.game}/ads`, {
                name: data.name,
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data['on-day-start'],
                hourEnd: data['on-day-end'],
                yearsPlaying: Number(data.years),
                useVoiceChannel: useVoice
            });
            alert('Anúncio criado com sucesso!');
        }catch(e) {
            console.log(e);
            alert('Erro ao criar o anúncio!');
        }
    }
    
    function renderWeekDayItem({ value, title, text }: WeekDay) {
        const className = `py-3 px-4 text-sm ${ weekDays.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'}`;

        return (
            <ToggleGroup.Item key={ value }
                              value={ value }
                              title={ title }
                              className={ className }>
                { text }
            </ToggleGroup.Item>
        );
    }

    function renderWeekDays() {
        const weekDays = [
            { value: '0', title: 'Domingo', text: 'D' },
            { value: '1', title: 'Segunda', text: 'S' },
            { value: '2', title: 'Terça', text: 'T' },
            { value: '3', title: 'Quarta', text: 'Q' },
            { value: '4', title: 'Quinta', text: 'Q' },
            { value: '5', title: 'Sexta', text: 'S' },
            { value: '6', title: 'Sábado', text: 'S' },
        ];
        return weekDays.map(renderWeekDayItem);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg width-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <form onSubmit={ onAdSubmit } className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <AdBannerSelect id="game" games={ games } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input type="text"
                               id="name"
                               placeholder="Como te chamam dentro do game?"
                               minLength={ 4 }
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
                            <ToggleGroup.Root type="multiple"
                                              id="on-week"
                                              onValueChange={ setWeekDays }
                                              className="grid grid-cols-7 rounded overflow-hidden">
                                { renderWeekDays() }
                            </ToggleGroup.Root>
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
                    <div className="mt-2 flex gap-2 text-sm items-center">
                        <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900"
                                       defaultChecked
                                       onCheckedChange={ value => setUseVoice(value == true) }
                                       id="voice">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400"/>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
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
    );
}