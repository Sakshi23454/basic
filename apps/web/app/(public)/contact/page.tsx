"use client"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import React from 'react'
import { useAddcontactFormMutation } from "../../../redux/apis/user.api"
import { CONTACT_FORM_REQUEST } from "@repo/types"

const Contact = () => {

    const [addForm, { isLoading }] = useAddcontactFormMutation()

    const contactSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
    }) satisfies z.ZodType<CONTACT_FORM_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } =
        useForm<CONTACT_FORM_REQUEST>({
            defaultValues: {
                name: "",
                email: "",
                subject: "",
                message: ""
            },
            resolver: zodResolver(contactSchema)
        })

    const handleAddForm = async (data: CONTACT_FORM_REQUEST) => {
        try {
            await addForm(data).unwrap()
            toast.success("Message sent successfully")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("Unable to send message")
        }
    }

    const handleClasses = (key: keyof CONTACT_FORM_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })

    return <>
        <div className="container" style={{ marginTop: "110px" }}>
            <h2 className="text-center mb-4 hero-text">Contact Me</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleAddForm)}>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Your Name"
                                    className={handleClasses("name")}
                                />
                                <div className="invalid-feedback">{errors.name?.message}</div>

                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Your Email"
                                    className={handleClasses("email")}
                                />
                                <div className="invalid-feedback">{errors.email?.message}</div>

                                <input
                                    {...register("subject")}
                                    type="text"
                                    placeholder="Subject"
                                    className={handleClasses("subject")}
                                />
                                <div className="invalid-feedback">{errors.subject?.message}</div>

                                <textarea
                                    {...register("message")}
                                    placeholder="Your Message"
                                    rows={4}
                                    className={handleClasses("message")}
                                />
                                <div className="invalid-feedback">{errors.message?.message}</div>

                                <button disabled={isLoading} className="btn btn-primary w-100 mt-2">
                                    <i className="bi bi-send me-2"></i>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>{`
      @media (max-width: 768px) {
        .hero-text {
            padding-top: 20px;         
        }
    `}</style>

    </>
}

export default Contact