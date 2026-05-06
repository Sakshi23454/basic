"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useAddStatsMutation, useReadStatsQuery } from '../../../redux/apis/admin.api'
import { STATS_CREATE_REQUEST } from '@repo/types'

const Statistics = () => {
    const [addStat, { isLoading }] = useAddStatsMutation()
    const { data } = useReadStatsQuery()

    const statSchema = z.object({
        experience: z.string().min(1),
        projects: z.string().min(1),
        technologies: z.string().min(1),
        clients: z.string().min(1),
    }) satisfies z.ZodType<STATS_CREATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<STATS_CREATE_REQUEST>({
        defaultValues: {
            experience: "",
            projects: "",
            technologies: "",
            clients: "",
        },
        resolver: zodResolver(statSchema)
    })

    const handleCreateStat = async (data: STATS_CREATE_REQUEST) => {
        try {
            await addStat(data).unwrap()
            toast.success("statistics created succefully")
            reset()

        } catch (error) {
            console.log(error)
            toast.error(" unabel to create statistics")
        }
    }

    const handleClasses = (key: keyof STATS_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })


    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card shadow mb-5">
                        <div className="card-header">Create Statistics</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleCreateStat)}>
                                <input
                                    {...register("experience")}
                                    type="text"
                                    placeholder="enter experience"
                                    className={handleClasses("experience")}
                                />
                                <div className="invalid-feedback">{errors && errors.experience?.message}</div>

                                <input
                                    {...register("projects")}
                                    type="text"
                                    placeholder="enter projects"
                                    className={handleClasses("projects")}
                                />
                                <div className="invalid-feedback">{errors && errors.projects?.message}</div>

                                <input
                                    {...register("technologies")}
                                    type="text"
                                    placeholder="enter technologies"
                                    className={handleClasses("technologies")}
                                />
                                <div className="invalid-feedback">{errors && errors.technologies?.message}</div>


                                <input
                                    {...register("clients")}
                                    type="text"
                                    placeholder="enter clients"
                                    className={handleClasses("clients")}
                                />
                                <div className="invalid-feedback">{errors && errors.clients?.message}</div>

                                <button disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-3">
                                    {isLoading
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : "Add Statistics"}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {
            data?.result && <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>experience</th>
                        <th>projects</th>
                        <th>technologies</th>
                        <th>clients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.result.id}</td>
                        <td>{data.result.experience}</td>
                        <td>{data.result.projects}</td>
                        <td>{data.result.technologies}</td>
                        <td>{data.result.clients}</td>
                    </tr>
                </tbody>
            </table >
        }

    </>
}

export default Statistics