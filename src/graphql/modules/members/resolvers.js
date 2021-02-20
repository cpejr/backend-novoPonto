import Member from "../../../models/Member";

export default {
  Member: {
    fullname: ({ firstname, lastname }) => `${firstname} ${lastname}`,
    responsible: (memb, _, { members }) =>
      members.find((member) => member._id === memb.responsible),
  },
  Query: {
    members: (_, __, { members }) => members,
    member: (_, { name }, { members }) => {
      return members.find((member) => member.name === name);
    },
  },
  Mutation: {
    createMember: async (_, { data }, { members }) => {
      const newMember = {
        _id: String(Math.random()),
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status ? data.status : "",
        role_id: String(Math.random()),
        img_id: String(Math.random()),
        firebase_id: String(Math.random()),
        responsible: String(Math.random()),
      };

      const response = await Member.createMember(newMember);
      console.log("🚀 ~ file: resolvers.js ~ line 29 ~ createMember: ~ response", response)
      members.push(newMember);
      return newMember;
    },
  },
};
