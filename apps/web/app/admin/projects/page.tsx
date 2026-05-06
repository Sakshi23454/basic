"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"
import { useAddProjectMutation, useDeleteProjectMutation, useReadProjectsQuery, useUpdateProjectMutation } from "../../../redux/apis/admin.api"
import { PROJECT_CREATE_REQUEST, PROJECT_DELETE_REQUEST } from "@repo/types"

const Project = () => {
    const [selectedProject, setselectedProject] = useState<number | null>(null)
    const [addProject, { isLoading }] = useAddProjectMutation()
    const { data } = useReadProjectsQuery()
    const [updateProject] = useUpdateProjectMutation()
    const [deleteProject] = useDeleteProjectMutation()

    const projectSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        // skills: z.array(z.string()).min(1),
        sk: z.string(),
        githublink: z.string().min(1),
        livelink: z.string().min(1),
        image: z.string().min(1),
    }) satisfies z.ZodType<PROJECT_CREATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<PROJECT_CREATE_REQUEST>({
        defaultValues: {
            title: "",
            description: "",
            // skills: [],
            sk: "",
            githublink: "",
            livelink: "",
            image: "",
        },
        resolver: zodResolver(projectSchema)
    })

    const handleCreateProject = async (data: PROJECT_CREATE_REQUEST) => {
        try {
            if (selectedProject) {
                await updateProject({ ...data, id: selectedProject, skills: data.sk.split(",") }).unwrap()
                toast.success("project update succefully")
                reset({ title: "", description: "", sk: "", githublink: "", livelink: "", image: "" })
                setselectedProject(null)
            } else {
                await addProject({ ...data, skills: data.sk.split(",") }).unwrap()
                toast.success("project created succefully")
                reset()
            }
        } catch (error) {
            console.log(error)
            toast.error(" unabel to create project")
        }
    }

    const handledeleteProject = async (data: PROJECT_DELETE_REQUEST) => {
        try {
            await deleteProject(data).unwrap()
            toast.success("project delete succefully")
        } catch (error) {
            console.log(error)
            toast.error(" unabel to delete project")
        }
    }

    const handleEdit = (data: any) => {
        reset({
            title: data.title,
            description: data.description,
            sk: data.skills.join(","),
            githublink: data.githublink,
            livelink: data.livelink,
            image: data.image,
        })
    }

    const handleClasses = (key: keyof PROJECT_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card shadow">
                            <div className="card-header">Create Project</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(handleCreateProject)}>
                                    <input
                                        {...register("title")}
                                        type="text"
                                        placeholder="Project Title"
                                        className={handleClasses("title")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.title?.message}</div>

                                    <input
                                        {...register("description")}
                                        type="text"
                                        placeholder="Project Description"
                                        className={handleClasses("description")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.description?.message}</div>


                                    <input
                                        {...register("sk")}
                                        placeholder="enter skills (comma separated)"
                                        className={handleClasses("sk")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.sk?.message}</div>


                                    <input
                                        {...register("githublink")}
                                        type="text"
                                        placeholder="Github Link"
                                        className={handleClasses("githublink")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.githublink?.message}</div>


                                    <input
                                        {...register("livelink")}
                                        type="text"
                                        placeholder="enter Project Live Link"
                                        className={handleClasses("livelink")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.livelink?.message}</div>


                                    <input
                                        {...register("image")}
                                        type="text"
                                        placeholder="enter Image URL"
                                        className={handleClasses("image")}
                                    />
                                    <div className="invalid-feedback">{errors && errors.image?.message}</div>

                                    {
                                        selectedProject
                                            ? <button disabled={isLoading} type='submit' className='btn btn-warning w-100 mt-3'>
                                                {isLoading
                                                    ? <span className="spinner-border spinner-border-sm"></span>
                                                    : "Update Project"}</button>
                                            : <button disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-3">
                                                {isLoading
                                                    ? <span className="spinner-border spinner-border-sm"></span>
                                                    : "Create Project"}
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
                            <th>title</th>
                            <th>description</th>
                            <th>image</th>
                            <th>Github Link</th>
                            <th>Live Link</th>
                            <th>skills</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.result?.map(item => <tr>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    <img src={item.image} alt="project" width="80" />
                                </td>
                                <td>{item.githublink}</td>
                                <td>{item.livelink}</td>
                                <td>{item.skills.join(", ")}</td>
                                <td>
                                    <button onClick={() => handledeleteProject({ id: item.id as number })} className="btn btn-sm btn-danger">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button onClick={() => {
                                        handleEdit(item)
                                        setselectedProject(item.id as number) 
                                    }} className='btn btn-sm btn-outline-warning ms-2'><i className="bi bi-pencil"></i></button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table >
            }
        </>
    )
}

export default Project