import React from 'react'

interface Props {
    open: boolean;
    close: () => void;
    newItemTitle: string;
    setNewItemTitle: React.Dispatch<React.SetStateAction<string>>;
    saveItem: () => void;
}

export default function AddModal(props: Props) {
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
                    <button onClick={props.saveItem}>Add Item</button>
                </div>
            </div>
        </div>
    )
}
