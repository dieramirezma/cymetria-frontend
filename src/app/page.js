'use client'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { fetchStudents } from "./lib/api";
import ProtectedRoute from "./components/ProtectedRoute";
import jwt from 'jsonwebtoken';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [errorReq, setErrorReq] = useState('')
  const [data, setData] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  let infoToken = null

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    infoToken = jwt.decode(token)
  }

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    const res = await fetchStudents(token, data.document)
    console.log(res)
    if (res.status !== 200) {
      setData(null)
      if (res.status === 404) {
        setErrorReq(res.data.message || "Algo ha salido mal")
      } else {
        setErrorReq("Algo ha salido mal")
      }
    } else {
      setData(res.data.estudiante)
      setErrorReq('')
    }
  })

  const logout = () => {
    localStorage.removeItem('authToken')
    router.push('/auth/login')
  }
  return (
    <ProtectedRoute>
      <header className="d-flex align-items-center justify-content-end bg-light header">
        <Image src={'logout.svg'} alt="Logout icon" width={20} height={20} className="logout mx-3" onClick={logout}/>
      </header>
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Hola, { infoToken ? infoToken.userName : "Usuario" }</h1>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center align-items-end mx-3 mb-4">
            <div className="form-group col-10 col-md-6 col-lg-4 mb-3">
              <label htmlFor="inputDocument">Número de documento</label>
              <input type="number" className="form-control" id="inputDocument" placeholder="Ej: 19276419"
              {...register('document', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 dígitos'
                },
                  maxLength: {
                    value: 10,
                    message: 'Máximo 10 dígitos'
                },
                pattern: {
                  value: /^((\d)\1{5})/,
                  message: 'Ingresa un número de documento válido'
                }
              })}
              />
              {errors.document && <small className="fs-6 text-danger">{errors.document.message}</small>}
            </div>
            <div className="col-12 col-lg-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Consultar</button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          {data && (
            <div className="text-center">
              <h2><strong>Estudiante:</strong></h2>
              <p><strong>Nombre: </strong>{data.nombre}</p>
              <p><strong>Numero de documento: </strong>{data.num_documento}</p>
              <p><strong>Correo: </strong>{data.email}</p>
              <p><strong>Curso: </strong>{data.nombre_curso}</p>
            </div>
          )}
          {errorReq && (
            <div>
              <p className="text-danger">{errorReq}</p>
            </div>
          )}
        </div>
      </div>
      </main>
      </ProtectedRoute>
  );
}
