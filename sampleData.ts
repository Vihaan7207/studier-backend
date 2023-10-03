import { Student } from "./interfaces";

export let students: Array<Student> = [
    {
        id: 1,
        name: 'Bob',
        username: 'bob@gmail.com',
        password: '123',

        classes: {
            content: [
                {
                    name: 'Math',
                    questions: {
                        content: [
                            {
                                question: 'What is 2 + 2?',
                                answer: 4
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: 2,
        name: 'Joe',
        username: 'joe@gmail.com',
        password: '456',
        classes: {
            content: [
                {
                    name: 'Social Studies',
                    questions: {
                        content: [
                            {
                                question: 'How long was Pax Romana?',
                                answer: '200 years'
                            }
                        ]
                    }
                }
            ]
    }
    },
    {
        id: 3,
        name: 'Pete',
        username: 'pete@gmail.com',
        password: '789',
        classes: {
            content: [
                {
                    name: 'ELA',
                    questions: {
                        content: [
                            {
                                question: 'What is the theme of Tuck Everlasting?',
                                answer: 'Fantasy'
                            }
                        ]
                    }
                }
            ]
        }
    },
];