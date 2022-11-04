import db from "@database";
import { AuthorizedHandler, authorizedWrapper } from "@utils/wrapper";

const addHours: AuthorizedHandler<{
  minutes: number;
}> = async ({ user, body }) => {
  await db.Hours.create({
    accountId: user.id,
    minutesWorked: body.minutes,
    paid: false,
  })
}

export const post = authorizedWrapper(addHours);
