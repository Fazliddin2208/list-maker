import React, { useEffect, useState } from 'react'

interface SubItem {
    sub_id: number;
    sub_name: string;
}

interface Item {
    id: number,
    name: string,
    subItems: SubItem[];
}

interface Props {
    open: boolean;
    close: () => void;
    newItemTitle: string;
    setNewItemTitle: React.Dispatch<React.SetStateAction<string>>;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    items: Item[];
    checker: any;
    edit: () => void;
}

export default function EditModal(props: Props) {

    

    return (
        <div className={props.open ? 'modal active' : 'modal'}>
            <div className="modal__add">
                <div className="modal__top">
                    <h3>Add new Item</h3>
                    <p onClick={props.close}>&times;</p>
                </div>
                <div className="modal__add__data">
                    <input
                        type="text"
                        placeholder='Title of your Item...'
                        value={props.newItemTitle}
                        onChange={(e) => props.setNewItemTitle(e.target.value)}
                    />
                    <button onClick={props.edit}>Edit Item</button>
                </div>
            </div>
        </div>
    )
}
