import React from "react";
import {  Input, Label, GrupoInput, LeyendaError, IconoValidacion, } from './../elementos/formularios';
import { faCircleCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({estado, setEstado, label, placeholder, tipo, name, leyendaError, expresionRegular, funcion}) => {
   const onChange= (e) => {
     setEstado({
         ...estado, 
         campo: e.target.value
     })
   }

   const validacion= () => {
       //Primero comprobamos si hay expresion regular
       if(expresionRegular){
           if(expresionRegular.test(estado.campo)){// estamos comprobando lo que esta escrito en el input con lo que esta escrito en la expresion regular
                setEstado({
                    ...estado, valido: 'true'
                })
           }else{
            setEstado({
                ...estado, valido: 'false'
            })
           }
       }
       if(funcion){
        funcion();
       }
   }
    return(
        <div>
          <Label htmlFor={name} valido={estado.valido}>{label}</Label>
          <GrupoInput>
            <Input 
               type={tipo} 
               placeholder={placeholder} 
               id={name}
               value={estado.campo}
               onChange={onChange}
               onKeyUp={validacion} // cuando presionas una tecla, y cuando levantas el dedo se ejecuta
               onBlur={validacion} // cuando se da clic fuera del input se ejecuta la funcion
               valido={estado.valido}
            />
             <IconoValidacion 
                   icon={estado.valido === 'true'? faCircleCheck : faTimesCircle} 
                   valido={estado.valido} 
            />
          </GrupoInput>
          <LeyendaError valido={estado.valido}> {leyendaError}</LeyendaError>
        </div>
    )
}

export default ComponenteInput;