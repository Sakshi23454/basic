    "use client"
    import Link from "next/link"
    import { useEffect, useState } from "react"
    import { useGetProfileQuery } from "../../redux/apis/user.api"

    const UserNavbar = () => {
        const { data } = useGetProfileQuery()


        const [scrolled, setScrolled] = useState(false)

        useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 50)
            }

            window.addEventListener("scroll", handleScroll)

            return () => window.removeEventListener("scroll", handleScroll)
        }, [])

        return <>
            <nav
                className="navbar navbar-expand-lg fixed-top border-bottom shadow-sm"
                style={{
                    backgroundColor: scrolled ? "#cfe8ff" : "#ffffff",
                    transition: "all 0.3s ease"
                }}
            >
                <div className="container-fluid">
                    <a className="navbar-brand lh-sm ps-4" href="#">
                        <div className="fw-bold">Sakshi Markal</div>
                        <small className="text-muted">MERN Stack Developer</small>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto">
                            <Link className="nav-link active" href="/">Home</Link>
                            <Link className="nav-link" href="/about">About</Link>
                            <Link className="nav-link" href="/skills">Skills</Link>
                            <Link className="nav-link" href="/projects">Projects</Link>
                            <Link className="nav-link" href="/experience">Experience</Link>
                            <Link className="nav-link" href="/contact">Contact</Link>
                        </div>
                    </div>

                    <div className="d-flex gap-4 fs-5 pe-5 social-icons">
                        {data?.result?.github && (
                            <a href={data?.result?.github} target="_blank" className="text-dark">
                                <i className="bi bi-github"></i>
                            </a>
                        )}

                        {data?.result?.linkedin && (
                            <a href={data?.result?.linkedin} target="_blank" className="text-dark">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            <style jsx>{`
            @media (max-width: 768px) {
            .social-icons {
            margin-left: 22px !important; /* ps-2 */
            padding-right: 0 !important;
            }
    }
    `}</style>
        </>
    }

    export default UserNavbar