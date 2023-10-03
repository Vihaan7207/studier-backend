import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLID } from 'graphql';
import { students } from '../sampleData';
import supabase from '../db/supabaseClient';

// Define the GraphQL types
const QuestionType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Question',
  fields: {
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    answer: { type: GraphQLString },
    classId: { type: GraphQLID }
  },
});

const ClassType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Class',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    studentId: { type: GraphQLID }
  },
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },
});

// Define the root query type
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve: async () => {
        const { data, error } = await supabase.from('students').select();
        return data;
      },
    },
    student: {
      type: StudentType,
      args: { username: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('students').select().eq('username', args.username);
        return data![0];
      }
    },
    classes: {
      type: new GraphQLList(ClassType),
      resolve: async () => {
        const { data, error } = await supabase.from('classes').select();
        return data;
      }
    },
    class: {
      type: ClassType,
      args: { id: {type: GraphQLID } },
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('classes').select().eq('id', args.id);
        return data![0];
      }
    },
    classesByStudent: {
      type: new GraphQLList(ClassType),
      args: { studentID: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('classes').select().eq('studentId', args.studentID);
        return data;
      }
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('questions').select();
        return data;
      }
    },
    question: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('questions').select().eq('id', args.id);
        return data![0];
      }
    },
    questionsByClass: {
      type: new GraphQLList(QuestionType),
      args: { classID: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const { data, error } = await supabase.from('questions').select().eq('classId', args.classID);
        return data;
      }
    } 
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('students').insert({
          name: args.name,
          username: args.username,
          password: args.password,
        });
        if (error) return error;
        
      },
    },
    addClass: {
      type: ClassType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        studentId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('classes').insert({
          name: args.name,
          studentId: args.studentId
        });
        if (error) return error;
      }
    },
    addQuestion: {
      type: QuestionType,
      args: {
        question: { type: new GraphQLNonNull(GraphQLString) },
        answer: { type: new GraphQLNonNull(GraphQLString) },
        classId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('classes').insert({
          question: args.question,
          answer: args.answer,
          classId: args.classId
        })
      }
    },
    deleteStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('students').delete().eq('id', args.id);
        if (error) return error;
      }
    },
    deleteClass: {
      type: ClassType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('classes').delete().eq('id', args.id);
        if (error) return error;
      }
    },
    deleteQuestion: {
      type: ClassType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const { error } = await supabase.from('questions').delete().eq('id', args.id);
        if (error) return error;
      }
    },
  }
})

// Create the schema
export let schema = new GraphQLSchema({
  query: RootQueryType,
  mutation
});



