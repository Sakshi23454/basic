"use client"
import React from "react"
import { useGetProfileQuery } from "../../redux/apis/user.api"

const UserFooter = () => {

    const { data } = useGetProfileQuery()
    const profile = data?.result

    return <>
        <footer className="bg-light pt-5 pb-3 mt-5 border-top">
            <div className="container" >
                <div className="row" >
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">{profile?.name}</h5>
                        <p className="text-muted small hero-text ">
                            Passionate MERN Stack Developer skilled in building scalable,
                            responsive, and user-centric web applications.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h6 className="fw-semibold mb-3">Contact Info</h6>
                        <p className="mb-2 text-muted">
                            <i className="bi bi-envelope me-2"></i>
                            {profile?.email}
                        </p>
                        <p className="mb-2 text-muted">
                            <i className="bi bi-telephone me-2"></i>
                            {profile?.mobile}
                        </p>
                        <p className="mb-0 text-muted">
                            <i className="bi bi-geo-alt me-2"></i>
                            {profile?.location}
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h6 className="fw-semibold mb-3">Follow Me</h6>
                        <div className="d-flex gap-3 fs-5">
                            {profile?.github && (
                                <a href={profile.github} target="_blank" className="text-dark">
                                    <i className="bi bi-github"></i>
                                </a>
                            )}

                            {profile?.linkedin && (
                                <a href={profile.linkedin} target="_blank" className="text-dark">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center text-muted small">
                    © {new Date().getFullYear()} {profile?.name}. All rights reserved.
                </div>
            </div>
        </footer>

        <style jsx>{`
      @media (max-width: 768px) {
        .hero-text {
            text-align: justify !important;
        }
      }
    `}</style>


    </>
}

export default UserFooter