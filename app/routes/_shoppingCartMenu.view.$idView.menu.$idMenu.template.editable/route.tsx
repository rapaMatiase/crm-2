import * as React from 'react';

import { TileLayout } from '@progress/kendo-react-layout';
import { ContextMenu, MenuItem, MenuSelectEvent } from '@progress/kendo-react-layout';
import { Offset, Popup } from '@progress/kendo-react-popup';

import data from './data.json';

const styles: React.CSSProperties = {
    padding: 10,
    margin: 'auto',
    userSelect: 'none',
    height: 150,
    width: "100%",
    backgroundColor: 'yellow',
};

const styles2: React.CSSProperties = {
    padding: 10,
    margin: 'auto',
    userSelect: 'none',
    height: 250,
    width: "100%",
    backgroundColor: 'red',
};



const App = () => {


    const [show, setShow] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<string>('flex-start');
    const offset = React.useRef<Offset>({ left: 0, top: 0 });
    const targetElement = React.useRef<HTMLElement | null>(null);

    const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        offset.current = { left: e.pageX, top: e.pageY };
        targetElement.current = e.currentTarget;

        e.preventDefault();
        setShow(true);

    };

    const handleOnSelect = (e: MenuSelectEvent) => {
        switch(e.item.data.action) {
            case "subir":
                const updatedTiles = tiles.map(tile => {
                    if (tile.id === Number(targetElement.current?.id)) {
                        return {
                            ...tile,
                            defaultPosition: {
                                ...tile.defaultPosition,
                                order: tile.defaultPosition.order - 1
                            }
                        };
                    }
                    return tile;
                });
                setTiles(updatedTiles);
                break;
            case "bajar":
                const downTiles = tiles.map(tile => {
                    if (tile.id === Number(targetElement.current?.id)) {
                        return {
                            ...tile,
                            defaultPosition: {
                                ...tile.defaultPosition,
                                order: tile.defaultPosition.order + 1
                            }
                        };
                    }
                    return tile;
                });
                setTiles(downTiles);
                break;
        }
       
        setShow(false);
    };

    const handleOnClose = () => {
        setShow(false);
    };
    
const [tiles, setTiles] = React.useState([
    {
        id: 1,
        defaultPosition: { col: 1, colSpan: 3, order: 1 },
        reorderable: true,
        item: <p id="1" onContextMenu={handleContextMenu} style={styles2}>A-1</p>,
    },
    {
        id: 2,
        defaultPosition: { col: 1, colSpan: 3, order: 2 },
        reorderable: true,
        item: <p id="2" onContextMenu={handleContextMenu} style={styles}>B-2</p>,
    },
    {
        id: 3,
        defaultPosition: { col: 1, colSpan: 3, order: 3 },
        reorderable: true,
        item: <p id="3" onContextMenu={handleContextMenu} style={styles2}>C-3</p>,
    },
    {
        id: 4,
        defaultPosition: { col: 1, colSpan: 3, order: 4 },
        reorderable: true,
        item: <p id="4" onContextMenu={handleContextMenu} style={styles}>D-4</p>,
    },
    {
        id: 5,
        defaultPosition: { col: 1, colSpan: 3, order: 5 },
        reorderable: true,
        item: <p id="5" onContextMenu={handleContextMenu} style={styles}>E-5</p>,
        
    },
]);

 

    return (<>
        <TileLayout
            columns={3}
            style={{gridAutoRows : "none"}}
            gap={{ rows: 10, columns: 10 }}
            positions={tiles.map(tile => tile.defaultPosition)}
            items={tiles}
        />

        <ContextMenu
                vertical={true}
                onSelect={handleOnSelect}
                onClose={handleOnClose}
                show={show}
                offset={offset.current}
            >
                <MenuItem text="Subir" data={{ action: 'subir' }} />
                <MenuItem text="Bajar" data={{ action: 'bajar' }} />
            </ContextMenu>
    </>
    );
};

export default App;
