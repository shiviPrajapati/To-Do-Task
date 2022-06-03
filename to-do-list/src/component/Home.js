// import react from "react";
import "./styles/Home.css"
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext"
import { useState } from "react";
import { useEffect } from "react";


const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

function Home () {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggle, setToggle] = useState(true);
    const [edit, setEdit] = useState(null);
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
            console.log('you are logged out')
        } catch (e){
            console.log(e.message)
        }
    }

    const addItem = () => {
       if(inputData && !toggle) {
            setItems(
                items.map((elem) => {
                    if(elem.id === edit){return{ ...elem, name:inputData}}
                    return elem;
                })
            )
            setToggle(true);
            setInputData('');
            setEdit(null);
        }
        else if(inputData){
            const allInputData = { id: new Date().getTime().toString(), name:inputData}
            setItems([...items, allInputData]);
            setInputData('')
        }
        else{
            alert("enter data");
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updatedItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        setToggle(false);
        setInputData(newEditItem.name);
        setEdit(id);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <div>
            <div className="header">
                <p>User email: {user && user.email} </p>
                <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="cardBody">
                       <div className="heading">To Do List</div>
                            <div>
                                <div className="inputToDo">
                                        <input type="text" placeholder="Enter your task" id="addtaskinput" value={inputData}
                                        onChange= {(e) => setInputData(e.target.value)}/>
                                        <input type="hidden" id="saveindex" />
                                        {
                                            toggle ? 
                                            <button id="addtaskbtn" onClick={addItem}>Add Task</button>:<button className="saveBtn" onClick={addItem} id="savetaskbtn">Update Task</button>
                                        }
                                    
                                    <button id="deleteallbtn" onClick={removeAll}>Delete All</button>
                                </div>
                                <div >
                                    <div id="addedtasklist" className="showItem">
                                        {
                                            items.map((elem) => {
                                                return(
                                                    <div className="item" key={elem.id}>
                                        
                                                        <span>{elem.name}</span>
                                                        <div>
                                                            <button className="editBtn" onClick={() => editItem(elem.id)}>Edit</button>
                                                            <button className="dltBtn" onClick={() => deleteItem(elem.id)}>Delete</button>    
                                                        </div>
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                   



            
        </div>
    )
}

export default Home