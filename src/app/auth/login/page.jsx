'use client'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { login } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    const res = await login(data)

    console.log(res)

    if (res.status === 200) {
      const token = res.data.token
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
      router.push('/')
    } else {
      setErrorReq("Correo o contraseña incorrectos")
    }
  })

  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>Inicio de Sesión</h1>
        {errorReq && <small className="fs-6 text-danger">{errorReq}</small>}
      <div className="container d-flex justify-content-center mt-4">
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center align-items-end mx-3 mb-4 form-group-custom">
            <div className="form-group col-12 col-md-12 col-lg-12 mb-3">
              <label htmlFor="inputEmail">Correo</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="Ej: usuario@correo.com"
              {...register('email', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Ingresa un correo valido'
                  }
              })}
              />
              {errors.email && <small className="fs-6 text-danger">{errors.email.message}</small>}
            </div>
            <div className="form-group col-12 col-md-12 col-lg-12 mb-3">
              <label htmlFor="inputPassword">Contraseña</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="********"
              {...register('password', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  minLength: {
                    value: 8,
                    message: 'Mínimo 8 caracteres'
                },
                  maxLength: {
                    value: 16,
                    message: 'Máximo 16 caracteres'
                }
              })}
              />
              {errors.password && <small className="fs-6 text-danger">{errors.password.message}</small>}
            </div>
            <div className="col-12 col-lg-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
