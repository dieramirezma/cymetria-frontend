'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    const res = await registerUser(data)

    console.log(res)

    if (res.status === 201) {
      router.push('/auth/login')
    } else if (res.status === 400) {
      setErrorReq(res.data.message)
    } else {
      setErrorReq("Algo ocurrió mal :(")
    }
  })

  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>Crea tu cuenta</h1>
        {errorReq && <small className="fs-6 text-danger">{errorReq}</small>}
      <div className="container d-flex justify-content-center mt-4">
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center align-items-end mx-3 mb-4 form-group-custom">
            <div className="form-group col-12 col-md-12 col-lg-12 mb-3">
              <label htmlFor="inputName">Nombre</label>
              <input type="text" className="form-control" id="inputName" placeholder="Ej: Diego"
              {...register('name', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  }

              })}
              />
              {errors.name && <small className="fs-6 text-danger">{errors.name.message}</small>}
            </div>
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
              <button type="submit" className="btn btn-primary">Registrate</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
