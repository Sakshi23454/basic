"use client"
import React from 'react'
import { useGetProjectsQuery } from '../../../redux/apis/user.api'

const Projects = () => {
    const { data } = useGetProjectsQuery()

    return <>
        <div className="container" style={{ marginTop: "110px" }}>
            <h2 className="text-center mb-4  project-title">My Projects</h2>
            <div className="row g-4">
                {data?.result?.map(item => (
                    <div className="col-md-4" key={item.id}>
                        <div className="card h-100 shadow-sm border-0">
                            <img
                                src={item.image}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                                alt={item.title}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text text-muted small text-justify hero-text">
                                    {item.description}
                                </p>
                                <div className="mb-3">
                                    {item.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-secondary me-2 mb-2"
                                            style={{ fontSize: "11px" }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto d-flex gap-3">
                                    <a href={item.githublink} target="_blank" className="btn btn-dark btn-sm">
                                        <i className="bi bi-github me-1"></i>
                                        GitHub
                                    </a>

                                    <a href={item.livelink} target="_blank" className="btn btn-success btn-sm">
                                        <i className="bi bi-arrow-up-right me-1"></i>
                                        Live
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

        <style jsx>{`
  @media (max-width: 768px) {
    .project-title {
      padding-top: 20px; 
    }
       .hero-text {
            text-align: justify !important;
        }
  }

  .text-justify{
        text-align: justify !important;
  }

   body {
    overflow-x: hidden;
  }
`}</style>
    </>
}

export default Projects