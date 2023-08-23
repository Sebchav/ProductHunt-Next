import React, { useState, useContext } from 'react'
import { css } from "@emotion/react";
import Router, {useRouter} from 'next/router';
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/layout/ui/Formulario';
import {FirebaseContext} from '../firebase';
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from '../validacion/validarCrearProducto';
import { collection , addDoc } from 'firebase/firestore';

const STATE_INICIAL = {
    nombre: "",
    empresa: "",
    imagen: "",
    url: "",
    descripcion: ""
}


const NuevoProducto = () => {

  const [ error, guardarError ] = useState(false);

  const { valores,
          errores,
          handleSubmit,
          handleChange,
          handleBlur
        } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  
  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de Routing para redireccionar 
  const router = useRouter();

  //Context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    if (!usuario) {
        return router.push('/');
    }
 
    const producto = {
        nombre,
        empresa,
        url,
        descripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now()
    }
 
    try {
        await addDoc(collection(firebase.db,"productos"), producto);
    } catch (error) {
        console.error(error)
    }
}

return (
  <div>
       <Layout>
          <>
              <h1
                  css={css`
                      text-align: center;
                      margin-top: 5rem;
                  `}
              >Nuevo Producto</h1>
              <Formulario
                  onSubmit={handleSubmit}
              >

                <fieldset>
                  <legend>Información General</legend>

                  <Campo>
                      <label htmlFor='nombre'>Nombre</label>
                      <input 
                          type='text'
                          id='nombre'
                          placeholder='Tu Nombre'
                          name='nombre'
                          value={nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>

                  {errores.nombre && <Error>{errores.nombre}</Error>}

                  <Campo>
                      <label htmlFor='empresa'>Empresa</label>
                      <input 
                          type='text'
                          id='empresa'
                          placeholder='Nombre Empresa'
                          name='empresa'
                          value={empresa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>

                  {errores.empresa && <Error>{errores.empresa}</Error>}

                  {/* <Campo>
                      <label htmlFor='imagen'>Imagen</label>
                      <input 
                          type='file'
                          id='imagen'
                          name='imagen'
                          value={imagen}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>

                  {errores.imagen && <Error>{errores.imagen}</Error>} */}

                  <Campo>
                      <label htmlFor='url'>URL</label>
                      <input 
                          type='url'
                          id='url'
                          name='url'
                          placeholder='URL de tu producto'
                          value={url}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>

                  {errores.url && <Error>{errores.url}</Error>}

                  </fieldset>

                  <fieldset>
                    <legend>Sobre tu Producto</legend>

                    <Campo>
                      <label htmlFor='descripcion'>Descripción</label>
                      <textarea
                          id='descripcion'
                          name='descripcion'
                          value={descripcion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>

                  {errores.descripcion && <Error>{errores.descripcion}</Error>}
                  </fieldset>

                  {error && <Error>{error}</Error>}

                  <InputSubmit
                      type='submit'
                      value="Crear Producto"
                  />
                  
              </Formulario>
          </>
       </Layout>
  </div>
 
  
)
}

export default NuevoProducto