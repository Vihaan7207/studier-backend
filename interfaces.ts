export interface Question {
    question: string;
    answer: string | number;
}

export interface Class {
    name: string;
    questions: List<Question>;
}

export interface List<T> {
    content: Array<T>
}

export interface Student {
    id: number;
    name: string;
    username: string;
    password: string;
    classes: List<Class>
}