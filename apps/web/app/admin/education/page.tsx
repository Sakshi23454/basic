"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useAddEducationMutation, useDeleteEducationMutation, useReadEducationQuery, useUpdateEducationMutation } from '../../../redux/apis/admin.api'
import { EDUCATION_CREATE_REQUEST, EDUCATION_DELETE_REQUEST } from '@repo/types'

const Education = () => {
    const [selectedEducation, setselectedEducation] = useState<number | null>(null)
    const [addEdu, { isLoading }] = useAddEducationMutation()
    const { data } = useReadEducationQuery()
    const [updateEdu] = useUpdateEducationMutation()
    const [deleteEdu] = useDeleteEducationMutation()

    const educationSchema = z.object({
        _id: z.string().min(1).optional(),
        college: z.string().min(1),
        degree: z.string().min(1),
        year: z.string().min(1),
    }) satisfies z.ZodType<EDUCATION_CREATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<EDUCATION_CREATE_REQUEST>({
        defaultValues: {
            college: "",
            degree: "",
            year: "",
        },
        resolver: zodResolver(educationSchema)
    })

    const handleCreateEducation = async (data: EDUCATION_CREATE_REQUEST) => {
        try {
            if (selectedEducation) {
                await updateEdu({ ...data, id: selectedEducation }).unwrap()
                toast.success("education update succefully")
                reset({ college: "", degree: "", year: "" })
                setselectedEducation(null)
            } else {
                await addEdu(data).unwrap()
                toast.success("education created succefully")
                reset()
            }
        } catch (error) {
            console.log(error)
            toast.error(" unabel to create education")
        }
    }

    const handledeleteEducation = async (data: EDUCATION_DELETE_REQUEST) => {
        try {
            await deleteEdu(data).unwrap()
            toast.success("education delete succefully")
        } catch (error) {
            console.log(error)
            toast.error(" unabel to delete education")
        }
    }

    const handleEdit = (data: any) => {
        reset({
            college: data.college,
            degree: data.degree,
            year: data.year,
        })
    }

    const handleClasses = (key: keyof EDUCATION_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })


    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card shadow">
                        <div className="card-header">Add Education</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleCreateEducation)}>
                                <input
                                    {...register("college")}
                                    type="text"
                                    placeholder="enter college"
                                    className={handleClasses("college")}
                                />
                                <div className="invalid-feedback">{errors && errors.college?.message}</div>

                                <input
                                    {...register("degree")}
                                    type="text"
                                    placeholder="enter degree"
                                    className={handleClasses("degree")}
                                />
                                <div className="invalid-feedback">{errors && errors.degree?.message}</div>

                                <input
                                    {...register("year")}
                                    type="text"
                                    placeholder="enter year"
                                    className={handleClasses("year")}
                                />
                                <div className="invalid-feedback">{errors && errors.year?.message}</div>
                                {
                                    selectedEducation
                                        ? <button disabled={isLoading} type='submit' className='btn btn-warning w-100 mt-3'>
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : "Update Education"}</button>
                                        : <button disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-3">
                                            {isLoading
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : "Add Education"}
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
                        <th>college</th>
                        <th>degree</th>
                        <th>year</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.result?.map(item => <tr>
                            <td>{item.id}</td>
                            <td>{item.college}</td>
                            <td>{item.degree}</td>
                            <td>{item.year}</td>
                            <td>
                                <button onClick={() => handledeleteEducation({ id: item.id as number })} className="btn btn-sm btn-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button onClick={() => {
                                    handleEdit(item)
                                    setselectedEducation(item.id as number)
                                }} className='btn btn-sm btn-outline-warning ms-2'><i className="bi bi-pencil"></i></button>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table >
        }
    </>
}

export default Education