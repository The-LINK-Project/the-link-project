export const navLinks = [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "Contact",
        route: "/contact",
    },
    {
        name: "About Us",
        route: "/about",
    },
    {
        name: "Results",
        route: "/results",
    },
    {
        name: "Dashboard",
        route: "/dashboard",
    },
];

export const frequentlyAskedQuestions = [
    { questionKey: "q1", answerKey: "a1" },
    { questionKey: "q3", answerKey: "a3" },
    { questionKey: "q4", answerKey: "a4" },
    { questionKey: "q5", answerKey: "a5" },
];

export const aboutUsInformation = [
    {
        name: "Adrish Majumder",
        role: "Co-Founder",
        image: "/assets/about-us/mun.jpeg",
    },
    {
        name: "Alexandre Lee",
        role: "Co-Founder",
        image: "/assets/about-us/Alex.jpeg",
    },
    {
        name: "Ruhan Gupta",
        role: "Co-Founder",
        image: "/assets/about-us/Ruhan.jpeg",
    },
    {
        name: "Videep Agarwal",
        role: "Co-Founder",
        image: "/assets/about-us/Videep.jpeg",
    },
];

// Photos shown in the International Migrants Day gallery on the landing page.
// Files live in `public/assets/events/migrants-day/`. To add or swap photos,
// drop the image into that folder and add/replace its path below (paths are
// relative to `public/`). Use lowercase extensions — production servers are
// case-sensitive. Tiles are square (object-cover), so center the subject.
export const migrantsDayPhotos = [
    "/assets/events/migrants-day/photo-1.jpg",
    "/assets/events/migrants-day/photo-2.jpg",
    "/assets/events/migrants-day/photo-3.jpg",
    "/assets/events/migrants-day/photo-4.jpg",
    "/assets/events/migrants-day/photo-5.jpg",
    "/assets/events/migrants-day/photo-6.jpg",
    "/assets/events/migrants-day/photo-7.jpg",
];

export const defaultConvoHistory = {
    role: "User",
    message: "Hello",
};
