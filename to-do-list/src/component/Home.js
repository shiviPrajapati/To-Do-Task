import "./styles/Home.css"
import { UserAuth } from "./context/AuthContext"
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";



const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}

function Home() {

    const [active, setActive] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDisp, setInputDisp] = useState('');
    const [inputPriority, setInputPriority] = useState("Medium");
    const [items, setItems] = useState(getLocalItems());
    const [toggle, setToggle] = useState(true);
    const [selected, ] = useState([]);
    const [edit, setEdit] = useState(null);
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (e) {
        }
    }

    const addItem = () => {
        if (inputTitle && inputDisp && !toggle) {
            setItems(
                items.map((elem) => {
                    if (elem.id === edit) { return { ...elem, name: inputTitle, disp: inputDisp, priority: inputPriority, status: "false", show: "false" } }
                    return elem;
                })
            )
            setToggle(true);
            setInputTitle('');
            setInputDisp('');
            setInputPriority('');
            setEdit(null);
        }
        else if (inputTitle && inputDisp) {
            let data = false;
            items.map((elem) => {
                if(elem.name === inputTitle) {
                    data = true;
                }
                return elem
            })
            if(data === false){
                const allInputData = { id: new Date().getTime().toString(), name: inputTitle, disp: inputDisp, priority: inputPriority, status: "false", show: "false" }
                setItems([...items, allInputData]);
            }
            
            setInputTitle('')
            setInputDisp('')
            setInputPriority('')
        }
    }



    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updatedItems);
    }



    const removeAll = () => {
        const updatedItems = items.filter((elem) => {
            return elem.id !== selected.filter(item => item === elem.id)[0]
        })
        setItems(updatedItems);
    }



    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        setToggle(false);
        setInputTitle(newEditItem.name);
        setInputDisp(newEditItem.disp);
        setInputPriority(newEditItem.priority)
        setEdit(id);
    }



    const viewItem = (id) => {
        let updatedItems = items.map((elem) => {
            if (elem.id === id) {
                if (elem.show === 'false') {
                    elem.show = 'true'
                }
                else {
                    elem.show = 'false'
                }
            }
            return elem;
        })
        setItems(updatedItems);
    }




    const markdown = (id) => {
        let updatedItems = items.map((elem) => {
            if (elem.id === id) {
                if (elem.status === 'false') {
                    elem.status = 'true'
                    selected.push(elem.id)
                }
                else {
                    elem.status = 'false'
                    selected.pop(elem.id)
                }
            }
            return elem;
        })
        setItems(updatedItems);
        localStorage.setItem('lists', JSON.stringify(items))
    }



    const sortPriority = () => {
        const sorted = items.sort((a, b) => {
            let fa = a.priority

            if (fa === "High")
                return -1;
            if (fa === "Medium")
                return 1;
            return 0
        })
        let updatedItems = items.map((elem) => {
            return elem
        })
        setItems(sorted);
        setItems(updatedItems)
    }



    const sortRecent = () => {
        const sorted = items.sort((a, b) => {
            let fa = a.status
            if (fa === "true")
                return -1;
            if (fa === "false")
                return 1;
            return 0
        })
        let updatedItems = items.map((elem) => {
            return elem
        })
        setItems(sorted);
        setItems(updatedItems)
    }



    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);




    return (
        <div>
            <div className="header">
                <div className="heading">To Do List</div>
                <div className="dropDown">
                    <div className="dropDown-Btn" onClick={(e) => setActive(!active)}>
                        <FiChevronDown></FiChevronDown>
                    </div>
                    <div className="header-item">
                        {active && (
                            <div style={{ padding: "10px" }} className="dropDown-content">
                                <div className="dropDown-item"><img className="userPic" alt="img" src="image/UserPic.png"></img></div>
                                <div className="dropDown-item"><p>User email: {user && user.email} </p></div>
                                <div className="dropDown-item"><button className="logoutBtn" onClick={handleLogout}>Logout</button></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <div className="cardBody">
                <div>
                    <div className="inputToDo">
                        <input
                            className="title"
                            type="text"
                            placeholder="Create Title"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)} />
                        <textarea
                            className="discription"
                            placeholder="Create Discription"
                            value={inputDisp}
                            onChange={(e) => setInputDisp(e.target.value)}>
                        </textarea>
                        <div className="priority">
                            <label>Choose Priority</label>
                            <select value={inputPriority}
                                onChange={(e) => setInputPriority(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <input type="hidden" id="saveindex" />
                        {
                            toggle ?
                                <button
                                    className="addtaskbtn"
                                    onClick={addItem}>Create Task
                                </button> :
                                <button
                                    className="addtaskbtn"
                                    id="saveBtn"
                                    onClick={addItem}>Update Task
                                </button>
                        }
                        {
                            selected.length > 0 && (
                                <button className="addtaskbtn" onClick={removeAll}>Delete Selected</button>
                            )
                        }
                    </div>



                    <div >
                        <div id="addedtasklist" className="showItem">
                            {items.length >= 1 ? (

                                items.map((elem) => {
                                    return (
                                        <div className="item" key={elem.id}>
                                            {
                                                elem.status === "true" ?
                                                    <div style={{ textDecoration: "line-through" }} className="showTitle">{elem.name}</div> :
                                                    <div style={{ textDecoration: "none" }} className="showTitle">{elem.name}</div>
                                            }


                                            <div className="showDetail">
                                                {
                                                    elem.show === "true" && (
                                                        <div>
                                                            <div className="showDisp">DISCRIPTION- {elem.disp}</div>
                                                            <div className="showPriority">PRIORITY- {elem.priority}</div>
                                                        </div>
                                                    )
                                                }

                                            </div>

                                            <div className="itemBtn">
                                                {
                                                    elem.status === "false" &&
                                                        <span>
                                                            <button className="viewBtn" onClick={() => viewItem(elem.id)}>View</button>
                                                            <button className="editBtn" onClick={() => editItem(elem.id)}>Edit</button>
                                                        </span>
                                                }

                                                <button className="dltBtn" onClick={() => deleteItem(elem.id)}>Delete</button>
                                                <input className="checkbox" onClick={() => markdown(elem.id)} type="checkbox"></input>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>LIST IS EMPTY</div>
                            )
                            }

                        </div>
                    </div>
                    {
                        items.length >= 2 &&
                        <div className="sortBtn">
                            <button onClick={(e) => sortPriority()}>Sort On Priority of TO-Do Item</button>
                            <button onClick={(e) => sortRecent()}>Sort On Selected To-Do Item </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}



export default Home