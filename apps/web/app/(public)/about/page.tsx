"use client"
import React from 'react'
import { useGetEducationQuery, useGetProfileQuery } from '../../../redux/apis/user.api'

const About = () => {
    const { data } = useGetProfileQuery()
    const { data: eduData } = useGetEducationQuery()

    return <>
        <div className="container bg-light pe-5 ps-5 pb-5" style={{ marginTop: "130px" }}>
            <h2 className="text-center mb-5 fw-bold pt-4">About Me</h2>
            <div className="row">
                <div className="col-md-5 text-center mb-4 pe-3">
                    {data?.result?.profilePic && (
                        <img
                            src={data.result.profilePic}
                            alt="profile"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>

                <div className="col-md-7">
                    <ul className="nav nav-pills mb-3">
                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#bio">Bio</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#education">Education</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#languages" > Languages</button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="bio">
                            <h4>Hello There!</h4>
                            <p style={{ textAlign: "justify" }}> I'm Sakshi Markal, a MERN Stack Developer passionate about building modern and efficient web applications.</p>
                            <p style={{ textAlign: "justify" }}>My journey in Web Development began during my B.Tech, where I developed a strong interest in technology, web development, and problem solving. This curiosity motivated me to explore modern web technologies and eventually specialize in the MERN Stack (MongoDB, Express.js, React.js, and Node.js).</p>
                            <p style={{ textAlign: "justify" }}>I enjoy building full-stack web applications that are scalable, responsive, and user-friendly. Through continuous learning and hands-on projects, I have developed skills in frontend development, backend API development, database management, and mobile application development. I am passionate about turning ideas into functional digital solutions and continuously improving my development skills.</p>
                        </div>
                        <div className="tab-pane fade" id="education">
                            {eduData?.result?.map((item: any) => (
                                <div className="card shadow-sm mb-3" key={`${item._id}-${item.degree}`}>
                                    <div className="card-body">
                                        <h5 className="fw-bold">
                                            <i className="bi bi-mortarboard me-2"></i>
                                            {item.degree}
                                        </h5>
                                        <p className="mb-1 text-muted">
                                            {item.college}
                                        </p>
                                        <small className="text-secondary">
                                            {item.year}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tab-pane fade" id="languages">
                            <div className="d-flex gap-2">
                                <span className="badge bg-secondary p-2">English</span>
                                <span className="badge bg-secondary p-2">Hindi</span>
                                <span className="badge bg-secondary p-2">Marathi</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default About