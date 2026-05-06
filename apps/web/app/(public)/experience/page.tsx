"use client"
import React from 'react'
import { useGetExperienceQuery } from '../../../redux/apis/user.api'

const Experience = () => {
    const { data } = useGetExperienceQuery()

    return <>
        <div className="container" style={{ marginTop: "110px" }}>
            <h2 className="text-center mb-4 experience-top">Work Experience</h2>
            {data?.result?.map((item) => (
                <div key={item.id} className="card shadow-sm mb-4 border-0  bg-light">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start experience-header">
                            <div>
                                <h5 className="fw-bold mb-1">
                                    {item.role}
                                </h5>
                                <p className="text-primary small mb-2">
                                    <i className="bi bi-building me-1"></i>
                                    {item.company}
                                </p>
                            </div>
                            <span className="badge bg-light text-dark border px-3 py-2">
                                <i className="bi bi-calendar me-1"></i>
                                {item.duration}
                            </span>
                        </div>
                        <p className="text-muted mt-2 hero-text">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}

        </div>

        <style jsx>{`
      @media (max-width: 768px) {
        .hero-text {
            text-align: justify !important;
        }
        .experience-top {
            padding-top: 20px; 
        }
        .experience-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }

        .experience-header span {
            margin-top: 4px;
        }
    `}</style>

    </>
}

export default Experience