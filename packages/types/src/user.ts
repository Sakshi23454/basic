export type PROJECT_GET_REQUEST = void
export type PROJECT_GET_RESPONSE = {
    message: string
    result?: {
        id?: number
        title: string
        description: string
        image: string
        githublink: string
        livelink: string
        skills: string[]
    }[]
}


export type GET_SKILLS_REQUEST = void
export type GET_SKILLS_RESPONSE = {
    message: string
    result?: {
        id: number
        name: string
        category: string
        icon: string
    }[]
}


export type EXPERIENCE_GET_REQUEST = void
export type EXPERIENCE_GET_RESPONSE = {
    message: string
    result?: {
        id: number
        company: string
        role: string
        duration: string
        description: string
    }[]
}


export type EDUCATION_GET_REQUEST = void
export type EDUCATION_GET_RESPONSE = {
    message: string
    result?: {
        id: number
        college: string
        degree: string
        year: string
    }[]

}

export type PROFILE_GET_REQUEST = void
export type PROFILE_GET_RESPONSE = {
    message: string
    result?: {
        id: number
        name: string
        title: string
        email: string
        mobile: string
        bio: string
        profilePic?: string
        resume?: string
        github?: string
        linkedin?: string
        location: string
    }
}


export type CONTACT_FORM_REQUEST = {
    name: string
    email: string
    subject: string
    message: string
}
export type CONTACT_FORM_RESPONSE = { message: string }


export type GET_STATS_REQUEST = void
export type GET_STATS_RESPONSE = {
    message: string
    result?: {
        id?: number
        experience: string
        projects: string
        technologies: string
        clients: string
    }
}