// "use client"
// import { zodResolver } from '@hookform/resolvers/zod'
// import clsx from 'clsx'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
// import z from 'zod'
// import { useReadProfileQuery, useUpdateProfileMutation } from '../../../redux/apis/admin.api'
// import { PROFILE_UPDATE_REQUEST } from '@repo/types'

// const About = () => {

//     const [showForm, setShowForm] = useState(false)
//     const [selectedabout, setselectedabout] = useState<number | null>(null)
//     const { data } = useReadProfileQuery()
//     const [updateProfile, { isLoading }] = useUpdateProfileMutation()

//     const aboutSchema = z.object({
//         name: z.string().min(1).optional(),
//         title: z.string().min(1).optional(),
//         email: z.string().min(1).optional(),
//         mobile: z.string().min(1).optional(),
//         bio: z.string().min(1).optional(),
//         github: z.string().min(1).optional(),
//         linkedin: z.string().min(1).optional(),
//         location: z.string().min(1).optional(),
//         resume: z.string().min(1).optional(),
//         ProfilePic: z.string().min(1).optional(),
//     }) satisfies z.ZodType<PROFILE_UPDATE_REQUEST>

//     const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<PROFILE_UPDATE_REQUEST>({
//         defaultValues: {
//             name: "",
//             title: "",
//             email: "",
//             mobile: "",
//             bio: "",
//             github: "",
//             linkedin: "",
//             location: "",
//             resume: "",
//             ProfilePic: "",
//         },
//         resolver: zodResolver(aboutSchema)
//     })

//     const handleUpdateProfile = async (data: PROFILE_UPDATE_REQUEST) => {
//         try {
//             if (selectedabout) {
//                 await updateProfile({ ...data, id: selectedabout }).unwrap()
//                 toast.success("profile update succefully")
//                 reset({ name: "", title: "", email: "", mobile: "", bio: "", github: "", linkedin: "", location: "", resume: "", ProfilePic: "" })
//                 setselectedabout(null)
//                 setShowForm(false)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(" unabel to update profile")
//         }
//     }


//     const handleEdit = (data: any) => {
//         reset({
//             name: data.name,
//             title: data.title,
//             email: data.email,
//             mobile: data.mobile,
//             bio: data.bio,
//             github: data.github,
//             linkedin: data.linkedin,
//             location: data.location,
//             resume: data.resume,
//             ProfilePic: data.ProfilePic,
//         })
//     }

//     const handleClasses = (key: keyof PROFILE_UPDATE_REQUEST) => clsx({
//         "form-control my-2": true,
//         "is-invalid": errors[key],
//         "is-valid": touchedFields[key] && !errors[key],
//     })


//     return <>
//         {showForm && (
//             <div className="container mt-5">
//                 <div className="row">
//                     <div className="col-sm-6 offset-sm-3">
//                         <div className="card mb-5">
//                             <div className="card-header">Update About Information</div>
//                             <div className="card-body">
//                                 <form onSubmit={handleSubmit(handleUpdateProfile)}>
//                                     <input
//                                         {...register("name")}
//                                         type="text"
//                                         placeholder="enter name"
//                                         className={handleClasses("name")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.name?.message}</div>

//                                     <input
//                                         {...register("title")}
//                                         type="text"
//                                         placeholder="enter title"
//                                         className={handleClasses("title")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.title?.message}</div>

//                                     <input
//                                         {...register("email")}
//                                         type="text"
//                                         placeholder="enter email"
//                                         className={handleClasses("email")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.email?.message}</div>


//                                     <input
//                                         {...register("mobile")}
//                                         type="text"
//                                         placeholder="enter mobile"
//                                         className={handleClasses("mobile")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.mobile?.message}</div>

//                                     <input
//                                         {...register("bio")}
//                                         type="text"
//                                         placeholder="enter bio"
//                                         className={handleClasses("bio")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.bio?.message}</div>

//                                     <input
//                                         {...register("github")}
//                                         type="text"
//                                         placeholder="add/update github"
//                                         className={handleClasses("github")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.github?.message}</div>

//                                     <input
//                                         {...register("linkedin")}
//                                         type="text"
//                                         placeholder="add/update linkedin"
//                                         className={handleClasses("linkedin")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.linkedin?.message}</div>

//                                     <input
//                                         {...register("location")}
//                                         type="text"
//                                         placeholder="add/update location"
//                                         className={handleClasses("location")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.location?.message}</div>

//                                     <input
//                                         {...register("resume")}
//                                         type="text"
//                                         placeholder="add/update resume"
//                                         className={handleClasses("resume")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.resume?.message}</div>

//                                     <input
//                                         {...register("ProfilePic")}
//                                         type="text"
//                                         placeholder="add/update ProfilePic"
//                                         className={handleClasses("ProfilePic")}
//                                     />
//                                     <div className="invalid-feedback">{errors && errors.ProfilePic?.message}</div>

//                                     <button disabled={isLoading} type="submit" className="btn btn-warning w-100 mt-3">
//                                         {isLoading
//                                             ? <span className="spinner-border spinner-border-sm"></span>
//                                             : "Update About Info"}
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {
//             data && <div className="container mt-4">
//                 <div className="table-responsive">
//                     <table className='table table-bordered table-hover'>
//                         <thead>
//                             <tr>
//                                 <th>id</th>
//                                 <th>name</th>
//                                 <th>title</th>
//                                 <th>email</th>
//                                 <th>mobile</th>
//                                 <th>bio</th>
//                                 <th>github</th>
//                                 <th>linkedin</th>
//                                 <th>location</th>
//                                 <th>resume</th>
//                                 <th>ProfilePic</th>
//                                 <th>actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             <tr>
//                                 <td>{data?.result?.id}</td>
//                                 <td>{data?.result?.name}</td>
//                                 <td>{data?.result?.title}</td>
//                                 <td>{data?.result?.email}</td>
//                                 <td>{data?.result?.mobile}</td>
//                                 <td>{data?.result?.bio}</td>
//                                 <td>{data?.result?.github}</td>
//                                 <td>{data?.result?.linkedin}</td>
//                                 <td>{data?.result?.location}</td>
//                                 <td>{data?.result?.resume}</td>
//                                 <td>{data?.result?.ProfilePic}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => {
//                                             handleEdit(data.result)
//                                             setselectedabout(data?.result?.id as number)
//                                             setShowForm(true)
//                                         }}
//                                         className='btn btn-sm btn-outline-warning ms-2'
//                                     >
//                                         <i className="bi bi-pencil"></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table >
//                 </div>
//             </div>
//         }


//     </>
// }

// export default About




"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useReadProfileQuery, useUpdateProfileMutation } from '../../../redux/apis/admin.api'
import { PROFILE_UPDATE_REQUEST } from '@repo/types'

const About = () => {

    const [showForm, setShowForm] = useState(false)
    const { data } = useReadProfileQuery()
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()
    const [show, setshow] = useState(true)
    const { reset, register, handleSubmit } = useForm<PROFILE_UPDATE_REQUEST>()

    const handleUpdateProfile = async (data: PROFILE_UPDATE_REQUEST) => {
        try {
            console.log(data);

            const fd = new FormData()
            fd.append("name", data.name || "")
            fd.append("title", data.title || "")
            fd.append("email", data.email || "")
            fd.append("mobile", data.mobile || "")
            fd.append("bio", data.bio || "")
            fd.append("github", data.github || "")
            fd.append("linkedin", data.linkedin || "")
            fd.append("location", data.location || "")
            fd.append("resume", data.resume || "")
            // if (data.ProfilePic) {
            //     fd.append("ProfilePic", data.ProfilePic[0] as File)
            // }
            if (data.ProfilePic?.[0]) {
                fd.append("resume", data.ProfilePic[0])
            }
            await updateProfile({ fd, id: data?.id as number }).unwrap()
            toast.success("profile update success")
            setshow(true)
        }
        catch (error) {
            console.log(error)
            toast.error(" unabel to update profile")
        }
    }

    const handleEdit = (data: any) => {
        reset({
            id: data.id,
            name: data.name,
            title: data.title,
            email: data.email,
            mobile: data.mobile,
            bio: data.bio,
            github: data.github,
            linkedin: data.linkedin,
            location: data.location,
            resume: data.resume,
            ProfilePic: data.ProfilePic,
        })
    }

    useEffect(() => {
        if (data) {
            reset({
                id: data.result?.id,
                name: data.result?.name,
                title: data.result?.title,
                email: data.result?.email,
                mobile: data.result?.mobile,
                bio: data.result?.bio,
                github: data.result?.github,
                linkedin: data.result?.linkedin,
                location: data.result?.location,
                resume: data.result?.resume,
            })
        }
    }, [data])


    return <>
        {showForm && (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card mb-5">
                            <div className="card-header">Update About Information</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                    <input type="hidden" {...register("id")} />

                                    <div>
                                        <label>Name: </label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            placeholder="enter name"
                                        />
                                    </div>

                                    <div>
                                        <label>title: </label>
                                        <input
                                            {...register("title")}
                                            type="text"
                                            placeholder="enter title"
                                        />
                                    </div>

                                    <div>
                                        <label>email: </label>
                                        <input
                                            {...register("email")}
                                            type="text"
                                            placeholder="enter email"
                                        />
                                    </div>

                                    <div>
                                        <label>mobile:</label>
                                        <input
                                            {...register("mobile")}
                                            type="text"
                                            placeholder="enter mobile"
                                        />
                                    </div>

                                    <div>

                                        <label>bio</label>
                                        <input
                                            {...register("bio")}
                                            type="text"
                                            placeholder="enter bio"
                                        />
                                    </div>

                                    <div>

                                        <label>Github:</label>
                                        <input
                                            {...register("github")}
                                            type="text"
                                            placeholder="add/update github"
                                        />
                                    </div>

                                    <div>
                                        <label>Linkedin:</label>
                                        <input
                                            {...register("linkedin")}
                                            type="text"
                                            placeholder="add/update linkedin"
                                        />
                                    </div>

                                    <div>
                                        <label>Location:</label>
                                        <input
                                            {...register("location")}
                                            type="text"
                                            placeholder="add/update location"
                                        />
                                    </div>

                                    <div>
                                        <label>Resume:</label>
                                        <input
                                            {...register("resume")}
                                            type="text"
                                            placeholder="add/update resume"
                                        />
                                    </div>

                                    {
                                        data && data.result?.ProfilePic && show
                                            ? <div className='flex gap-2 my-3'>
                                                <label>Profile:</label>
                                                <img height={100} width={100} src={data && data.result?.ProfilePic} alt="" />
                                                <button onClick={() => setshow(false)} type="button" >Change Image</button>
                                            </div>
                                            : <div>
                                                <input {...register("ProfilePic")} type="file" placeholder="add/update image" />
                                                <button onClick={() => setshow(true)} type="button" >Cancel</button>
                                            </div>
                                    }

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
                                <th>ProfilePic</th>
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
                                    <img height={100} width={100} src={data?.result?.ProfilePic} alt="profile" />
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleEdit(data.result)
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