import {createContext, useContext, useReducer, useEffect} from 'react';
import {Contact, State} from '../types/Types'
import axios from 'axios';
import { toast } from 'react-toastify';


interface reducerI {
    state : State,
    dispatch : React.Dispatch<any>
}

//Create default State
const defaultState : reducerI = {
    state:{
        contacts: [
            {
                name:'',
                email:'',
                phone:'',
                id:0,
            }
        ],
        activeContact: null,
        showContactForm: {show:false,formtype:'add'},
        filteredContacts: [
            {
                name:'',
                email:'',
                phone:'',
                id:0,
            }
        ]
    },
    dispatch:()=>{}
}

type ContactProviderProps={
    children : React.ReactNode
}

//Create contact Context
const ContactContext = createContext(defaultState);

const randomNumber = () =>{
    return Math.floor(Math.random()*11 + 1);
}

//Create Reducer 
const reducer = (state: State, action: any) => {
    switch (action.type) {
        case 'get-contacts':
            return {
                ...state,
                contacts: action.payload,
                filteredContacts: action.payload,
            };
        case 'add-contact':
            axios.post('https://jsonplaceholder.typicode.com/users',action.payload).then(()=>{
                toast.success('Contact added successfully');
            })
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                filteredContacts: [...state.contacts, action.payload],
            };
        case 'delete-contact':
            axios.delete(`https://jsonplaceholder.typicode.com/users/${action.payload}`).then(()=>{
                toast.success('Contact deleted successfully');
            })
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload
                ),
                filteredContacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload
                ),
                activeContact: null,
            };
        case 'edit-contact':
            axios.put(`https://jsonplaceholder.typicode.com/users/${action.payload.id}`,action.payload).then(()=>{
                toast.success('Contact updated successfully');
            })
            const updatedContacts = state.contacts.map((contact) => {
                if (contact.id === action.payload.id) {
                    return action.payload;
                }
                return contact;
            });
            return {
                ...state,
                contacts: updatedContacts,
                filteredContacts: updatedContacts,
                activeContact: null,
            };
        case 'set-active-contact':
            return {
                ...state,
                activeContact: action.payload,
            };
        case 'toggle-add-form':
            return {
                ...state,
                showContactForm: {
                    show: !state.showContactForm.show,
                    formtype: 'add',
                },
            };
        case 'toggle-edit-form':
            return {
                ...state,
                showContactForm: {
                    show: !state.showContactForm.show,
                    formtype: 'edit',
                },
            };
        case 'filter-contacts':
            const filtered = state.contacts.filter((contact) =>
                contact.name.includes(action.payload)||contact.email.includes(action.payload)||contact.phone.includes(action.payload)
            );
            return {
                ...state,
                activeContact: null,
                filteredContacts: filtered,
            };
        default:
            return state;
    }
};

//Create Provider for Contact Context
export const ContactProvider  = ({children}:ContactProviderProps)=>{
    const [state, dispatch] = useReducer(reducer, defaultState.state);

    const getContatcs = ():void=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            let data : Contact[]=[];
            res.data.forEach((contact:any) => {
                const random = randomNumber()
                console.log(random)
                data.push({
                    name:contact.name.toLowerCase(), 
                    email:contact.email.toLowerCase(),
                    phone:contact.phone.toLowerCase(),
                    address:contact.address,
                    img:String(random),
                    id:contact.id
                })
            });
            dispatch({type:'get-contacts',payload:data})
        })
    }
    
    useEffect(()=>{
        getContatcs()
    },[])

    return (
        <ContactContext.Provider value = {{state,dispatch}}>
            {children}
        </ContactContext.Provider>
    )
} 

//Create Hook for User Context
export const useContactContext = ()=> useContext(ContactContext);