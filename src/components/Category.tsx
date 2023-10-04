import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import EditModal from './EditModal';
import AddModal from './AddModal';

export default function Category() {
    const { id } = useParams();

    const [items, setItems] = useState<any[]>([])
    const [item, setItem] = useState<any>({})

    useEffect(() => {
        const storedItems: any = localStorage.getItem('list') || [];
        setItems(JSON.parse(storedItems));
        JSON.parse(storedItems)?.map((item: any) => {
            if (item.id == id) {
                setItem(item)
            }
        })
    }, []);
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items));
    }, [items, item]);

    const [addOpen, setAddOpen] = useState(false)
    const [newItemTitle, setNewItemTitle] = useState('');

    const toggleAddOpen = () => {
        setAddOpen(true);
    };

    const toggleAddClose = () => {
        setAddOpen(false);
    };

    const saveItem = () => {
        if (newItemTitle.trim() === '') {
            return;
        }

        items?.map(elem => {
            if (elem.id === item.id) {
                if (elem.subItems.length > 0) {
                    const newItem = {
                        sub_id: elem?.subItems[elem.subItems.length - 1]?.sub_id + 1,
                        sub_name: newItemTitle,
                    };
                    elem.subItems.push(newItem)
                    setItem(elem)

                } else {
                    const newItem = {
                        sub_id: 0,
                        sub_name: newItemTitle,
                    };
                    elem.subItems.push(newItem)
                    setItem(elem)
                }
            }
        })
        localStorage.setItem('list', JSON.stringify(items))
        setItems(items);
        setNewItemTitle('');
        toggleAddClose();
    };

    const [editOpen, setEditOpen] = useState(false)
    const [checkItem, setCheckItem] = useState()

    const toggleEditOpen = (elem: any) => {
        item?.subItems?.map((item: any) => {
            if (item === elem) {
                setNewItemTitle(elem.sub_name)
                setEditOpen(true);
            }
        })
        setCheckItem(elem)
    };

    const editItem = () => {
        if (newItemTitle.trim() === '') {
            return;
        }
        if (items.length > 0) {
            item?.subItems?.map((item: any) => {
                if (item === checkItem) {
                    item.sub_name = newItemTitle
                    items?.map((elem: any) => {
                        elem?.subItems?.map((sub: any) => {
                            if (sub.sub_id === item.sub_id) {
                                sub.sub_name = newItemTitle;
                            }
                        })
                    })
                }
            })

        }
        setItems(items)
        setNewItemTitle('');
        toggleEditClose();
        localStorage.setItem('list', JSON.stringify(items))
    };

    const toggleEditClose = () => {
        setEditOpen(false);
    };

    const deleteItem = (parent: any, e: any) => {
        items?.map((item: any) => {
            if (item.id === parent.id) {
                item?.subItems?.map((sub: any) => {
                    if (sub.sub_id === e.sub_id) {
                        item.subItems.splice(item.subItems.indexOf(sub), 1)
                        setItem(item)
                    }
                })
            }
        })

        localStorage.setItem('list', JSON.stringify(items));
        const storedItems: any = localStorage.getItem('list') || [];
        setItems(JSON.parse(storedItems));
    }

    return (
        <div className='wrapper'>
            <div className="wrapper__top">
                <h3>Sub Items List</h3>

                <div className='wrapper__top__actions'>
                    <NavLink to={'/'}>Home</NavLink>
                    <button onClick={toggleAddOpen}>Add new </button>
                </div>

                <AddModal
                    open={addOpen}
                    close={toggleAddClose}
                    newItemTitle={newItemTitle}
                    setNewItemTitle={setNewItemTitle}
                    saveItem={saveItem}
                />
            </div>
            <div className="wrapper__datas">
                <div className="wrapper__row">
                    <h3>{item?.name}</h3>
                    <div className="wrapper__row__actions">

                    </div>
                </div>

                {item?.subItems?.map((sub: any) => (
                    <div key={sub.sub_id} className="wrapper__row">
                        <p>{sub.sub_name}</p>
                        <div className="wrapper__row__actions">
                            <svg
                                onClick={() => deleteItem(item, sub)}
                                width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.53846 1.46667C1.13044 1.46667 0.739122 1.62119 0.450605 1.89624C0.162087 2.1713 0 2.54435 0 2.93333V4.4C0 4.78898 0.162087 5.16204 0.450605 5.43709C0.739122 5.71214 1.13044 5.86667 1.53846 5.86667H2.30769V19.0667C2.30769 19.8446 2.63187 20.5907 3.2089 21.1408C3.78594 21.691 4.56856 22 5.38462 22H14.6154C15.4314 22 16.2141 21.691 16.7911 21.1408C17.3681 20.5907 17.6923 19.8446 17.6923 19.0667V5.86667H18.4615C18.8696 5.86667 19.2609 5.71214 19.5494 5.43709C19.8379 5.16204 20 4.78898 20 4.4V2.93333C20 2.54435 19.8379 2.1713 19.5494 1.89624C19.2609 1.62119 18.8696 1.46667 18.4615 1.46667H13.0769C13.0769 1.07768 12.9148 0.70463 12.6263 0.429577C12.3378 0.154523 11.9465 0 11.5385 0L8.46154 0C8.05351 0 7.6622 0.154523 7.37368 0.429577C7.08516 0.70463 6.92308 1.07768 6.92308 1.46667H1.53846ZM6.15385 7.33333C6.35786 7.33333 6.55352 7.4106 6.69777 7.54812C6.84203 7.68565 6.92308 7.87217 6.92308 8.06667V18.3333C6.92308 18.5278 6.84203 18.7144 6.69777 18.8519C6.55352 18.9894 6.35786 19.0667 6.15385 19.0667C5.94983 19.0667 5.75418 18.9894 5.60992 18.8519C5.46566 18.7144 5.38462 18.5278 5.38462 18.3333V8.06667C5.38462 7.87217 5.46566 7.68565 5.60992 7.54812C5.75418 7.4106 5.94983 7.33333 6.15385 7.33333ZM10 7.33333C10.204 7.33333 10.3997 7.4106 10.5439 7.54812C10.6882 7.68565 10.7692 7.87217 10.7692 8.06667V18.3333C10.7692 18.5278 10.6882 18.7144 10.5439 18.8519C10.3997 18.9894 10.204 19.0667 10 19.0667C9.79599 19.0667 9.60033 18.9894 9.45607 18.8519C9.31181 18.7144 9.23077 18.5278 9.23077 18.3333V8.06667C9.23077 7.87217 9.31181 7.68565 9.45607 7.54812C9.60033 7.4106 9.79599 7.33333 10 7.33333ZM14.6154 8.06667V18.3333C14.6154 18.5278 14.5343 18.7144 14.3901 18.8519C14.2458 18.9894 14.0502 19.0667 13.8462 19.0667C13.6421 19.0667 13.4465 18.9894 13.3022 18.8519C13.158 18.7144 13.0769 18.5278 13.0769 18.3333V8.06667C13.0769 7.87217 13.158 7.68565 13.3022 7.54812C13.4465 7.4106 13.6421 7.33333 13.8462 7.33333C14.0502 7.33333 14.2458 7.4106 14.3901 7.54812C14.5343 7.68565 14.6154 7.87217 14.6154 8.06667Z" fill="black" />
                            </svg>

                            <svg
                                onClick={() => toggleEditOpen(sub)}
                                width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.783 0L22 3.21704L19.5475 5.67058L16.3305 2.45353L18.783 0ZM7 15H10.217L18.0312 7.1858L14.8142 3.96876L7 11.783V15Z" fill="black" />
                                <path d="M17.7778 18.7658H5.73111C5.70222 18.7658 5.67222 18.7769 5.64333 18.7769C5.60667 18.7769 5.57 18.7669 5.53222 18.7658H2.22222V3.21022H9.83L12.0522 0.987999H2.22222C0.996667 0.987999 0 1.98355 0 3.21022V18.7658C0 19.9924 0.996667 20.988 2.22222 20.988H17.7778C18.3671 20.988 18.9324 20.7539 19.3491 20.3371C19.7659 19.9204 20 19.3551 20 18.7658V9.13467L17.7778 11.3569V18.7658Z" fill="black" />
                            </svg>
                            <EditModal
                                open={editOpen}
                                close={toggleEditClose}
                                newItemTitle={newItemTitle}
                                setNewItemTitle={setNewItemTitle}
                                setItems={setItems}
                                items={item?.subItems}
                                checker={checkItem}
                                edit={editItem}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
