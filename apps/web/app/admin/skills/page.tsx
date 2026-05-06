"use client"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useAddSkillMutation, useDeleteSkillMutation, useReadSkillQuery } from "../../../redux/apis/admin.api"
import { SKILL_CREATE_REQUEST, SKILL_DELETE_REQUEST } from "@repo/types"

const AddSkill = () => {
    const [addSkill, { isLoading }] = useAddSkillMutation()
    const { data } = useReadSkillQuery()
    const [deleteSkill] = useDeleteSkillMutation()

    const skillSchema = z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        icon: z.string().min(1),
    }) satisfies z.ZodType<SKILL_CREATE_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<SKILL_CREATE_REQUEST>({
        defaultValues: {
            name: "",
            category: "",
            icon: ""
        },
        resolver: zodResolver(skillSchema)
    })

    const handleAddSkill = async (data: SKILL_CREATE_REQUEST) => {
        try {
            await addSkill(data).unwrap()
            toast.success("Skill added successfully")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("unable to add skill")
        }
    }

    const handledeleteSkill = async (data: SKILL_DELETE_REQUEST) => {
        try {
            await deleteSkill(data).unwrap()
            toast.success("Skill delete successfully")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("unable to delete skill")
        }
    }

    const handleClasses = (key: keyof SKILL_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })


    return <>
        <div className="container mt-4">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Add Skill</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleAddSkill)}>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Skill Name"
                                    className={handleClasses("name")}
                                />
                                <div className="invalid-feedback">{errors && errors.name?.message}</div>


                                <input
                                    {...register("category")}
                                    type="text"
                                    placeholder="Category (Frontend / Backend)"
                                    className={handleClasses("category")}
                                />
                                <div className="invalid-feedback">{errors && errors.category?.message}</div>

                                <input
                                    {...register("icon")}
                                    type="text"
                                    placeholder="enter icon/image url"
                                    className={handleClasses("icon")}
                                />
                                <div className="invalid-feedback">{errors && errors.icon?.message}</div>

                                <button disabled={isLoading} className="btn btn-primary w-100">Add Skill</button>
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
                        <th>name</th>
                        <th>icon</th>
                        <th>category</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.result?.map(item => <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><img src={item.icon} alt="project" width={50} /></td>
                            <td>{item.category}</td>
                            <td>
                                <button onClick={() => handledeleteSkill({ id: item.id as number })} className="btn btn-sm btn-danger">
                                    <i className="bi bi-trash"></i>
                                </button>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table >
        }

    </>
}

export default AddSkill