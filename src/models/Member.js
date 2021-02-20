import db from "../firebase/database/connection";

const docRef = db.collection("members");

export default {
    async createMember(newMember){
        try {
            console.log("Creating new Member! ", newMember);
            const response = await docRef.doc(newMember._id).set(newMember);
            console.log("🚀 ~ file: Member.js ~ line 8 ~ createMember ~ response", response)
            return response;
        } catch (error) {
            console.warn(error);
        }
    }
}