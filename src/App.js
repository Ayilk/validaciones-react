import React, { useState} from 'react';
import { Formulario, Label, ContenedorBotonCentrado, ContenedorTerminos, Boton,
  MensajeError, MensajeExito } from './elementos/formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './componentes/input';

const App = () => {

  const [usuario, setUsuario] = useState({campo: '', valido: null});
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [password, setPassword] = useState({campo: '', valido: null});
  const [password2, setPassword2] = useState({campo: '', valido: null});
  const [correo, setCorreo] = useState({campo: '', valido: null});
  const [telefono, setTelefono] = useState({campo: '', valido: null});
  const [terminos, setTerminos] = useState(false);
  const [formValido, setFormValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  
  const validarPassword2 = () => {
    if(password.campo.length > 0){
      if(password.campo !== password2.campo){
        setPassword2((prevState) => {
          return{
            ...prevState,
            valido: 'false'
          }
        })
      }else{
        setPassword2((prevState) => {
          return{
            ...prevState,
            valido: 'true'
          }
        })
      }
    }
  }

  const onChangeTerminos = (e) => {
      setTerminos(e.target.checked)
  }
  
  const onSubmit = (e) => {
    e.prevent.Default();
    if(usuario.valido === 'true' && 
       nombre.valido === 'true' &&
       password.valido === 'true' &&
       password2.valido === 'true' &&
       correo.valido === 'true' &&
       telefono.valido === 'true' &&
       terminos){
         setFormValido(true);
         setUsuario({campo:'', valido: null});
         setNombre({campo:'', valido: null});
         setPassword({campo:'', valido: null});
         setPassword2({campo:'', valido: null});
         setCorreo({campo:'', valido: null});
         setTelefono({campo:'', valido: null});
       }else{setFormValido(false)}
  }
  return(
    <main>
      <Formulario action="" onSubmit={onSubmit}>
      <Input
					estado={usuario}
					setEstado={setUsuario}
					tipo="text"
					label="Usuario"
					placeholder="john123"
					name="usuario"
					leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
					expresionRegular={expresiones.usuario}
				/>
				<Input
					estado={nombre}
					setEstado={setNombre}
					tipo="text"
					label="Nombre"
					placeholder="John Doe"
					name="usuario"
					leyendaError="El nombre solo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={password}
					setEstado={setPassword}
					tipo="password"
					label="Contraseña"
					name="password1"
					leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
					expresionRegular={expresiones.password}
				/>
				<Input
					estado={password2}
					setEstado={setPassword2}
					tipo="password"
					label="Repetir Contraseña"
					name="password2"
					leyendaError="Ambas contraseñas deben ser iguales."
					funcion={validarPassword2}
				/>
				<Input
					estado={correo}
					setEstado={setCorreo}
					tipo="email"
					label="Correo Electrónico"
					placeholder="john@correo.com"
					name="correo"
					leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
					expresionRegular={expresiones.correo}
				/>
				<Input
					estado={telefono}
					setEstado={setTelefono}
					tipo="text"
					label="Teléfono"
					placeholder="4491234567"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
					expresionRegular={expresiones.telefono}
				/>
        
          
       
        <ContenedorTerminos>
          <Label>
            <input 
               type="checkbox" 
               name="terminos" 
               id="terminos" 
               checked={terminos}
               onChange={onChangeTerminos}
            />
            Acepto los Términos y Condiciones
          </Label>
        </ContenedorTerminos>

        {formValido === false && <MensajeError> // SI no es valido, muestra el mensaje
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Por favor, rellena el formulario correctamente
          </p>
        </MensajeError>}

        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formValido === true && <MensajeExito>El formulario se envió exitosamente!!</MensajeExito>}
        </ContenedorBotonCentrado>
                
      </Formulario>
    </main>

  )
}



export default App;