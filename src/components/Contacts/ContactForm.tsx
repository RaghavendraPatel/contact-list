import React, { useRef } from 'react'
import { useContactContext } from '../../context/contactContext'
import {useEffect} from 'react'

function ContactForm() {
  const {state,dispatch} = useContactContext();
  const formtype = state.showContactForm.formtype;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const suiteRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipcodeRef = useRef<HTMLInputElement>(null);
  let uid:any;
  let uimg:any;

  useEffect(()=>{
    //check if formtype is edit or add
    if(formtype === 'edit'){
      const {name,email,phone,address,id,img} = state.activeContact!;
      nameRef.current!.value = name;
      emailRef.current!.value = email;
      phoneRef.current!.value = phone;
      streetRef.current!.value = address?.street || '';
      suiteRef.current!.value = address?.suite || '';
      cityRef.current!.value = address?.city || '';
      zipcodeRef.current!.value = address?.zipcode || '';
      uid = id;
      uimg = img;
    }
  },[formtype,state.activeContact])
  // handle submit
  // use reducer to update state
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const street = streetRef.current?.value;
    const suite = suiteRef.current?.value;
    const city = cityRef.current?.value;
    const zipcode = zipcodeRef.current?.value;

    const newContact = {
      name,
      email,
      phone,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
      img:uimg||Math.floor(Math.random()*11 + 1),
      id:uid||Math.floor(Math.random()*1000)
    };
    console.log(newContact);
    e.currentTarget.reset();
    if(formtype === 'edit'){
      dispatch({type:'edit-contact',payload:newContact});
      dispatch({type:'toggle-edit-form'});
      return;
    }
    dispatch({type:'add-contact',payload:newContact});
    dispatch({type:'toggle-add-form'});
  }
  return (
    <div className="contact__form">
      <div className="contact__form__container">
        <div className="contact__form__header">
          <h2>{(formtype === 'edit')?'Edit Contact':'Add Contact'}</h2>
          <div className='close' onClick={()=>{dispatch({type:'toggle-add-form'});dispatch({type:'set-active-contact',payload:null})}}>X</div>
        </div>
        <div className="contact__form__body">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter name" ref={nameRef}/>
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter email" ref={emailRef}/>
            </div>
            <div className="form__group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" placeholder="Enter phone" ref={phoneRef}/>
            </div>
            <div className="form__group address">
              <hr />
              <h3>Address</h3>
              <input type="text" id="street" placeholder="Street" ref={streetRef}/>
              <input type="text" id="suit" placeholder="Suite" ref={suiteRef}/>
              <input type="text" id="city" placeholder="City" ref={cityRef}/>
              <input type="number" id="zipcode" placeholder="Zipcode" ref={zipcodeRef}/>
            </div>
            <div className="form__group__buttons">
              <button type="submit">{(formtype=='edit')?'Edit':'Add Contact'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm