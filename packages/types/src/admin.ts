export type PROJECT_CREATE_REQUEST = {
    sk: string,
    title: string
    description: string
    skills?: string[]
    githublink: string
    livelink: string
    image: string
}
export type PROJECT_CREATE_RESPONSE = { message: string }


export type PROJECT_READ_REQUEST = void
export type PROJECT_READ_RESPONSE = {
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

export type PROJECT_UPDATE_REQUEST = {
    id: number
    title: string
    description: string
    skills: string[]
    githublink: string
    livelink: string
    image: string
}
export type PROJECT_UPDATE_RESPONSE = { message: string }


export type PROJECT_DELETE_REQUEST = { id: number }
export type PROJECT_DELETE_RESPONSE = { message: string }


export type SKILL_CREATE_REQUEST = {
    name: string
    category: string
    icon: string
}

export type SKILL_CREATE_RESPONSE = { message: string }

export type READ_SKILLS_REQUEST = void
export type READ_SKILLS_RESPONSE = {
    message: string
    result?: {
        id: number
        name: string
        category: string
        icon: string
    }[]
}

export type SKILL_DELETE_REQUEST = { id: number }
export type SKILL_DELETE_RESPONSE = { message: string }


export type EXPERIENCE_CREATE_REQUEST = {
    company: string
    role: string
    duration: string
    description: string
}

export type EXPERIENCE_CREATE_RESPONSE = { message: string }

export type EXPERIENCE_READ_REQUEST = void
export type EXPERIENCE_READ_RESPONSE = {
    message: string
    result?: {
        id: number
        company: string
        role: string
        duration: string
        description: string
    }[]
}

export type EXPERIENCE_DELETE_REQUEST = { id: number }
export type EXPERIENCE_DELETE_RESPONSE = { message: string }


export type EXPERIENCE_UPDATE_REQUEST = {
    id: number
    company: string
    role: string
    duration: string
    description: string
}
export type EXPERIENCE_UPDATE_RESPONSE = { message: string }


export type EDUCATION_CREATE_REQUEST = {
    college: string
    degree: string
    year: string
}
export type EDUCATION_CREATE_RESPONSE = { message: string }

export type EDUCATION_READ_REQUEST = void
export type EDUCATION_READ_RESPONSE = {
    message: string
    result?: {
        id: number
        college: string
        degree: string
        year: string
    }[]

}

export type EDUCATION_DELETE_REQUEST = { id: number }
export type EDUCATION_DELETE_RESPONSE = { message: string }


export type EDUCATION_UPDATE_REQUEST = {
    id: number
    college: string
    degree: string
    year: string
}
export type EDUCATION_UPDATE_RESPONSE = { message: string }


export type ADD_PROFILEPIC_REQUEST = {
    profilePic: FileList | undefined;
}
export type ADD_PROFILEPIC_RESPONSE = { message: string }


export type PROFILE_UPDATE_REQUEST = {
    id?: number
    name?: string
    title?: string
    email?: string
    mobile?: string
    github?: string
    linkedin?: string
    profilePic?: string
    resume?: string
    bio?: string
    location?: string
}
export type PROFILE_UPDATE_RESPONSE = { message: string }

export type PROFILE_READ_REQUEST = void
export type PROFILE_READ_RESPONSE = {
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
        github: string
        linkedin: string
        location: string
    }
}


export interface CONTACT {
    id: number
    name: string
    email: string
    subject: string
    message: string
    createdAt?: Date | null
}
export type GET_CONTACT_RESPONSE = {
    message: string
    result?: CONTACT[]
}
export type GET_CONTACT_REQUSET = void


export type STATS_CREATE_REQUEST = {
    id?: number
    experience: string
    projects: string
    technologies: string
    clients: string
}
export type STATS_CREATE_RESPONSE = { message: string }
export type READ_STATS_REQUEST = void
export type READ_STATS_RESPONSE = {
    message: string
    result?: {
        id?: number
        experience: string
        projects: string
        technologies: string
        clients: string
    }
}

export type RESUME_UPLOAD_REQUEST = { resume: FileList | undefined; }
export type RESUME_UPLOAD_RESPONSE = {
    message: string
}