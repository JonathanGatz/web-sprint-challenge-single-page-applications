import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import Form from './components/Form';
import Landing from './components/Landing';
import Pizza from './components/extraForm';

//function App() {

  //const [form, setForm] = useState([])

  const initialFormValues = {
    name: '',
    size: 'personal size ',
    toppings: {
    pineapple: false,
    sausage: false,
    ham: false,
    cheese: false,
    },
    special: '',
  };


  function App () {

    const [formValues, setFormValues] = useState(initialFormValues);
    const [orders, setOrders] = useState([]);
    const [formErrors, setFormErrors] = useState('');
    const [disabled, setDisabled] = useState(true);
    const submitForm = () => {
      const newOrder = {
        name: formValues.name.trim(),
        size: formValues.size,
        gluten: formValues.gluten,
        special: formValues.special,
        toppings: Object.keys(formValues.toppings).filter(
          (tp) => formValues.toppings[tp]
        ),
      };
  
      axios
        .post('https://reqres.in/api/users', newOrder)
        .then((res) => {
          const ordersFromApi = res.data;
          console.log(ordersFromApi);
          setOrders([ordersFromApi, ...orders]);
          setFormValues(initialFormValues);
        })
        .catch((err) => {
          console.log('Check Yo Error');
        });
    };
  
    const inputChange = (name, value) => {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const inputChangeName = (name, value) => {
      yup
        .reach(Form, name)
  
        .validate(value)
  
        .then((valid) => {
          setFormErrors({
            ...formErrors,
            [name]: 'Thanks for adding your name',
          });
        })
  
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            [name]: err.errors[0],
          });
        });
  
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const checkboxChange = (name, isChecked) => {
      setFormValues({
        ...formValues,
        toppings: {
          ...formValues.toppings,
          [name]: isChecked,
        },
      });
    };
  
    useEffect(() => {
      Form.isValid(formValues).then((valid) => {
        setDisabled(!valid);
      });
    }, [formValues]);
    return (
      <>
        <div>
          <Switch>
  
  
            <Route path="/pizza">
              <Pizza
                validinputChange={inputChangeName}
                inputChange={inputChange}
                checkbox={checkboxChange}
                values={formValues}
                submit={submitForm}
                errors={formErrors}
                disabled={disabled}
              />
            </Route>
  
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </>
    );
};


export default App;
