import * as Select from '@radix-ui/react-select';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Game } from '../App';
import { useState } from 'react';

interface AdBannerSelectProps {
    id: string;
    games: Game[];
}

export function AdBannerSelect({ id, games }: AdBannerSelectProps) {
    const [game, setGame] = useState<Game|null>(null);

    function onValueChange() {
    }

    function renderItem(game: Game) {
        const { id, title } = game;
        return (
            <Select.Item key={ id } value={ id } className="py-3 px-4 hover:bg-zinc-800 text-white">
                <Select.ItemText>{ title }</Select.ItemText>
                <Select.ItemIndicator />
            </Select.Item>
        );
    }

    function renderPlaceholder() {
        return (
            <p className="text-zinc-500">Selecione o game que deseja jogar</p>
        );
    }

    return (
        <Select.Root key={ id } name={ id } onValueChange={ onValueChange }>
            <Select.Trigger className="flex flex-row justify-between items-center bg-zinc-900 py-3 px-4 rounded text-sm text-white">
                <Select.Value placeholder={ renderPlaceholder() }></Select.Value>
                <Select.Icon>
                    <CaretDown size={ 18 } className="text-zinc-500"/>
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="flex flex-row justify-between bg-zinc-900 rounded text-sm color-white">
                    <Select.ScrollUpButton className="py-4 flex align-center justify-center text-white hover:bg-zinc-800">
                        <CaretUp/>
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                        { games.map(renderItem) }
                    </Select.Viewport>
                    <Select.ScrollDownButton className="py-4 flex align-center justify-center text-white hover:bg-zinc-900/70">
                        <CaretDown/>
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}