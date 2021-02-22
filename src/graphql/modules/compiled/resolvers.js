import { JustificativeModel, SessionModel } from "../../../models";
import { mili2time } from "../../../utils/dateFunctions";

export default {
  CompiledSessions: {
    formatedTotal: ({ total }) => {
      let dur = total;

      if (!dur) dur = 0;

      return mili2time(dur);
    },
  },

  Query: {
    compiled: async (_, { memberId, startDate, endDate }) => {
      let sessions = SessionModel.findByDateRangeWithDuration(
        { memberId },
        { startDate, endDate }
      );

      let justificatives = JustificativeModel.findByDateRangeWithDuration(
        { memberId },
        { startDate, endDate }
      );

      [sessions, justificatives] = await Promise.all([
        sessions,
        justificatives,
      ]);

      let total = 0;
      sessions.forEach((session) => (total += session.duration));
      justificatives.forEach(
        (justificative) => (total += justificative.amount)
      );

      return { sessions, total, justificatives };
    },
    checkFault: async (_, { memberId, startDate, endDate }) => {
      let sessions = SessionModel.findByDateRangeWithDuration(
        { memberId },
        { startDate, endDate }
      );
      //   segunda -> 16:00 - 17:00

      //   start < 17:00
      //   end > 16:00
      //   dayweek = segunda;

      // let a = { '10/20/20':}
    },
  },
};
