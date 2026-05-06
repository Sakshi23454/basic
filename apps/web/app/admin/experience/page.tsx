"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useAddExperienceMutation, useDeleteExperienceMutation, useReadExperienceQuery, useUpdateExperienceMutation } from '../../../redux/apis/admin.api'
import { EXPERIENCE_CREATE_REQUEST, EXPERIENCE_DELETE_REQUEST } from '@repo/types'

const experience = () => {
    const [selectedExperiennce, setselectedExperiennce] = useState<number | null>(null)
    const [addExp, { isLoading }] = useAddExperienceMutation()
    const { data } = useReadExperienceQuery()
    const [updateExp] = useUpdateExperienceMutation()
    const [deleteExp] = useDeleteExperienceMutation()

    const experienceSchema = z.object({
        company: z.string().min(1),
        role: z.string().min(1),
        duration: z.string().min(1),
        description: z.string().min(1),
    }) satisfies z.ZodType<EXPERIENCE_CREATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<EXPERIENCE_CREATE_REQUEST>({
        defaultValues: {
            company: "",
            role: "",
            duration: "",
            description: "",
        },
        resolver: zodResolver(experienceSchema)
    })

    const handleCreateExpereince = async (data: EXPERIENCE_CREATE_REQUEST) => {
        try {
            if (selectedExperiennce) {
                await updateExp({ ...data, id: selectedExperiennce, }).unwrap()
                toast.success("experience update succefully")
                reset({ company: "", role: "", duration: "", description: "" })
                setselectedExperiennce(null)
            } else {
                await addExp(data).unwrap()
                toast.success("experience created succefully")
                reset()
            }
        } catch (error) {
            console.log(error)
            toast.error(" unabel to create experience")
        }
    }

    const handledeleteExpereince = async (data: EXPERIENCE_DELETE_REQUEST) => {
        try {
            await deleteExp(data).unwrap()
            toast.success("experience delete succefully")
        } catch (error) {
            console.log(error)
            toast.error(" unabel to delete experience")
        }
    }

    const handleEdit = (data: any) => {
        reset({
            company: data.company,
            role: data.role,
            duration: data.duration,
            description: data.description,
        })
    }

    const handleClasses = (key: keyof EXPERIENCE_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })


    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card shadow mb-5">
                        <div className="card-header">Create Expereince</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleCreateExpereince)}>
                                <input
                                    {...register("company")}
                                    type="text"
                                    placeholder="enter company"
                                    className={handleClasses("company")}
                                />
                                <div className="invalid-feedback">{errors && errors.company?.message}</div>

                                <input
                                    {...register("role")}
                                    type="text"
                                    placeholder="enter role"
                                    className={handleClasses("role")}
                                />
                                <div className="invalid-feedback">{errors && errors.role?.message}</div>

                                <input
                                    {...register("duration")}
                                    type="text"
                                    placeholder="enter duration"
                                    className={handleClasses("duration")}
                                />
                                <div className="invalid-feedback">{errors && errors.duration?.message}</div>


                                <input
                                    {...register("description")}
                                    type="text"
                                    placeholder="enter description"
                                    className={handleClasses("description")}
                                />
                                <div className="invalid-feedback">{errors && errors.description?.message}</div>

                                {
                                    selectedExperiennce
                                        ? <button disabled={isLoading} type='submit' className='btn btn-warning w-100 mt-3'>
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : "Update Experience"}</button>
                                        : <button disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-3">
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : "Add Experience"}
                                        </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {
            data && <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>company</th>
                        <th>role</th>
                        <th>duration</th>
                        <th>description</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.result?.map(item => <tr>
                            <td>{item.id}</td>
                            <td>{item.company}</td>
                            <td>{item.role}</td>
                            <td>{item.duration}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handledeleteExpereince({ id: item.id as number })} className="btn btn-sm btn-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button onClick={() => {
                                    handleEdit(item)
                                    setselectedExperiennce(item.id)
                                }} className='btn btn-sm btn-outline-warning ms-2'><i className="bi bi-pencil"></i></button>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table >
        }

    </>
}

export default experience