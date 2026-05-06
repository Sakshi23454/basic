"use client"
import React from 'react'
import { useGetSkillsQuery } from '../../../redux/apis/user.api'

const Skills = () => {
    const { data } = useGetSkillsQuery()

    return <>
        <div className="container bg-light rounded ps-4 pe-4" style={{ marginTop: "130px" }}>
            <h2 className="text-center mb-3 pt-3">My Skills</h2>
            {/* <p className="text-center text-muted mb-4">
                Technologies I work with
            </p> */}
            <div className="row">
                {
                    data && data?.result?.map((item: any) => (
                        <div key={item.id} className="col-6 col-md-4 col-lg-2 mb-4">
                            <div className="card text-center shadow-sm border-0 p-3 h-100">
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "contain",
                                        margin: "0 auto"
                                    }}
                                />
                                <p className="mt-2 mb-0">
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default Skills