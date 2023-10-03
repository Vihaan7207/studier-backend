"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const supabaseClient_1 = __importDefault(require("../db/supabaseClient"));
// Define the GraphQL types
const QuestionType = new graphql_1.GraphQLObjectType({
    name: 'Question',
    fields: {
        id: { type: graphql_1.GraphQLID },
        question: { type: graphql_1.GraphQLString },
        answer: { type: graphql_1.GraphQLString },
        classId: { type: graphql_1.GraphQLID }
    },
});
const ClassType = new graphql_1.GraphQLObjectType({
    name: 'Class',
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        studentId: { type: graphql_1.GraphQLID }
    },
});
const StudentType = new graphql_1.GraphQLObjectType({
    name: 'Student',
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
});
// Define the root query type
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        students: {
            type: new graphql_1.GraphQLList(StudentType),
            resolve: () => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('students').select();
                return data;
            }),
        },
        student: {
            type: StudentType,
            args: { username: { type: graphql_1.GraphQLString } },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('students').select().eq('username', args.username);
                return data[0];
            })
        },
        classes: {
            type: new graphql_1.GraphQLList(ClassType),
            resolve: () => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('classes').select();
                return data;
            })
        },
        class: {
            type: ClassType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('classes').select().eq('id', args.id);
                return data[0];
            })
        },
        classesByStudent: {
            type: new graphql_1.GraphQLList(ClassType),
            args: { studentID: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('classes').select().eq('studentId', args.studentID);
                return data;
            })
        },
        questions: {
            type: new graphql_1.GraphQLList(QuestionType),
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('questions').select();
                return data;
            })
        },
        question: {
            type: QuestionType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('questions').select().eq('id', args.id);
                return data[0];
            })
        },
        questionsByClass: {
            type: new graphql_1.GraphQLList(QuestionType),
            args: { classID: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, error } = yield supabaseClient_1.default.from('questions').select().eq('classId', args.classID);
                return data;
            })
        }
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('students').insert({
                    name: args.name,
                    username: args.username,
                    password: args.password,
                });
                if (error)
                    return error;
            }),
        },
        addClass: {
            type: ClassType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                studentId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('classes').insert({
                    name: args.name,
                    studentId: args.studentId
                });
                if (error)
                    return error;
            })
        },
        addQuestion: {
            type: QuestionType,
            args: {
                question: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                answer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                classId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('classes').insert({
                    question: args.question,
                    answer: args.answer,
                    classId: args.classId
                });
            })
        },
        deleteStudent: {
            type: StudentType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('students').delete().eq('id', args.id);
                if (error)
                    return error;
            })
        },
        deleteClass: {
            type: ClassType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('classes').delete().eq('id', args.id);
                if (error)
                    return error;
            })
        },
        deleteQuestion: {
            type: ClassType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { error } = yield supabaseClient_1.default.from('questions').delete().eq('id', args.id);
                if (error)
                    return error;
            })
        },
    }
});
// Create the schema
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation
});
