package at.htl;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Set;

@ApplicationScoped
public class Data {

    private final Set<Model.Session> sessions;

    public Data() {
        sessions = createData();
    }

    public Set<Model.Session> getSessions() {
        return this.sessions;
    }

    private static Set<Model.Session> createData() {
        final int SESSION_SPREAD = 3;
        final String SPEAKER_1 = "Hugo";
        final String SPEAKER_2 = "Susi";
        var sessionDate = LocalDate.now();
        var sessionId = 1;
        return Set.of(
                createSession(sessionId++, sessionDate = sessionDate.plusDays(SESSION_SPREAD), SPEAKER_1),
                createSession(sessionId++, sessionDate = sessionDate.plusDays(SESSION_SPREAD), SPEAKER_2),
                createSession(sessionId++, sessionDate = sessionDate.plusDays(SESSION_SPREAD), SPEAKER_1),
                createSession(sessionId, sessionDate.plusDays(SESSION_SPREAD), SPEAKER_2)
        );
    }

    private static Model.Session createSession(int sessionId, LocalDate date, String speaker) {
        var session = new Model.Session(sessionId, date, speaker, new ArrayList<>());
        createSeats(session);
        return session;
    }

    private static void createSeats(Model.Session session) {
        var seatId = session.id() * 100 + 1;

        seatId = createAndAddSeats(seatId, Model.Category.VIP, session, 2);
        seatId = createAndAddSeats(seatId, Model.Category.SEAT, session, 4);

        if (session.id() % 2 == 0) {
            createAndAddSeats(seatId, Model.Category.STANDING, session, 6);
        } else {
            createAndAddSeats(seatId, Model.Category.SEAT, session, 2);
        }
    }

    private static int createAndAddSeats(int initialSeatId, Model.Category category, Model.Session session, int amount){
        var seatId = initialSeatId;
        for (var i = 0; i < amount; i++){
            session.seats().add(new Model.Seat(seatId++, category, session));
        }
        return seatId;
    }
}
