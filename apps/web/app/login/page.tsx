"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useSigninMutation } from '../../redux/apis/auth.api'
import { SIGNIN_REQUEST } from '@repo/types'

const Login = () => {
    const [signin, { isLoading }] = useSigninMutation()
    const router = useRouter()

    const loginSchema = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
    }) satisfies z.ZodType<SIGNIN_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<SIGNIN_REQUEST>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })

    const handleLogin = async (data: SIGNIN_REQUEST) => {
        try {
            const res = await signin(data).unwrap()
            if (res?.result?.role !== "admin") {
                toast.error("Only admin can login")
                return
            }
            toast.success("Login Success")
            reset()
            router.push("/admin")
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("unable to login")
        }
    }

    const handleClasses = (key: keyof SIGNIN_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })

    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <input {...register("email")} type="email" placeholder='email@example.com' className={handleClasses("email")} />
                                <div className="invalid-feedback">{errors && errors.email?.message}</div>

                                <input {...register("password")} type="password" placeholder='*********' className={handleClasses("password")} />
                                <div className="invalid-feedback">{errors && errors.password?.message}</div>

                                <button disabled={isLoading} type='submit' className='btn btn-lg btn-primary mt-2 w-100'>
                                    {isLoading
                                        ? <span className='spinner spinner-border'></span>
                                        : "Login"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login