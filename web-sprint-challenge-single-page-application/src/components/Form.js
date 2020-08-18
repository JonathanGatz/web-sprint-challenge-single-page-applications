
import * as yup from 'yup'




const Form = yup.object().shape({

    name: yup
    .string()
    .required('MUST ENTER A NAME')
});


export default Form;