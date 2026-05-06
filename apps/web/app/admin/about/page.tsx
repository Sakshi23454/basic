"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useReadProfileQuery, useUpdateProfileMutation } from '../../../redux/apis/admin.api'
import { PROFILE_UPDATE_REQUEST } from '@repo/types'

const About = () => {

    const [showForm, setShowForm] = useState(false)
    const [selectedabout, setselectedabout] = useState<number | null>(null)
    const { data } = useReadProfileQuery()
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    const aboutSchema = z.object({
        name: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        email: z.string().min(1).optional(),
        mobile: z.string().min(1).optional(),
        bio: z.string().min(1).optional(),
        github: z.string().min(1).optional(),
        linkedin: z.string().min(1).optional(),
        location: z.string().min(1).optional(),
        resume: z.string().min(1).optional(),
    }) satisfies z.ZodType<PROFILE_UPDATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<PROFILE_UPDATE_REQUEST>({
        defaultValues: {
            name: "",
            title: "",
            email: "",
            mobile: "",
            bio: "",
            github: "",
            linkedin: "",
            location: "",
            resume: "",
        },
        resolver: zodResolver(aboutSchema)
    })

    const handleUpdateProfile = async (data: PROFILE_UPDATE_REQUEST) => {
        try {
            if (selectedabout) {
                await updateProfile({ ...data, id: selectedabout }).unwrap()
                toast.success("profile update succefully")
                reset({ name: "", title: "", email: "", mobile: "", bio: "", github: "", linkedin: "", location: "", resume: "" })
                setselectedabout(null)
                setShowForm(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(" unabel to update profile")
        }
    }


    const handleEdit = (data: any) => {
        reset({
            name: data.name,
            title: data.title,
            email: data.email,
            mobile: data.mobile,
            bio: data.bio,
            github: data.github,
            linkedin: data.linkedin,
            location: data.location,
            resume: data.resume,
        })
    }

    const handleClasses = (key: keyof PROFILE_UPDATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })


    return <>
        {showForm && (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card mb-5">
                            <div className="card-header">Update About Information</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="enter name"
                                        className={handleClasses("name")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.name?.message}</div>

                                    <input
                                        {...register("title")}
                                        type="text"
                                        placeholder="enter title"
                                        className={handleClasses("title")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.title?.message}</div>

                                    <input
                                        {...register("email")}
                                        type="text"
                                        placeholder="enter email"
                                        className={handleClasses("email")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.email?.message}</div>


                                    <input
                                        {...register("mobile")}
                                        type="text"
                                        placeholder="enter mobile"
                                        className={handleClasses("mobile")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.mobile?.message}</div>

                                    <input
                                        {...register("bio")}
                                        type="text"
                                        placeholder="enter bio"
                                        className={handleClasses("bio")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.bio?.message}</div>

                                    <input
                                        {...register("github")}
                                        type="text"
                                        placeholder="add/update github"
                                        className={handleClasses("github")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.github?.message}</div>

                                    <input
                                        {...register("linkedin")}
                                        type="text"
                                        placeholder="add/update linkedin"
                                        className={handleClasses("linkedin")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.linkedin?.message}</div>

                                    <input
                                        {...register("location")}
                                        type="text"
                                        placeholder="add/update location"
                                        className={handleClasses("location")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.location?.message}</div>

                                    <input
                                        {...register("resume")}
                                        type="text"
                                        placeholder="add/update resume"
                                        className={handleClasses("resume")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.resume?.message}</div>

                                    <button disabled={isLoading} type="submit" className="btn btn-warning w-100 mt-3">
                                        {isLoading
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : "Update About Info"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {
            data && <div className="container mt-4">
                <div className="table-responsive">
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>title</th>
                                <th>email</th>
                                <th>mobile</th>
                                <th>bio</th>
                                <th>github</th>
                                <th>linkedin</th>
                                <th>location</th>
                                <th>resume</th>
                                <th>actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{data?.result?.id}</td>
                                <td>{data?.result?.name}</td>
                                <td>{data?.result?.title}</td>
                                <td>{data?.result?.email}</td>
                                <td>{data?.result?.mobile}</td>
                                <td>{data?.result?.bio}</td>
                                <td>{data?.result?.github}</td>
                                <td>{data?.result?.linkedin}</td>
                                <td>{data?.result?.location}</td>
                                <td>{data?.result?.resume}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleEdit(data.result)
                                            setselectedabout(data?.result?.id as number)
                                            setShowForm(true)
                                        }}
                                        className='btn btn-sm btn-outline-warning ms-2'
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table >
                </div>
            </div>
        }


    </>
}

export default About