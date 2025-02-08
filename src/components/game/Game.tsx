import React from 'react';
import {
    MapContainer,
    TileLayer,
    useMapEvent,
    Marker as LMarker,
    Tooltip
} from 'react-leaflet';
import MarkerIcon from '@assets/marker.webp';
import Marker2Icon from '@assets/marker2.png';
import { Icon } from 'leaflet';
import type { GameState } from '@lib/game';
import { Show } from '@components/Flow';
import type { PlaceWithoutName } from '@lib/places';
import { Chip } from '@heroui/chip';

const center = [23.5937, 78.9629] as [number, number];
const provider =
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png';

const Marker = (props: {
    gameState: GameState;
    infoState: ReturnType<GameState['submitMarker']> | null;
}) => {
    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;

        if (
            props.gameState.currentMarker === 'submitted' ||
            props.gameState.status === 'paused'
        )
            return;

        props.gameState.setCurrentMarker({
            latitude: lat,
            longitude: lng
        });
    });

    const icon = new Icon({
        iconUrl: MarkerIcon.src,
        iconSize: [40, 40]
    });
    const icon2 = new Icon({
        iconUrl: Marker2Icon.src,
        iconSize: [25, 40]
    });

    return (
        <>
            <Show
                condition={
                    !['none', 'submitted'].includes(
                        props.gameState.currentMarker as string
                    )
                }
            >
                <LMarker
                    position={{
                        lat: (props.gameState.currentMarker as PlaceWithoutName)
                            ?.latitude,
                        lng: (props.gameState.currentMarker as PlaceWithoutName)
                            ?.longitude
                    }}
                    icon={icon}
                />
            </Show>
            <Show condition={props.infoState !== null}>
                <LMarker
                    position={{
                        lat: props.infoState?.toMark.latitude as number,
                        lng: props.infoState?.toMark.longitude as number
                    }}
                    icon={icon2}
                >
                    <Tooltip>
                        <Chip color="success">
                            {props.infoState?.toMark.name}
                        </Chip>
                    </Tooltip>
                </LMarker>
            </Show>
        </>
    );
};

const Game = (props: {
    gameState: GameState;
    infoState: ReturnType<GameState['submitMarker']> | null;
}) => {
    return (
        <MapContainer
            center={center}
            zoom={4.5}
            scrollWheelZoom
            preferCanvas
            className="cursor-pointer"
        >
            <TileLayer url={provider} />
            <Marker gameState={props.gameState} infoState={props.infoState} />
        </MapContainer>
    );
};

export default Game;
